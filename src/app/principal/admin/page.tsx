"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Users, GraduationCap, ShieldCheck, Search, Plus, Calendar, 
  Image as ImageIcon, UserPlus, LayoutDashboard, Settings, 
  LogOut, Bell, ChevronRight, Trash2, Pencil, X, Key, Camera, 
  ArrowLeft, Layers, FolderOpen, Download, Upload, TrendingUp,
  BookOpen, Award, Clock, Mail, Phone, MapPin, Edit3, Save,
  CheckCircle, XCircle, Filter, SortAsc, BarChart3, PieChart,
  Activity, Target, Briefcase, FileText, MessageSquare, Star,
  Home, Eye
} from "lucide-react";

// --- Types ---
interface Teacher { 
  id: number; 
  name: string; 
  subject: string; 
  email: string; 
  img: string; 
  phone: string;
  qualification: string;
  experience: string;
  salary: string;
  joiningDate: string;
  address: string;
  showOnHomepage: boolean; // 🆕 NEW FIELD
}

interface Student { 
  id: number; 
  name: string; 
  batch: string; 
  grade: string; 
  roll: string; 
  img: string; 
  phone: string; 
  subject: string;
  fatherName: string;
  address: string;
  dob: string;
  admissionDate: string;
  previousSchool: string;
  guardianEmail: string;
}

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "general" | "urgent" | "event";
}

// ✅ Vector placeholder SVGs (no more pravatar!)
const getDefaultAvatar = (type: "teacher" | "student") => {
  if (type === "teacher") {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23e0e7ff' width='200' height='200'/%3E%3Cpath fill='%234f46e5' d='M100 90c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30zm0 15c20 0 60 10 60 30v25H40v-25c0-20 40-30 60-30z'/%3E%3C/svg%3E`;
  } else {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23ddd6fe' width='200' height='200'/%3E%3Cpath fill='%237c3aed' d='M100 90c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30zm0 15c20 0 60 10 60 30v25H40v-25c0-20 40-30 60-30z'/%3E%3C/svg%3E`;
  }
};

