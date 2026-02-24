import React, { useState } from 'react';

export default function App() {
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sliderVal, setSliderVal] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setFileName(e.target.files[0].name);
  };

  const triggerSubmit = async (e) => {
    setIsSubmitting(true);
    
    // We target the form manually since we aren't using a standard submit button
    const form = document.getElementById('reportForm');
    const formData = new FormData(form);
    
    // Exact logic from Web3Forms Documentation
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
      alert("Something went wrong. Please check your connection.");
      setSliderVal(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSlider = (e) => {
    const val = parseInt(e.target.value);
    setSliderVal(val);
    if (val === 100 && !isSubmitting) {
      triggerSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      
      {/* Glow Effects */}
      <div className="fixed top-[-5%] left-[-5%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[90px] -z-10"></div>

      <nav className="flex justify-between items-center px-6 py-8 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="text-[11px] font-black tracking-[0.4em] text-cyan-400">PREMIUM SUPPORT</div>
        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
      </nav>

      <main className="px-6 pt-12 pb-24 max-w-4xl mx-auto w-full">
        {!isSuccess ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <header className="mb-14">
              <h1 className="text-[14vw] leading-[0.85] font-black uppercase tracking-tighter italic text-white">Submit A<br/>Report</h1>
              <p className="text-cyan-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-6 tracking-widest italic">Encrypted Submission</p>
            </header>

            <form id="reportForm" className="flex flex-col gap-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white/90 ml-1">Full Name</label>
                  <input type="text" name="name" placeholder="Required" required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 text-white" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white/90 ml-1">Email Address</label>
                  <input type="email" name="email" placeholder="Required" required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 text-white" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/90 ml-1">WhatsApp / Telegram</label>
                <input type="text" name="social" placeholder="@username or number" required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 text-white" />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/90 ml-1">Attachment</label>
                <div className="relative border-2 border-dashed border-white/10 rounded-xl py-10 flex flex-col items-center bg-white/[0.02]">
                   <input type="file" name="attachment" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
                   <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">{fileName ? fileName : "Tap to Upload"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/90 ml-1">Report Details</label>
                <textarea name="message" rows="5" placeholder="Describe the issue..." required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 text-white resize-none"></textarea>
              </div>

              {/* SLICE TO SUBMIT */}
              <div className="mt-8">
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-center mb-4 text-cyan-500 italic">
                  {isSubmitting ? "TRANSMITTING DATA..." : "Slide to right to submit"}
                </p>
                <div className="relative h-16 bg-white/5 rounded-full border border-white/10 p-1 flex items-center">
                  <div 
                    className="absolute h-14 bg-cyan-500 rounded-full transition-all duration-75 flex items-center justify-end pr-4"
                    style={{ width: `calc(${sliderVal}% + ${sliderVal > 90 ? '0px' : '56px'})`, left: '4px' }}
                  >
                    {sliderVal > 70 && <span className="text-black font-black text-[9px]">SUBMIT</span>}
                  </div>
                  <input 
                    type="range" min="0" max="100" value={sliderVal} onChange={handleSlider} disabled={isSubmitting}
                    className="absolute inset-0 w-full h-full appearance-none bg-transparent z-20 cursor-pointer slider-thumb"
                  />
                  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none text-[10px] font-black tracking-[0.5em] transition-opacity ${sliderVal > 20 ? 'opacity-0' : 'opacity-20'}`}>
                    {"> > > >"}
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-700">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter">Success</h2>
            <p className="text-[11px] uppercase font-bold tracking-[0.2em] text-cyan-400 mb-12">Thanks for your report. We'll respond as soon as possible.</p>
            <button onClick={() => {setIsSuccess(false); setFileName(""); setSliderVal(0);}} className="px-10 py-4 border border-white/20 rounded-full text-[10px] font-black tracking-widest hover:bg-white hover:text-black transition-all uppercase">New Report</button>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 56px;
          height: 56px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #050505;
        }
        .slider-thumb::-moz-range-thumb {
          width: 56px;
          height: 56px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #050505;
        }
      `}} />
    </div>
  );
}
