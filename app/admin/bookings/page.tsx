"use client";

import { useState } from "react";
import { X, Calendar as CalendarIcon, List as ListIcon, Clock, Video, Phone, MapPin } from "lucide-react";

// MOCK DATA
type Booking = {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  service: string;
  dateTime: string;
  mode: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  paymentRef: string;
  birthDetails: {
    date: string;
    time: string;
    place: string;
  };
};

const mockBookings: Booking[] = [
  { id: "b1", clientName: "Rahul Sharma", email: "rahul@example.com", phone: "+91 9876543210", service: "Vedic Astrology Consultation", dateTime: "2023-10-12 10:00", mode: "Video", paymentStatus: "Paid", paymentRef: "rzp_12345", birthDetails: { date: "15-Aug-1990", time: "14:30", place: "Delhi, India" } },
  { id: "b2", clientName: "Sneha Patel", email: "sneha@example.com", phone: "+91 9876543211", service: "Kundli Analysis", dateTime: "2023-10-12 14:00", mode: "WhatsApp", paymentStatus: "Pending", paymentRef: "-", birthDetails: { date: "02-Mar-1992", time: "08:15", place: "Mumbai, India" } },
  { id: "b3", clientName: "Amit Kumar", email: "amit@example.com", phone: "+91 9876543212", service: "Muhurat Guidance", dateTime: "2023-10-13 11:30", mode: "Phone", paymentStatus: "Paid", paymentRef: "rzp_12346", birthDetails: { date: "N/A", time: "N/A", place: "N/A" } },
  { id: "b4", clientName: "Priya Singh", email: "priya@example.com", phone: "+91 9876543213", service: "Vedic Astrology Consultation", dateTime: "2023-10-14 16:00", mode: "Video", paymentStatus: "Paid", paymentRef: "rzp_12347", birthDetails: { date: "10-Dec-1988", time: "23:45", place: "Pune, India" } },
  { id: "b5", clientName: "Vikram Reddy", email: "vikram@example.com", phone: "+91 9876543214", service: "Kundli Analysis", dateTime: "2023-10-15 09:00", mode: "Video", paymentStatus: "Refunded", paymentRef: "rzp_12348_ref", birthDetails: { date: "05-Jun-1995", time: "18:00", place: "Hyderabad, India" } },
  { id: "b6", clientName: "Anita Desai", email: "anita@example.com", phone: "+91 9876543215", service: "Vedic Astrology Consultation", dateTime: "2023-10-16 11:00", mode: "Phone", paymentStatus: "Paid", paymentRef: "rzp_12349", birthDetails: { date: "22-Sep-1985", time: "10:10", place: "Ahmedabad, India" } },
  { id: "b7", clientName: "Karan Johar", email: "karan@example.com", phone: "+91 9876543216", service: "Muhurat Guidance", dateTime: "2023-10-18 15:30", mode: "Video", paymentStatus: "Pending", paymentRef: "-", birthDetails: { date: "N/A", time: "N/A", place: "N/A" } },
  { id: "b8", clientName: "Pooja Hegde", email: "pooja@example.com", phone: "+91 9876543217", service: "Kundli Analysis", dateTime: "2023-10-20 12:00", mode: "WhatsApp", paymentStatus: "Paid", paymentRef: "rzp_12350", birthDetails: { date: "18-Oct-1990", time: "04:20", place: "Mangalore, India" } },
];

