import React, { useState, useRef } from 'react';

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragX, setDragX] = useState(0); // 0 to 100
  const sliderRef = useRef(null);

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
      if (data.success) setIsSuccess(true);
      else {
        alert("Error: " + data.message);
        setDragX(0);
      }
    } catch (error) {
      alert("Network Error.");
      setDragX(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTouchMove = (e) => {
    if (isSubmitting || isSuccess) return;
    const touch = e.touches[0];
    const rect = sliderRef.current.getBoundingClientRect();
    
    // Calculate pull from right to left
    const width = rect.width;
    const currentPos = touch.clientX - rect.left;
    const pull = width - currentPos; 
    
    let percentage = (pull / width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    setDragX(percentage);

    if (percentage >= 98) {
      setDragX(100);
      triggerSubmit();
    }
  };

  const handleTouchEnd = () => {
    if (dragX < 98) setDragX(0); // Spring back
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden touch-pan-y">
      
      {/* Morphic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <nav className="flex justify-between items-center px-8 py-10 sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="text-[10px] font-black tracking-[0.5em] uppercase text-cyan-400">PREMIUM SUPPORT</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
          <span className="text-[8px] font-bold tracking-widest text-white/40 uppercase">Secure</span>
        </div>
      </nav>

      <main className={`transition-all duration-700 px-8 pt-10 ${isSuccess ? 'blur-2xl opacity-0' : 'opacity-100'}`}>
        <header className="mb-14">
          <h1 className="text-[14vw] leading-[0.85] font-black uppercase tracking-tighter italic text-white">
            Submit A<br/>Report
          </h1>
          <div className="h-1 w-12 bg-cyan-500 mt-6 shadow-[0_0_15px_#22d3ee]"></div>
        </header>

        <form id="reportForm" className="flex flex-col gap-10 pb-52">
          {[
            { label: "Full Name", name: "name", ph: "Enter your name" },
            { label: "Email Address", name: "email", ph: "Enter your email" },
            { label: "Direct Contact", name: "social", ph: "@username or phone number" }
          ].map((f) => (
            <div key={f.name} className="flex flex-col gap-3">
              <label className="text-[10px] uppercase font-black tracking-widest text-white/90">{f.label}</label>
              <input 
                type="text" name={f.name} required placeholder={f.ph}
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 transition-all text-lg placeholder:text-white/10"
              />
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase font-black tracking-widest text-white/90">Details</label>
            <textarea 
              name="message" rows="4" required placeholder="Describe the issue..."
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 transition-all text-lg placeholder:text-white/10 resize-none"
            ></textarea>
          </div>
        </form>
      </main>

      {/* Success View */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-white/5 border border-white/10 backdrop-blur-3xl p-10 rounded-[40px] w-full max-w-sm text-center shadow-2xl">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
               <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 className="text-4xl font-black uppercase italic mb-2">Sent</h2>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400 mb-10">Verification Successful</p>
            <button 
              onClick={() => {setIsSuccess(false); setDragX(0);}} 
              className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-2xl active:scale-95 transition-all"
            >
              Return Home
            </button>
          </div>
        </div>
      )}

      {/* Fluid Horizontal Slider (Right to Left) */}
      {!isSuccess && (
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#050505] to-transparent z-[90]">
          <div 
            ref={sliderRef}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="max-w-md mx-auto relative h-20 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl flex items-center overflow-hidden cursor-pointer"
          >
            {/* The Text Track */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-300 ${dragX > 20 ? 'opacity-0 scale-95' : 'opacity-30 scale-100'}`}>
                {isSubmitting ? "TRANSMITTING..." : "Slide Left to Submit"}
              </span>
            </div>

            {/* The Morphic Liquid Fill */}
            <div 
              className={`absolute right-0 top-0 bottom-0 bg-cyan-500 transition-all ${dragX === 0 ? 'duration-500 spring-snap' : 'duration-75'}`}
              style={{ width: `${dragX}%` }}
            >
              {/* The Handle / Thumb */}
              <div className="absolute left-0 top-0 bottom-0 w-20 flex items-center justify-center">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .spring-snap {
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
          }
              
