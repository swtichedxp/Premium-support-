import React, { useState, useRef } from 'react';

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sliderVal, setSliderVal] = useState(0);

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
        setSliderVal(0);
      }
    } catch (error) {
      alert("Submission failed. Check connection.");
      setSliderVal(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value);
    setSliderVal(val);
    
    // Trigger when slid 95% to the left (input is reversed)
    if (val >= 95 && !isSubmitting) {
      triggerSubmit();
    }
  };

  const handleRelease = () => {
    if (sliderVal < 95) {
      setSliderVal(0); // Snap back spring effect
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Background Morphic Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <nav className="flex justify-between items-center px-8 py-10 sticky top-0 z-50 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5">
        <div className="text-[11px] font-black tracking-[0.5em] uppercase text-white">STUDIO</div>
        <div className="text-[10px] font-bold text-cyan-400">2026.v1</div>
      </nav>

      <main className={`transition-all duration-700 px-8 pt-10 ${isSuccess ? 'blur-3xl opacity-0 scale-90' : 'opacity-100'}`}>
        <header className="mb-14">
          <h1 className="text-[14vw] leading-[0.85] font-black uppercase tracking-tighter italic text-white">
            Send A<br/>Report
          </h1>
        </header>

        <form id="reportForm" className="flex flex-col gap-10 pb-48">
          {[
            { label: "Full Name", name: "name", ph: "Enter your name" },
            { label: "Email Address", name: "email", ph: "Enter your email" },
            { label: "Contact (WA/TG)", name: "social", ph: "@username" }
          ].map((f) => (
            <div key={f.name} className="flex flex-col gap-3">
              <label className="text-[10px] uppercase font-black tracking-widest text-cyan-500">{f.label}</label>
              <input 
                type="text" name={f.name} required placeholder={f.ph}
                className="bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-white transition-all text-xl text-white placeholder:text-white/10"
              />
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase font-black tracking-widest text-cyan-500">Message</label>
            <textarea 
              name="message" rows="4" required placeholder="Describe the issue..."
              className="bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-white transition-all text-xl text-white placeholder:text-white/10 resize-none"
            ></textarea>
          </div>
        </form>
      </main>

      {/* Success State */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-white/5 border border-white/10 backdrop-blur-3xl p-10 rounded-[30px] w-full max-w-sm text-center shadow-2xl">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
               <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 className="text-4xl font-black uppercase italic mb-2 text-white">Success</h2>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400 mb-8 text-white">Report Logged</p>
            <button 
              onClick={() => {setIsSuccess(false); setSliderVal(0);}} 
              className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl transition-all active:scale-95"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Morphic Horizontal Slide-to-Submit (RIGHT TO LEFT) */}
      {!isSuccess && (
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#020202] via-[#020202]/90 to-transparent z-[90]">
          <div className="max-w-md mx-auto relative h-20 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl flex items-center px-4">
            
            {/* The Track Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-300 ${sliderVal > 10 ? 'opacity-0' : 'opacity-30'}`}>
                {isSubmitting ? "SENDING..." : "Slide Left to Submit"}
              </span>
            </div>

            {/* The Slider */}
            <input 
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={handleSliderChange}
              onTouchEnd={handleRelease}
              onMouseUp={handleRelease}
              disabled={isSubmitting}
              className={`w-full h-full appearance-none bg-transparent z-10 cursor-pointer slider-horizontal-reversed ${!isSubmitting ? 'active:cursor-grabbing' : ''}`}
            />

            {/* The Visual Progress Fill (Right to Left) */}
            <div 
              className="absolute right-4 h-12 bg-cyan-500 rounded-xl transition-all duration-75 flex items-center justify-start pl-4"
              style={{ width: `calc(${sliderVal}% + 48px)`, opacity: sliderVal > 5 ? 1 : 0 }}
            >
              {sliderVal > 70 && <span className="text-black font-black text-[9px] tracking-widest uppercase">Release</span>}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        /* Handle styling */
        .slider-horizontal-reversed::-webkit-slider-thumb {
          appearance: none;
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
          transition: transform 0.2s ease;
          position: relative;
          z-index: 20;
        }
        /* Custom track direction logic handled via range input flip */
        .slider-horizontal-reversed {
          direction: rtl; /* Makes it slide from right to left */
        }
        input, textarea { font-size: 16px !important; } /* Prevents iOS auto-zoom */
      `}} />
    </div>
  );
}
