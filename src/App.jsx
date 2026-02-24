import React, { useState, useRef } from 'react';

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_PULL = 200; // Lowered for easier reach

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

  const handleTouchMove = (e) => {
    if (isSubmitting || isSuccess) return;
    const touch = e.touches[0];
    const pull = Math.max(0, window.innerHeight - touch.clientY);
    // Morphic resistance: it gets harder to pull the higher it goes
    const resistance = pull > MAX_PULL ? MAX_PULL + (pull - MAX_PULL) * 0.1 : pull;
    setDragY(resistance);
    setIsDragging(true);

    if (resistance >= MAX_PULL + 50) {
      setIsDragging(false);
      triggerSubmit();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY < MAX_PULL + 50) setDragY(0);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Morphic Background Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] transition-transform duration-1000"
          style={{ transform: `scale(${1 + dragY/500}) translate(${dragY/10}px, ${-dragY/10}px)` }}
        ></div>
      </div>

      <nav className="flex justify-between items-center px-8 py-10 sticky top-0 z-50 bg-[#020202]/50 backdrop-blur-md">
        <div className="text-[11px] font-black tracking-[0.5em] uppercase">STUDIO</div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
      </nav>

      <main className={`transition-all duration-1000 ease-in-out px-8 ${isSuccess ? 'blur-2xl opacity-0 scale-110' : 'opacity-100'}`}>
        <header className="mb-16">
          <h1 className="text-[16vw] leading-[0.85] font-black uppercase tracking-tighter italic">
            Submit A<br/>Report
          </h1>
        </header>

        <form id="reportForm" className="flex flex-col gap-12 pb-60"> {/* Added large bottom padding */}
          {[
            { label: "Full Name", name: "name", type: "text", ph: "Enter your name" },
            { label: "Email Address", name: "email", type: "email", ph: "Enter your email" },
            { label: "Contact (WA/TG)", name: "social", type: "text", ph: "@username" }
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-3 group">
              <label className="text-[10px] uppercase font-black tracking-widest text-cyan-500/60 transition-colors group-focus-within:text-cyan-400">
                {field.label}
              </label>
              <input 
                type={field.type} name={field.name} required placeholder={field.ph}
                className="bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-cyan-500 transition-all text-xl placeholder:text-white/10"
              />
            </div>
          ))}

          <div className="flex flex-col gap-3 group">
            <label className="text-[10px] uppercase font-black tracking-widest text-cyan-500/60">Message</label>
            <textarea 
              name="message" rows="4" required placeholder="Describe the issue..."
              className="bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-cyan-500 transition-all text-xl placeholder:text-white/10 resize-none"
            ></textarea>
          </div>
        </form>
      </main>

      {/* Morphic Success State */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-10 animate-in fade-in zoom-in-95 duration-700">
          <div className="bg-white/5 border border-white/10 backdrop-blur-3xl p-12 rounded-[40px] flex flex-col items-center text-center shadow-2xl">
            <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(6,182,212,0.5)]">
               <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 className="text-5xl font-black uppercase italic mb-2">Sent</h2>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-400 mb-10">Report Authenticated</p>
            <button 
              onClick={() => {setIsSuccess(false); setDragY(0);}} 
              className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-2xl hover:bg-cyan-400 transition-colors"
            >
              Back to Studio
            </button>
          </div>
        </div>
      )}

      {/* Morphic Swipe Controller */}
      {!isSuccess && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-48 flex flex-col items-center justify-end pb-12 z-[90] pointer-events-auto"
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Glass Capsule */}
          <div 
            className={`w-[80%] max-w-sm h-20 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full relative flex items-center justify-center transition-all ${!isDragging ? 'duration-500 spring-bounce' : 'duration-0'}`}
            style={{ 
              transform: `translateY(-${dragY}px)`,
              boxShadow: dragY > 100 ? `0 20px 40px rgba(6, 182, 212, ${dragY/400})` : 'none'
            }}
          >
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full pointer-events-none" style={{ opacity: dragY/MAX_PULL }}></div>
            
            <p className="text-[9px] font-black tracking-[0.4em] uppercase z-10 text-center">
              {isSubmitting ? "TRANSMITTING..." : dragY > 150 ? "RELEASE TO SEND" : "SWIPE UP TO SUBMIT"}
            </p>

            {/* Morphic Fluid Indicator */}
            <div 
              className="absolute bottom-[-10px] w-12 h-1
