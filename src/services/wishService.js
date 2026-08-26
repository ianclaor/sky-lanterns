import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const wishesCollection = collection(db, "wishes");

export const saveSubmission = async (wish) => {
  await addDoc(wishesCollection, {
    name: wish.name,
    message: wish.message,
    approved: false,
    createdAt: Date.now(),
  });
};

export const getSubmissions = async () => {
  const snapshot = await getDocs(wishesCollection);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const getApproved = async () => {
  const snapshot = await getDocs(wishesCollection);

  return snapshot.docs
    .map((d) => ({
      id: d.id,
      ...d.data(),
    }))
    .filter((x) => x.approved);
};

export const approveWish = async (id, value) => {
  const ref = doc(db, "wishes", id);

  await updateDoc(ref, {
    approved: value,
  });
};

export const deleteWish = async (id) => {
  await deleteDoc(doc(db, "wishes", id));
};