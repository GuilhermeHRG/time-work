import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export async function saveSession(userId: string, duration: number) {
  try {
    await addDoc(collection(db, "sessions"), {
      userId,
      duration,
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    console.error("Erro ao salvar sessão:", e);
  }
}
