# How to Save Web Form Data to Google Sheets (Free & Unlimited)

Follow these steps to generate a link that allows your website to save data directly to your Google Sheet.

### Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Name it "Vinnar Enquiries".
3. In the first row (Row 1), add these **exact headers** in the columns:
   - **Column A:** Timestamp
   - **Column B:** Name
   - **Column C:** Contact
   - **Column D:** Course
   - **Column E:** Status
   - **Column F:** Location
   - **Column G:** Date_of_Birth
   - **Column H:** Father_Name
   - **Column I:** Mother_Name
   - **Column J:** Occupation
   - **Column K:** Income
   - **Column L:** Education
   - **Column M:** Last_Inst
   - **Column N:** Parent_Phone
   - **Column O:** Referral
   - **Column P:** Ref_Detail
   - **Column Q:** Message

### Step 2: Add the Code
1. In your Google Sheet, click **Extensions** (top menu) > **Apps Script**.
2. A new tab will open with code. Delete everything there and paste the following code:

```javascript
const SHEET_NAME = "Sheet1"; // Verify this matches your tab name at the bottom

const doGet = (e) => {
  return HtmlService.createHtmlOutput("Get request received. Use POST to send data.");
};

const doPost = (e) => {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    
    // Get headers to map data correctly
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;
    const newRow = headers.map(header => {
      // Automatic Timestamp for the first column
      if (header === 'Timestamp') return new Date();
      // Map other fields based on JSON data keys
      return data[header] || data[header.toLowerCase()] || data[header.replace(/_/g, "")] || "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
};
```

3. Click the **Save** icon (diskette) or press `Ctrl + S`. Name the project "VinnarFormHandler".

### Step 3: Publish & Get URL
1. Click the blue **Deploy** button (top right) > **New deployment**.
2. Click the **Select type** (gear icon) > **Web app**.
3. Fill in these details:
   - **Description:** Vinnar Form
   - **Execute as:** Me (your email)
   - **Who has access:** **Anyone** (This is CRITICAL)
4. Click **Deploy**.
5. You might be asked to "Authorize access". Click **Review permissions**, choose your account, click **Advanced** > **Go to VinnarFormHandler (unsafe)** (it is safe, it's your own code) > **Allow**.
6. **Copy the "Web app URL"**. It looks like `https://script.google.com/macros/s/.../exec`.

### Step 4: Add to Website
1. Go to your `script.js` file.
2. Find the variable `const GOOGLE_SCRIPT_URL` at the top of the form handler.
3. Paste your copied URL inside the quotes.
