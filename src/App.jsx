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

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      
      {/* Background Accents */}
      <div className="fixed top-[-10%] left-[-20%] w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>
      <div className="fixed bottom-[20%] right-[-20%] w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[80px] -z-10"></div>

      {/* Nav */}
      <nav className="flex justify-between items-center px-6 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase">PREMIUM</div>
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-lg ${isSuccess ? 'bg-cyan-400 shadow-cyan-500' : 'bg-green-500 shadow-green-500'}`}></span>
          <span className="text-[8px] font-bold opacity-40 uppercase tracking-widest">{isSuccess ? 'Verified' : 'Live'}</span>
        </div>
      </nav>

      <main className="px-6 pt-10 pb-24 max-w-2xl mx-auto w-full flex flex-col items-center">
        
        {!isSuccess ? (
          <>
            <section className="mb-12 w-full text-left">
              <h1 className="text-[16vw] leading-[0.85] font-[900] uppercase tracking-tighter italic">
                Submit<br/>Issue
              </h1>
              <p className="text-cyan-500/60 font-mono text-[10px] mt-4 tracking-[0.3em] uppercase tracking-widest leading-relaxed">
                // Priority Response Enabled
              </p>
            </section>

            <div className="relative w-full">
              <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-40"></div>
              
              <form 
                onSubmit={handleSubmit}
                className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-7 md:p-10 rounded-[2.5rem] flex flex-col gap-6"
              >
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-black tracking-widest text-cyan-500 ml-1">Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/5" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-black tracking-widest text-cyan-500 ml-1">Email Address</label>
                  <input type="email" name="email" placeholder="email@example.com" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/5" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-black tracking-widest text-cyan-500 ml-1">WhatsApp / Telegram</label>
                  <input type="text" name="contact_method" placeholder="@username or +123..." required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/5" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-black tracking-widest text-cyan-500 ml-1">Attachment</label>
                  <div className="relative group cursor-pointer overflow-hidden">
                    <input type="file" name="attachment" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-xl px-4 py-8 text-center transition-all group-hover:border-cyan-500/50">
                      <p className="text-[10px] uppercase tracking-widest opacity-30">
                        {fileName ? `Selected: ${fileName}` : "Tap to select file"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-black tracking-widest text-cyan-500 ml-1">Report Details</label>
                  <textarea name="message" rows="4" placeholder="Describe the issue..." required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-cyan-500 transition-all placeholder:text-white/5 resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-[900] py-5 rounded-xl uppercase text-[10px] tracking-[0.4em] active:scale-[0.97] transition-all mt-4 disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Initialize Ticket"}
                </button>
              </form>
            </div>
          </>
        ) : (
          /* SUCCESS STATE */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-500">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full"></div>
              <div className="relative h-24 w-24 border-2 border-cyan-400 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl">
                 <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                 </svg>
              </div>
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Transmission<br/>Received</h2>
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-2xl max-w-xs">
              <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-2 italic">Report Logged Successfully</p>
              <p className="text-xs text-white/50 leading-relaxed tracking-wide">
                Thanks for your report. Our elite support team will respond to your secure channel as soon as possible.
              </p>
            </div>
            <button 
              onClick={() => {setIsSuccess(false); setFileName("");}} 
              className="mt-12 text-[9px] uppercase tracking-[0.5em] font-bold text-white/30 hover:text-cyan-400 transition-colors"
            >
              [ Send another report ]
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
