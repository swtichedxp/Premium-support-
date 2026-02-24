import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-cyan-500/30">
      
      {/* Dynamic Background Glows */}
      <div className="fixed top-[-10%] left-[-20%] w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px] -z-10"></div>
      <div className="fixed bottom-[20%] right-[-20%] w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[80px] -z-10"></div>

      {/* Mobile Nav */}
      <nav className="flex justify-between items-center px-6 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="text-[10px] font-black tracking-[0.4em] text-cyan-500">PREMIUM</div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
          <span className="text-[8px] font-bold opacity-40 uppercase tracking-widest">Live</span>
        </div>
      </nav>

      <main className="px-6 pt-12 pb-24 space-y-12">
        {/* Massive Headline - Scales for Mobile */}
        <section>
          <h1 className="text-[18vw] leading-[0.8] font-[900] uppercase tracking-tighter italic">
            Support<br/>Portal
          </h1>
          <div className="h-1 w-20 bg-cyan-500 mt-6"></div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 opacity-40 text-[9px] uppercase tracking-[0.2em] font-bold">
          <div>
            <p className="text-white/80">Location</p>
            <p>Global / Remote</p>
          </div>
          <div>
            <p className="text-white/80">Status</p>
            <p>Ready to deploy</p>
          </div>
        </div>

        {/* The Glassmorph Form */}
        <section className="relative group mt-8">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500/20 to-blue-500/0 rounded-[2.5rem] blur-xl opacity-50"></div>
          
          <form 
            action="https://api.web3forms.com/submit" 
            method="POST"
            className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl flex flex-col gap-8"
          >
            {/* REPLACE WITH YOUR KEY */}
            <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-cyan-500 ml-1">Identity</label>
              <input type="text" name="name" placeholder="Name / Alias" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/10" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-cyan-500 ml-1">Secure Channel</label>
              <input type="email" name="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/10" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-cyan-500 ml-1">Request Details</label>
              <textarea name="message" rows="4" placeholder="Briefly describe your request..." required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/10 resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-white text-black font-[900] py-5 rounded-2xl uppercase text-[11px] tracking-[0.3em] active:scale-95 transition-transform shadow-lg shadow-white/5">
              Initialize Ticket
            </button>
          </form>
        </section>

        {/* Contact Footer Area */}
        <footer className="pt-12 flex flex-col gap-4 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest opacity-30">Direct Link</p>
          <a href="mailto:support@premium.io" className="text-2xl font-bold tracking-tight hover:text-cyan-400 transition-colors underline decoration-cyan-500/30">
            support@premium.io
          </a>
        </footer>
      </main>
    </div>
  );
}
