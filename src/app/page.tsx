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

interface Teacher {
  id: number;
  name: string;
  subject: string;
  img: string;
  qualification?: string;
  showOnHomepage?: boolean;
}

// 🆕 DEFAULT TEACHERS - Agar localStorage empty hai to ye dikhenge
const DEFAULT_TEACHERS: Teacher[] = [
  {
    id: 1,
    name: "Arsalan Ahmed",
    subject: "Mathematics",
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23e0e7ff' width='200' height='200'/%3E%3Cpath fill='%234f46e5' d='M100 90c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30zm0 15c20 0 60 10 60 30v25H40v-25c0-20 40-30 60-30z'/%3E%3C/svg%3E",
    qualification: "M.Sc Mathematics",
    showOnHomepage: true
  },
  {
    id: 2,
    name: "Fatima Khan",
    subject: "English",
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23ddd6fe' width='200' height='200'/%3E%3Cpath fill='%237c3aed' d='M100 90c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30zm0 15c20 0 60 10 60 30v25H40v-25c0-20 40-30 60-30z'/%3E%3C/svg%3E",
    qualification: "MA English Literature",
    showOnHomepage: true
  },
  {
    id: 3,
    name: "Hassan Ali",
    subject: "Physics",
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23e0e7ff' width='200' height='200'/%3E%3Cpath fill='%234f46e5' d='M100 90c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30zm0 15c20 0 60 10 60 30v25H40v-25c0-20 40-30 60-30z'/%3E%3C/svg%3E",
    qualification: "M.Phil Physics",
    showOnHomepage: true
  },
  {
    id: 4,
    name: "Ayesha Noor",
    subject: "Chemistry",
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23ddd6fe' width='200' height='200'/%3E%3Cpath fill='%237c3aed' d='M100 90c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30zm0 15c20 0 60 10 60 30v25H40v-25c0-20 40-30 60-30z'/%3E%3C/svg%3E",
    qualification: "M.Sc Chemistry",
    showOnHomepage: true
  }
];

// 🆕 DEFAULT ANNOUNCEMENTS
const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  { 
    id: 1, 
    title: "Admissions Open", 
    message: "Admissions 2026 for FSC & ICS are now open. Limited seats available!", 
    date: "2026-02-05", 
    type: "general" 
  },
  { 
    id: 2, 
    title: "Parent Meeting", 
    message: "Parent-Teacher Meeting scheduled for next Saturday at 10 AM.", 
    date: "2026-02-10", 
    type: "event" 
  },
  { 
    id: 3, 
    title: "Mid-Term Exams", 
    message: "Mid-term examinations will begin from March 15th, 2026.", 
    date: "2026-02-08", 
    type: "urgent" 
  }
];

