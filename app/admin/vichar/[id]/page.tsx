"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Bold, Italic, Heading2, Link as LinkIcon, Quote, List, Image as ImageIcon, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

type Language = "en" | "hi";

export default function VicharEditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  const [lang, setLang] = useState<Language>("en");
  
  // Form State
  const [title, setTitle] = useState(isNew ? "" : "The Significance of Sun in the 10th House");
  const [content, setContent] = useState(isNew ? "" : "<p>Sample content here...</p>");
  
  // Hindi specific mock content
  const [hiTitle, setHiTitle] = useState(isNew ? "" : "दशम भाव में सूर्य का महत्व");
  const [hiContent, setHiContent] = useState(isNew ? "" : "<p>यहाँ नमूना सामग्री...</p>");

  const [slug, setSlug] = useState(isNew ? "" : "sun-in-10th-house");
  const [status, setStatus] = useState(isNew ? "Draft" : "Published");
  const [scheduledDate, setScheduledDate] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Autosave mock state
  const [saveStatus, setSaveStatus] = useState("All changes saved");

  // MOCK AUTOSAVE: Debounced effect to simulate autosaving
  useEffect(() => {
    setSaveStatus("Saving...");
    const timeoutId = setTimeout(() => {
      // TODO: Replace with real API call to save draft
      setSaveStatus("All changes saved");
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [title, content, hiTitle, hiContent, slug, status, coverImage, scheduledDate]);

  // Simple auto-slug generator (mock)
  useEffect(() => {
    if (isNew && lang === "en" && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  }, [title, isNew, lang]);

  // Simple word count for reading time (mock)
  const currentContent = lang === "en" ? content : hiContent;
  const wordCount = currentContent.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(w => w.length > 0).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // ~200 words per minute

  const handleManualSave = () => {
    setSaveStatus("Saving...");
    setTimeout(() => {
      setSaveStatus("All changes saved");
      if (isNew) {
        // Mock redirect to the edit page after creating
        router.push("/admin/vichar/mock-id");
      }
    }, 500);
  };

  const activeTitle = lang === "en" ? title : hiTitle;
  const setActiveTitle = lang === "en" ? setTitle : setHiTitle;

  return (
    <div className="flex flex-col lg:flex-row gap-8 text-[#2b2118]">
      
      {/* Main Editor Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Language Tabs */}
        <div className="flex gap-4 border-b border-[#e6dcc4] mb-6">
          <button 
            onClick={() => setLang("en")}
            className={`pb-2 text-sm transition-colors ${lang === "en" ? "border-b-2 border-[#c99a3d] font-medium" : "border-b-2 border-transparent text-[#6b5c47]"}`}
          >
            English
          </button>
          <button 
            onClick={() => setLang("hi")}
            className={`pb-2 text-sm transition-colors ${lang === "hi" ? "border-b-2 border-[#c99a3d] font-medium" : "border-b-2 border-transparent text-[#6b5c47]"}`}
          >
            हिंदी
          </button>
        </div>

        {/* Title Input */}
        <input 
          type="text"
          value={activeTitle}
          onChange={(e) => setActiveTitle(e.target.value)}
          placeholder={lang === "en" ? "Article title" : "लेख का शीर्षक"}
          className="w-full text-4xl font-serif bg-transparent focus:outline-none mb-6 placeholder-[#6b5c47] opacity-50"
        />

        {/* Simple Rich Text Editor Toolbar (Mock interactions) */}
        <div className="flex items-center gap-2 border border-[#e6dcc4] border-b-0 p-2 bg-[#f6f0e1] text-[#6b5c47]">
          <button className="p-1 hover:bg-[#e6dcc4] hover:text-[#2b2118] transition-colors"><Bold size={16} /></button>
          <button className="p-1 hover:bg-[#e6dcc4] hover:text-[#2b2118] transition-colors"><Italic size={16} /></button>
          <div className="w-px h-4 bg-[#e6dcc4] mx-1"></div>
          <button className="p-1 hover:bg-[#e6dcc4] hover:text-[#2b2118] transition-colors"><Heading2 size={16} /></button>
          <button className="p-1 hover:bg-[#e6dcc4] hover:text-[#2b2118] transition-colors"><LinkIcon size={16} /></button>
          <button className="p-1 hover:bg-[#e6dcc4] hover:text-[#2b2118] transition-colors"><Quote size={16} /></button>
          <button className="p-1 hover:bg-[#e6dcc4] hover:text-[#2b2118] transition-colors"><List size={16} /></button>
        </div>

        {/* ContentEditable Area */}
        <div 
          className="w-full min-h-[400px] p-4 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] mb-8"
          contentEditable
          onInput={(e) => {
            const val = e.currentTarget.innerHTML;
            if (lang === "en") setContent(val);
            else setHiContent(val);
          }}
          dangerouslySetInnerHTML={{ __html: lang === "en" ? content : hiContent }}
        />

        {/* Cover Image Upload */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Cover Image (Shared)</label>
          {coverImage ? (
            <div className="relative border border-[#e6dcc4] p-2 inline-block">
              {/* Mock Thumbnail */}
              <div className="w-32 h-24 bg-[#e6dcc4] flex items-center justify-center">
                <ImageIcon size={24} className="text-[#6b5c47]" />
              </div>
              <button 
                onClick={() => setCoverImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
              >
                ×
              </button>
            </div>
          ) : (
            <div 
              className="w-full border-2 border-dashed border-[#e6dcc4] p-8 flex flex-col items-center justify-center text-[#6b5c47] cursor-pointer hover:border-[#c99a3d] hover:text-[#2b2118] transition-colors"
              onClick={() => setCoverImage("mock-image-url")}
            >
              <ImageIcon size={24} className="mb-2" />
              <span className="text-sm">Drag and drop an image, or click to browse</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
        
        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-[#6b5c47]">
            <span className="flex items-center gap-1">
              {saveStatus === "All changes saved" && <CheckCircle2 size={12} className="text-green-600" />}
              {saveStatus}
            </span>
            <Link href="/admin/vichar" className="hover:text-[#2b2118] underline">Cancel</Link>
          </div>
          
          <button 
            onClick={handleManualSave}
            className="w-full bg-[#2b2118] text-[#faf6ec] py-2 hover:bg-[#c99a3d] hover:text-[#2b2118] transition-colors font-medium rounded-full"
          >
            Save {status === "Draft" ? "Draft" : status}
          </button>
          
          {status !== "Draft" && (
            <button 
              onClick={() => { setStatus("Draft"); handleManualSave(); }}
              className="w-full text-sm text-[#6b5c47] hover:text-[#2b2118] transition-colors text-center"
            >
              Save as draft
            </button>
          )}
        </div>

        <hr className="border-[#e6dcc4]" />

        {/* Metadata Settings */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#6b5c47] mb-1">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] text-sm"
            >
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {status === "Scheduled" && (
            <div>
              <label className="block text-sm text-[#6b5c47] mb-1">Publish Date & Time</label>
              <input 
                type="datetime-local" 
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-[#6b5c47] mb-1">Slug</label>
            <input 
              type="text" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-[#6b5c47] mb-1">Reading Time</label>
            <p className="text-sm">{readingTime} min read</p>
          </div>
        </div>

      </div>
    </div>
  );
}
