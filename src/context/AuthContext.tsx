import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, provider } from "../firebase";

import { useNavigate } from "react-router-dom";

type AuthContextType = {
    user: User | null
};

const AuthContext = createContext<AuthContextType>({
    user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                navigate("/");
            }
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function login() {
  signInWithPopup(auth, provider);
}

export async function logout() {
  await signOut(auth);
}

export function useAuth() {
    return useContext(AuthContext);
}
