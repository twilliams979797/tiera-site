function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const params = e.parameter || {};
  const isPost = e.postData && e.postData.type && e.postData.contents;

  if (isPost) {
    const body = JSON.parse(e.postData.contents || '{}');
    const row = [
      new Date(),
      body.name || '',
      body.email || '',
      body.opportunity || '',
      body.message || '',
      'new'
    ];
    sheet.appendRow(row);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }

  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift().map(h => h.toString().trim());
  const items = rows.map(row => {
    const item = {};
    row.forEach((value, index) => {
      item[headers[index]] = value;
    });
    return item;
  });

  return ContentService
    .createTextOutput(JSON.stringify(items))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}
