// Export Service - Handles data export to Excel, CSV, and PDF formats
import * as XLSX from 'xlsx';

export class ExportService {
  /**
   * Export data to Excel format
   * @param {Array} data - Array of objects to export
   * @param {String} filename - Name of the file (without extension)
   * @param {Object} options - Additional options (sheetName, columns, etc.)
   */
  static toExcel(data, filename = 'export', options = {}) {
    try {
      const {
        sheetName = 'Sheet1',
        columns = null,
        includeTimestamp = true,
      } = options;

      // Filter columns if specified
      let exportData = data;
      if (columns && Array.isArray(columns)) {
        exportData = data.map(row => {
          const filteredRow = {};
          columns.forEach(col => {
            if (row.hasOwnProperty(col.key)) {
              filteredRow[col.label || col.key] = row[col.key];
            }
          });
          return filteredRow;
        });
      }

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      // Generate filename with timestamp
      const finalFilename = includeTimestamp
        ? `${filename}_${this.getTimestamp()}.xlsx`
        : `${filename}.xlsx`;

      // Trigger download
      XLSX.writeFile(workbook, finalFilename);

      return { success: true, filename: finalFilename };
    } catch (error) {
      console.error('Excel export error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Export data to CSV format
   * @param {Array} data - Array of objects to export
   * @param {String} filename - Name of the file (without extension)
   * @param {Object} options - Additional options
   */
  static toCSV(data, filename = 'export', options = {}) {
    try {
      const {
        columns = null,
        delimiter = ',',
        includeTimestamp = true,
      } = options;

      // Filter columns if specified
      let exportData = data;
      if (columns && Array.isArray(columns)) {
        exportData = data.map(row => {
          const filteredRow = {};
          columns.forEach(col => {
            if (row.hasOwnProperty(col.key)) {
              filteredRow[col.label || col.key] = row[col.key];
            }
          });
          return filteredRow;
        });
      }

      // Create worksheet and convert to CSV
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(worksheet, { FS: delimiter });

      // Create blob and download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const finalFilename = includeTimestamp
        ? `${filename}_${this.getTimestamp()}.csv`
        : `${filename}.csv`;

      this.downloadBlob(blob, finalFilename);

      return { success: true, filename: finalFilename };
    } catch (error) {
      console.error('CSV export error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Export data to PDF format
   * @param {Array} data - Array of objects to export
   * @param {String} filename - Name of the file (without extension)
   * @param {Object} options - Additional options
   */
  static async toPDF(data, filename = 'export', options = {}) {
    try {
      // Note: This is a placeholder for PDF generation
      // You would need to implement this with a library like jsPDF or html2pdf
      console.warn('PDF export not yet implemented');
      
      return { 
        success: false, 
        error: 'PDF export requires additional library (jsPDF)' 
      };
    } catch (error) {
      console.error('PDF export error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Generate timestamp string
   * @returns {String} Timestamp in format YYYYMMDD_HHMMSS
   */
  static getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  /**
   * Download blob as file
   * @param {Blob} blob - Blob to download
   * @param {String} filename - Filename
   */
  static downloadBlob(blob, filename) {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  /**
   * Format data for export
   * @param {Array} data - Raw data
   * @param {Array} columns - Column definitions
   * @returns {Array} Formatted data
   */
  static formatDataForExport(data, columns) {
    return data.map(row => {
      const formattedRow = {};
      columns.forEach(col => {
        const value = row[col.key];
        formattedRow[col.label || col.key] = col.exportFormatter 
          ? col.exportFormatter(value, row)
          : value;
      });
      return formattedRow;
    });
  }
}

export default ExportService;
