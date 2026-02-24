import React, { useState } from 'react';

export default function App() {
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(e.target)
      });
      if (response.ok) setIsSuccess(true);
      else alert("Transmission Error.");
    } catch (err) {
      alert("Network Error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      <div className="fixed top-[-5%] left-[-5%] w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[90px] -z-10"></div>
      <div className="fixed bottom-[-5%] right-[-5%] w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

      <nav className="flex justify-between items-center px-6 py-8 sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5">
        <div className="text-[11px] font-black tracking-[0.4em] text-cyan-400 uppercase">PREMIUM SUPPORT</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
          <span className="text-[9px] font-bold tracking-[0.2em]">SYSTEM ONLINE</span>
        </div>
      </nav>

      <main className="px-6 pt-12 pb-24 max-w-4xl mx-auto w-full">
        {!isSuccess ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <section className="mb-14">
              <h1 className="text-[14vw] leading-[0.85] font-black uppercase tracking-tighter italic">Submit A<br/>Report</h1>
              <div className="flex items-center gap-4 mt-6">
                <div className="h-[2px] w-14 bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></div>
                <p className="text-cyan-400 font-bold text-[10px] tracking-[0.3em] uppercase italic text-white/90">Priority Access Authorized</p>
              </div>
            </section>

            <form onSubmit={handleSubmit} className="flex flex-col gap-9">
              <input type="hidden" name="access_key" value="A77c7010-671b-4319-9a57-b2908beeae0d" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-black tracking-widest ml-1">Identity</label>
                  <input type="text" name="name" placeholder="Agent Name" required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 placeholder:text-white/10" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-black tracking-widest ml-1">Return Email</label>
                  <input type="email" name="email" placeholder="Required" required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 placeholder:text-white/10" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-widest ml-1">WhatsApp / Telegram</label>
                <input type="text" name="social" placeholder="@username or phone" required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 placeholder:text-white/10" />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-widest ml-1">Evidence</label>
                <div className="relative border-2 border-dashed border-white/10 rounded-xl py-10 flex flex-col items-center bg-white/[0.02]">
                   <input type="file" name="attachment" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 z-10" />
                   <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">{fileName ? fileName : "Tap to Attach"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-widest ml-1">Narrative</label>
                <textarea name="message" rows="5" placeholder="Details..." required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 placeholder:text-white/10 resize-none"></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-cyan-500 text-black font-black uppercase text-[12px] tracking-[0.5em] rounded-xl active:scale-[0.97] shadow-[0_10px_30px_rgba(6,182,212,0.3)]">
                {isSubmitting ? "TRANSMITTING..." : "INITIALIZE TRANSFER"}
              </button>
            </form>
          </div>
        ) : (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-1000">
            <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(6,182,212,0.5)]">
              <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none mb-6">Success</h2>
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-2xl max-w-sm mb-12">
              <p className="text-[11px] uppercase font-bold tracking-[0.3em] text-cyan-400 mb-2 italic">Report Logged</p>
              <p className="text-xs text-white/60 leading-relaxed">Transmission received. We'll respond shortly.</p>
            </div>
            <button onClick={() => {setIsSuccess(false); setFileName("");}} className="text-[10px] font-black tracking-[0.4em] text-white/30 hover:text-white border-b border-white/10 pb-1">[ NEW TRANSMISSION ]</button>
          </div>
        )}
      </main>

      <footer className="mt-auto p-10 border-t border-white/5 text-[9px] font-bold tracking-[0.5em] text-white/20 flex justify-between uppercase">
        <span>EST 2026</span>
        <div className="flex gap-4"><span>ENCRYPTED</span><span>SECURE</span></div>
      </footer>
    </div>
  );
}
