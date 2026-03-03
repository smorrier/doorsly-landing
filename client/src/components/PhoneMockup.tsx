import { motion } from "framer-motion";
import { MessageSquare, Signal, Wifi, Battery } from "lucide-react";

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] aspect-[1/2] perspective-[1000px]">
      <motion.div 
        initial={{ rotateY: 15, rotateX: 5, y: 20, opacity: 0 }}
        animate={{ rotateY: -5, rotateX: 2, y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full h-full rounded-[3rem] border-[8px] border-slate-900 bg-slate-50 shadow-2xl overflow-hidden preserve-3d"
        style={{ 
          boxShadow: '-20px 20px 60px rgba(0,0,0,0.15), inset 0 0 20px rgba(0,0,0,0.05)' 
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
          <div className="w-1/3 h-full bg-slate-900 rounded-b-2xl"></div>
        </div>

        {/* Status Bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-between px-6 z-10 text-slate-800">
          <span className="text-xs font-medium">9:41</span>
          <div className="flex items-center space-x-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="absolute inset-0 pt-16 pb-8 px-4 flex flex-col bg-slate-50">
          <div className="flex-1 flex flex-col justify-end space-y-4 pb-4">
            
            {/* Outgoing Message */}
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="self-end bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm"
            >
              <p className="text-[15px]">DEMO</p>
            </motion.div>

            {/* Typing Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1.2, duration: 1.5, times: [0, 0.2, 1] }}
              className="self-start bg-slate-200 text-slate-500 px-4 py-3 rounded-2xl rounded-tl-sm w-16 flex space-x-1"
            >
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </motion.div>

            {/* Incoming Message */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="self-start bg-white border border-slate-100 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm"
            >
              <p className="text-[14px] leading-relaxed">
                Welcome to Doorsly! 🏡<br/><br/>
                Your instant demo account is ready. I'm Dora, your assistant.<br/><br/>
                Tap the link below to view your sample properties:
              </p>
              <div className="mt-3 bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex items-center space-x-3">
                <div className="bg-blue-500 rounded-lg p-2">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-900">Doorsly Demo</p>
                  <p className="text-[10px] text-blue-600">doorsly.app/demo/1a2b</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Input Area */}
          <div className="h-12 bg-white rounded-full border border-slate-200 flex items-center px-4 mt-auto">
            <span className="text-slate-400 text-sm">Text message</span>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative Blur */}
      <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full opacity-50"></div>
    </div>
  );
}
