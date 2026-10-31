/**
 * Novus Core Holdings: scorecard leads -> Google Sheet + email notification.
 * Paste into Extensions > Apps Script of your "Scorecard Leads" Google Sheet.
 * Setup steps: docs/GOOGLE_SHEETS.md
 */

// 1. Change this to a long random phrase. Use the SAME value for SHEETS_WEBHOOK_SECRET in Vercel.
const SECRET = 'CHANGE-ME-to-a-long-random-phrase';
// 2. Where new-lead alerts go.
const NOTIFY_EMAIL = 'gorybedward@gmail.com';

const COLUMNS = [
  'submittedAt', 'businessName', 'contactName', 'email', 'phone', 'website', 'industry', 'city',
  'interest', 'marketingConsent', 'tags', 'pageUrl', 'referrer', 'utm', 'ip', 'status',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return json({ ok: false, error: 'unauthorized' });

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);

    data.status = 'New lead';
    data.marketingConsent = data.marketingConsent ? 'YES' : 'NO';
    // Prefix with ' so Sheets never treats a value as a formula.
    sheet.appendRow(COLUMNS.map((c) => {
      const v = data[c] === undefined || data[c] === null ? '' : String(data[c]);
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    }));

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New scorecard request: ' + data.businessName + ' (' + data.industry + ', ' + data.city + ')',
      body: [
        'New Free Growth Scorecard request',
        '',
        'Business: ' + data.businessName,
        'Contact: ' + data.contactName,
        'Email: ' + data.email,
        'Phone: ' + data.phone,
        'Website: ' + (data.website || 'not provided'),
        'Industry: ' + data.industry,
        'City: ' + data.city,
        'Package interest: ' + (data.interest || 'none'),
        'Marketing consent: ' + data.marketingConsent,
        '',
        'Sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      ].join('\n'),
      replyTo: data.email,
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
