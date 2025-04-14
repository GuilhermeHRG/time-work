import * as vscode from "vscode";
import { db } from "../backend/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

export async function showDashboard(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "timeTracker",
    "Painel de Produtividade",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.html = await getHtml(context);

  panel.webview.onDidReceiveMessage(async (message) => {
    if (message.command === "fetchSessions") {
      try {
        const q = query(collection(db, "sessions"), orderBy("timestamp", "desc"), limit(7));
        const snapshot = await getDocs(q);

        const sessions = snapshot.docs.map((doc, i) => ({
          label: `Sessão ${i + 1}`,
          value: Math.round((doc.data().duration ?? 0) / 60000)
        }));

        panel.webview.postMessage({
          labels: sessions.map(s => s.label),
          values: sessions.map(s => s.value)
        });
      } catch (err) {
        console.error("Erro ao buscar sessões:", err);
      }
    }
  });
}

async function getHtml(context: vscode.ExtensionContext): Promise<string> {
  const uri = vscode.Uri.joinPath(context.extensionUri, "src", "webview", "ui.html");
  const bytes = await vscode.workspace.fs.readFile(uri);
  return Buffer.from(bytes).toString("utf-8");
}
