"use client";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FlashCards } from "../types/Home";

export const saveDB = async (flashCards: FlashCards) => {
  if (!flashCards) {
    console.error("Nenhum dado encontrado.");
    return;
  }

  try {
    // Defina um ID fixo para sempre sobrescrever o mesmo documento
    const docRef = doc(db, "flashCards", "GxZad4wKjg8F1JShuovz");

    await setDoc(docRef, { cards: flashCards });

    //   const docRef = await addDoc(collection(db, "flashCards"), {
    //   cards: flashCards,
    // });

    console.log("Documento sobrescrito com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar no Firestore:", error);
  }
};
