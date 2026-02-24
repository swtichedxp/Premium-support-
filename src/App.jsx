import React, { useState, useRef } from 'react';

export default function App() {
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sliderVal, setSliderVal] = useState(0);
  const formRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setFileName(e.target.files[0].name);
  };

  const triggerSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData(formRef.current);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        alert("Submission Error: " + data.message);
        setSliderVal(0); // Reset slider on fail
      }
    } catch (error) {
      alert("Network Error. Please try again.");
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
      <div className="fixed top-[-5%] left-[-5%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[90px] -z-10"></div>
      
      <nav className="flex justify-between items-center px-6 py-8 sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5">
        <div className="text-[11px] font-black tracking-[0.4em] text-cyan-400">PREMIUM SUPPORT</div>
        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
      </nav>

      <main className="px-6 pt-12 pb-24 max-w-4xl mx-auto w-full">
        {!isSuccess ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <section className="mb-14">
              <h1 className="text-[14vw] leading-[0.85] font-black uppercase tracking-tighter italic text-white">
                Submit A<br/>Report
              </h1>
              <p className="text-cyan-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-6 tracking-widest">Verified Channel</p>
            </section>

            <form ref={formRef} className="flex flex-col gap-9">
              <input type="hidden" name="access_key" value="A77c7010-671b-4319-9a57-b2908beeae0d" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white/90">Full Name</label>
                  <input type="text" name="name" placeholder="Enter your name" required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 text-white" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white/90">Email Address</label>
                  <input type="email" name="email" placeholder="Enter your email" required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 text-white" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/90">WhatsApp / Telegram</label>
                <input type="text" name="contact" placeholder="@username or number" required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 text-white" />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/90">Attachment</label>
                <div className="relative border-2 border-dashed border-white/10 rounded-xl py-10 flex flex-col items-center bg-white/[0.02]">
                   <input type="file" name="attachment" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 z-10" />
                   <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">{fileName ? fileName : "Tap to upload"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/90">Report Details</label>
                <textarea name="message" rows="5" placeholder="Describe the issue..." required className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-500 text-white resize-none"></textarea>
              </div>

              {/* SLIDE TO SUBMIT MECHANISM */}
              <div className="mt-6">
                <label className="text-[10px] uppercase font-black tracking-widest text-cyan-500 block mb-4 text-center">
                  {isSubmitting ? "Processing..." : "Slide to submit report"}
                </label>
                <div className="relative h-16 bg-white/5 rounded-full border border-white/10 overflow-hidden p-1">
                  <div 
                    className="absolute top-1 left-1 bottom-1 bg-cyan-500 rounded-full transition-all duration-100 ease-out flex items-center justify-end px-4"
                    style={{ width: `calc(${sliderVal}% + ${sliderVal > 90 ? '0px' : '60px'})`, opacity: sliderVal > 0 ? 1 : 0 }}
                  >
                    {sliderVal > 80 && <span className="text-black font-black text-[10px]">RELEASE</span>}
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderVal} 
                    onChange={handleSlider}
                    disabled={isSubmitting}
                    className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-20 slider-thumb"
                  />
                  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none text-[10px] font-black tracking-[0.3em] uppercase transition-opacity ${sliderVal > 50 ? 'opacity-0' : 'opacity-20'}`}>
                    {"> > > > >"}
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-700">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter text-white">Success</h2>
            <p className="max-w-xs text-[11px] uppercase font-bold tracking-[0.2em] text-cyan-400 mb-12">
              Thanks for your report. We'll respond as soon as possible.
            </p>
            <button onClick={() => {setIsSuccess(false); setFileName(""); setSliderVal(0);}} className="px-8 py-3 border border-white/20 rounded-full text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-all">
              NEW REPORT
            </button>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .slider-thumb::-moz-range-thumb {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
      `}} />
    </div>
  );
}
