"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Service = {
  id: string;
  name: { en: string; hi: string };
  description: { en: string; hi: string };
  duration: string;
  fee: string;
  active: boolean;
};

// MOCK DATA
const initialServices: Service[] = [
  { 
    id: "s1", 
    name: { en: "Vedic Astrology Consultation", hi: "वैदिक ज्योतिष परामर्श" },
    description: { en: "Comprehensive reading...", hi: "विस्तृत पठन..." },
    duration: "60 mins", 
    fee: "₹2100", 
    active: true 
  },
  { 
    id: "s2", 
    name: { en: "Kundli Analysis", hi: "कुंडली विश्लेषण" },
    description: { en: "Deep dive into chart...", hi: "चार्ट में गहराई से..." },
    duration: "45 mins", 
    fee: "₹1500", 
    active: true 
  },
  { 
    id: "s3", 
    name: { en: "Muhurat Guidance", hi: "मुहूर्त मार्गदर्शन" },
    description: { en: "Auspicious timing...", hi: "शुभ समय..." },
    duration: "30 mins", 
    fee: "₹1100", 
    active: false 
  },
];

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // State for the form being edited
  const [editForm, setEditForm] = useState<Service | null>(null);
  const [langTab, setLangTab] = useState<"en" | "hi">("en");

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setEditForm({ ...service });
    setLangTab("en");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
    // If it was a new unsaved service, remove it from list
    setServices(services.filter(s => s.id !== "new"));
  };

  const handleSave = () => {
    if (!editForm) return;
    setServices(services.map(s => s.id === editForm.id ? { ...editForm, id: editForm.id === "new" ? Date.now().toString() : editForm.id } : s));
    setEditingId(null);
    setEditForm(null);
  };

  const handleAdd = () => {
    const newService: Service = {
      id: "new",
      name: { en: "", hi: "" },
      description: { en: "", hi: "" },
      duration: "",
      fee: "",
      active: true
    };
    setServices([newService, ...services]);
    handleEdit(newService);
  };

  const toggleActive = (id: string, current: boolean) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !current } : s));
  };

  return (
    <div className="space-y-6 text-[#2b2118]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-medium">Services</h1>
        <button 
          onClick={handleAdd}
          disabled={editingId === "new"}
          className="inline-flex items-center gap-2 justify-center bg-[#2b2118] text-[#faf6ec] px-4 py-2 text-sm hover:bg-[#c99a3d] hover:text-[#2b2118] transition-colors font-medium disabled:opacity-50"
        >
          <Plus size={16} /> Add service
        </button>
      </div>

      <div className="flex flex-col">
        {/* Header row */}
        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 py-3 border-b border-[#e6dcc4] text-[#6b5c47] text-sm">
          <div>Name</div>
          <div>Duration</div>
          <div>Fee</div>
          <div>Status</div>
          <div className="text-right pr-4">Actions</div>
        </div>

        {/* List */}
        {services.map(service => (
          <div key={service.id} className="border-b border-[#e6dcc4] last:border-0">
            {editingId === service.id && editForm ? (
              <div className="p-4 bg-[#f6f0e1] space-y-4 my-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg">{service.id === "new" ? "New Service" : "Edit Service"}</h3>
                  {/* Language Tabs */}
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setLangTab("en")}
                      className={`text-sm ${langTab === "en" ? "font-medium text-[#2b2118] underline" : "text-[#6b5c47]"}`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={() => setLangTab("hi")}
                      className={`text-sm ${langTab === "hi" ? "font-medium text-[#2b2118] underline" : "text-[#6b5c47]"}`}
                    >
                      HI
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#6b5c47] mb-1">Name ({langTab.toUpperCase()})</label>
                    <input 
                      type="text" 
                      value={langTab === "en" ? editForm.name.en : editForm.name.hi}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        name: { ...editForm.name, [langTab]: e.target.value }
                      })}
                      className="w-full p-2 border border-[#e6dcc4] bg-white focus:outline-none focus:border-[#c99a3d] text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#6b5c47] mb-1">Duration</label>
                      <input 
                        type="text" 
                        value={editForm.duration}
                        onChange={(e) => setEditForm({...editForm, duration: e.target.value})}
                        className="w-full p-2 border border-[#e6dcc4] bg-white focus:outline-none focus:border-[#c99a3d] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#6b5c47] mb-1">Fee</label>
                      <input 
                        type="text" 
                        value={editForm.fee}
                        onChange={(e) => setEditForm({...editForm, fee: e.target.value})}
                        className="w-full p-2 border border-[#e6dcc4] bg-white focus:outline-none focus:border-[#c99a3d] text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#6b5c47] mb-1">Description ({langTab.toUpperCase()})</label>
                  <textarea 
                    value={langTab === "en" ? editForm.description.en : editForm.description.hi}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      description: { ...editForm.description, [langTab]: e.target.value }
                    })}
                    rows={3}
                    className="w-full p-2 border border-[#e6dcc4] bg-white focus:outline-none focus:border-[#c99a3d] text-sm resize-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="active-toggle"
                    checked={editForm.active}
                    onChange={(e) => setEditForm({...editForm, active: e.target.checked})}
                    className="accent-[#c99a3d]"
                  />
                  <label htmlFor="active-toggle" className="text-sm">Active</label>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button 
                    onClick={handleSave}
                    className="bg-[#2b2118] text-[#faf6ec] px-4 py-1.5 text-sm hover:bg-[#c99a3d] hover:text-[#2b2118] transition-colors"
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="text-sm text-[#6b5c47] hover:text-[#2b2118] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-2 sm:gap-4 py-4 text-sm sm:items-center">
                <div className="font-medium">{service.name.en}</div>
                <div className="text-[#6b5c47] sm:text-[#2b2118]"><span className="sm:hidden text-[#6b5c47]">Duration: </span>{service.duration}</div>
                <div className="text-[#6b5c47] sm:text-[#2b2118]"><span className="sm:hidden text-[#6b5c47]">Fee: </span>{service.fee}</div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleActive(service.id, service.active)}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${service.active ? 'bg-[#c99a3d]' : 'bg-[#e6dcc4]'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${service.active ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                    <span className="text-xs text-[#6b5c47] w-12 text-left">{service.active ? 'Active' : 'Inactive'}</span>
                  </button>
                </div>

                <div className="sm:text-right pr-4 mt-2 sm:mt-0">
                  <button 
                    onClick={() => handleEdit(service)}
                    className="text-[#6b5c47] hover:text-[#c99a3d] transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
