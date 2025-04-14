import * as vscode from "vscode";
import { saveSession } from "./backend/sync";
import { signInWithGoogle } from "./backend/firebase";

let activeStart: number | null = null;
let interval: NodeJS.Timeout | null = null;
let userId: string | null = null;
let statusBarItem: vscode.StatusBarItem;

export async function startTracking() {
  if (!activeStart) {
    activeStart = Date.now();
    setupStatusBar();
  }

  if (!userId) {
    const user = await signInWithGoogle();
    userId = user?.uid || null;
  }
}

export function stopTracking() {
  if (activeStart && userId) {
    const duration = Date.now() - activeStart;
    saveSession(userId, duration);
    activeStart = null;
  }

  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  if (statusBarItem) {
    statusBarItem.text = `🧠 Time Tracker: inativo`;
  }
}

function setupStatusBar() {
  if (!statusBarItem) {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = "time-work.openDashboard";
    statusBarItem.tooltip = "Clique para abrir o Painel de Produtividade";
    statusBarItem.show();
  }

  updateStatusBarLive();
}

function updateStatusBarLive() {
  interval = setInterval(() => {
    if (!activeStart) return;

    const elapsed = Date.now() - activeStart;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    statusBarItem.text = `🧠 Time Tracker: ${minutes}m ${seconds}s`;
  }, 1000);
}
