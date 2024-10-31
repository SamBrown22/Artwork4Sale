"use client";

import React from "react";
import { useSession } from "next-auth/react";
import ProfilePicture from "@/components/ProfilePicture";

function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-300 rounded-lg shadow-md">
      <div className="flex">
        <ProfilePicture />
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">{session.user?.name || "User"}</h1>
          <p className="text-lg mt-1">This is your profile page.</p>
          <p className="text-sm mt-2">Email: {session.user?.email || "No email available"}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
