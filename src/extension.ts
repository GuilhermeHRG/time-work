import * as vscode from "vscode";
import { startTracking, stopTracking } from "./tracker";
import { showDashboard } from "./webview/panel";
import { startDiscordPresence } from "./discord/rpc";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("time-work.openDashboard", () => {
      showDashboard(context);
    }),
    vscode.window.onDidChangeActiveTextEditor(() => startTracking()),
    vscode.workspace.onDidChangeTextDocument(() => startTracking()),
    vscode.window.onDidChangeWindowState(e => {
      if (!e.focused) stopTracking();
    })
  );

  startTracking();
  startDiscordPresence();

  vscode.window.setStatusBarMessage("🧠 Time Tracker ativo");
}

export function deactivate() {
  stopTracking();
}
