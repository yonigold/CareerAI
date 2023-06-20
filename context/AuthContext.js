import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { db } from '../firebase/config';
import { doc, setDoc, getFirestore, getDoc, serverTimestamp } from "firebase/firestore";


export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const signup = async (email, password) => {
        try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const user = credential.user;
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            hasPaid: false,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
        throw error;
    }

};

    const login = async (email, password) => {
        try {
           return await signInWithEmailAndPassword(auth, email, password); 
        } catch (error) {
            console.error(error);
            throw error;
        } 
    };

    const logout = () => {
        return signOut(auth);
    };
    
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if(user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    user.hasPaid = userData.hasPaid;
                } else {
                    console.log('No such document!');
                    await setDoc(doc(db, 'users', user.uid), {
                        email: user.email,
                        hasPaid: false,
                        createdAt: serverTimestamp()
                    });
                }
            } 
            setCurrentUser(user);
            setLoading(false);
        });

        // Unsubscribe to the listener when unmounting
        return () => unsubscribe();
    }, []);

    const refreshUser = async () => {
        const user = auth.currentUser;
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if(userDocSnap.exists()) {
            const userData = userDocSnap.data();
            user.hasPaid = userData.hasPaid;
        } else {
            console.log('No such document!');
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                hasPaid: false,
                createdAt: serverTimestamp()
            });
        }
        setCurrentUser(user);
    }



    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        loading,
        refreshUser
        
    };
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}