import { FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase-config";

export const useLoginWithFacebook = () => {
    const [error, setError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [user, setUser] = useState(null);
    const provider = new FacebookAuthProvider();

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const facebookLogin = async () => {
        setError(null);
        setIsPending(true);

        try {
            const res = await signInWithPopup(auth, provider);
            if (!res) {
                throw new Error("Could not complete signup");
            }

            const user = res.user;
            console.log("info user with facebook: ", user);
            // implment with api
            setIsPending(false)
        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsPending(false);
        }
    };

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            await signOut(auth);
            console.log("User signed out successfully");
            setIsPending(false);
        } catch (error) {7
            console.log(error);
            setError(error.message);
            setIsPending(false);
        }
    };

    return { facebookLogin, logout, error, isPending, user };
};