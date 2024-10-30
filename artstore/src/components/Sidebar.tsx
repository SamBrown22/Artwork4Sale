"use client";

import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: JSX.Element[];
}

function Sidebar({ isOpen, onClose, menuItems }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-base-200 p-6 shadow-lg z-50 transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost rounded-lg"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <ul className="menu space-y-2">{menuItems}</ul>
      </div>
    </>
  );
}

export default Sidebar;