export default function UswaCollegeFunctional() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // 🆕 Client-side hydration check

  // 🆕 Fix hydration mismatch
  useEffect(() => {
    setIsClient(true);
    
    // Load data from localStorage
    const savedData = localStorage.getItem("uswaPrincipalData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        
        // Set announcements
        if (parsed.announcements && Array.isArray(parsed.announcements) && parsed.announcements.length > 0) {
          setAnnouncements(parsed.announcements);
        } else {
          setAnnouncements(DEFAULT_ANNOUNCEMENTS);
        }
        
        // Set teachers (only those with showOnHomepage = true)
        if (parsed.teachers && Array.isArray(parsed.teachers)) {
          const homepageTeachers = parsed.teachers
            .filter((t: Teacher) => t.showOnHomepage === true)
            .slice(0, 4);
          
          if (homepageTeachers.length > 0) {
            setTeachers(homepageTeachers);
          } else {
            // Agar koi teacher homepage pe nahi hai, to defaults use karo
            setTeachers(DEFAULT_TEACHERS);
          }
        } else {
          setTeachers(DEFAULT_TEACHERS);
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        setAnnouncements(DEFAULT_ANNOUNCEMENTS);
        setTeachers(DEFAULT_TEACHERS);
      }
    } else {
      // localStorage empty hai - defaults use karo
      setAnnouncements(DEFAULT_ANNOUNCEMENTS);
      setTeachers(DEFAULT_TEACHERS);
    }
  }, []);

  // ✅ ALWAYS show teachers - no conditional rendering
  const displayTeachers = teachers.length > 0 ? teachers : DEFAULT_TEACHERS;
  const displayAnnouncements = announcements.length > 0 ? announcements : DEFAULT_ANNOUNCEMENTS;

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // 🆕 Prevent hydration mismatch - wait for client-side
  if (!isClient) {
    return null; // or return a loading skeleton
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 font-sans text-slate-900 scroll-smooth">
      
      {/* NAVBAR - Same as before */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-blue-100 sticky top-0 z-50 px-6 py-4 md:px-12 shadow-lg shadow-blue-100/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-blue-700 to-blue-900 p-3 rounded-2xl text-white shadow-xl shadow-blue-500/30">
              <GraduationCap size={32} />
            </div>
            <div>
              <h1 className="font-black text-blue-900 text-xl md:text-2xl tracking-tighter leading-none uppercase">USWA COLLEGE</h1>
              <p className="text-[8px] md:text-[9px] font-bold text-blue-600 tracking-[0.3em] uppercase">Bhowana Campus • Est. 2020</p>
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

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-blue-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={28} className="text-blue-900" />
            ) : (
              <Menu size={28} className="text-blue-900" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-blue-100 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col p-6 space-y-4">
              <a href="#home" onClick={handleLinkClick} className="text-slate-700 hover:text-blue-700 font-bold uppercase tracking-wide py-3 px-4 rounded-xl hover:bg-blue-50 transition-all text-sm">
                🏠 Home
              </a>
              <a href="#about" onClick={handleLinkClick} className="text-slate-700 hover:text-blue-700 font-bold uppercase tracking-wide py-3 px-4 rounded-xl hover:bg-blue-50 transition-all text-sm">
                📖 About
              </a>
              <a href="#staff" onClick={handleLinkClick} className="text-slate-700 hover:text-blue-700 font-bold uppercase tracking-wide py-3 px-4 rounded-xl hover:bg-blue-50 transition-all text-sm">
                👨‍🏫 Faculty
              </a>
              <a href="#announcements" onClick={handleLinkClick} className="text-slate-700 hover:text-blue-700 font-bold uppercase tracking-wide py-3 px-4 rounded-xl hover:bg-blue-50 transition-all text-sm">
                📢 Announcements
              </a>
              <a href="/login" onClick={handleLinkClick} className="bg-linear-to-r from-blue-700 to-blue-900 text-white px-6 py-4 rounded-2xl text-sm font-black uppercase shadow-lg text-center hover:scale-105 transition-all">
                🔐 Admin Login
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative pt-20 md:pt-28 pb-24 md:pb-36 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-900 via-blue-700 to-indigo-600 mb-6 md:mb-8 tracking-tighter uppercase leading-tight">
            USWA COLLEGE
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl font-bold text-slate-600 mb-4 md:mb-6">Character Building & Academic Excellence</p>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed px-4">
            Empowering students with knowledge, values, and skills for a brighter future
          </p>
          <div className="mt-8 md:mt-12 flex gap-3 md:gap-4 justify-center flex-wrap px-4">
            <a href="#announcements" className="bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black uppercase text-[10px] md:text-xs shadow-xl hover:bg-blue-800 transition-all hover:scale-105">
              View Announcements
            </a>
            <a href="tel:03010637955" className="bg-white border-2 border-blue-700 text-blue-700 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black uppercase text-[10px] md:text-xs shadow-xl hover:bg-blue-50 transition-all hover:scale-105">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-black text-blue-900 mb-12 md:mb-16 uppercase tracking-tight">Our Philosophy</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="p-8 md:p-12 bg-white rounded-3xl md:rounded-[3rem] border-t-8 border-blue-700 shadow-2xl shadow-blue-100/50 hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-50 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Target className="text-blue-700" size={36} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 text-blue-900 uppercase tracking-tight">Mission</h3>
            <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg">
              To provide affordable, high-quality education with strong ethical values, preparing students for success in academics and life.
            </p>
          </div>
          
          <div className="p-8 md:p-12 bg-white rounded-3xl md:rounded-[3rem] border-t-8 border-indigo-600 shadow-2xl shadow-indigo-100/50 hover:scale-105 transition-transform duration-300">
            <div className="bg-indigo-50 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Eye className="text-indigo-600" size={36} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 text-indigo-900 uppercase tracking-tight">Vision</h3>
            <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg">
              To lead in regional education by nurturing talented minds and building future leaders with integrity and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ STAFF SECTION - ALWAYS RENDERS (no conditional) */}
      <section id="staff" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-black text-blue-900 mb-12 md:mb-16 uppercase tracking-tight">Our Expert Faculty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayTeachers.map(teacher => (
            <div key={teacher.id} className="text-center group">
              <div className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] mb-4 md:mb-6 shadow-xl">
                <img 
                  src={teacher.img} 
                  className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={teacher.name} 
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h4 className="font-black text-blue-950 text-lg md:text-xl mb-1 uppercase tracking-tight">{teacher.name}</h4>
              <p className="text-[10px] md:text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em]">{teacher.subject}</p>
              {teacher.qualification && (
                <p className="text-[9px] md:text-[10px] text-slate-500 font-medium mt-1">{teacher.qualification}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ANNOUNCEMENTS SECTION */}
      <section id="announcements" className="py-16 md:py-24 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl md:rounded-[4rem] mx-4 px-4 md:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6">
              <Megaphone className="text-yellow-400" size={20} />
              <span className="font-black uppercase text-xs md:text-sm tracking-widest">Live Updates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-3 md:mb-4">Campus Announcements</h2>
            <p className="text-blue-200 font-medium text-sm md:text-base">Stay updated with the latest news and events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {displayAnnouncements.map((announcement) => (
              <div 
                key={announcement.id} 
                className={`p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] backdrop-blur-md border-2 hover:scale-105 transition-all duration-300 shadow-xl group ${
                  announcement.type === "urgent" 
                    ? "bg-red-500/20 border-red-400/50 hover:bg-red-500/30" 
                    : announcement.type === "event"
                    ? "bg-blue-500/20 border-blue-400/50 hover:bg-blue-500/30"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 md:p-3 rounded-xl ${
                    announcement.type === "urgent" 
                      ? "bg-red-500/30" 
                      : announcement.type === "event"
                      ? "bg-blue-500/30"
                      : "bg-white/10"
                  }`}>
                    {announcement.type === "urgent" ? (
                      <AlertCircle className="text-red-300" size={20} />
                    ) : announcement.type === "event" ? (
                      <Calendar className="text-blue-300" size={20} />
                    ) : (
                      <Bell className="text-white" size={20} />
                    )}
                  </div>
                  <span className={`text-[8px] md:text-[9px] font-bold uppercase px-2 md:px-3 py-1 md:py-1.5 rounded-lg ${
                    announcement.type === "urgent" 
                      ? "bg-red-500 text-white" 
                      : announcement.type === "event"
                      ? "bg-blue-500 text-white"
                      : "bg-white/20 text-white"
                  }`}>
                    {announcement.type}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-3 uppercase tracking-tight leading-tight group-hover:text-yellow-300 transition-colors">
                  {announcement.title}
                </h3>
                
                <p className="text-white/80 text-xs md:text-sm font-medium leading-relaxed mb-3 md:mb-4">
                  {announcement.message}
                </p>

                <div className="flex items-center gap-2 text-[10px] md:text-xs text-white/60 font-bold">
                  <Calendar size={12} />
                  <span>{new Date(announcement.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <div className="bg-linear-to-r from-blue-700 to-indigo-700 p-8 md:p-12 rounded-3xl md:rounded-[3rem] shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 md:mb-6 uppercase tracking-tight">Ready to Join?</h2>
          <p className="text-blue-100 text-base md:text-lg font-medium mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Enroll now for FSC & ICS programs. Limited seats available for 2026 batch.
          </p>
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap px-4">
            <a href="tel:03010637955" className="bg-white text-blue-700 px-6 md:px-10 py-3 md:py-4 rounded-2xl font-black uppercase text-xs md:text-sm shadow-xl hover:scale-105 transition-all">
              Call: 0301-0637955
            </a>
            <a href="#announcements" className="bg-blue-800/50 text-white border-2 border-white/30 px-6 md:px-10 py-3 md:py-4 rounded-2xl font-black uppercase text-xs md:text-sm shadow-xl hover:bg-blue-800 transition-all hover:scale-105">
              View Updates
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-linear-to-r from-slate-900 to-blue-900 py-10 md:py-12 text-center border-t border-white/10 mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="bg-blue-700 p-2 rounded-xl">
              <GraduationCap size={20} className="text-white" />
            </div>
            <h3 className="text-white font-black text-lg md:text-xl uppercase">USWA COLLEGE</h3>
          </div>
          <p className="text-blue-200 text-xs md:text-sm font-medium mb-3 md:mb-4">Bhowana Campus • Character Building & Academic Excellence</p>
          <p className="text-[9px] md:text-[10px] text-blue-400 font-black tracking-[0.3em] md:tracking-[0.5em] uppercase">
            © 2026 USWA COLLEGE • ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}