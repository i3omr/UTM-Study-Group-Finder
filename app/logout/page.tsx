"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      // Call the API route to clear the cookie
      await fetch("/api/logout", { method: "GET" });

      // Clear client-side storage
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login page
      router.push("/auth/login");
    };

    logout();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-lg font-medium">Logging you out...</h1>
    </div>
  );
};

export default Logout;
