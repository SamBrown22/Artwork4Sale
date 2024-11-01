"use client"

import React from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  menuItems: JSX.Element[]
}

function Sidebar({ isOpen, onClose, menuItems }: SidebarProps) {
  const { data: session } = useSession()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-80"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-base-200 p-6 shadow-lg transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-ghost absolute left-4 top-4 rounded-lg"
          aria-label="Close sidebar"
        >
          ✕
        </button>

        <div className="mb-4 mt-8 flex flex-col items-center">
          {/* Profile Picture Section */}
          {session && session.user?.image && (
            <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-full">
              <Image
                src={session.user.image}
                alt="Profile"
                layout="fill" // This will make the image fill its parent container
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* User Name (optional) */}
          {session && session.user?.name && (
            <h3 className="text-xl font-medium uppercase underline">
              {session.user.name}
            </h3>
          )}
        </div>

        <ul className="menu space-y-2">{menuItems}</ul>
      </div>
    </>
  )
}

export default Sidebar
