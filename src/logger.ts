import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '..', 'time-log.json');

export function logActivity(duration: number) {
  const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];
  existing.push({
    timestamp: new Date().toISOString(),
    duration,
  });
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
}
