import React, { useState, useRef } from 'react';

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragY, setDragY] = useState(0);
  const containerRef = useRef(null);

  const triggerSubmit = async () => {
    setIsSubmitting(true);
    const form = document.getElementById('reportForm');
    const formData = new FormData(form);
    formData.append("access_key", "a77c7010-671b-4319-9a57-b2908beeae0d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        alert("Error: " + data.message);
        setDragY(0);
      }
    } catch (error) {
      alert("Submission failed. Check your connection.");
      setDragY(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logic for the Swipe Up gesture
  const handleTouchMove = (e) => {
    if (isSubmitting || isSuccess) return;
    const touch = e.touches[0];
    const height = window.innerHeight;
    const move = Math.max(0, height - touch.clientY);
    const percent = Math.min(100, (move / (height * 0.4)) * 100);
    setDragY(percent);
    
    if (percent >= 100) {
      triggerSubmit();
    }
  };

  const handleTouchEnd = () => {
    if (dragY < 100) setDragY(0);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* Dynamic Glass Blur Background */}
      <div 
        className="fixed inset-0 transition-all duration-700 -z-10"
        style={{ 
          filter: `blur(${dragY / 5}px)`,
          opacity: isSuccess ? 0.3 : 1
        }}
      >
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      <nav className="flex justify-between items-center px-8 py-10 sticky top-0 z-50 mix-blend-difference">
        <div className="text-[10px] font-black tracking-[0.5em] uppercase">Studio / Support</div>
        <div className="text-[10px] opacity-40 italic">2026 Edition</div>
      </nav>

      <main className={`transition-all duration-1000 px-8 ${isSuccess ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}>
        <header className="mb-16">
          <h1 className="text-[18vw] leading-[0.8] font-black uppercase tracking-tighter italic mix-blend-overlay">
            Contact<br/>Me
          </h1>
          <div className="h-[1px] w-20 bg-white/20 mt-10"></div>
        </header>

        <form id="reportForm" className="flex flex-col gap-12 pb-40">
          <div className="group flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40">Full Name</label>
            <input type="text" name="name" required className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all text-xl" placeholder="John Doe" />
          </div>

          <div className="group flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40">Email Address</label>
            <input type="email" name="email" required className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all text-xl" placeholder="hello@studio.com" />
          </div>

          <div className="group flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40">WhatsApp / Telegram</label>
            <input type="text" name="social" required className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all text-xl" placeholder="@username" />
          </div>

          <div className="group flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40">Message</label>
            <textarea name="message" rows="3" required className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all text-xl resize-none" placeholder="Project details..."></textarea>
          </div>
        </form>
      </main>

      {/* Swipe Up Success Layer */}
      {isSuccess && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000 bg-black/40 backdrop-blur-3xl">
          <div className="text-center px-10">
            <div className="w-px h-24 bg-cyan-500 mx-auto mb-10 animate-tall"></div>
            <h2 className="text-[15vw] font-black uppercase italic leading-none mb-6">Sent</h2>
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-12">Message Logged Successfully</p>
            <button 
              onClick={() => {setIsSuccess(false); setDragY(0);}} 
              className="text-[9px] font-black tracking-[0.5em] uppercase border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Back to Studio
            </button>
          </div>
        </div>
      )}

      {/* Swipe Up Interaction Area */}
      {!isSuccess && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-32 flex flex-col items-center justify-end pb-8 cursor-pointer z-[100]"
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex flex-col items-center gap-4">
            <div 
              className="text-[9px] font-black tracking-[0.5em] uppercase transition-all duration-300"
              style={{ 
                transform: `translateY(-${dragY / 2}px)`,
                opacity: isSubmitting ? 0 : 1 - (dragY / 100)
              }}
            >
              {isSubmitting ? "Uploading..." : "Swipe up to submit"}
            </div>
            
            {/* The Animated Arrow/Indicator */}
            <div className="w-px h-12 bg-white/20 relative overflow-hidden">
               <div 
                className="absolute inset-0 bg-cyan-400 transition-all duration-100"
                style={{ transform: `translateY(${100 - dragY}%)` }}
               ></div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tall {
          from { height: 0; }
          to { height: 96px; }
        }
        .animate-tall { animation: tall 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
      `}} />
    </div>
  );
}
