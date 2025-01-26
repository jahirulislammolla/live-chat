'use client';
import { useState } from "react";
import Login from "../components/Login";
import Chat from "../components/Chat";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-custom-image bg-cover">
      <Login setUser={setUser} />
      {user && <Chat user={user} />}
    </div>
  );
}
