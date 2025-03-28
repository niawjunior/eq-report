"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-150px)] bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-6">
      <motion.div
        className="max-w-2xl text-center space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src="/icon.png"
          alt="Earthquake Icon"
          className="mx-auto w-24 h-24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
        />

        <motion.h1
          className="text-4xl md:text-4xl font-extrabold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Earthquake Damage Report Platform
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Report earthquake damage in your area to help responders act quickly
          and save lives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/report"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition"
            >
              Report Damage
            </Link>
            <Link
              href="/reports"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition text-center"
            >
              See People Who Need Help
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
