"use client";
import { LABELS } from "@/utils/constants";
import Sidebar from "./Sidebar";
import ToastContainer from "./ToastContainer";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center my-4">
        <Link href="/">
          <button className="px-3 py-2 rounded-lg bg-gray-700">
            <h1 className="text-xl font-bold">{LABELS.appName}</h1>
          </button>
        </Link>

        <Sidebar />
      </div>

      <ToastContainer />
      {children}
    </div>
  );
}
