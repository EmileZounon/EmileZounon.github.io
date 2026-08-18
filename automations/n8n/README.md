# n8n — Lead Intake → Claude Reply → Gmail → Sheet

Import `lead-intake-claude-reply.json` into n8n (**Workflows → ⋯ → Import from File**).

## What it does

1. **Form** catches a new lead — Name, Email, Message (all required).
2. **Claude** writes a warm reply under 120 words: greets by first name, quotes back the
   specific thing they asked for, answers only from the price list and hours below, offers
   one next step with two time options, signs off as Jane. If the message is vague it asks
   one clarifying question instead of guessing.
3. **Gmail** sends the reply to the lead.
4. **Google Sheets** logs one row per lead.
5. **On any failure** — you get an email saying what broke and which lead it broke on, and
   the lead is still written to the sheet marked `NOT SENT` so nobody is lost.

## Setup (4 things)

| # | Node | What to set |
|---|------|-------------|
| 1 | `Claude Writes Reply` | Anthropic API credential (built-in credential type) |
| 2 | `Send Gmail Reply`, `Alert Me About The Failure` | Gmail OAuth2 credential |
| 3 | Both Google Sheets nodes | Google Sheets credential, then replace `REPLACE_WITH_YOUR_GOOGLE_SHEET_ID` with your spreadsheet ID |
| 4 | `Alert Me About The Failure` | Alert recipient — currently `emile.giovannie@gmail.com` |

Create the spreadsheet in Google Sheets first — the workflow appends to an existing file,
it does not create one. It needs a tab named **Leads** whose row 1 is exactly:

```
Name | Email | Request | Content of the email | Response
```

| Column | What lands in it |
|---|---|
| `Name` | the lead's name |
| `Email` | the lead's email address |
| `Request` | Claude's short summary of what they asked for |
| `Content of the email` | their message, verbatim |
| `Response` | the reply that was sent |

Headers are matched by name, so spelling and case must match exactly — a typo does not
error, it silently appends a new column.

Then activate the workflow and grab the public form URL from the **New Lead Form** node.

## Changing prices or hours

Open the **Normalize Lead** node. The first two constants are the single source of truth:

```js
const SERVICES_AND_PRICES = ['Standard clean — $120', 'Deep clean — $220', 'Move-out clean — $280'];
const AVAILABILITY = ['Weekday evenings, 6:00 pm to 9:00 pm', 'Weekends, anytime 7:00 am to 10:00 pm'];
```

They are injected into Claude's system prompt, which forbids stating any price, service or
time slot that is not in those lists. Nothing else needs editing.

## How the reply is kept on-rails

- The system prompt lists the **only** facts Claude may use and bans guessing, estimating
  or extrapolating anything outside them.
- Claude returns JSON (`asked_for`, `is_vague`, `subject`, `reply`) via an assistant prefill,
  so the sheet's "what they asked for" column is Claude's own summary rather than a regex.
- `Parse Claude Reply` guarantees the `— Jane` sign-off, rejects an empty or truncated
  response, and counts words.
- Model is `claude-sonnet-5`; swap it in the same constants block if you want `claude-opus-5`.

## Failure handling

Each fragile step retries 3 times (2s apart), then routes to its red error output, which
stamps which step broke and feeds the alert email and the `NOT SENT` sheet row. The alert
tells you whether the reply reached the lead — only a Sheets failure happens after the send.

## Timestamps

The submission time is not a sheet column. It appears in the failure alert email, formatted
readably (`Mon 17 Aug 2026, 3:02pm`) in the n8n instance's timezone — set `GENERIC_TIMEZONE`
if that comes out wrong. `Normalize Lead` also emits the raw ISO value as `submitted_at` if
you ever want to add it back as a column.
