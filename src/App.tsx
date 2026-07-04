/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FacultiesAndPrograms from './components/FacultiesAndPrograms';
import CalendarAndHolidays from './components/CalendarAndHolidays';
import TuitionCalculator from './components/TuitionCalculator';
import FAQAndContact from './components/FAQAndContact';
import AdminPortal from './components/AdminPortal';
import { FACULTIES as INITIAL_FACULTIES, CALENDAR_EVENTS as INITIAL_CALENDAR_EVENTS } from './data';
import { Faculty, CalendarEvent } from './types';
import { GraduationCap, Mail, Phone, MapPin, MessageSquare, ExternalLink, ChevronUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  
  // State for faculties to support real runtime CRUD
  const [faculties, setFaculties] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem('uab_faculties_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse faculties from localStorage', e);
      }
    }
    return INITIAL_FACULTIES;
  });

  // State for calendar events to support real runtime CRUD
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('uab_calendar_events_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse calendar events from localStorage', e);
      }
    }
    return INITIAL_CALENDAR_EVENTS;
  });

  // State for admin login session
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('uab_admin_logged_in') === 'true';
  });

  const handleSetLoggedIn = (val: boolean) => {
    setIsLoggedIn(val);
    if (val) {
      localStorage.setItem('uab_admin_logged_in', 'true');
    } else {
      localStorage.removeItem('uab_admin_logged_in');
    }
  };

  // Save faculties to localStorage whenever they change
  const handleUpdateFaculties = (updatedFaculties: Faculty[]) => {
    setFaculties(updatedFaculties);
    localStorage.setItem('uab_faculties_v1', JSON.stringify(updatedFaculties));
  };

  // Save calendar events to localStorage whenever they change
  const handleUpdateCalendarEvents = (updatedEvents: CalendarEvent[]) => {
    setCalendarEvents(updatedEvents);
    localStorage.setItem('uab_calendar_events_v1', JSON.stringify(updatedEvents));
  };

  // Reset faculties back to initial mock data
  const handleResetFaculties = () => {
    if (confirm('Apakah Anda yakin ingin menyetel ulang seluruh data fakultas, program studi, dan UKT kembali ke kondisi awal?')) {
      setFaculties(INITIAL_FACULTIES);
      localStorage.removeItem('uab_faculties_v1');
    }
  };

  // Reset calendar events back to initial mock data
  const handleResetCalendarEvents = () => {
    if (confirm('Apakah Anda yakin ingin menyetel ulang seluruh jadwal agenda kalender kembali ke kondisi awal?')) {
      setCalendarEvents(INITIAL_CALENDAR_EVENTS);
      localStorage.removeItem('uab_calendar_events_v1');
    }
  };

  // Handle scroll to top when changing tabs
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col font-sans" id="app-root">
      {/* Top Banner / Announcement Bar */}
      <div className="bg-primary-950 text-white py-2 text-xs font-semibold" id="top-announcement-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase font-sans">BARU</span>
            <span className="text-primary-100">Kalender Akademik Terbaru TA 2026/2027 Telah Rilis — Silakan cek jadwal perkuliahan Anda</span>
          </div>
          <div className="flex items-center gap-4 text-primary-200">
            <button 
              onClick={() => handleTabChange('faq')}
              className="hover:text-white transition-colors"
            >
              Hubungi Kami
            </button>
            <span>|</span>
            <span>Hotline: (021) 555-0123</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Dynamic Main Body Content */}
      <main className="flex-grow">
        {activeTab === 'beranda' && <Hero onNavigate={handleTabChange} />}
        {activeTab === 'prodi' && (
          <FacultiesAndPrograms 
            onNavigateToCalculator={() => handleTabChange('biaya')} 
            faculties={faculties}
          />
        )}
        {activeTab === 'kalender' && (
          <CalendarAndHolidays 
            events={calendarEvents}
            onUpdateEvents={handleUpdateCalendarEvents}
            onResetEvents={handleResetCalendarEvents}
            isLoggedIn={isLoggedIn}
            onSetLoggedIn={handleSetLoggedIn}
          />
        )}
        {activeTab === 'biaya' && (
          <TuitionCalculator 
            onNavigateToPmb={() => handleTabChange('kalender')} 
            faculties={faculties}
          />
        )}
        {activeTab === 'faq' && <FAQAndContact />}
        {activeTab === 'admin' && (
          <AdminPortal 
            faculties={faculties} 
            onUpdateFaculties={handleUpdateFaculties}
            onResetFaculties={handleResetFaculties}
            isLoggedIn={isLoggedIn}
            onSetLoggedIn={handleSetLoggedIn}
            calendarEvents={calendarEvents}
            onUpdateCalendarEvents={handleUpdateCalendarEvents}
            onResetCalendarEvents={handleResetCalendarEvents}
          />
        )}
      </main>

      {/* Persistent Quick Help Floating Button */}
      {activeTab !== 'faq' && (
        <button
          onClick={() => handleTabChange('faq')}
          className="fixed bottom-6 right-6 z-40 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer focus:outline-none"
          id="floating-help-bubble"
          title="Tanya Asisten PMB"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs font-bold pr-1 hidden sm:inline">Tanya Asisten Virtual</span>
        </button>
      )}

      {/* Beautiful Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-850">
            
            {/* Logo and Brand description */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-600 rounded-xl text-white">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-base font-bold text-white tracking-wider font-sans">
                    UNIVERSITAS
                  </span>
                  <span className="block text-xs font-bold text-primary-500 tracking-widest font-sans uppercase">
                    Anak Bangsa
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Mendidik generasi masa depan yang cerdas, berintegritas, adaptif, dan siap berkontribusi nyata bagi kemajuan bangsa dan negara Republik Indonesia.
              </p>
              <div className="flex gap-4 text-xs font-bold text-slate-500">
                <span>Akreditasi &ldquo;BAIK SEKALI (B)&rdquo;</span>
                <span>&bull;</span>
                <span>UAB Jakarta</span>
              </div>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Tautan Cepat</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button 
                    onClick={() => handleTabChange('beranda')}
                    className="hover:text-primary-400 transition-colors"
                  >
                    Halaman Beranda
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleTabChange('prodi')}
                    className="hover:text-primary-400 transition-colors"
                  >
                    Fakultas &amp; Program Studi
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleTabChange('biaya')}
                    className="hover:text-primary-400 transition-colors"
                  >
                    Simulasi UKT &amp; Subsidi
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleTabChange('kalender')}
                    className="hover:text-primary-400 transition-colors"
                  >
                    Kalender Akademik &amp; Libur
                  </button>
                </li>
              </ul>
            </div>

            {/* Admissions Links */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Layanan Kalender</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button 
                    onClick={() => handleTabChange('kalender')}
                    className="hover:text-primary-400 transition-colors text-left"
                  >
                    Jadwal Ujian Semester
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleTabChange('kalender')}
                    className="hover:text-primary-400 transition-colors text-left"
                  >
                    Hari Libur Akademik
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleTabChange('kalender')}
                    className="hover:text-primary-400 transition-colors text-left"
                  >
                    Registrasi Mahasiswa
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleTabChange('biaya')}
                    className="hover:text-primary-400 transition-colors text-left"
                  >
                    Skema Subsidi UKT
                  </button>
                </li>
              </ul>
            </div>

            {/* Office Contact Info */}
            <div className="md:col-span-3 space-y-4 text-sm">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Layanan Pengaduan</h4>
              <div className="space-y-3">
                <div className="flex gap-2.5 items-start">
                  <MapPin className="h-4.5 w-4.5 text-primary-500 shrink-0 mt-0.5" />
                  <span>Jl. Pendidikan Nusantara No. 45, Kebayoran Baru, Jakarta Pusat, DKI Jakarta - 12190</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Mail className="h-4.5 w-4.5 text-primary-500 shrink-0" />
                  <span>info@anakbangsa.ac.id</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Phone className="h-4.5 w-4.5 text-primary-500 shrink-0" />
                  <span>Telp: (021) 555-0123 / WA: +62 812-3456-7890</span>
                </div>
              </div>
            </div>

          </div>

          {/* Social media, disclaimer, and scroll to top */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div className="space-y-1 text-center md:text-left">
              <span>&copy; {new Date().getFullYear()} Universitas Anak Bangsa (UAB). Hak Cipta Dilindungi Undang-Undang.</span>
              <p className="text-[10px] text-slate-600">
                Terakreditasi BAIK SEKALI (B) oleh Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT).
              </p>
            </div>
            
            <div className="flex gap-6 items-center">
              <a href="#" className="hover:text-white transition-colors">Syarat Ketentuan</a>
              <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <button 
                onClick={handleScrollToTop}
                className="p-2 bg-slate-800 hover:bg-primary-600 hover:text-white rounded-lg transition-all"
                title="Scroll ke atas"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
