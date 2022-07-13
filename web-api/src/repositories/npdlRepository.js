import { write } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {} from "firebase/firestore";

export default class NPDLRepository {
  #db;
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.FIRE_BASE_API,
      authDomain: "na-ponta-da-lingua.firebaseapp.com",
      projectId: "na-ponta-da-lingua",
      storageBucket: "na-ponta-da-lingua.appspot.com",
      messagingSenderId: "298428637844",
      appId: "1:298428637844:web:98ef82a6d447170b2c0a81",
      measurementId: "G-NK442PVLFL",
    };

    this.app = initializeApp(firebaseConfig);
    this.#db = getFirestore(this.app);

    // this.file = file;
  }

  async getUI() {
    const uiCol = collection(this.#db, "ui");
    const uiSnapshot = await getDocs(uiCol);
    const uiList = uiSnapshot.docs.map((ui) => ui.data());

    console.log(uiList);
    return JSON.stringify(uiList);
  }

  //   async #currentFileContent() {
  //     return JSON.parse(await readFile(this.file));
  //   }

  //   find() {
  //     return this.#currentFileContent();
  //   }
  //   async create(data) {
  //     const currentFile = await this.#currentFileContent();
  //     currentFile.push(data);
  //     await writeFile(this.file, JSON.stringify(currentFile));
  //     return data.id;
  //   }
}
