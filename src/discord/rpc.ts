import RPC from "discord-rpc";

const clientId = "SEU_CLIENT_ID_DISCORD";
const rpc = new RPC.Client({ transport: "ipc" });

export function startDiscordPresence() {
  rpc.on("ready", () => {
    rpc.setActivity({
      details: "Editando no VS Code",
      state: "Produtividade em alta",
      startTimestamp: new Date(),
      largeImageKey: "vscode",
      largeImageText: "VS Code",
      instance: false
    });
  });

  rpc.login({ clientId }).catch(console.error);
}
