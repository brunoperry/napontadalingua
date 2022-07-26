import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

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
  }

  async getData(from) {
    const col = collection(this.#db, from);
    const colSnapshot = await getDocs(col);
    const data = colSnapshot.docs.map((res) => res.data());
    return data;
  }

  // async getUI() {
  //   const uiCol = collection(this.#db, "ui");
  //   const uiSnapshot = await getDocs(uiCol);
  //   const uiList = uiSnapshot.docs.map((ui) => ui.data());

  //   return JSON.stringify(uiList);
  // }
  // async getServices() {
  //   const uiCol = collection(this.#db, "ui");
  //   const uiSnapshot = await getDocs(uiCol);
  //   const uiList = uiSnapshot.docs.map((ui) => ui.data());

  //   return JSON.stringify(uiList);
  // }

  async getImages() {
    const storage = getStorage();
    const listRef = ref(storage, "media");
    let out = [];
    try {
      const res = await listAll(listRef);
      for (let i = 0; i < res.items.length; i++) {
        const item = res.items[i]._location.path;
        const url = await getDownloadURL(ref(storage, item));
        out.push({
          name: item,
          url: url,
        });
      }
    } catch (error) {
      out.push({
        error: error,
      });
    }
    return out;
  }
}
