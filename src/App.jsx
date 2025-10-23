import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Menu, X, Home, Clock, Settings, Share2, User, Zap } from "lucide-react";

export default function ChatAssistantPreview() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), sender: "user", text: input };
    setMessages([...messages, newMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "assistant", text: "That's an interesting question. Let me help with that..." },
      ]);
    }, 1000);
  };

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-[#0b1b26] via-[#1e1a2a] to-[#062019] text-white relative overflow-hidden">
      {/* Animated Aurora Background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "linear-gradient(120deg, rgba(0,255,170,0.25), rgba(255,0,255,0.2), rgba(0,128,255,0.25))",
            "linear-gradient(180deg, rgba(255,0,150,0.25), rgba(0,255,255,0.2), rgba(0,255,170,0.25))",
            "linear-gradient(240deg, rgba(0,128,255,0.25), rgba(255,0,255,0.2), rgba(0,255,150,0.25))",
          ],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ filter: "blur(45px)" }}
      />

      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarOpen ? 240 : 60 }}
        transition={{ duration: 0.3 }}
        className="bg-black/30 border-r border-white/10 backdrop-blur-md p-4 flex flex-col justify-between relative z-20"
      >
        <div>
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && <h2 className="text-xl font-semibold">Menu</h2>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="space-y-6 text-gray-300">
            <div className="flex items-center space-x-3 cursor-pointer hover:text-white transition">
              <Home size={18} />
              {sidebarOpen && <span>New Chat</span>}
            </div>
            <div className="flex items-center space-x-3 cursor-pointer hover:text-white transition">
              <Clock size={18} />
              {sidebarOpen && <span>History</span>}
            </div>
            <div className="flex items-center space-x-3 cursor-pointer hover:text-white transition">
              <Settings size={18} />
              {sidebarOpen && <span>Settings</span>}
            </div>
          </nav>
        </div>
        {sidebarOpen && <p className="text-xs text-gray-400">© 2025 DeepForge</p>}
      </motion.div>

      {/* Main Chat Section */}
      <div className={`flex-1 flex flex-col relative overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-0' : ''}`}>
        {/* Top Bar */}
        <div className="w-full bg-black/40 border-b border-white/10 backdrop-blur-md flex items-center justify-center px-6 py-3 z-30 absolute top-0 left-0">
          <div className="flex items-center gap-2">
            <Zap size={22} className="text-[#00ffaa]" />
            <h1 className="text-lg font-medium text-white"><span className="font-normal text-gray-200">DeepForge</span> <span className="font-bold text-white">AI</span></h1>
          </div>
          <div className="absolute right-6 flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition">
              <Share2 size={20} />
            </button>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
          </div>
        </div>

        {/* Welcome Screen */}
        <AnimatePresence>
          {showWelcome && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center z-20"
            >
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-semibold text-white mb-6"
              >
                Welcome to DeepForge AI
              </motion.h1>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full max-w-xl flex items-center bg-black/50 backdrop-blur-lg rounded-full px-4 py-3 border border-white/10 shadow-lg"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2"
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#00ffaa]/20 hover:bg-[#00ffaa]/30 text-[#00ffaa] p-3 rounded-full transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-16 space-y-4 pb-28 mt-12">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "user" ? (
                <div className="max-w-[75%] px-4 py-3 rounded-2xl shadow-lg bg-[#111111]/90 text-gray-100">
                  {msg.text}
                </div>
              ) : (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="max-w-[75%] px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-gray-100 leading-relaxed shadow-md"
                >
                  {msg.text}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Floating Input Bar */}
        {!showWelcome && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed bottom-6 ${sidebarOpen ? 'left-[270px] w-[calc(100%-320px)]' : 'left-1/2 -translate-x-1/2 w-[90%] max-w-3xl'} bg-black/60 backdrop-blur-xl rounded-full border border-white/10 shadow-lg flex items-center gap-3 px-5 py-3 transition-all`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-[#00ffaa]/20 hover:bg-[#00ffaa]/30 text-[#00ffaa] px-5 py-2 rounded-full font-medium flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
  