export default function PrincipalDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "teachers" | "students" | "announcements">("dashboard");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "roll" | "recent">("name");
  const [filterHomepage, setFilterHomepage] = useState<"all" | "homepage" | "hidden">("all"); // 🆕 Filter for homepage
  
  // Modals
  const [formOpen, setFormOpen] = useState(false);
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<any>(null);
  const [viewDetailsModal, setViewDetailsModal] = useState<any>(null);
  const [announcementModal, setAnnouncementModal] = useState(false);
  const [yearEditModal, setYearEditModal] = useState(false);
  const [editingYear, setEditingYear] = useState<string | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  
  const [tempImg, setTempImg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States with Hierarchy Data
  const [years, setYears] = useState<string[]>(["2024", "2025", "2026"]);
  const [classesByYear, setClassesByYear] = useState<Record<string, string[]>>({
    "2024": ["8th Class", "9th Class", "10th Class"],
    "2025": ["9th Class", "10th Class", "11th Class", "12th Class"],
    "2026": ["9th Class", "10th Class"]
  });
  
  const [teachers, setTeachers] = useState<Teacher[]>([
    { 
      id: 1, 
      name: "Arsalan Ahmed", 
      subject: "Mathematics", 
      email: "arsalan@uswa.com", 
      img: getDefaultAvatar("teacher"), 
      phone: "0301-1234567",
      qualification: "M.Sc Mathematics",
      experience: "5 years",
      salary: "Rs. 45,000",
      joiningDate: "2020-01-15",
      address: "Lahore, Pakistan",
      showOnHomepage: true // 🆕 DEFAULT: First teacher shows on homepage
    },
    { 
      id: 2, 
      name: "Fatima Khan", 
      subject: "English", 
      email: "fatima@uswa.com", 
      img: getDefaultAvatar("teacher"), 
      phone: "0302-9876543",
      qualification: "MA English Literature",
      experience: "7 years",
      salary: "Rs. 50,000",
      joiningDate: "2018-08-20",
      address: "Islamabad, Pakistan",
      showOnHomepage: true // 🆕 DEFAULT: Second teacher shows on homepage
    },
    { 
      id: 3, 
      name: "Hassan Ali", 
      subject: "Physics", 
      email: "hassan@uswa.com", 
      img: getDefaultAvatar("teacher"), 
      phone: "0303-5554443",
      qualification: "M.Phil Physics",
      experience: "4 years",
      salary: "Rs. 48,000",
      joiningDate: "2021-03-10",
      address: "Karachi, Pakistan",
      showOnHomepage: false // 🆕 DEFAULT: Third teacher hidden from homepage
    },
  ]);

  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: "Faheem Khokhar", 
      batch: "2026", 
      grade: "9th Class", 
      roll: "R-001", 
      img: getDefaultAvatar("student"), 
      phone: "0300-9998887", 
      subject: "ICS (Physics)",
      fatherName: "Muhammad Khokhar",
      address: "DHA Phase 5, Lahore",
      dob: "2010-05-15",
      admissionDate: "2024-04-01",
      previousSchool: "Beacon House",
      guardianEmail: "khokhar@email.com"
    },
    { 
      id: 2, 
      name: "Ayesha Malik", 
      batch: "2026", 
      grade: "9th Class", 
      roll: "R-002", 
      img: getDefaultAvatar("student"), 
      phone: "0301-7778889", 
      subject: "Pre-Medical",
      fatherName: "Ahmed Malik",
      address: "Gulberg III, Lahore",
      dob: "2010-08-22",
      admissionDate: "2024-04-01",
      previousSchool: "LGS",
      guardianEmail: "malik@email.com"
    },
    { 
      id: 3, 
      name: "Ali Raza", 
      batch: "2025", 
      grade: "10th Class", 
      roll: "R-015", 
      img: getDefaultAvatar("student"), 
      phone: "0302-4445556", 
      subject: "ICS (Computer)",
      fatherName: "Raza Ahmad",
      address: "Johar Town, Lahore",
      dob: "2009-12-10",
      admissionDate: "2023-03-15",
      previousSchool: "Aitchison College",
      guardianEmail: "raza@email.com"
    },
    { 
      id: 4, 
      name: "Zainab Hussain", 
      batch: "2025", 
      grade: "11th Class", 
      roll: "R-025", 
      img: getDefaultAvatar("student"), 
      phone: "0303-2221113", 
      subject: "FSc Pre-Engineering",
      fatherName: "Hussain Shah",
      address: "Model Town, Lahore",
      dob: "2008-03-18",
      admissionDate: "2022-04-20",
      previousSchool: "Convent School",
      guardianEmail: "hussain@email.com"
    },
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: "Mid-Term Exams", message: "Mid-term exams will start from 15th March", date: "2025-02-01", type: "urgent" },
    { id: 2, title: "Annual Sports Day", message: "Sports day celebration on 10th March", date: "2025-02-03", type: "event" },
  ]);

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("uswaPrincipalData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.teachers) {
        // 🆕 Ensure all teachers have showOnHomepage field
        setTeachers(parsed.teachers.map((t: Teacher) => ({
          ...t,
          showOnHomepage: t.showOnHomepage !== undefined ? t.showOnHomepage : false
        })));
      }
      if (parsed.students) setStudents(parsed.students);
      if (parsed.years) setYears(parsed.years);
      if (parsed.classesByYear) setClassesByYear(parsed.classesByYear);
      if (parsed.announcements) setAnnouncements(parsed.announcements);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("uswaPrincipalData", JSON.stringify({
      teachers, students, years, classesByYear, announcements
    }));
  }, [teachers, students, years, classesByYear, announcements]);

  // --- Stats Calculation ---
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = Object.values(classesByYear).flat().length;
  const studentsThisYear = selectedYear ? students.filter(s => s.batch === selectedYear).length : 0;
  const homepageTeachers = teachers.filter(t => t.showOnHomepage).length; // 🆕 Homepage teachers count

  // 🆕 Toggle Homepage Visibility
  const toggleHomepageVisibility = (teacherId: number) => {
    setTeachers(teachers.map(t => 
      t.id === teacherId ? { ...t, showOnHomepage: !t.showOnHomepage } : t
    ));
  };

  // --- Handlers for Hierarchy Management ---
  const handleAddClass = (e: any) => {
    e.preventDefault();
    const className = new FormData(e.target).get("className") as string;
    if (className && selectedYear) {
      setClassesByYear({
        ...classesByYear,
        [selectedYear]: [...(classesByYear[selectedYear] || []), className]
      });
      setClassModalOpen(false);
    }
  };

  const removeYear = (year: string) => {
    if(confirm(`Batch ${year} delete karne se uski saari classes aur students bhi khatam ho jayenge. Continue?`)) {
      setYears(years.filter(y => y !== year));
      setSelectedYear(null);
      // Delete all students from this batch
      setStudents(students.filter(s => s.batch !== year));
    }
  };

  const handleEditYear = (year: string) => {
    setEditingYear(year);
    setYearEditModal(true);
  };

  const handleUpdateYear = (e: any) => {
    e.preventDefault();
    const newYear = new FormData(e.target).get("yearValue") as string;
    
    // Validation: Check if new year already exists (except current one)
    if (newYear !== editingYear && years.includes(newYear)) {
      alert(`Batch ${newYear} already exists! Please choose a different year.`);
      return;
    }

    if (editingYear) {
      // Update year in years array
      setYears(years.map(y => y === editingYear ? newYear : y));
      
      // Update classes mapping
      const updatedClasses = { ...classesByYear };
      if (updatedClasses[editingYear]) {
        updatedClasses[newYear] = updatedClasses[editingYear];
        delete updatedClasses[editingYear];
      }
      setClassesByYear(updatedClasses);
      
      // Update all students' batch
      setStudents(students.map(s => s.batch === editingYear ? { ...s, batch: newYear } : s));
      
      // Update selected year if it was selected
      if (selectedYear === editingYear) {
        setSelectedYear(newYear);
      }
    }
    
    setYearEditModal(false);
    setEditingYear(null);
  };

  const removeClass = (className: string) => {
    if(confirm(`${className} delete kar dein?`)) {
      setClassesByYear({
        ...classesByYear,
        [selectedYear!]: classesByYear[selectedYear!].filter(c => c !== className)
      });
      // Delete all students from this class
      setStudents(students.filter(s => !(s.batch === selectedYear && s.grade === className)));
    }
  };

  const handleSavePerson = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const personData: any = {
      id: editingPerson?.id || Date.now(),
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      img: tempImg || editingPerson?.img || getDefaultAvatar(activeTab === "teachers" ? "teacher" : "student"),
    };

    if (activeTab === "teachers") {
      personData.subject = formData.get("subject") as string;
      personData.email = formData.get("email") as string;
      personData.qualification = formData.get("qualification") as string;
      personData.experience = formData.get("experience") as string;
      personData.salary = formData.get("salary") as string;
      personData.joiningDate = formData.get("joiningDate") as string;
      personData.address = formData.get("address") as string;
      personData.showOnHomepage = editingPerson?.showOnHomepage || false; // 🆕 Preserve homepage status
      
      if (editingPerson) {
        setTeachers(teachers.map(t => t.id === editingPerson.id ? personData : t));
      } else {
        setTeachers([...teachers, personData]);
      }
    } else {
      personData.batch = selectedYear!;
      personData.grade = selectedGrade!;
      personData.roll = editingPerson?.roll || `R-${Date.now().toString().slice(-3)}`;
      personData.subject = formData.get("subject") as string;
      personData.fatherName = formData.get("fatherName") as string;
      personData.address = formData.get("address") as string;
      personData.dob = formData.get("dob") as string;
      personData.admissionDate = formData.get("admissionDate") as string;
      personData.previousSchool = formData.get("previousSchool") as string;
      personData.guardianEmail = formData.get("guardianEmail") as string;
      
      if (editingPerson) {
        setStudents(students.map(s => s.id === editingPerson.id ? personData : s));
      } else {
        setStudents([...students, personData]);
      }
    }
    
    setFormOpen(false);
    setEditingPerson(null);
    setTempImg("");
  };

  const handleEditPerson = (person: any) => {
    setEditingPerson(person);
    setTempImg(person.img);
    setFormOpen(true);
  };

  const handleAddAnnouncement = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (editingAnnouncement) {
      // Update existing announcement
      setAnnouncements(announcements.map(a => 
        a.id === editingAnnouncement.id 
          ? {
              ...a,
              title: formData.get("title") as string,
              message: formData.get("message") as string,
              type: formData.get("type") as any
            }
          : a
      ));
    } else {
      // Add new announcement
      setAnnouncements([...announcements, {
        id: Date.now(),
        title: formData.get("title") as string,
        message: formData.get("message") as string,
        date: new Date().toISOString().split('T')[0],
        type: formData.get("type") as any
      }]);
    }
    
    setAnnouncementModal(false);
    setEditingAnnouncement(null);
  };

  // ✅ FIXED: Announcement delete handler
  const handleDeleteAnnouncement = (announcementId: number) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter(a => a.id !== announcementId));
    }
  };

  const handlePasswordReset = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // Store password in localStorage (in real app, this would be backend call)
    localStorage.setItem("uswaPrincipalPassword", newPassword);
    alert("Password updated successfully! Please logout and login again with new password.");
    setPasswordResetModal(false);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      // In real app, this would clear auth tokens
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      alert("Logged out successfully!");
      setLogoutModal(false);
      window.location.href = "/login";
    }
  };

  // Filter and sort logic
  const getFilteredAndSortedList = () => {
    let list: (Teacher | Student)[] = activeTab === "teachers" ? teachers : students.filter(s => s.batch === selectedYear && s.grade === selectedGrade);
    
    // Search filter
    if (searchTerm) {
      list = list.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    // 🆕 Homepage filter for teachers
    if (activeTab === "teachers" && filterHomepage !== "all") {
      list = (list as Teacher[]).filter(t => 
        filterHomepage === "homepage" ? t.showOnHomepage : !t.showOnHomepage
      );
    }
    
    // Subject filter for students
    if (activeTab === "students" && filterSubject !== "all") {
      list = (list as Student[]).filter(s => s.subject === filterSubject);
    }
    
    // Sorting
    if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "roll" && activeTab === "students") {
      list = [...list].sort((a: any, b: any) => a.roll.localeCompare(b.roll));
    }
    
    return list;
  };

  const uniqueSubjects = [...new Set(students.filter(s => s.batch === selectedYear && s.grade === selectedGrade).map(s => s.subject))];

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 text-slate-900 font-sans antialiased p-5">
      {/* ─── SIDEBAR ─── */}
      <aside className="hidden lg:flex lg:w-80 lg:flex-col lg:bg-linear-to-b lg:from-slate-950 lg:to-slate-900 lg:rounded-[2.5rem] lg:p-8 lg:shadow-2xl lg:border lg:border-white/10">
        <div className="flex items-center gap-4 mb-12 pb-6 border-b border-white/10">
          <div className="bg-linear-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl text-white shadow-lg shadow-indigo-500/50 animate-pulse">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 className="text-white font-black text-2xl uppercase leading-none tracking-tight">
              USWA <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">CAMPAS</span>
            </h2>
            <p className="text-indigo-400 text-[9px] font-black uppercase mt-1.5 tracking-widest leading-none">Admin Control Center</p>
          </div>
        </div>

        
       

        <nav className="flex-1 space-y-2">
          <NavItem active={activeTab === "dashboard"} icon={<LayoutDashboard size={20} />} label="Overview" onClick={() => {setActiveTab("dashboard"); setSelectedYear(null); setSelectedGrade(null);}} />
          <NavItem active={activeTab === "teachers"} icon={<GraduationCap size={20} />} label="Teachers" onClick={() => {setActiveTab("teachers"); setSelectedYear(null); setSelectedGrade(null);}} />
          <NavItem active={activeTab === "students"} icon={<Users size={20} />} label="Students" onClick={() => setActiveTab("students")} />
          <NavItem active={activeTab === "announcements"} icon={<Bell size={20} />} label="Announcements" onClick={() => {setActiveTab("announcements"); setSelectedYear(null); setSelectedGrade(null);}} />
        </nav>

        <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 bg-white/5 rounded-xl hover:bg-white/10 transition text-sm">
            <Download size={18} /> Export Data
          </button>
          <button onClick={() => setSettingsOpen(!settingsOpen)} className="w-full flex items-center justify-between p-4 text-slate-400 bg-white/5 rounded-xl hover:bg-white/10 transition">
            <div className="flex items-center gap-3"><Settings size={20} /> Settings</div>
            <ChevronRight size={16} className={`transition-transform ${settingsOpen ? "rotate-90" : ""}`} />
          </button>
          
          {settingsOpen && (
            <div className="space-y-2 pl-4 animate-in slide-in-from-left-2">
              <button onClick={() => setPasswordResetModal(true)} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 bg-white/5 rounded-xl hover:bg-white/10 transition text-sm">
                <Key size={16} /> Reset Password
              </button>
              <button onClick={() => setLogoutModal(true)} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition text-sm">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 px-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10 bg-white/80 backdrop-blur-xl p-6 rounded-4xl border border-white/60 shadow-xl shadow-indigo-100/20">
           <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter bg-linear-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
                {selectedGrade ? selectedGrade : selectedYear ? `Batch ${selectedYear}` : activeTab}
              </h1>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Official Campus Management System</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-600 transition" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-6 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold w-64 outline-none transition focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300" 
                />
              </div>
              <button className="p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition relative">
                <Bell size={20} className="text-slate-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {announcements.length}
                </span>
              </button>
           </div>
        </header>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6">
              <StatCard icon={<Users className="text-indigo-600" size={32} />} title="Total Students" value={totalStudents} trend="+12%" color="indigo" />
              <StatCard icon={<GraduationCap className="text-purple-600" size={32} />} title="Total Teachers" value={totalTeachers} trend="+3%" color="purple" />
              <StatCard icon={<Layers className="text-blue-600" size={32} />} title="Total Classes" value={totalClasses} trend="+5%" color="blue" />
              <StatCard icon={<Home className="text-emerald-600" size={32} />} title="Homepage Teachers" value={homepageTeachers} trend="Active" color="green" /> {/* 🆕 NEW STAT CARD */}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tight">Students by Batch</h3>
                  <BarChart3 className="text-indigo-600" size={24} />
                </div>
                <div className="space-y-4">
                  {years.map(year => {
                    const count = students.filter(s => s.batch === year).length;
                    const percentage = totalStudents > 0 ? (count / totalStudents) * 100 : 0;
                    return (
                      <div key={year} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-slate-600">Batch {year}</span>
                          <span className="text-indigo-600">{count} students</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <div 
                            className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" 
                            style={{width: `${percentage}%`, minWidth: 0}}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tight">Recent Announcements</h3>
                  <Bell className="text-purple-600" size={24} />
                </div>
                <div className="space-y-4">
                  {announcements.slice(0, 3).map(ann => (
                    <div key={ann.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-black text-sm text-slate-900">{ann.title}</h4>
                        <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-lg ${
                          ann.type === "urgent" ? "bg-red-100 text-red-600" :
                          ann.type === "event" ? "bg-blue-100 text-blue-600" :
                          "bg-slate-100 text-slate-600"
                        }`}>{ann.type}</span>
                      </div>
                      <p className="text-xs text-slate-600">{ann.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-linear-to-br from-indigo-600 to-purple-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-200">
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-4">
                <QuickAction icon={<UserPlus size={24} />} label="Add Student" onClick={() => {setActiveTab("students"); setFormOpen(true);}} />
                <QuickAction icon={<GraduationCap size={24} />} label="Add Teacher" onClick={() => {setActiveTab("teachers"); setFormOpen(true);}} />
                <QuickAction icon={<Bell size={24} />} label="New Announcement" onClick={() => setAnnouncementModal(true)} />
                <QuickAction icon={<Download size={24} />} label="Export Reports" onClick={() => alert("Export feature coming soon!")} />
              </div>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {activeTab === "announcements" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border shadow-xl">
              <h2 className="text-2xl font-black uppercase">Announcements Center</h2>
              <button onClick={() => setAnnouncementModal(true)} className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-lg hover:shadow-indigo-200 transition flex items-center gap-2">
                <Plus size={18}/> New Announcement
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {announcements.map(ann => (
                <div key={ann.id} className="bg-white p-6 rounded-4xl border shadow-md hover:shadow-xl transition group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-black text-slate-900">{ann.title}</h3>
                        <span className={`text-[9px] font-bold uppercase px-3 py-1 rounded-lg ${
                          ann.type === "urgent" ? "bg-red-100 text-red-600" :
                          ann.type === "event" ? "bg-blue-100 text-blue-600" :
                          "bg-slate-100 text-slate-600"
                        }`}>{ann.type}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{ann.message}</p>
                      <p className="text-xs text-slate-400 font-bold">{ann.date}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => {setEditingAnnouncement(ann); setAnnouncementModal(true);}} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition" title="Edit Announcement">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDeleteAnnouncement(ann.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition" title="Delete Announcement">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === "students" && (
          <div className="animate-in fade-in duration-500">
            {/* Level 1: Year Management */}
            {!selectedYear && (
              <div className="grid grid-cols-4 gap-6">
                {years.map(year => {
                  const studentCount = students.filter(s => s.batch === year).length;
                  return (
                    <div key={year} className="relative group">
                      <FolderCard 
                        label={year} 
                        subText={`${studentCount} Students`} 
                        icon={<Layers className="text-indigo-600" />} 
                        onClick={() => setSelectedYear(year)} 
                      />
                      <div className="absolute -top-2 -right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                        <button onClick={(e) => {e.stopPropagation(); handleEditYear(year);}} className="p-2 bg-blue-500 text-white rounded-xl shadow-lg hover:scale-110 transition" title="Edit Batch">
                          <Pencil size={16}/>
                        </button>
                        <button onClick={(e) => {e.stopPropagation(); removeYear(year);}} className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:scale-110 transition" title="Delete Batch">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button onClick={() => setYears([...years, (parseInt(years[years.length-1] || "2024")+1).toString()])} className="border-4 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-8 hover:bg-white hover:border-indigo-300 transition group bg-white/50">
                   <Plus size={40} className="text-slate-300 group-hover:text-indigo-500 transition"/>
                   <span className="text-slate-400 font-black uppercase text-[10px] mt-4 tracking-widest">New Batch</span>
                </button>
              </div>
            )}

            {/* Level 2: Class Management */}
            {selectedYear && !selectedGrade && (
              <div className="space-y-8">
                <div className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border shadow-xl animate-in slide-in-from-left-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedYear(null)} className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition" title="Go Back">
                      <ArrowLeft size={20}/>
                    </button>
                    <div>
                      <h2 className="text-2xl font-black uppercase">Batch {selectedYear}</h2>
                      <p className="text-xs text-slate-500 font-bold mt-1">{students.filter(s => s.batch === selectedYear).length} students enrolled</p>
                    </div>
                  </div>
                  <button onClick={() => setClassModalOpen(true)} className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase shadow-lg hover:shadow-indigo-200 transition flex items-center gap-2">
                    <Plus size={18}/> Add Class
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {(classesByYear[selectedYear] || []).map(className => {
                    const classStudentCount = students.filter(s => s.batch === selectedYear && s.grade === className).length;
                    return (
                      <div key={className} className="relative group">
                        <ClassCard label={className} count={classStudentCount} onClick={() => setSelectedGrade(className)} />
                        <button onClick={() => removeClass(className)} className="absolute top-4 right-4 p-3 bg-red-50 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-500 hover:text-white" title="Delete Class">
                          <Trash2 size={20}/>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Level 3: Student Management */}
            {selectedYear && selectedGrade && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] border shadow-xl animate-in slide-in-from-right-4">
                   <div className="flex items-center gap-4">
                      <button onClick={() => setSelectedGrade(null)} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition" title="Go Back">
                        <ArrowLeft size={20}/>
                      </button>
                      <div>
                        <h2 className="text-2xl font-black uppercase">{selectedGrade}</h2>
                        <p className="text-xs text-slate-500 font-bold mt-1">{students.filter(s => s.batch === selectedYear && s.grade === selectedGrade).length} students</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      {uniqueSubjects.length > 0 && (
                        <select title="Filter by Subject" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="px-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-indigo-300">
                          <option value="all">All Subjects</option>
                          {uniqueSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                        </select>
                      )}
                      <button onClick={() => setFormOpen(true)} className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-lg hover:shadow-indigo-200 flex items-center gap-2 transition active:scale-95">
                        <Plus size={18}/> Add Student
                      </button>
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                   {getFilteredAndSortedList().map(item => (
                      <PersonCard 
                        key={item.id} 
                        person={item} 
                        onDelete={() => setStudents(students.filter(s => s.id !== item.id))}
                        onEdit={() => handleEditPerson(item)}
                        onView={() => setViewDetailsModal(item)}
                      />
                   ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TEACHERS TAB */}
        {activeTab === "teachers" && (
           <div className="space-y-6">
             <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border shadow-xl">
                <div>
                  <h2 className="text-2xl font-black uppercase">Teaching Faculty</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">
                    {teachers.length} teachers • {homepageTeachers} on homepage
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* 🆕 HOMEPAGE FILTER */}
                  <select 
                    title="Filter by Homepage Visibility"
                    value={filterHomepage} 
                    onChange={(e) => setFilterHomepage(e.target.value as any)} 
                    className="px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-emerald-300"
                  >
                    <option value="all">All Teachers</option>
                    <option value="homepage">📍 On Homepage</option>
                    <option value="hidden">🔒 Hidden</option>
                  </select>
                  
                  <button onClick={() => setFormOpen(true)} className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-lg hover:shadow-indigo-200 flex items-center gap-2 transition">
                    <Plus size={18}/> New Teacher
                  </button>
                </div>
             </div>
             <div className="grid grid-cols-3 gap-6">
                {getFilteredAndSortedList().map(t => (
                  <TeacherCard 
                    key={t.id} 
                    teacher={t as Teacher}
                    onDelete={() => setTeachers(teachers.filter(x => x.id !== t.id))}
                    onEdit={() => handleEditPerson(t)}
                    onView={() => setViewDetailsModal(t)}
                    onToggleHomepage={() => toggleHomepageVisibility(t.id)} // 🆕 TOGGLE HANDLER
                  />
                ))}
             </div>
           </div>
        )}
      </main>

      {/* --- YEAR EDIT MODAL --- */}
      {yearEditModal && editingYear && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-210 p-6 animate-in zoom-in-95">
          <form onSubmit={handleUpdateYear} className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl border-t-12 border-blue-600">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-blue-50 rounded-xl">
                 <Pencil className="text-blue-600" size={24} />
               </div>
               <h3 className="text-2xl font-black uppercase">Edit Year/Batch</h3>
             </div>
             
             <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4 mb-6">
               <p className="text-xs text-blue-800 font-bold mb-2">⚠️ Important:</p>
               <p className="text-xs text-blue-700">Changing the year will automatically update all related students and classes to the new batch year.</p>
             </div>

             <div className="space-y-2 mb-6">
               <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-widest">Year/Batch Number</label>
               <input 
                 name="yearValue" 
                 type="text"
                 defaultValue={editingYear}
                 placeholder="e.g. 2025, 2021-2023, Batch 2025" 
                 required 
                 className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-2 border-slate-100 outline-none focus:border-blue-500 text-center text-xl tracking-wide" 
               />
               <p className="text-[10px] text-slate-400 ml-4 mt-1">Enter year or batch name (e.g., 2025, 2021-2023, Batch 2025)</p>
             </div>

             <div className="flex gap-4">
                <button type="button" onClick={() => {setYearEditModal(false); setEditingYear(null);}} className="flex-1 p-4 rounded-2xl font-black uppercase text-[10px] text-slate-400 bg-slate-100 hover:bg-slate-200 transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl font-black uppercase text-[10px] shadow-lg hover:shadow-blue-200 transition">
                  Update Year
                </button>
             </div>
          </form>
        </div>
      )}

      {/* --- ADD CLASS MODAL --- */}
      {classModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-210 p-6 animate-in zoom-in-95">
          <form onSubmit={handleAddClass} className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl border-t-12 border-indigo-600">
             <h3 className="text-xl font-black uppercase mb-6">Create New Class</h3>
             <input name="className" placeholder="e.g. 11th Class" required className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-2 border-slate-100 outline-none focus:border-indigo-500 mb-6" />
             <div className="flex gap-4">
                <button type="button" onClick={() => setClassModalOpen(false)} className="flex-1 p-4 rounded-2xl font-black uppercase text-[10px] text-slate-400 bg-slate-100 hover:bg-slate-200 transition">Cancel</button>
                <button type="submit" className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl font-black uppercase text-[10px] shadow-lg hover:shadow-indigo-200 transition">Create</button>
             </div>
          </form>
        </div>
      )}

      {/* --- ANNOUNCEMENT MODAL --- */}
      {announcementModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-210 p-6 animate-in fade-in">
          <form onSubmit={handleAddAnnouncement} className="bg-white rounded-[3rem] p-10 w-full max-w-lg shadow-2xl border-t-12 border-purple-600">
            <h3 className="text-2xl font-black uppercase mb-6">
              {editingAnnouncement ? "Edit Announcement" : "New Announcement"}
            </h3>
            <div className="space-y-4">
              <input 
                name="title" 
                placeholder="Announcement Title" 
                defaultValue={editingAnnouncement?.title || ""}
                required 
                className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-2 border-slate-100 outline-none focus:border-purple-500" 
              />
              <textarea 
                name="message" 
                placeholder="Message Details" 
                defaultValue={editingAnnouncement?.message || ""}
                required 
                className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-2 border-slate-100 outline-none focus:border-purple-500 h-32 resize-none" 
              />
              <select 
                name="type" 
                title="Announcement Type"
                defaultValue={editingAnnouncement?.type || "general"}
                required 
                className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-2 border-slate-100 outline-none focus:border-purple-500"
              >
                <option value="general">General</option>
                <option value="urgent">Urgent</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div className="flex gap-4 mt-6">
              <button type="button" onClick={() => {setAnnouncementModal(false); setEditingAnnouncement(null);}} className="flex-1 p-4 rounded-2xl font-black uppercase text-[10px] text-slate-400 bg-slate-100 hover:bg-slate-200 transition">Cancel</button>
              <button type="submit" className="flex-1 bg-linear-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl font-black uppercase text-[10px] shadow-lg">
                {editingAnnouncement ? "Update" : "Publish"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- REGISTRATION/EDIT MODAL --- */}
      {formOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-210 p-6 overflow-y-auto animate-in fade-in">
          <form onSubmit={handleSavePerson} className="bg-white rounded-[4rem] p-10 w-full max-w-2xl shadow-2xl border-t-16 border-indigo-600 my-8">
             <div className="flex justify-between items-center mb-8 border-b pb-4">
               <h3 className="text-2xl font-black uppercase tracking-tighter">
                 {editingPerson ? "Edit" : "New"} {activeTab === "teachers" ? "Teacher" : "Student"}
               </h3>
               <button type="button" onClick={() => {setFormOpen(false); setEditingPerson(null); setTempImg("");}} className="p-2 hover:bg-slate-100 rounded-xl transition" title="Close Modal">
                 <X size={24}/>
               </button>
             </div>
             
             <div className="flex flex-col items-center mb-8 relative">
                <div onClick={() => fileInputRef.current?.click()} className="relative cursor-pointer group">
                  <img 
                    src={tempImg || editingPerson?.img || getDefaultAvatar(activeTab === "teachers" ? "teacher" : "student")} 
                    alt="Profile Preview"
                    className="w-36 h-36 rounded-[3rem] object-cover border-4 border-slate-100 shadow-2xl group-hover:brightness-90 transition" 
                  />
                  <div className="absolute -bottom-3 -right-3 bg-indigo-600 text-white p-3 rounded-2xl shadow-xl border-4 border-white group-hover:scale-110 transition">
                    <Camera size={20} />
                  </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" title="Upload Profile Image" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setTempImg(reader.result as string);
                        reader.readAsDataURL(file);
                    }
                }} />
             </div>

             <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
               <FormField label="Full Name" name="name" defaultValue={editingPerson?.name} required />
               <FormField label="Phone" name="phone" defaultValue={editingPerson?.phone} required />
               
               {activeTab === "teachers" ? (
                 <>
                   <FormField label="Subject" name="subject" defaultValue={editingPerson?.subject} />
                   <FormField label="Email" name="email" type="email" defaultValue={editingPerson?.email} />
                   <FormField label="Qualification" name="qualification" defaultValue={editingPerson?.qualification} />
                   <FormField label="Experience" name="experience" defaultValue={editingPerson?.experience} />
                   <FormField label="Salary" name="salary" defaultValue={editingPerson?.salary} />
                   <FormField label="Joining Date" name="joiningDate" type="date" defaultValue={editingPerson?.joiningDate} />
                   <FormField label="Address" name="address" defaultValue={editingPerson?.address} fullWidth />
                 </>
               ) : (
                 <>
                   <FormField label="Subject/Group" name="subject" defaultValue={editingPerson?.subject} />
                   <FormField label="Father's Name" name="fatherName" defaultValue={editingPerson?.fatherName} />
                   <FormField label="Date of Birth" name="dob" type="date" defaultValue={editingPerson?.dob} />
                   <FormField label="Admission Date" name="admissionDate" type="date" defaultValue={editingPerson?.admissionDate} />
                   <FormField label="Previous School" name="previousSchool" defaultValue={editingPerson?.previousSchool} />
                   <FormField label="Guardian Email" name="guardianEmail" type="email" defaultValue={editingPerson?.guardianEmail} />
                   <FormField label="Address" name="address" defaultValue={editingPerson?.address} fullWidth />
                 </>
               )}
             </div>

             <button type="submit" className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-6 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.3em] shadow-xl hover:shadow-indigo-200 transition active:scale-95 mt-6">
               {editingPerson ? "Update" : "Save"} {activeTab === "teachers" ? "Teacher" : "Student"}
             </button>
          </form>
        </div>
      )}

      {/* --- PASSWORD RESET MODAL --- */}
      {passwordResetModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-210 p-6 animate-in fade-in">
          <form onSubmit={handlePasswordReset} className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl border-t-12 border-indigo-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <Key className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase">Reset Password</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-widest">New Password</label>
                <input 
                  name="newPassword" 
                  type="password"
                  placeholder="Enter new password"
                  required 
                  minLength={6}
                  className="w-full bg-slate-50 p-4 rounded-2xl font-bold border-2 border-slate-100 outline-none focus:border-indigo-500" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-widest">Confirm Password</label>
                <input 
                  name="confirmPassword" 
                  type="password"
                  placeholder="Confirm new password"
                  required 
                  minLength={6}
                  className="w-full bg-slate-50 p-4 rounded-2xl font-bold border-2 border-slate-100 outline-none focus:border-indigo-500" 
                />
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-4">
                <p className="text-xs text-indigo-800 font-bold">💡 Password must be at least 6 characters long</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => setPasswordResetModal(false)} className="flex-1 p-4 rounded-2xl font-black uppercase text-[10px] text-slate-400 bg-slate-100 hover:bg-slate-200 transition">
                Cancel
              </button>
              <button type="submit" className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl font-black uppercase text-[10px] shadow-lg hover:shadow-indigo-200 transition">
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {logoutModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-210 p-6 animate-in fade-in">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl border-t-12 border-red-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-50 rounded-xl">
                <LogOut className="text-red-600" size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase">Confirm Logout</h3>
            </div>
            
            <p className="text-slate-600 mb-6">Are you sure you want to logout? Any unsaved changes will be lost.</p>

            <div className="flex gap-4">
              <button onClick={() => setLogoutModal(false)} className="flex-1 p-4 rounded-2xl font-black uppercase text-[10px] text-slate-400 bg-slate-100 hover:bg-slate-200 transition">
                Cancel
              </button>
              <button onClick={handleLogout} className="flex-1 bg-linear-to-r from-red-600 to-pink-600 text-white p-4 rounded-2xl font-black uppercase text-[10px] shadow-lg hover:shadow-red-200 transition">
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- VIEW DETAILS MODAL --- */}
      {viewDetailsModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-210 p-6 animate-in fade-in">
          <div className="bg-white rounded-[4rem] p-10 w-full max-w-2xl shadow-2xl border-t-16 border-purple-600 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-6">
                <img 
                  src={viewDetailsModal.img} 
                  alt={viewDetailsModal.name}
                  className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl border-4 border-slate-100" 
                />
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">{viewDetailsModal.name}</h3>
                  <p className="text-indigo-600 text-sm font-bold mt-1">{viewDetailsModal.subject || viewDetailsModal.qualification}</p>
                  {viewDetailsModal.roll && <p className="text-xs text-slate-500 font-bold mt-1">Roll: {viewDetailsModal.roll}</p>}
                  {/* 🆕 HOMEPAGE BADGE IN VIEW MODAL */}
                  {viewDetailsModal.showOnHomepage !== undefined && (
                    <span className={`inline-flex items-center gap-1 mt-2 text-[9px] font-bold uppercase px-3 py-1.5 rounded-lg ${
                      viewDetailsModal.showOnHomepage 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {viewDetailsModal.showOnHomepage ? "📍 On Homepage" : "🔒 Hidden"}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => setViewDetailsModal(null)} className="p-2 hover:bg-slate-100 rounded-xl transition" title="Close Details">
                <X size={24}/>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <DetailItem icon={<Phone size={16} />} label="Phone" value={viewDetailsModal.phone} />
              <DetailItem icon={<Mail size={16} />} label="Email" value={viewDetailsModal.email || viewDetailsModal.guardianEmail} />
              
              {activeTab === "teachers" ? (
                <>
                  <DetailItem icon={<Award size={16} />} label="Qualification" value={viewDetailsModal.qualification} />
                  <DetailItem icon={<Briefcase size={16} />} label="Experience" value={viewDetailsModal.experience} />
                  <DetailItem icon={<Target size={16} />} label="Salary" value={viewDetailsModal.salary} />
                  <DetailItem icon={<Calendar size={16} />} label="Joining Date" value={viewDetailsModal.joiningDate} />
                  <DetailItem icon={<MapPin size={16} />} label="Address" value={viewDetailsModal.address} fullWidth />
                </>
              ) : (
                <>
                  <DetailItem icon={<Users size={16} />} label="Father's Name" value={viewDetailsModal.fatherName} />
                  <DetailItem icon={<Calendar size={16} />} label="Date of Birth" value={viewDetailsModal.dob} />
                  <DetailItem icon={<Calendar size={16} />} label="Admission Date" value={viewDetailsModal.admissionDate} />
                  <DetailItem icon={<BookOpen size={16} />} label="Previous School" value={viewDetailsModal.previousSchool} />
                  <DetailItem icon={<Layers size={16} />} label="Batch" value={viewDetailsModal.batch} />
                  <DetailItem icon={<GraduationCap size={16} />} label="Class" value={viewDetailsModal.grade} />
                  <DetailItem icon={<MapPin size={16} />} label="Address" value={viewDetailsModal.address} fullWidth />
                </>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => {setViewDetailsModal(null); handleEditPerson(viewDetailsModal);}} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-indigo-700 transition">
                <Edit3 size={16} /> Edit Details
              </button>
              <button onClick={() => setViewDetailsModal(null)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black uppercase text-xs hover:bg-slate-200 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-Components ───
function NavItem({ active, icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${active ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/30" : "text-slate-400 hover:text-white hover:bg-white/10"}`}>
      <span className={active ? "" : "group-hover:scale-110 transition-transform"}>{icon}</span>
      <span className="font-black text-[11px] uppercase tracking-widest leading-none">{label}</span>
    </button>
  );
}

function StatMini({ icon, value, label, color = "indigo" }: any) {
  const colors: any = {
    indigo: "text-indigo-400",
    emerald: "text-emerald-400"
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
      <div className="flex items-center gap-2 mb-2">
        <div className={colors[color]}>{icon}</div>
        <span className="text-2xl font-black text-white">{value}</span>
      </div>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function StatCard({ icon, title, value, trend, color }: any) {
  const colors: any = {
    indigo: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600",
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600"
  };
  
  return (
    <div className="bg-white p-6 rounded-4xl border border-white shadow-xl hover:shadow-2xl transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-linear-to-br ${colors[color]} text-white shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className="text-green-600 text-xs font-black bg-green-50 px-2 py-1 rounded-lg">{trend}</span>
      </div>
      <h3 className="text-3xl font-black text-slate-900 mb-1">{value}</h3>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
    </div>
  );
}

function QuickAction({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-6 rounded-2xl transition-all group hover:scale-105">
      <div className="mb-3 group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-xs font-black uppercase tracking-wide">{label}</span>
    </button>
  );
}

function FolderCard({ label, subText, icon, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-white p-8 rounded-[2.5rem] border-2 border-white shadow-lg hover:shadow-2xl transition-all cursor-pointer group text-center hover:border-indigo-200 hover:scale-105">
      <div className="w-14 h-14 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition mx-auto shadow-inner">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-slate-900 mb-1 uppercase tracking-tight">{label}</h3>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{subText}</p>
    </div>
  );
}

function ClassCard({ label, count, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-white p-12 rounded-[3.5rem] border-2 border-white shadow-xl hover:shadow-2xl hover:border-indigo-300 transition-all cursor-pointer text-center group relative overflow-hidden flex flex-col items-center hover:scale-105">
      <FolderOpen size={60} className="text-indigo-600 mb-4 group-hover:rotate-12 transition-transform" />
      <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">{label}</h3>
      <p className="text-sm font-bold text-slate-400 mt-2">{count} students</p>
      <div className="mt-8 inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase group-hover:text-indigo-600 transition tracking-[0.2em]">
        Open Registry <ChevronRight size={16} />
      </div>
    </div>
  );
}

function PersonCard({ person, onDelete, onEdit, onView }: any) {
  return (
    <div className="bg-white p-6 rounded-[3rem] border border-white shadow-sm hover:shadow-2xl transition-all group relative flex flex-col items-center text-center hover:scale-105">
      <img 
        src={person.img} 
        alt={person.name}
        className="w-32 h-32 rounded-[2.5rem] object-cover ring-8 ring-slate-50 shadow-xl mb-4 group-hover:scale-105 transition duration-500" 
      />
      <h3 className="text-xl font-black text-slate-900 tracking-tighter leading-none">{person.name}</h3>
      <div className="mt-2 space-y-1">
          <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">{person.subject || 'No Subject'}</p>
          <p className="text-slate-400 text-[9px] font-bold tracking-wider">{person.phone}</p>
          {person.roll && <p className="text-slate-500 text-[9px] font-bold">Roll: {person.roll}</p>}
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all flex gap-2">
        <button onClick={onView} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-sm" title="View Details">
          <Eye size={16}/>
        </button>
        <button onClick={onEdit} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm" title="Edit Person">
          <Edit3 size={16}/>
        </button>
        <button onClick={onDelete} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition shadow-sm" title="Delete Person">
          <Trash2 size={16}/>
        </button>
      </div>
    </div>
  );
}

// 🆕 NEW TEACHER CARD COMPONENT WITH HOMEPAGE TOGGLE
function TeacherCard({ teacher, onDelete, onEdit, onView, onToggleHomepage }: any) {
  return (
    <div className="bg-white p-6 rounded-[3rem] border border-white shadow-sm hover:shadow-2xl transition-all group relative flex flex-col items-center text-center hover:scale-105">
      {/* 🆕 HOMEPAGE BADGE */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-1 rounded-lg shadow-sm ${
          teacher.showOnHomepage 
            ? "bg-emerald-500 text-white" 
            : "bg-slate-200 text-slate-500"
        }`}>
          {teacher.showOnHomepage ? "📍 Homepage" : "🔒 Hidden"}
        </span>
      </div>
      
      <img 
        src={teacher.img} 
        alt={teacher.name}
        className="w-32 h-32 rounded-[2.5rem] object-cover ring-8 ring-slate-50 shadow-xl mb-4 group-hover:scale-105 transition duration-500" 
      />
      <h3 className="text-xl font-black text-slate-900 tracking-tighter leading-none">{teacher.name}</h3>
      <div className="mt-2 space-y-1">
          <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">{teacher.subject || 'No Subject'}</p>
          <p className="text-slate-400 text-[9px] font-bold tracking-wider">{teacher.phone}</p>
      </div>
      
      {/* 🆕 HOMEPAGE TOGGLE BUTTON - Always Visible */}
      <button 
        onClick={onToggleHomepage}
        className={`mt-4 w-full py-3 rounded-2xl font-black text-[10px] uppercase tracking-wider transition-all shadow-md ${
          teacher.showOnHomepage
            ? "bg-linear-to-r from-emerald-500 to-green-500 text-white hover:shadow-emerald-200"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        {teacher.showOnHomepage ? "✓ Show on Homepage" : "Add to Homepage"}
      </button>
      
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all flex gap-2">
        <button onClick={onView} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-sm" title="View Details">
          <Eye size={16}/>
        </button>
        <button onClick={onEdit} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm" title="Edit Teacher">
          <Edit3 size={16}/>
        </button>
        <button onClick={onDelete} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition shadow-sm" title="Delete Teacher">
          <Trash2 size={16}/>
        </button>
      </div>
    </div>
  );
}

function FormField({ label, name, type = "text", defaultValue = "", required = false, fullWidth = false }: any) {
  return (
    <div className={`space-y-1 ${fullWidth ? "col-span-2" : ""}`}>
      <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-widest">{label}</label>
      <input 
        name={name} 
        type={type}
        title={label}
        placeholder={`Enter ${label}`}
        defaultValue={defaultValue}
        required={required}
        className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold outline-none focus:border-indigo-500 transition-all text-sm shadow-inner" 
      />
    </div>
  );
}

function DetailItem({ icon, label, value, fullWidth = false }: any) {
  return (
    <div className={`bg-slate-50 p-4 rounded-2xl ${fullWidth ? "col-span-2" : ""}`}>
      <div className="flex items-center gap-2 mb-2 text-slate-400">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-bold text-slate-900">{value || "N/A"}</p>
    </div>
  );
}