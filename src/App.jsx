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
      
      {/* Sharper Background Accents */}
      <div className="fixed top-[-5%] left-[-5%] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[90px] -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

      {/* Nav with higher visibility */}
      <nav className="flex justify-between items-center px-6 py-8 sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5">
        <div className="text-[11px] font-[900] tracking-[0.5em] text-cyan-400">PREMIUM SUPPORT</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
          <span className="text-[9px] font-bold tracking-widest text-white">LIVE</span>
        </div>
      </nav>

      <main className="px-6 pt-12 pb-24 max-w-4xl mx-auto w-full">
        
        {!isSuccess ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* High Contrast Header */}
            <section className="mb-16">
              <h1 className="text-[15vw] leading-[0.85] font-[900] uppercase tracking-tighter italic text-white">
                Submit A<br/>Report
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <div className="h-[2px] w-12 bg-cyan-500"></div>
                <p className="text-cyan-400 font-bold text-[10px] tracking-[0.3em] uppercase">Security Level: High</p>
              </div>
            </section>

            {/* High Visibility Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white">Name / Identity</label>
                  <input type="text" name="name" placeholder="Required" required className="bg-white/5 border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 focus:bg-white/10 transition-all placeholder:text-white/20 text-white" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white">Secure Email</label>
                  <input type="email" name="email" placeholder="Required" required className="bg-white/5 border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 focus:bg-white/10 transition-all placeholder:text-white/20 text-white" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-white">WhatsApp / Telegram</label>
                <input type="text" name="social" placeholder="@username or +000..." required className="bg-white/5 border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 focus:bg-white/10 transition-all placeholder:text-white/20 text-white" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-white">Attachment</label>
                <div className="relative border-2 border-dashed border-white/10 rounded-xl py-8 flex flex-col items-center justify-center hover:border-cyan-500/50 transition-all bg-white/[0.02]">
                   <input type="file" name="attachment" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                   <span className="text-[11px] font-bold uppercase tracking-widest text-white/60 text-center px-4">
                     {fileName ? `File: ${fileName}` : "Tap to select screenshot"}
                   </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-white">Issue Description</label>
                <textarea name="message" rows="5" placeholder="Provide full details..." required className="bg-white/5 border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 focus:bg-white/10 transition-all placeholder:text-white/20 text-white resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 mt-6 bg-cyan-500 text-black font-black uppercase text-[12px] tracking-[0.5em] rounded-xl hover:bg-cyan-400 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                {isSubmitting ? "TRANSMITTING..." : "INITIALIZE TRANSFER"}
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-700">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-[14vw] font-black italic uppercase tracking-tighter leading-none mb-4 text-white">
              Success
            </h2>
            <p className="max-w-xs text-[11px] uppercase font-bold tracking-[0.2em] text-cyan-400 mb-12">
              Transmission Received. We'll respond as soon as possible.
            </p>
            <button 
              onClick={() => {setIsSuccess(false); setFileName("");}} 
              className="px-8 py-3 border border-white/20 rounded-full text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-all"
            >
              NEW REPORT
            </button>
          </div>
        )}
      </main>

      <footer className="mt-auto p-10 border-t border-white/5 text-[9px] font-bold tracking-[0.4em] text-white/30 flex justify-between">
        <span>EST 2026</span>
        <span>ENCRYPTED CHANNEL</span>
      </footer>
    </div>
  );
              }
        
