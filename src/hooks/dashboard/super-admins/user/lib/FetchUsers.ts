import { useState, useEffect } from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { Role } from "@/utils/context/interface/Auth";

import { UserAccount } from "@/hooks/dashboard/super-admins/user/types/users";

export const useUsers = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string
    );
    const q = query(usersRef, where("role", "==", Role.USER));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const userData: UserAccount[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as UserAccount;
          userData.push(data);
        });

        // Sort users by createdAt in descending order (newest first)
        const sortedUsers = userData.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;

          const timeA =
            a.createdAt instanceof Timestamp
              ? a.createdAt.toDate().getTime()
              : new Date(a.createdAt).getTime();

          const timeB =
            b.createdAt instanceof Timestamp
              ? b.createdAt.toDate().getTime()
              : new Date(b.createdAt).getTime();

          return timeB - timeA;
        });

        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { users, setUsers, loading };
};
