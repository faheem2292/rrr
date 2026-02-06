"use client";
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Target, Eye, Bell, Calendar, AlertCircle, Megaphone 
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

  // Load data from localStorage on mount
  useEffect(() => {
    // Get announcements from dashboard
    const savedData = localStorage.getItem("uswaPrincipalData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.announcements) {
        setAnnouncements(parsed.announcements);
      }
      if (parsed.teachers) {
        setTeachers(parsed.teachers.slice(0, 4)); // Show only 4 teachers
      }
    }
  }, []);

  // Default data if localStorage is empty
  const displayAnnouncements = announcements.length > 0 ? announcements : [
    { id: 1, title: "Admissions Open", message: "Admissions 2026 for FSC & ICS are now open.", date: "2026-02-05", type: "general" as const },
    { id: 2, title: "Parent Meeting", message: "Parent-Teacher Meeting scheduled for next Saturday.", date: "2026-02-10", type: "event" as const }
  ];

  const displayTeachers = teachers.length > 0 ? teachers : [];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 font-sans text-slate-900 scroll-smooth">
      
      {/* NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-blue-100 sticky top-0 z-100 px-6 py-4 md:px-12 flex justify-between items-center shadow-lg shadow-blue-100/50">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-br from-blue-700 to-blue-900 p-3 rounded-2xl text-white shadow-xl shadow-blue-500/30">
            <GraduationCap size={32} />
          </div>
          <div>
            <h1 className="font-black text-blue-900 text-2xl tracking-tighter leading-none uppercase">USWA COLLEGE</h1>
            <p className="text-[9px] font-bold text-blue-600 tracking-[0.3em] uppercase">Bhowana Campus • Est. 2020</p>
          </div>
        </div>

        <div className="hidden lg:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-600 items-center">
          <a href="#home" className="hover:text-blue-700 transition-all hover:scale-105">home</a>
          <a href="#about" className="hover:text-blue-700 transition-all hover:scale-105">about</a>
          <a href="#staff" className="hover:text-blue-700 transition-all hover:scale-105">faculty</a>
          <a href="#announcements" className="hover:text-blue-700 transition-all hover:scale-105">announcements</a>
          <a href="/login" className="bg-linear-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
            Admin Login
          </a>
        </div>

        
      </nav>

      {/* HERO */}
      <section id="home" className="relative pt-28 pb-36 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-900 via-blue-700 to-indigo-600 mb-8 tracking-tighter uppercase leading-tight">
            USWA COLLEGE
          </h1>
          <p className="text-xl md:text-3xl font-bold text-slate-600 mb-6">Character Building & Academic Excellence</p>
          <p className="text-sm text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Empowering students with knowledge, values, and skills for a brighter future
          </p>
          <div className="mt-12 flex gap-4 justify-center flex-wrap">
            <a href="#announcements" className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-xl hover:bg-blue-800 transition-all hover:scale-105">
              View Announcements
            </a>
            <a href="tel:03010637955" className="bg-white border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-xl hover:bg-blue-50 transition-all hover:scale-105">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-5xl font-black text-blue-900 mb-16 uppercase tracking-tight">Our Philosophy</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-12 bg-white rounded-[3rem] border-t-8 border-blue-700 shadow-2xl shadow-blue-100/50 hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-blue-700" size={40} />
            </div>
            <h3 className="text-3xl font-black mb-6 text-blue-900 uppercase tracking-tight">Mission</h3>
            <p className="text-slate-600 font-medium leading-relaxed text-lg">
              To provide affordable, high-quality education with strong ethical values, preparing students for success in academics and life.
            </p>
          </div>
          
          <div className="p-12 bg-white rounded-[3rem] border-t-8 border-indigo-600 shadow-2xl shadow-indigo-100/50 hover:scale-105 transition-transform duration-300">
            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="text-indigo-600" size={40} />
            </div>
            <h3 className="text-3xl font-black mb-6 text-indigo-900 uppercase tracking-tight">Vision</h3>
            <p className="text-slate-600 font-medium leading-relaxed text-lg">
              To lead in regional education by nurturing talented minds and building future leaders with integrity and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* STAFF SECTION */}
      {displayTeachers.length > 0 && (
        <section id="staff" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-center text-5xl font-black text-blue-900 mb-16 uppercase tracking-tight">Our Expert Faculty</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {displayTeachers.map(teacher => (
              <div key={teacher.id} className="text-center group">
                <div className="relative overflow-hidden rounded-[2.5rem] mb-6 shadow-xl">
                  <img 
                    src={teacher.img} 
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={teacher.name} 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h4 className="font-black text-blue-950 text-xl mb-1 uppercase tracking-tight">{teacher.name}</h4>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">{teacher.subject}</p>
                {teacher.qualification && (
                  <p className="text-[9px] text-slate-500 font-medium mt-1">{teacher.qualification}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ANNOUNCEMENTS SECTION */}
      <section id="announcements" className="py-24 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-[4rem] mx-4 px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Megaphone className="text-yellow-400" size={24} />
              <span className="font-black uppercase text-sm tracking-widest">Live Updates</span>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tight mb-4">Campus Announcements</h2>
            <p className="text-blue-200 font-medium">Stay updated with the latest news and events</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayAnnouncements.map((announcement) => (
              <div 
                key={announcement.id} 
                className={`p-8 rounded-[2.5rem] backdrop-blur-md border-2 hover:scale-105 transition-all duration-300 shadow-xl group ${
                  announcement.type === "urgent" 
                    ? "bg-red-500/20 border-red-400/50 hover:bg-red-500/30" 
                    : announcement.type === "event"
                    ? "bg-blue-500/20 border-blue-400/50 hover:bg-blue-500/30"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    announcement.type === "urgent" 
                      ? "bg-red-500/30" 
                      : announcement.type === "event"
                      ? "bg-blue-500/30"
                      : "bg-white/10"
                  }`}>
                    {announcement.type === "urgent" ? (
                      <AlertCircle className="text-red-300" size={24} />
                    ) : announcement.type === "event" ? (
                      <Calendar className="text-blue-300" size={24} />
                    ) : (
                      <Bell className="text-white" size={24} />
                    )}
                  </div>
                  <span className={`text-[9px] font-bold uppercase px-3 py-1.5 rounded-lg ${
                    announcement.type === "urgent" 
                      ? "bg-red-500 text-white" 
                      : announcement.type === "event"
                      ? "bg-blue-500 text-white"
                      : "bg-white/20 text-white"
                  }`}>
                    {announcement.type}
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-3 uppercase tracking-tight leading-tight group-hover:text-yellow-300 transition-colors">
                  {announcement.title}
                </h3>
                
                <p className="text-white/80 text-sm font-medium leading-relaxed mb-4">
                  {announcement.message}
                </p>

                <div className="flex items-center gap-2 text-xs text-white/60 font-bold">
                  <Calendar size={14} />
                  <span>{new Date(announcement.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </div>
            ))}
          </div>

          {displayAnnouncements.length === 0 && (
            <div className="text-center py-20">
              <Bell className="mx-auto text-white/20 mb-4" size={64} />
              <p className="text-white/60 font-bold text-lg">No announcements at the moment</p>
              <p className="text-white/40 text-sm mt-2">Check back later for updates</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <div className="bg-linear-to-r from-blue-700 to-indigo-700 p-12 rounded-[3rem] shadow-2xl">
          <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">Ready to Join?</h2>
          <p className="text-blue-100 text-lg font-medium mb-8 max-w-2xl mx-auto">
            Enroll now for FSC & ICS programs. Limited seats available for 2026 batch.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="tel:03010637955" className="bg-white text-blue-700 px-10 py-4 rounded-2xl font-black uppercase text-sm shadow-xl hover:scale-105 transition-all">
              Call Now: 0301-0637955
            </a>
            <a href="#announcements" className="bg-blue-800/50 text-white border-2 border-white/30 px-10 py-4 rounded-2xl font-black uppercase text-sm shadow-xl hover:bg-blue-800 transition-all hover:scale-105">
              View Latest Updates
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-linear-to-r from-slate-900 to-blue-900 py-12 text-center border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-700 p-2 rounded-xl">
              <GraduationCap size={24} className="text-white" />
            </div>
            <h3 className="text-white font-black text-xl uppercase">USWA COLLEGE</h3>
          </div>
          <p className="text-blue-200 text-sm font-medium mb-4">Bhowana Campus • Character Building & Academic Excellence</p>
          <p className="text-[10px] text-blue-400 font-black tracking-[0.5em] uppercase">
            © 2026 USWA COLLEGE • ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}