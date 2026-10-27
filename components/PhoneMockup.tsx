"use client";

import { motion } from "framer-motion";
import { Battery, Signal, Wifi } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/types";

export function PhoneMockup({ dict }: { dict: Dictionary["mockup"] }) {
  return (
    <div className="relative mx-auto aspect-[1/2] w-full max-w-[320px] perspective-[1000px]">
      <motion.div
        initial={{ rotateY: 15, rotateX: 5, y: 20, opacity: 0 }}
        animate={{ rotateY: -5, rotateX: 2, y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="preserve-3d relative h-full w-full overflow-hidden rounded-[3rem] border-[8px] border-slate-900 bg-slate-50 shadow-2xl"
        style={{
          boxShadow:
            "-20px 20px 60px rgba(0,0,0,0.15), inset 0 0 20px rgba(0,0,0,0.05)",
        }}
      >
        <div className="absolute inset-x-0 top-0 z-20 flex h-7 justify-center">
          <div className="h-full w-1/3 rounded-b-2xl bg-slate-900"></div>
        </div>

        <div className="absolute inset-x-0 top-0 z-10 flex h-12 items-center justify-between px-6 text-slate-800">
          <span className="text-xs font-medium">9:41</span>
          <div className="flex items-center space-x-1.5">
            <Signal className="h-3.5 w-3.5" />
            <Wifi className="h-3.5 w-3.5" />
            <Battery className="h-4 w-4" />
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col bg-slate-50 px-4 pb-8 pt-16">
          <div className="flex flex-1 flex-col justify-end space-y-4 pb-4">
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="max-w-[80%] self-end rounded-2xl rounded-tr-sm bg-blue-500 px-4 py-2.5 text-white shadow-sm"
            >
              <p className="text-[15px]">{dict.userMessage}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1.2, duration: 1.5, times: [0, 0.2, 1] }}
              className="flex w-16 space-x-1 self-start rounded-2xl rounded-tl-sm bg-slate-200 px-4 py-3 text-slate-500"
            >
              <div
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                style={{ animationDelay: "300ms" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="max-w-[85%] self-start rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3 text-slate-800 shadow-sm"
            >
              <p className="text-[14px] leading-relaxed">{dict.doraMessage}</p>
            </motion.div>
          </div>

          <div className="mt-auto flex h-12 items-center rounded-full border border-slate-200 bg-white px-4">
            <span className="text-sm text-slate-400">
              {dict.inputPlaceholder}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="absolute -inset-4 -z-10 rounded-full bg-primary/10 opacity-50 blur-3xl"></div>
    </div>
  );
}
