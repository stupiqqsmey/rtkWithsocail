import { GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase-config";

export const useLoginWithGithub = () => {
    const [error, setError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [user, setUser] = useState(null);
    const provider = new GithubAuthProvider();

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    const login = async () => {
        setError(null);
        setIsPending(true);

        try {
            const res = await signInWithPopup(auth, provider);
            if (!res) {
                throw new Error("Could not complete signup");
            }

            const user = res.user;
            console.log(user);
            setIsPending(false)
        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsPending(false);
        }
    };

    console.log("env log:", import.meta.env.VITE_BASE_URL);

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            await signOut(auth);
            console.log("User signed out successfully");
            setIsPending(false);
        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsPending(false);
        }
    };

    return { login, logout, error, isPending, user };
};