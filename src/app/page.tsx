"use client";
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Target, Eye, Bell, Calendar, AlertCircle, Megaphone, Menu, X 
} from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "general" | "urgent" | "event";
}

export default function UswaCollegeFunctional() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  useEffect(() => {
    const savedData = localStorage.getItem("uswaPrincipalData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.announcements) setAnnouncements(parsed.announcements);
      if (parsed.teachers) setTeachers(parsed.teachers.slice(0, 4));
    }
  }, []);

  const displayAnnouncements = announcements.length > 0 ? announcements : [
    { id: 1, title: "Admissions Open", message: "Admissions 2026 for FSC & ICS are now open.", date: "2026-02-05", type: "general" as const },
    { id: 2, title: "Parent Meeting", message: "Parent-Teacher Meeting scheduled for next Saturday.", date: "2026-02-10", type: "event" as const }
  ];

  const displayTeachers = teachers.length > 0 ? teachers : [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-blue-100 sticky top-0 z-[100] px-4 py-3 md:px-12 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-blue-700 p-2 md:p-3 rounded-xl md:rounded-2xl text-white shadow-lg">
            <GraduationCap size={24} className="md:w-8 md:h-8" />
          </div>
          <div>
            <h1 className="font-black text-blue-900 text-lg md:text-2xl tracking-tighter uppercase leading-none">USWA COLLEGE</h1>
            <p className="text-[7px] md:text-[9px] font-bold text-blue-600 tracking-widest uppercase">Bhowana Campus</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-600 items-center">
          <a href="#home" className="hover:text-blue-700 transition-all">home</a>
          <a href="#about" className="hover:text-blue-700 transition-all">about</a>
          <a href="#staff" className="hover:text-blue-700 transition-all">faculty</a>
          <a href="#announcements" className="hover:text-blue-700 transition-all">announcements</a>
          <a href="/login" className="bg-blue-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase shadow-md hover:scale-105 transition-all">
            Admin Login
          </a>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          className="lg:hidden p-2 text-blue-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-blue-100 flex flex-col p-6 gap-6 lg:hidden shadow-2xl animate-in slide-in-from-top duration-300">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="font-bold uppercase text-slate-600 hover:text-blue-700">home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="font-bold uppercase text-slate-600 hover:text-blue-700">about</a>
            <a href="#staff" onClick={() => setIsMenuOpen(false)} className="font-bold uppercase text-slate-600 hover:text-blue-700">faculty</a>
            <a href="#announcements" onClick={() => setIsMenuOpen(false)} className="font-bold uppercase text-slate-600 hover:text-blue-700">announcements</a>
            <a href="/login" className="bg-blue-700 text-white p-4 rounded-xl text-center font-black uppercase text-sm">
              Admin Login
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative pt-16 pb-20 md:pt-28 md:pb-36 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-8xl font-black text-blue-900 mb-6 tracking-tighter uppercase leading-tight">
            USWA COLLEGE
          </h1>
          <p className="text-lg md:text-3xl font-bold text-slate-600 mb-6">Character Building & Academic Excellence</p>
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <a href="#announcements" className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-xl">
              View Announcements
            </a>
            <a href="tel:03010637955" className="bg-white border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-2xl font-black uppercase text-xs">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* MISSION / VISION (Responsive Grid) */}
      <section id="about" className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="p-8 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] border-t-8 border-blue-700 shadow-xl">
            <Target className="text-blue-700 mb-4" size={32} />
            <h3 className="text-2xl md:text-3xl font-black mb-4 text-blue-900 uppercase">Mission</h3>
            <p className="text-slate-600 font-medium leading-relaxed">To provide affordable, high-quality education with strong ethical values.</p>
          </div>
          <div className="p-8 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] border-t-8 border-indigo-600 shadow-xl">
            <Eye className="text-indigo-600 mb-4" size={32} />
            <h3 className="text-2xl md:text-3xl font-black mb-4 text-indigo-900 uppercase">Vision</h3>
            <p className="text-slate-600 font-medium leading-relaxed">To lead in regional education by nurturing talented minds.</p>
          </div>
        </div>
      </section>

      {/* STAFF SECTION (Scrollable on small screens) */}
      {displayTeachers.length > 0 && (
        <section id="staff" className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-black text-blue-900 mb-12 uppercase">Our Faculty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayTeachers.map(teacher => (
              <div key={teacher.id} className="text-center p-4 bg-white rounded-3xl shadow-md">
                <img src={teacher.img} className="w-full h-64 md:h-80 object-cover rounded-2xl mb-4" alt={teacher.name} />
                <h4 className="font-black text-blue-950 text-lg uppercase">{teacher.name}</h4>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{teacher.subject}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ANNOUNCEMENTS (Mobile Friendly Cards) */}
      <section id="announcements" className="py-16 bg-blue-900 text-white rounded-[2rem] md:rounded-[4rem] mx-2 md:mx-4 px-4 md:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-center font-black uppercase mb-12">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {displayAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-6 rounded-[2rem] bg-white/10 border border-white/20">
                <span className="text-[10px] font-bold uppercase bg-blue-500 px-3 py-1 rounded-full mb-4 inline-block">{announcement.type}</span>
                <h3 className="text-xl font-black mb-2 uppercase">{announcement.title}</h3>
                <p className="text-white/80 text-sm mb-4">{announcement.message}</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/60">
                  <Calendar size={12} /> {announcement.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-12 px-6 text-center text-white mt-20">
        <p className="text-blue-200 text-sm font-medium">© 2026 USWA COLLEGE • Bhowana Campus</p>
      </footer>
    </div>
  );
}