'use client';

import { useState, useRef, useCallback } from 'react';

interface CSVRow {
  code: string;
  name: string;
  location: string;
  duration_days: number;
  base_price: number;
  max_capacity: number;
  difficulty: string;
  status: string;
  _valid: boolean;
  _errors: string[];
}

// Client-side CSV parser — zero latency, zero server cost
function parseCSV(text: string): CSVRow[] {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/ /g, '_'));
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const row: any = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ''; });

    const errors: string[] = [];
    if (!row.name) errors.push('name required');
    if (!row.location) errors.push('location required');
    if (isNaN(Number(row.base_price)) || Number(row.base_price) <= 0) errors.push('base_price must be > 0');
    if (isNaN(Number(row.duration_days)) || Number(row.duration_days) <= 0) errors.push('duration_days must be > 0');
    
    return {
      code: row.code || 'AUTO',
      name: row.name,
      location: row.location,
      duration_days: parseInt(row.duration_days),
      base_price: parseInt(row.base_price),
      max_capacity: parseInt(row.max_capacity) || 12,
      difficulty: row.difficulty || 'Moderate',
      status: row.status || 'draft',
      _valid: errors.length === 0,
      _errors: errors,
    };
  });
}

export default function BulkTourImport() {
  const [rows, setRows] = useState<CSVRow[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ ok: number; failed: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      alert('Please upload a valid .csv file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setRows(parsed);
      setImportResult(null);
    };
    reader.readAsText(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleImport = async () => {
    const validRows = rows.filter(r => r._valid);
    if (validRows.length === 0) return;
    
    setIsImporting(true);
    
    // In production: Call API with db.batch() to insert all rows in one D1 transaction
    // const res = await fetch('/api/tours/bulk-import', { method: 'POST', body: JSON.stringify(validRows) });
    
    // Mock 1.5s import delay
    await new Promise(r => setTimeout(r, 1500));
    
    const failed = rows.filter(r => !r._valid).length;
    setImportResult({ ok: validRows.length, failed });
    setIsImporting(false);
  };

  const validCount = rows.filter(r => r._valid).length;
  const invalidCount = rows.filter(r => !r._valid).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Bulk Tour Import</h1>
        <p className="text-slate-500 text-sm mt-1">Upload a CSV file to batch-create tours. Parsed entirely in the browser — no server roundtrip until you confirm.</p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-brand-primary bg-brand-primary/5 scale-[1.01]' : 'border-slate-300 dark:border-slate-600 hover:border-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
      >
        <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${isDragging ? 'bg-brand-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-lg mb-2">
          {isDragging ? 'Drop your CSV here...' : 'Drag & Drop CSV or Click to Browse'}
        </h3>
        <p className="text-slate-400 text-sm text-center max-w-sm">
          Required columns: <code className="font-mono bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-brand-primary">name, location, base_price, duration_days</code>
        </p>

        {/* Template Download */}
        <button
          className="mt-6 text-sm font-bold text-brand-primary hover:underline flex items-center gap-1.5"
          onClick={e => {
            e.stopPropagation();
            const template = 'code,name,location,duration_days,base_price,max_capacity,difficulty,status\nAUTO,Midnight Bromo Sunrise,East Java,2,350000,12,Moderate,draft';
            const blob = new Blob([template], { type: 'text/csv' });
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'tour_import_template.csv'; a.click();
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download Template CSV
        </button>
      </div>

      {/* Preview Table */}
      {rows.length > 0 && (
        <div>
          {/* Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                {validCount} Valid
              </span>
              {invalidCount > 0 && (
                <span className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  {invalidCount} Invalid (will be skipped)
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => { setRows([]); setImportResult(null); }} className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                Clear
              </button>
              <button
                onClick={handleImport}
                disabled={isImporting || validCount === 0}
                className="px-6 py-2 bg-brand-primary text-white text-sm font-bold rounded-xl shadow-md shadow-brand-primary/20 hover:bg-brand-primary-dark transition-all disabled:opacity-60 disabled:cursor-wait flex items-center gap-2"
              >
                {isImporting ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Importing...</>
                ) : (
                  <>Import {validCount} Tour{validCount !== 1 ? 's' : ''}</>
                )}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-auto shadow-sm">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
                <tr>
                  {['', 'Code', 'Name', 'Location', 'Duration', 'Base Price', 'Capacity', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {rows.map((row, i) => (
                  <tr key={i} className={`${row._valid ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50' : 'bg-red-50/50 dark:bg-red-900/10'} transition-colors`}>
                    <td className="px-4 py-3">
                      {row._valid 
                        ? <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center"><svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                        : <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center" title={row._errors.join(', ')}><svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
                      }
                    </td>
                    <td className="px-4 py-3 font-mono text-brand-primary font-bold">{row.code}</td>
                    <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-100 max-w-[200px] truncate">{row.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.location}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.duration_days}D</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-700 dark:text-slate-200">
                      {row.base_price ? `Rp ${Number(row.base_price).toLocaleString('id-ID')}` : <span className="text-red-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.max_capacity}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${row.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Import Result Banner */}
      {importResult && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center gap-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <h3 className="font-bold text-emerald-800">Import Complete</h3>
            <p className="text-emerald-700 text-sm mt-1">
              <b>{importResult.ok} tours</b> were successfully created via D1 <code className="bg-white px-1 rounded font-mono">db.batch()</code>.
              {importResult.failed > 0 && <> <b className="text-red-600">{importResult.failed} rows</b> were skipped due to validation errors.</>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
