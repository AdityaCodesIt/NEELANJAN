import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  // MOCK DATA: Placeholder stats for the dashboard.
  // TODO: Fetch real aggregates from database.
  const stats = [
    { label: "Upcoming bookings this week", value: 3 },
    { label: "Published Vichar articles", value: 12 },
    { label: "Draft articles", value: 4 },
    { label: "Pending testimonials", value: 2 },
  ];

  // MOCK DATA: Placeholder next 5 upcoming bookings.
  const upcomingBookings = [
    { id: 1, name: "Rahul Sharma", service: "Vedic Astrology Consultation", date: "Oct 12, 10:00 AM", status: "Paid" },
    { id: 2, name: "Sneha Patel", service: "Kundli Analysis", date: "Oct 12, 2:00 PM", status: "Pending" },
    { id: 3, name: "Amit Kumar", service: "Muhurat Guidance", date: "Oct 13, 11:30 AM", status: "Paid" },
    { id: 4, name: "Priya Singh", service: "Vedic Astrology Consultation", date: "Oct 14, 4:00 PM", status: "Paid" },
    { id: 5, name: "Vikram Reddy", service: "Kundli Analysis", date: "Oct 15, 9:00 AM", status: "Refunded" },
  ];

  // MOCK DATA: Placeholder recent drafts.
  const recentDrafts = [
    { id: "draft-1", title: "The Role of Jupiter in Career Progression", updated: "2 days ago" },
    { id: "draft-2", title: "Understanding Rahu-Ketu Axis", updated: "4 days ago" },
    { id: "draft-3", title: "Navaratri and Planetary Alignments", updated: "1 week ago" },
  ];

  return (
    <div className="space-y-10 text-[#2b2118]">
      <h1 className="font-serif text-3xl font-medium">Dashboard</h1>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="border border-[#e6dcc4] p-4 flex flex-col">
            <span className="text-3xl font-serif mb-2">{stat.value}</span>
            <span className="text-sm text-[#6b5c47] leading-tight">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Upcoming Bookings */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-[#e6dcc4] pb-2">
          <h2 className="font-serif text-xl">Upcoming Bookings</h2>
          <Link href="/admin/bookings" className="text-sm text-[#6b5c47] hover:text-[#2b2118] flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="flex flex-col">
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-3 border-b border-[#e6dcc4] text-sm last:border-0">
              <span className="font-medium">{booking.name}</span>
              <span className="text-[#6b5c47]">{booking.service}</span>
              <span>{booking.date}</span>
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  booking.status === 'Paid' ? 'bg-green-600' : 
                  booking.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></span>
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Drafts */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-[#e6dcc4] pb-2">
          <h2 className="font-serif text-xl">Recent Drafts</h2>
          <Link href="/admin/vichar" className="text-sm text-[#6b5c47] hover:text-[#2b2118] flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="flex flex-col">
          {recentDrafts.map((draft) => (
            <div key={draft.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#e6dcc4] text-sm last:border-0">
              <Link href={`/admin/vichar/${draft.id}`} className="font-medium hover:text-[#c99a3d] transition-colors mb-1 sm:mb-0">
                {draft.title}
              </Link>
              <span className="text-[#6b5c47]">Last updated: {draft.updated}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
