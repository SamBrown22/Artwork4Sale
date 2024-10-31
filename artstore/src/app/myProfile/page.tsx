"use client"

import React from "react"
import { useSession } from "next-auth/react"

function ProfilePage() {
  const { data: session} = useSession()

  if (session) {
    return (
      <div className="profile-page p-6">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name || "User"}!</h1>
        <p className="text-lg mt-4">This is your profile page.</p>
        <p className="text-sm mt-2">Email: {session.user?.email || "No email available"}</p>
      </div>
    )
  }
}

export default ProfilePage
