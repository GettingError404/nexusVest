import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

// Types
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  walletAddress: string;
  createdAt: any;
}

export interface Investment {
  uid: string;
  walletAddress: string;
  amount: number;
  allocationType: string;
  txHash: string;
  status: "pending" | "confirmed";
  createdAt: any;
}

export const saveUserProfile = async (user: Partial<UserProfile>) => {
  if (!user.uid) return;
  await setDoc(doc(db, "users", user.uid), user, { merge: true });
};

export const checkIfVoted = async (uid: string, proposalId: number) => {
  const q = query(
    collection(db, "votes"),
    where("uid", "==", uid),
    where("proposalId", "==", proposalId),
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

export const recordInvestment = async (investment: Investment) => {
  await addDoc(collection(db, "investments"), {
    ...investment,
    createdAt: serverTimestamp(),
  });
};

export const recordVote = async (data: any) => {
  await addDoc(collection(db, "votes"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const saveSuggestion = async (email: string, suggestion: string) => {
  await addDoc(collection(db, "indexSuggestions"), {
    email,
    suggestion,
    createdAt: serverTimestamp(),
  });
};

export const registerInterest = async (milestone: string) => {
  // In a real app we'd get the user email, here we simulate tracking interest
  console.log("Registered interest for:", milestone);
};
