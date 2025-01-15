import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.init";
// import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    // const axiosPublic = useAxiosPublic();

    const createNewUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            unsubscribe();
        }
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        createNewUser,
        login,
        logout,
        updateUser,
        googleSignIn

    }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         if (currentUser) {
    //             const userInfo = { email: currentUser.email }
    //             axiosPublic.post('/jwt', userInfo)
    //                 .then(res => {
    //                     if (res.data.token) {
    //                         localStorage.setItem('access-token', res.data.token);
    //                     }
    //                 })
    //             setLoading(false);
    //         }
    //         else {
    //             localStorage.removeItem('access-token');
    //             setLoading(false);
    //         }
    //         console.log(currentUser);
    //     });
    //     return () => {
    //         return unsubscribe();
    //     }
    // }, [axiosPublic])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;