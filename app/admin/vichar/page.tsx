"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function VicharAdminPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // MOCK DATA: Placeholder Vichar articles.
  // TODO: Fetch from database.
  const allArticles = [
    { id: "art-1", title: "The Significance of Sun in the 10th House", status: "Published", hasEn: true, hasHi: true, updated: "Oct 10, 2023" },
    { id: "art-2", title: "Understanding Rahu-Ketu Axis", status: "Draft", hasEn: true, hasHi: false, updated: "Oct 12, 2023" },
    { id: "art-3", title: "Jupiter Transit 2024 Predictions", status: "Scheduled", hasEn: true, hasHi: true, updated: "Oct 15, 2023" },
    { id: "art-4", title: "Remedies for Saturn Sade Sati", status: "Published", hasEn: false, hasHi: true, updated: "Sep 28, 2023" },
  ];

  const filteredArticles = allArticles.filter(a => 
    (filter === "All" || a.status === filter) &&
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-[#2b2118]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-medium">Vichar</h1>
        <Link 
          href="/admin/vichar/new" 
          className="inline-flex items-center justify-center bg-[#2b2118] text-[#faf6ec] px-4 py-2 text-sm hover:bg-[#c99a3d] hover:text-[#2b2118] transition-colors font-medium"
        >
          New article
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dcc4] pb-2">
        {/* Tabs */}
        <div className="flex gap-6">
          {["All", "Published", "Drafts", "Scheduled"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab === "Drafts" ? "Draft" : tab)}
              className={`pb-2 text-sm transition-colors ${
                (filter === tab || (filter === "Draft" && tab === "Drafts"))
                  ? "border-b-2 border-[#c99a3d] text-[#2b2118] font-medium"
                  : "border-b-2 border-transparent text-[#6b5c47] hover:text-[#2b2118]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#6b5c47]" />
          <input
            type="text"
            placeholder="Search title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-[#e6dcc4] bg-transparent text-sm focus:outline-none focus:border-[#c99a3d]"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#e6dcc4] text-[#6b5c47]">
              <th className="py-3 font-normal">Title</th>
              <th className="py-3 font-normal px-4">Status</th>
              <th className="py-3 font-normal px-4">Language</th>
              <th className="py-3 font-normal px-4">Last updated</th>
              <th className="py-3 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <tr key={article.id} className="border-b border-[#e6dcc4] last:border-0 hover:bg-[#f6f0e1] transition-colors">
                  <td className="py-3 font-medium truncate max-w-[200px] sm:max-w-md">
                    {article.title}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        article.status === 'Published' ? 'bg-green-600' : 
                        article.status === 'Scheduled' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}></span>
                      {article.status}
                    </div>
                  </td>
                  <td className="py-3 px-4 flex gap-1">
                    <span className={`text-xs px-1 border ${article.hasEn ? 'border-[#c99a3d] text-[#c99a3d]' : 'border-[#e6dcc4] text-[#6b5c47]'}`}>EN</span>
                    <span className={`text-xs px-1 border ${article.hasHi ? 'border-[#c99a3d] text-[#c99a3d]' : 'border-[#e6dcc4] text-[#6b5c47]'}`}>HI</span>
                  </td>
                  <td className="py-3 px-4 text-[#6b5c47]">{article.updated}</td>
                  <td className="py-3 text-right space-x-3 text-[#6b5c47]">
                    <Link href={`/admin/vichar/${article.id}`} className="hover:text-[#c99a3d] transition-colors">Edit</Link>
                    <button className="hover:text-[#c99a3d] transition-colors">Duplicate</button>
                    <button className="hover:text-red-600 transition-colors">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#6b5c47]">No articles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
