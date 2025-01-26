'use client';
import React, { useState, useEffect, ChangeEvent } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  timestamp: any;
  senderId: string;
  senderName: string;
  senderImage: string;
}

const Chat: React.FC<{ user: any }> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
    });

    return () => unsubscribe();
  }, [user]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      timestamp: new Date(),
      senderId: user.uid,
      senderName: user.displayName,
      senderImage: user.photoURL,
    });

    setNewMessage("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-indigo-500 text-white">
      {!user ? (
        <p className="text-center">Please login to chat.</p>
      ) : (
        <>
          <div className="h-64 overflow-y-auto mb-2 space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-center space-x-2 p-2 rounded ${msg.senderId === user.uid ? "bg-green-500" : "bg-indigo-600"}`}>
                <Image 
                  src={msg.senderImage || "https://i.pravatar.cc/40"} 
                  alt="User Avatar" 
                  width={30} 
                  height={30} 
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-bold">{msg.senderName}</p>
                  <p className="bg-white text-black p-2 rounded">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              className="border p-2 flex-grow rounded-l text-black"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-white text-indigo-500 p-2 rounded-r">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
