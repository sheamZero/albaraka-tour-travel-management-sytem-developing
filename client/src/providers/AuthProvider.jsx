import { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile, } from "firebase/auth";
import { AuthContext } from "../context/authContext";

const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
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

    const signInWithGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }


const signOutUser=()=>{
    signOut(auth);
}


    const auth_info = {
        user,
        setUser,
        isLoading,
        signUpWithEmailPass,
        updateUserProfile,
        signOutUser,
        signInWithGoogle
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
            console.log("User -->>", currentUser);

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