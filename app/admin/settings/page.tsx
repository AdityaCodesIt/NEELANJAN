"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function SettingsAdminPage() {
  const [saveStatus, setSaveStatus] = useState("");
  
  // Form state (mock data)
  const [whatsapp, setWhatsapp] = useState("+91 9876543210");
  const [email, setEmail] = useState("contact@neelanjan.com");
  const [phone, setPhone] = useState("+91 9876543210");
  
  const [yearsPractice, setYearsPractice] = useState("15");
  const [bioLang, setBioLang] = useState<"en" | "hi">("en");
  const [bioEn, setBioEn] = useState("Neelanjan has been practicing Vedic astrology for over 15 years...");
  const [bioHi, setBioHi] = useState("नीलांजन पिछले 15 वर्षों से वैदिक ज्योतिष का अभ्यास कर रहे हैं...");

  const [langEn, setLangEn] = useState(true);
  const [langHi, setLangHi] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Saving...");
    // Mock save delay
    setTimeout(() => {
      setSaveStatus("Settings saved successfully.");
      setTimeout(() => setSaveStatus(""), 3000);
    }, 800);
  };

  return (
    <div className="space-y-8 text-[#2b2118] max-w-3xl">
      <h1 className="font-serif text-3xl font-medium">Settings</h1>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Contact Details */}
        <section className="space-y-4">
          <h2 className="font-serif text-xl border-b border-[#e6dcc4] pb-2">Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#6b5c47] mb-1">WhatsApp Number</label>
              <input 
                type="text" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[#6b5c47] mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-[#6b5c47] mb-1">Contact Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] text-sm"
              />
            </div>
          </div>
        </section>

        {/* About Page Fields */}
        <section className="space-y-4 pt-4 border-t border-[#e6dcc4]">
          <h2 className="font-serif text-xl border-b border-[#e6dcc4] pb-2">About Page</h2>
          <div className="space-y-6">
            <div className="w-48">
              <label className="block text-sm text-[#6b5c47] mb-1">Years of Practice</label>
              <input 
                type="number" 
                value={yearsPractice}
                onChange={(e) => setYearsPractice(e.target.value)}
                className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-[#6b5c47]">Training / Bio</label>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setBioLang("en")}
                    className={`text-sm ${bioLang === "en" ? "font-medium text-[#2b2118] underline" : "text-[#6b5c47]"}`}
                  >
                    EN
                  </button>
                  <button 
                    type="button"
                    onClick={() => setBioLang("hi")}
                    className={`text-sm ${bioLang === "hi" ? "font-medium text-[#2b2118] underline" : "text-[#6b5c47]"}`}
                  >
                    HI
                  </button>
                </div>
              </div>
              <textarea 
                value={bioLang === "en" ? bioEn : bioHi}
                onChange={(e) => bioLang === "en" ? setBioEn(e.target.value) : setBioHi(e.target.value)}
                rows={6}
                className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] text-sm resize-y"
              />
            </div>
          </div>
        </section>

        {/* Site Languages */}
        <section className="space-y-4 pt-4 border-t border-[#e6dcc4]">
          <h2 className="font-serif text-xl border-b border-[#e6dcc4] pb-2">Site Languages</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="lang-en"
                checked={langEn}
                onChange={(e) => setLangEn(e.target.checked)}
                className="accent-[#c99a3d] w-4 h-4"
              />
              <label htmlFor="lang-en" className="text-sm">English</label>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="lang-hi"
                checked={langHi}
                onChange={(e) => setLangHi(e.target.checked)}
                className="accent-[#c99a3d] w-4 h-4"
              />
              <label htmlFor="lang-hi" className="text-sm">Hindi (हिंदी)</label>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <input 
                type="checkbox" 
                id="lang-mr"
                disabled
                className="accent-[#c99a3d] w-4 h-4 cursor-not-allowed"
              />
              <label htmlFor="lang-mr" className="text-sm cursor-not-allowed">Marathi (coming soon)</label>
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="pt-8 flex items-center gap-4">
          <button 
            type="submit"
            className="bg-[#2b2118] text-[#faf6ec] px-6 py-2.5 hover:bg-[#c99a3d] hover:text-[#2b2118] transition-colors font-medium"
          >
            Save settings
          </button>
          
          {saveStatus && (
            <span className="text-sm flex items-center gap-1.5 text-green-700">
              {saveStatus === "Settings saved successfully." && <CheckCircle2 size={16} />}
              {saveStatus}
            </span>
          )}
        </div>

      </form>
    </div>
  );
}
