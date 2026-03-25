// ═══════════════════════════════════════════════════════
// VOLVARA OPS — Google Apps Script
// Deploy como: Web App → Execute as: Me → Who has access: Anyone
// ═══════════════════════════════════════════════════════

const SHEET_ID = '1ibR2Ec6fNvwUNI-Gmvh-w1qLgznqIui_9_GVoRUPf70';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const { action, sheet, rows } = payload;

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const tab = ss.getSheetByName(sheet);
    if (!tab) throw new Error('Aba não encontrada: ' + sheet);

    if (action === 'write') {
      // Limpa dados (mantém cabeçalho linha 1)
      const lastRow = tab.getLastRow();
      if (lastRow > 1) {
        tab.getRange(2, 1, lastRow - 1, tab.getLastColumn()).clearContent();
      }
      // Escreve novas linhas
      if (rows && rows.length > 0) {
        tab.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Health check
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'Volvara Ops Script activo' }))
    .setMimeType(ContentService.MimeType.JSON);
}
