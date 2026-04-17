import { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from "firebase/auth";
import { AuthContext } from "../context/authContext";
import axios from 'axios';

const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    // sign up user
    const signUpWithEmailPass = (email, pass) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    const updateUserProfile = (name, imageUrl) => {
        setIsLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imageUrl,
        });
    };

    const signInWithEmailPass = (email, pass) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    }

    const signInWithGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }

    const signOutUser = async () => {
        setIsLoading(true);
        localStorage.removeItem("access-token");

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
            withCredentials: true,
        });
        console.log("logout", response);

        signOut(auth);
    };


    const auth_info = {
        user,
        setUser,
        isLoading,
        signUpWithEmailPass,
        updateUserProfile,
        signOutUser,
        signInWithGoogle,
        signInWithEmailPass
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
            console.log("User -->>", currentUser);

            // if (currentUser?.email) {
            //     const token_user = {
            //         email: currentUser?.email
            //     }
            //     // generate token
            //     axios.post(`${import.meta.env.VITE_API_BASE_URL}/generate-token`, token_user, {
            //         withCredentials: true
            //     })
            //         .then(res => {
            //             if (res.data?.token) {
            //                 localStorage.setItem("access-token", res.data.token);
            //             }
            //             else {
            //                 localStorage.removeItem("access-token");
            //                 const response =  axios.get(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
            //                     withCredentials: true,
            //                 });
            //                 console.log("logout", response);
            //             }
            //         })
            //         .catch(err => {
            //             console.log(err)
            //         })
            // }

        })
        return () => unSubscribe();
    }, [])

    return (
        <AuthContext.Provider value={auth_info}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider