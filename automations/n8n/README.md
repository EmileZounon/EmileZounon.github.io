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
| 4 | `Alert Me About The Failure` | Replace `REPLACE_WITH_YOUR_ALERT_EMAIL` with the address that should receive failure alerts |

Create the spreadsheet in Google Sheets first — the workflow appends to an existing file,
it does not create one. It needs a tab named **Leads** whose row 1 is exactly:

```
Name | Email | Request | Content of the email | Response | When they wrote
```

| Column | What lands in it |
|---|---|
| `Name` | the lead's name |
| `Email` | the lead's email address |
| `Request` | Claude's short summary of what they asked for |
| `Content of the email` | their message, verbatim |
| `Response` | the reply that was sent |
| `When they wrote` | submission time, e.g. `Mon 17 Aug 2026, 3:02pm` |

Headers are matched by name, so spelling and case must match exactly — a typo does not
error, it silently appends a new column. Because matching is by name and not position, you
can reorder the columns in Sheets however you like without touching n8n.

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

`When they wrote` is written as readable text — `Mon 17 Aug 2026, 3:02pm` — rendered in the
n8n instance's timezone. If times come out in UTC, set `GENERIC_TIMEZONE` on the instance.

Being text, the column sorts alphabetically rather than chronologically. If you need to sort
by date in Sheets, map the column to `submitted_at` instead (the raw ISO value, which does
sort correctly as text) and format it in Sheets.

## Sharing this workflow

The exported JSON contains no credentials, no API keys and no lead data — n8n never exports
those — and both the sheet ID and the alert address are placeholders. It is safe to publish
as-is. Fill the placeholders in inside n8n after importing, not in the file.

## Sharing the sheet

The sheet holds leads' names, email addresses and the full text of what they wrote — personal
data they gave you privately. Before sharing it publicly, hide or remove `Email` and
`Content of the email`, or point the workflow at a separate demo spreadsheet.
