# Google Sheets Backend Setup for Tiera Site

This repository currently has:
- `index.html` form submitting to `send/dashboard.html`
- `send/dashboard.html` with local storage fallback
- `send/dashboard.html` supports a shared backend via `SHARED_API_ENDPOINT`

## Goal
Use a Google Sheet as the shared submissions store, backed by Google Apps Script.

## Steps

1. Create a new Google Sheet in your Google account.
   - Add a header row with these columns:
     - `Timestamp`
     - `Name`
     - `Email`
     - `Opportunity`
     - `Message`
     - `Status`

2. Open Apps Script in the sheet:
   - `Extensions` → `Apps Script`

3. Replace the default script with the Apps Script code from `send/google-sheets-apps-script.gs`.

If you prefer, copy the code directly from the file in this repository into the Apps Script editor.

4. Deploy the Apps Script web app:
   - Click `Deploy` → `New deployment`
   - Select `Web app`
   - Set `Execute as` to `Me`
   - Set `Who has access` to `Anyone`
   - Copy the deployed URL.

5. Update `send/dashboard.html`:
   - Set `SHARED_API_ENDPOINT` to the Apps Script URL, for example:
     ```js
     const SHARED_API_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec';
     ```

6. Test the flow:
   - Open `https://twilliams979797.github.io/tiera-site/`
   - Submit the contact form
   - Open `https://twilliams979797.github.io/tiera-site/send/dashboard.html`
   - It should post the new submission to Google Sheets and then display submissions from that sheet.

## Notes
- If `SHARED_API_ENDPOINT` is empty, `send/dashboard.html` will continue to use browser local storage.
- The Apps Script endpoint must allow CORS; the sample script includes `Access-Control-Allow-Origin: *`.
- The dashboard currently uses a preforked `status` logic (`new`, `review`, `replied`, `pass`). You can edit the sheet values if needed.

## Optional improvement
If you want a more robust server-side solution, the same approach can be upgraded to a true backend service with authentication and better submission management.
