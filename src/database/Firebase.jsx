import { doc, getDoc } from "firebase/firestore";
import { db } from "../../database_edit/config/Firebase.jsx";

export async function getDocFromFirestore(collection, id) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("Documento não encontrado!");
    return null;
  }
}

export default getDocFromFirestore;
