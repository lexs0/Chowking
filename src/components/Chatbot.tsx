import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, ChefHat, HelpCircle, Truck, FileText } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "👋 Mabuhay! Welcome to Chowking Digital Chat Support. I am Chef Chow, your interactive assistant. Ask me anything about our Menu, Delivery, Franchise, or available Coupon Promos!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '🔥 Best Sellers', icon: ChefHat },
    { label: '🚚 Delivery Fees', icon: Truck },
    { label: '💼 Franchise Info', icon: FileText },
    { label: '❓ Current Promos', icon: HelpCircle }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate response
    setTimeout(() => {
      let botResponse = '';
      const normalText = text.toLowerCase();

      if (normalText.includes('best') || normalText.includes('seller') || normalText.includes('food') || normalText.includes('menu')) {
        botResponse = "🥡 Our best-selling favorites include:\n1. **Pork Chao Fan with Siomai** (₱139) - Authentic hot wok rice!\n2. **Chinese-Style Fried Chicken Lauriat** (₱219) - Super crunchy with Pancit Canton & Siomai.\n3. **Super Sangkap Halo-Halo** (₱115) - Complete with rich leche flan & ube ice cream.\n\nYou can click on the 'Menu' top tab to append these items directly to your cart!";
      } else if (normalText.includes('delivery') || normalText.includes('speed') || normalText.includes('fee')) {
        botResponse = "🚚 **Delivery Insights:**\n- We deliver across the Philippines inside 30-45 minutes.\n- Standard delivery charge is a flat rate of ₱49.\n- Unlock **Free Delivery** on orders above ₱550 using code **CHOWFREE** at checkout!";
      } else if (normalText.includes('franchise') || normalText.includes('invest') || normalText.includes('partner')) {
        botResponse = "💼 **Chowking Franchise Opportunities:**\n- The initial operational investment ranges from ₱12 Million to ₱15 Million depending on size and format.\n- We offer massive countrywide marketing support and a world-class Jollibee Foods Corp supply chain model.\n- Click on the 'Franchise' page tab to use our custom investment ROI Calculator and submit your inquiry form!";
      } else if (normalText.includes('promo') || normalText.includes('coupon') || normalText.includes('discount') || normalText.includes('code')) {
        botResponse = "🎉 **Active Promo Codes for Today:**\n- `CHOWFREE`: Free delivery inside Manila & nearby provinces (Min. order ₱550).\n- `HALOHALO20`: Grab ₱20 discount off Super Sangkap Halo-Halo.\n- `CHOWFAMILY`: 10% Off on Family Platter selections.\n\nType this in the checkout discount box, or play our interactive **Scratch Card game** on the 'Promos' page for a guarantee discount!";
      } else if (normalText.includes('hi') || normalText.includes('hello') || normalText.includes('hey')) {
        botResponse = "Mabuhay! How can I satisfy your delicious cravings today? Let me know if you would like me to help find a branch close to you or recommend lunch bundles.";
      } else {
        botResponse = "I appreciate that inquiry! As your Chowking assistant, I highly recommend ordering our crispy **Chinese Stir-Fried Chicken Lauriat** or iconic **Pork Chao Fan with Egg**. Both are freshly made for your comfort. Is there anything else about our services I can assist you with?";
      }

      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 850);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        id="btn-chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-red-600 text-yellow-300 rounded-full shadow-2xl hover:bg-red-700 transition-colors flex items-center justify-center cursor-pointer border border-yellow-500/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-xs font-black px-1.5 py-0.5 rounded-full flex items-center justify-center animate-bounce">
            1
          </span>
        )}
      </motion.button>

      {/* Chat Windows */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] bg-slate-900 text-slate-100 rounded-3xl shadow-3xl border border-red-500/20 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-red-700 text-slate-100 flex items-center justify-between border-b border-red-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-red-700 font-bold border border-yellow-300">
                  <ChefHat size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-yellow-300">Chef Chow</h3>
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    <span className="text-[10px] text-red-100 font-medium">Virtual Assistant (Online)</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-red-600 text-red-100 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-red-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-100 border border-slate-700/60 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Prompts */}
            <div className="p-2 border-t border-slate-800 bg-slate-950/80 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.label)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-red-900/35 hover:border-red-500/40 text-[11px] text-slate-300 border border-slate-700 transition-all font-medium cursor-pointer"
                >
                  <q.icon size={12} className="text-yellow-400" />
                  {q.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about flavors, deals, franchise..."
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-red-500 focus:outline-none rounded-xl text-xs px-3.5 py-2.5 text-slate-200 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-md shadow-red-900/40"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
