import React, { useState } from 'react';

export default function App() {
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) setIsSuccess(true);
      else alert("Transmission Error.");
    } catch (error) {
      alert("Network Error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      
      {/* Background Neon Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] -z-10"></div>

      {/* Ultra-Thin Nav */}
      <nav className="flex justify-between items-center px-6 py-8 sticky top-0 z-50 mix-blend-difference">
        <div className="text-[10px] font-black tracking-[0.5em] text-white">PREMIUM SUPPORT</div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-[8px] font-bold opacity-30 tracking-[0.2em]">EST. 2026</div>
          <div className="w-8 h-[1px] bg-white/20"></div>
        </div>
      </nav>

      <main className="px-6 pt-10 pb-24 max-w-4xl mx-auto w-full">
        
        {!isSuccess ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Massive Header Section */}
            <section className="mb-20">
              <h1 className="text-[18vw] leading-[0.8] font-[900] uppercase tracking-tighter italic mix-blend-overlay opacity-90">
                Lodge<br/>Ticket
              </h1>
              <div className="flex items-center gap-4 mt-8">
                <div className="h-[1px] w-12 bg-cyan-500"></div>
                <p className="text-cyan-500 font-mono text-[9px] tracking-[0.4em] uppercase">Ready for transmission</p>
              </div>
            </section>

            {/* No-Container Form: Just floating elements */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 group-focus-within:text-cyan-400 transition-colors">Client Identity</label>
                  <input type="text" name="name" placeholder="Name or Organization" required className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/5 text-lg" />
                </div>

                <div className="group flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 group-focus-within:text-cyan-400 transition-colors">Secure Channel</label>
                  <input type="email" name="email" placeholder="Verification Email" required className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/5 text-lg" />
                </div>
              </div>

              <div className="group flex flex-col gap-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 group-focus-within:text-cyan-400 transition-colors">Social (WA/TG)</label>
                <input type="text" name="social" placeholder="@username or +000..." required className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/5 text-lg" />
              </div>

              <div className="group flex flex-col gap-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 group-focus-within:text-cyan-400 transition-colors">Visual Evidence (KB only)</label>
                <div className="relative border border-dashed border-white/10 rounded-2xl py-10 flex flex-col items-center justify-center hover:border-cyan-500/50 transition-all">
                   <input type="file" name="attachment" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                   <span className="text-[10px] uppercase tracking-[0.2em] opacity-40">
                     {fileName ? fileName : "Tap to attach file"}
                   </span>
                </div>
              </div>

              <div className="group flex flex-col gap-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 group-focus-within:text-cyan-400 transition-colors">Issue Brief</label>
                <textarea name="message" rows="4" placeholder="Describe the situation..." required className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/5 text-lg resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group relative w-full py-8 mt-10 overflow-hidden border border-white/10 rounded-full hover:border-cyan-500 transition-all active:scale-[0.98]"
              >
                <div className="relative z-10 flex items-center justify-center gap-4">
                  <span className="text-[11px] font-black uppercase tracking-[0.6em]">
                    {isSubmitting ? "Encrypting..." : "Initialize Transfer"}
                  </span>
                </div>
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors"></div>
              </button>
            </form>
          </div>
        ) : (
          /* CINEMATIC SUCCESS STATE */
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-1000">
            <h2 className="text-[12vw] font-black italic uppercase tracking-tighter leading-none mb-6">
              Confirmed
            </h2>
            <div className="w-16 h-[1px] bg-cyan-500 mb-8"></div>
            <p className="max-w-xs text-[10px] uppercase tracking-[0.3em] leading-relaxed text-white/40">
              Your report has been logged into our secure infrastructure. Response incoming shortly.
            </p>
            <button 
              onClick={() => {setIsSuccess(false); setFileName("");}} 
              className="mt-20 text-[9px] font-bold tracking-[0.4em] opacity-20 hover:opacity-100 transition-opacity border-b border-white/20 pb-1"
            >
              RETURN TO TERMINAL
            </button>
          </div>
        )}
      </main>

      <footer className="p-10 opacity-20 text-[8px] tracking-[0.5em] uppercase flex justify-between items-center">
        <div>&copy; 2026 PREMIUM</div>
        <div>ALL CHANNELS SECURED</div>
      </footer>
    </div>
  );
              }
