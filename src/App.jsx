import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Constants for the "Feel"
  const THRESHOLD = 150; // Pixels to pull up to trigger
  const MAX_PULL = 220;  // Cap for the pull distance

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

  const handleTouchStart = () => setIsDragging(true);

  const handleTouchMove = (e) => {
    if (isSubmitting || isSuccess) return;
    const touch = e.touches[0];
    const screenHeight = window.innerHeight;
    
    // Calculate distance from bottom
    const pull = Math.max(0, screenHeight - touch.clientY);
    // Apply a "resistance" curve so it feels heavy as you pull higher
    const resistance = pull > MAX_PULL ? MAX_PULL + (pull - MAX_PULL) * 0.2 : pull;
    
    setDragY(resistance);

    if (resistance >= MAX_PULL) {
      setIsDragging(false);
      triggerSubmit();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Spring back if threshold wasn't met
    if (dragY < MAX_PULL) {
      setDragY(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden touch-none">
      
      {/* Background with Adaptive Blur */}
      <div 
        className="fixed inset-0 transition-all duration-500 -z-10"
        style={{ 
          filter: `blur(${dragY / 15}px)`,
          transform: `scale(${1 + (dragY / 2000)})`
        }}
      >
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
      </div>

      <nav className="flex justify-between items-center px-8 py-10 sticky top-0 z-50">
        <div className="text-[11px] font-black tracking-[0.5em] uppercase text-white">STUDIO / SUPPORT</div>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
           <span className="text-[9px] font-bold tracking-widest text-white/60">ACTIVE</span>
        </div>
      </nav>

      <main className={`transition-all duration-700 px-8 ${isSuccess ? 'opacity-0 translate-y-[-20px]' : 'opacity-100'}`}>
        <header className="mb-12">
          <h1 className="text-[16vw] leading-[0.9] font-black uppercase tracking-tighter italic text-white">
            Submit A<br/>Report
          </h1>
          <p className="text-cyan-400 font-bold text-[10px] tracking-[0.4em] uppercase mt-6">Verified Secure Channel</p>
        </header>

        <form id="reportForm" className="flex flex-col gap-10 pb-40">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-white">Full Name</label>
            <input type="text" name="name" required className="bg-transparent border-b-2 border-white/20 py-4 outline-none focus:border-cyan-500 transition-all text-lg placeholder:text-white/20" placeholder="Enter your name" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-white">Email Address</label>
            <input type="email" name="email" required className="bg-transparent border-b-2 border-white/20 py-4 outline-none focus:border-cyan-500 transition-all text-lg placeholder:text-white/20" placeholder="Enter your email" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-white">WhatsApp / Telegram</label>
            <input type="text" name="social" required className="bg-transparent border-b-2 border-white/20 py-4 outline-none focus:border-cyan-500 transition-all text-lg placeholder:text-white/20" placeholder="@username or number" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-white">Message</label>
            <textarea name="message" rows="3" required className="bg-transparent border-b-2 border-white/20 py-4 outline-none focus:border-cyan-500 transition-all text-lg resize-none placeholder:text-white/20" placeholder="Describe the issue..."></textarea>
          </div>
        </form>
      </main>

      {/* SUCCESS SCREEN */}
      {isSuccess && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000 bg-black/60 backdrop-blur-3xl">
          <div className="text-center px-10">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 className="text-[18vw] font-black uppercase italic leading-none mb-4 text-white">Sent</h2>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-400 mb-12">Submission Received</p>
            <button 
              onClick={() => {setIsSuccess(false); setDragY(0);}} 
              className="text-[10px] font-black tracking-[0.5em] uppercase border-2 border-white px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* SPRINGY SWIPE UP AREA */}
      {!isSuccess && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-40 flex flex-col items-center justify-end pb-10 z-[100]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={`flex flex-col items-center gap-4 transition-transform ${!isDragging ? 'duration-500 spring-bounce' : 'duration-0'}`}
            style={{ transform: `translateY(-${dragY}px)` }}
          >
            <p className={`text-[10px] font-black tracking-[0.5em] uppercase transition-colors ${dragY > THRESHOLD ? 'text-cyan-400' : 'text-white'}`}>
              {isSubmitting ? "PROCESSING..." : dragY > THRESHOLD ? "RELEASE TO SUBMIT" : "SWIPE UP TO SUBMIT"}
            </p>
            
            {/* Animated Indicator */}
            <div className="w-1 h-12 bg-white/10 relative rounded-full overflow-hidden">
               <div 
                className="absolute inset-0 bg-cyan-500 transition-all"
                style={{ height: `${(dragY / MAX_PULL) * 100}%`, bottom: 0 }}
               ></div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .spring-bounce {
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