export default function BookingsAdminPage() {
  const [view, setView] = useState<"List" | "Calendar">("List");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Side panel state
  const isPanelOpen = !!selectedBooking;

  const closePanel = () => setSelectedBooking(null);

  return (
    <div className="space-y-6 text-[#2b2118] relative h-[calc(100vh-6rem)]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-medium">Bookings</h1>
      </div>

      {/* View Toggle */}
      <div className="flex gap-6 border-b border-[#e6dcc4] pb-2">
        <button
          onClick={() => setView("List")}
          className={`pb-2 text-sm transition-colors flex items-center gap-2 ${view === "List" ? "border-b-2 border-[#c99a3d] text-[#2b2118] font-medium" : "border-b-2 border-transparent text-[#6b5c47] hover:text-[#2b2118]"}`}
        >
          <ListIcon size={16} /> List
        </button>
        <button
          onClick={() => setView("Calendar")}
          className={`pb-2 text-sm transition-colors flex items-center gap-2 ${view === "Calendar" ? "border-b-2 border-[#c99a3d] text-[#2b2118] font-medium" : "border-b-2 border-transparent text-[#6b5c47] hover:text-[#2b2118]"}`}
        >
          <CalendarIcon size={16} /> Calendar
        </button>
      </div>

      {view === "List" ? (
        <div className="overflow-x-auto pb-20">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#e6dcc4] text-[#6b5c47]">
                <th className="py-3 font-normal">Client</th>
                <th className="py-3 font-normal px-4">Service</th>
                <th className="py-3 font-normal px-4">Date / Time</th>
                <th className="py-3 font-normal px-4">Mode</th>
                <th className="py-3 font-normal px-4">Payment</th>
                <th className="py-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map(booking => (
                <tr key={booking.id} className="border-b border-[#e6dcc4] last:border-0 hover:bg-[#f6f0e1] transition-colors">
                  <td className="py-3 font-medium">{booking.clientName}</td>
                  <td className="py-3 px-4 text-[#6b5c47]">{booking.service}</td>
                  <td className="py-3 px-4">{booking.dateTime}</td>
                  <td className="py-3 px-4 text-[#6b5c47]">{booking.mode}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        booking.paymentStatus === 'Paid' ? 'bg-green-600' : 
                        booking.paymentStatus === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></span>
                      {booking.paymentStatus}
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <button 
                      onClick={() => setSelectedBooking(booking)}
                      className="text-[#6b5c47] hover:text-[#c99a3d] transition-colors"
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border border-[#e6dcc4] bg-white p-4 h-[600px] flex flex-col">
          {/* MOCK CALENDAR VIEW */}
          <div className="text-center text-[#6b5c47] py-2 border-b border-[#e6dcc4] mb-4">
            Mock Calendar View (Oct 9 - Oct 15)
          </div>
          <div className="flex-1 grid grid-cols-7 gap-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
              <div key={d} className="text-center text-sm border-b border-[#e6dcc4] pb-2 font-medium">{d}</div>
            ))}
            {/* Mock slots */}
            {Array.from({ length: 35 }).map((_, i) => {
              // Place mock bookings randomly
              const booking = i === 3 ? mockBookings[0] : i === 10 ? mockBookings[1] : i === 25 ? mockBookings[3] : null;
              
              return (
                <div 
                  key={i} 
                  className={`border border-[#e6dcc4] min-h-[80px] p-1 text-xs cursor-pointer hover:bg-[#f6f0e1] transition-colors ${booking ? 'bg-[#f6f0e1]' : ''}`}
                  onClick={() => {
                    if (booking) setSelectedBooking(booking);
                    else alert("Mock: Block this slot manually");
                  }}
                >
                  {booking && (
                    <div className="bg-[#2b2118] text-[#faf6ec] p-1 rounded-sm overflow-hidden text-ellipsis whitespace-nowrap">
                      {booking.dateTime.split(" ")[1]} {booking.clientName}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Slide-in Panel */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-[#2b2118]/20 backdrop-blur-sm" onClick={closePanel}></div>
          <div className="relative w-full max-w-md bg-[#faf6ec] border-l border-[#e6dcc4] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="p-6 border-b border-[#e6dcc4] flex items-center justify-between">
              <h2 className="font-serif text-xl">Booking Details</h2>
              <button onClick={closePanel} className="text-[#6b5c47] hover:text-[#2b2118]">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-8">
              
              {/* Client Info */}
              <section>
                <h3 className="text-sm font-medium text-[#6b5c47] uppercase tracking-wider mb-3">Client</h3>
                <div className="space-y-1">
                  <p className="text-lg font-serif">{selectedBooking.clientName}</p>
                  <p className="text-sm">{selectedBooking.email}</p>
                  <p className="text-sm">{selectedBooking.phone}</p>
                </div>
              </section>

              <hr className="border-[#e6dcc4]" />

              {/* Service Info */}
              <section>
                <h3 className="text-sm font-medium text-[#6b5c47] uppercase tracking-wider mb-3">Service Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6b5c47]">Service</span>
                    <span className="font-medium text-right">{selectedBooking.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5c47]">Date & Time</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {selectedBooking.dateTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5c47]">Mode</span>
                    <span className="flex items-center gap-1">
                      {selectedBooking.mode === "Video" ? <Video size={14}/> : <Phone size={14}/>} 
                      {selectedBooking.mode}
                    </span>
                  </div>
                </div>
              </section>

              <hr className="border-[#e6dcc4]" />

              {/* Birth Details */}
              <section>
                <h3 className="text-sm font-medium text-[#6b5c47] uppercase tracking-wider mb-3">Birth Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6b5c47]">Date of Birth</span>
                    <span>{selectedBooking.birthDetails.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5c47]">Time of Birth</span>
                    <span>{selectedBooking.birthDetails.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5c47]">Place of Birth</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {selectedBooking.birthDetails.place}</span>
                  </div>
                </div>
              </section>

              <hr className="border-[#e6dcc4]" />

              {/* Payment Info */}
              <section>
                <h3 className="text-sm font-medium text-[#6b5c47] uppercase tracking-wider mb-3">Payment</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6b5c47]">Status</span>
                    <span className={`px-2 py-0.5 text-xs border ${
                        selectedBooking.paymentStatus === 'Paid' ? 'border-green-600 text-green-700' : 
                        selectedBooking.paymentStatus === 'Pending' ? 'border-yellow-500 text-yellow-700' : 'border-red-500 text-red-700'
                      }`}>
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5c47]">Reference</span>
                    <span className="font-mono text-xs">{selectedBooking.paymentRef}</span>
                  </div>
                </div>
              </section>

            </div>

            {/* Actions Footer */}
            <div className="p-6 border-t border-[#e6dcc4] bg-[#faf6ec] space-y-3">
              <button className="w-full bg-[#2b2118] text-[#faf6ec] py-2 hover:bg-[#c99a3d] hover:text-[#2b2118] transition-colors font-medium">
                Mark as completed
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => { setView("Calendar"); closePanel(); }}
                  className="w-full border border-[#e6dcc4] py-2 text-sm hover:border-[#c99a3d] transition-colors"
                >
                  Reschedule
                </button>
                <button className="w-full border border-red-200 text-red-600 py-2 text-sm hover:bg-red-50 transition-colors">
                  Cancel booking
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
