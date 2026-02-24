import React, { useState } from 'react';

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    formData.append("access_key", "a77c7010-671b-4319-9a57-b2908beeae0d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        // Trigger the morphing expansion
        setIsExpanding(true);
        setTimeout(() => {
          setIsSuccess(true);
          setIsExpanding(false);
        }, 600); 
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Network Error. Check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      </div>

      <nav className="flex justify-between items-center px-8 py-10 sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="text-[10px] font-black tracking-[0.5em] uppercase text-cyan-400">PREMIUM SUPPORT</div>
        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
      </nav>

      <main className={`transition-all duration-700 px-8 pt-10 ${isSuccess || isExpanding ? 'blur-2xl opacity-0 scale-95' : 'opacity-100'}`}>
        <header className="mb-14">
          <h1 className="text-[14vw] leading-[0.85] font-black uppercase tracking-tighter italic text-white">
            Submit A<br/>Report
          </h1>
          <p className="text-cyan-400 font-bold text-[10px] tracking-[0.4em] uppercase mt-6">___</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 pb-32">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase font-black tracking-widest text-white/90">Full Name</label>
            <input 
              type="text" name="name" required placeholder="Enter your name"
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-cyan-500 transition-all text-lg placeholder:text-white/5"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase font-black tracking-widest text-white/90">Email Address</label>
            <input 
              type="email" name="email" required placeholder="Enter your email"
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-cyan-500 transition-all text-lg placeholder:text-white/5"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase font-black tracking-widest text-white/90">Username / Number</label>
            <input 
              type="text" name="social" required placeholder="@username or number"
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-cyan-500 transition-all text-lg placeholder:text-white/5"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase font-black tracking-widest text-white/90">Details</label>
            <textarea 
              name="message" rows="4" required placeholder="Describe the issue..."
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-cyan-500 transition-all text-lg placeholder:text-white/5 resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || isExpanding}
            className="relative overflow-hidden group w-full py-6 bg-cyan-500 text-black font-black uppercase text-[12px] tracking-[0.5em] rounded-2xl transition-all active:scale-95 shadow-[0_20px_40px_rgba(6,182,212,0.3)]"
          >
            <span className={isSubmitting ? "opacity-0" : "opacity-100"}>Initialize Submission</span>
            {isSubmitting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </form>
      </main>

      {/* Morphic Expansion Layer */}
      <div 
        className={`fixed z-[60] bg-cyan-500 rounded-full transition-all duration-[600ms] ease-in-out pointer-events-none transform -translate-x-1/2 -translate-y-1/2 left-1/2 bottom-[-10%] ${isExpanding ? 'w-[300vmax] h-[300vmax] opacity-100' : 'w-0 h-0 opacity-0'}`}
      ></div>

      {/* Success View */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="bg-black border border-white/10 backdrop-blur-3xl p-12 rounded-[40px] w-full max-w-sm text-center shadow-2xl">
            <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-10">
               <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 className="text-5xl font-black uppercase italic mb-4 text-white">Sent</h2>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-400 mb-12">Report Logged Successfully</p>
            <button 
              onClick={() => setIsSuccess(false)} 
              className="w-full py-5 border-2 border-white/20 text-white font-black uppercase text-[10px] tracking-[0.4em] rounded-2xl hover:bg-white hover:text-black transition-all"
            >
              Back to Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
          }
