# Analytics System - Installation & Setup

## Required Dependencies

The analytics system requires the `xlsx` library for Excel/CSV export functionality.

### Installation

Run the following command in your project root:

```bash
npm install xlsx
```

### Package Version

```json
"xlsx": "^0.18.5"
```

## Verification

After installation, verify the package is installed:

```bash
npm list xlsx
```

## Usage

The ExportService uses xlsx for:
- Excel (.xlsx) file generation
- CSV export
- Data formatting
- Column filtering

## Alternative

If you prefer not to use xlsx, you can implement export using:
- Browser's Blob API for CSV (no library needed)
- Server-side export endpoints
- Other export libraries (e.g., exceljs)

## Note

The current implementation in `ExportService.js` requires xlsx. If the package is not installed, exports will fail with an error.
