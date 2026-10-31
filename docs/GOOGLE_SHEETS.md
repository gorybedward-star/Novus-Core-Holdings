# Free lead capture: Google Sheets + email (before GoHighLevel)

Until GoHighLevel is in place, scorecard requests can go to a Google Sheet, and you get an email for each one. It's free and uses only your Google account. The site switches to GoHighLevel automatically once its keys are added (GoHighLevel wins if both are set).

## Setup (about 10 minutes)

1. **Create the sheet.** Go to sheets.google.com, create a blank sheet, name it `Scorecard Leads`.
2. **Add the script.** In the sheet: **Extensions → Apps Script**. Delete what's there and paste everything from `integrations/google-apps-script/Code.gs`.
3. **Set your secret.** On the line `const SECRET = '...'`, replace the text with a long random phrase (e.g. four random words and a number). Keep it handy. Click **Save**.
4. **Deploy.** Click **Deploy → New deployment**. Click the gear next to "Select type" and choose **Web app**.
   - Description: `Scorecard leads`
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**, then **Authorize access**, choose your Google account. Google warns the app isn't verified because you wrote it yourself: click **Advanced → Go to (project name) (unsafe) → Allow**.
5. **Copy the Web app URL** (ends in `/exec`).
6. **In Vercel** → your project → **Settings → Environment Variables**, add:
   - `SHEETS_WEBHOOK_URL` = the Web app URL
   - `SHEETS_WEBHOOK_SECRET` = the same phrase from step 3
7. **Redeploy:** Deployments → ⋯ on the latest → **Redeploy**.
8. **Test:** submit the form on the live site with your own details. You should see the success message, a new row in the sheet, and an email.

"Anyone" access is safe here: the script ignores any request without your secret, and only the server (never the browser) knows the secret.

## Working your leads

Use the `status` column as your pipeline: `New lead` → `Scorecard in progress` → `Scorecard sent` → `Discovery booked` → `Proposal sent` → `Won` / `Lost`. When you move to GoHighLevel, export the sheet as CSV and import it as contacts (keep the `marketingConsent` column so consent carries over).

## If you change the script later

Edit, Save, then **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**. The URL stays the same.
