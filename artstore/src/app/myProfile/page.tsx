"use client"

import React from "react"
import { useSession } from "next-auth/react"

function ProfilePage() {
  const { data: session, status } = useSession()

  // Show a loading state while the session status is loading
  if (status === "loading") {
    return <p>Loading...</p>
  }

  // Render profile content only if user is authenticated
  if (status === "authenticated") {
    return (
      <div className="profile-page p-6">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name || "User"}!</h1>
        <p className="text-lg mt-4">This is your profile page.</p>
        <p className="text-sm mt-2">Email: {session.user?.email || "No email available"}</p>
      </div>
    )
  }

  // If the user is unauthenticated, NextAuth will automatically redirect them to the sign-in page
  return null
}

export default ProfilePage
