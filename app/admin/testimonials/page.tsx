"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  city: string;
  quote: string;
  hasConsent: boolean;
  isVisible: boolean;
};

// MOCK DATA
const initialTestimonials: Testimonial[] = [
  { id: "t1", name: "Ravi Shankar", city: "Delhi", quote: "Neelanjan ji's guidance was eye-opening. The remedies suggested have brought immense peace to my life.", hasConsent: true, isVisible: true },
  { id: "t2", name: "Meera K", city: "Mumbai", quote: "The Kundli analysis was spot on. Highly recommend his services.", hasConsent: true, isVisible: false },
  { id: "t3", name: "Anonymous", city: "Pune", quote: "Very accurate readings. Helped me navigate a tough career transition.", hasConsent: false, isVisible: false },
];

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // State for the form being edited
  const [editForm, setEditForm] = useState<Testimonial | null>(null);

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setEditForm({ ...t });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
    setTestimonials(testimonials.filter(t => t.id !== "new"));
  };

  const handleSave = () => {
    if (!editForm) return;
    
    // Ensure visibility is false if consent is revoked
    const finalForm = { ...editForm, isVisible: editForm.hasConsent ? editForm.isVisible : false };
    
    setTestimonials(testimonials.map(t => t.id === finalForm.id ? { ...finalForm, id: finalForm.id === "new" ? Date.now().toString() : finalForm.id } : t));
    setEditingId(null);
    setEditForm(null);
  };

  const handleAdd = () => {
    const newT: Testimonial = {
      id: "new",
      name: "",
      city: "",
      quote: "",
      hasConsent: false,
      isVisible: false
    };
    setTestimonials([newT, ...testimonials]);
    handleEdit(newT);
  };

  const toggleConsent = (id: string, currentConsent: boolean, currentVisible: boolean) => {
    const newConsent = !currentConsent;
    // If we are turning off consent, we must also turn off visibility
    const newVisible = newConsent ? currentVisible : false;
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, hasConsent: newConsent, isVisible: newVisible } : t));
  };

  const toggleVisibility = (id: string, current: boolean, hasConsent: boolean) => {
    if (!hasConsent) return; // Cannot make visible without consent
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, isVisible: !current } : t));
  };

  return (
    <div className="space-y-6 text-[#2b2118]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-medium">Testimonials</h1>
        <button 
          onClick={handleAdd}
          disabled={editingId === "new"}
          className="inline-flex items-center gap-2 justify-center bg-[#2b2118] text-[#faf6ec] px-4 py-2 text-sm hover:bg-[#c99a3d] hover:text-[#2b2118] transition-colors font-medium disabled:opacity-50"
        >
          <Plus size={16} /> Add testimonial
        </button>
      </div>

      <div className="flex flex-col">
        {/* Header row */}
        <div className="hidden sm:grid grid-cols-[1.5fr_1fr_3fr_1.5fr_auto] gap-4 py-3 border-b border-[#e6dcc4] text-[#6b5c47] text-sm">
          <div>Client</div>
          <div>City</div>
          <div>Quote</div>
          <div>Status</div>
          <div className="text-right pr-4">Actions</div>
        </div>

        {/* List */}
        {testimonials.map(t => (
          <div key={t.id} className="border-b border-[#e6dcc4] last:border-0">
            {editingId === t.id && editForm ? (
              <div className="p-4 bg-[#f6f0e1] space-y-4 my-2">
                <h3 className="font-serif text-lg">{t.id === "new" ? "New Testimonial" : "Edit Testimonial"}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#6b5c47] mb-1">Name</label>
                    <input 
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full p-2 border border-[#e6dcc4] bg-white focus:outline-none focus:border-[#c99a3d] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#6b5c47] mb-1">City</label>
                    <input 
                      type="text" 
                      value={editForm.city}
                      onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                      className="w-full p-2 border border-[#e6dcc4] bg-white focus:outline-none focus:border-[#c99a3d] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#6b5c47] mb-1">Quote</label>
                  <textarea 
                    value={editForm.quote}
                    onChange={(e) => setEditForm({...editForm, quote: e.target.value})}
                    rows={3}
                    className="w-full p-2 border border-[#e6dcc4] bg-white focus:outline-none focus:border-[#c99a3d] text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col gap-3 py-2 border-y border-[#e6dcc4]">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="consent-cb"
                      checked={editForm.hasConsent}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setEditForm({
                          ...editForm, 
                          hasConsent: checked,
                          // If unchecking consent, force visibility off
                          isVisible: checked ? editForm.isVisible : false
                        });
                      }}
                      className="accent-[#c99a3d]"
                    />
                    <label htmlFor="consent-cb" className="text-sm">Has consent to publish</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="visible-cb"
                      checked={editForm.isVisible}
                      // NOTE: rule matters for real use: disabled visibility toggle until consent is checked
                      disabled={!editForm.hasConsent}
                      onChange={(e) => setEditForm({...editForm, isVisible: e.target.checked})}
                      className="accent-[#c99a3d]"
                    />
                    <label htmlFor="visible-cb" className={`text-sm ${!editForm.hasConsent ? 'text-[#6b5c47] opacity-60' : ''}`}>
                      Visible on site (requires consent)
                    </label>
                  </div>
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
              <div className="flex flex-col sm:grid sm:grid-cols-[1.5fr_1fr_3fr_1.5fr_auto] gap-2 sm:gap-4 py-4 text-sm sm:items-center">
                <div className="font-medium">{t.name}</div>
                <div className="text-[#6b5c47] sm:text-[#2b2118]"><span className="sm:hidden text-[#6b5c47]">City: </span>{t.city}</div>
                
                <div className="text-[#6b5c47] truncate max-w-[200px] sm:max-w-full">
                  "{t.quote}"
                </div>
                
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => toggleConsent(t.id, t.hasConsent, t.isVisible)}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${t.hasConsent ? 'bg-green-600' : 'bg-[#e6dcc4]'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${t.hasConsent ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                    <span className="text-xs text-[#6b5c47] w-16 text-left">Consent</span>
                  </button>

                  <button 
                    onClick={() => toggleVisibility(t.id, t.isVisible, t.hasConsent)}
                    disabled={!t.hasConsent}
                    className={`flex items-center gap-2 ${!t.hasConsent ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${t.isVisible ? 'bg-[#c99a3d]' : 'bg-[#e6dcc4]'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${t.isVisible ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                    <span className="text-xs text-[#6b5c47] w-16 text-left">Visible</span>
                  </button>
                </div>

                <div className="sm:text-right pr-4 mt-2 sm:mt-0 flex gap-3 sm:justify-end">
                  <button 
                    onClick={() => handleEdit(t)}
                    className="text-[#6b5c47] hover:text-[#c99a3d] transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setTestimonials(testimonials.filter(x => x.id !== t.id))}
                    className="text-[#6b5c47] hover:text-red-600 transition-colors"
                  >
                    Delete
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
