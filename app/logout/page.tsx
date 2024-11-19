"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteSession } from "@/lib/session";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    deleteSession();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-lg font-medium">Logging you out...</h1>
    </div>
  );
};

export default Logout;
