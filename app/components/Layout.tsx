"use client";
import { useState, useEffect } from "react";
import { LABELS } from "@/utils/constants";
import Sidebar from "./Sidebar";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <Link href="/">
          <button className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            <h1 className="text-xl font-bold">{LABELS.appName}</h1>
          </button>
        </Link>

        <Sidebar dark={dark} onToggleDark={() => setDark(!dark)} />
      </div>

      {children}
    </div>
  );
}
