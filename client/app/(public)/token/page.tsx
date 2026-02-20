"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ named import
interface UserPayload {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decodedUser: UserPayload = jwtDecode(token);

        // ✅ setState asynchronous way
        setTimeout(() => setUser(decodedUser), 0);

        console.log("User Name:", decodedUser.name);
        console.log("User Email:", decodedUser.email);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  if (!user) return <div>Loading user...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}