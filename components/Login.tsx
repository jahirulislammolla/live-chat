'use client';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useState, useEffect } from "react";
import Image from "next/image";

const Login = ({ setUser }: { setUser: (user: any) => void }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setUser(user);
    });
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="text-center p-4">
      {currentUser ? (
        <div className="text-center flex flex-col items-center mx-auto my-auto bg-gray-100 p-4 rounded-lg shadow-lg px-12 py-20">
            <div>
                <Image src="/chat-svgrepo-com.svg" width={100} height={100} alt="user" className="h-20 w-20 rounded-full" />
            </div>
            <h1 className="text-2xl text-sky-500 py-4 px-2">Welcome, {currentUser.displayName}</h1>
            <button className="bg-red-500 text-white p-2 rounded" onClick={handleLogout}>
                Logout
            </button>
        </div>
      ) : (
        <div className="text-center flex flex-col items-center mx-auto my-auto bg-gray-100 p-4 rounded-lg shadow-lg px-20 py-24">
            <Image src="/chat-svgrepo-com.svg" alt="chat" width={100} height={100} />
            <h1 className="text-3xl text-indigo-500 py-10 text-center">Live Chat</h1>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>
                Login with Google
            </button>
        </div>
      )}
    </div>
  );
};

export default Login;
