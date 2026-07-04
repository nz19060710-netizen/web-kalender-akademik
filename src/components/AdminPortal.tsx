/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Faculty, ProgramStudi, CalendarEvent } from '../types';
import { 
  Plus, Edit2, Trash2, Shield, Lock, Unlock, Save, X, 
  RotateCcw, FileText, Check, Briefcase, GraduationCap, 
  TrendingUp, Coins, AlertTriangle, Sparkles, Calendar as CalendarIcon, Filter
} from 'lucide-react';

interface AdminPortalProps {
  faculties: Faculty[];
  onUpdateFaculties: (updatedFaculties: Faculty[]) => void;
  onResetFaculties: () => void;
  isLoggedIn: boolean;
  onSetLoggedIn: (loggedIn: boolean) => void;
  calendarEvents: CalendarEvent[];
  onUpdateCalendarEvents: (events: CalendarEvent[]) => void;
  onResetCalendarEvents: () => void;
}

export default function AdminPortal({ 
  faculties, 
  onUpdateFaculties, 
  onResetFaculties,
  isLoggedIn,
  onSetLoggedIn,
  calendarEvents,
  onUpdateCalendarEvents,
  onResetCalendarEvents
}: AdminPortalProps) {
  // Navigation inside Admin
  const [adminSubTab, setAdminSubTab] = useState<'prodi' | 'kalender'>('prodi');

  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // CRUD Forms State (Prodi/Fakultas)
  const [activeForm, setActiveForm] = useState<'none' | 'add_program' | 'edit_program' | 'add_faculty' | 'edit_faculty'>('none');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');

  // Program Form fields
  const [programName, setProgramName] = useState('');
  const [programJenjang, setProgramJenjang] = useState<'D3' | 'S1' | 'S2'>('S1');
  const [programAkreditasi, setProgramAkreditasi] = useState<'A' | 'Unggul' | 'B' | 'Baik Sekali'>('B');
  const [programTuition1, setProgramTuition1] = useState<number>(500000);
  const [programTuition2, setProgramTuition2] = useState<number>(6000000);
  const [programTuition3, setProgramTuition3] = useState<number>(11000000);
  const [programDesc, setProgramDesc] = useState('');
  const [programProspectsText, setProgramProspectsText] = useState(''); // comma separated string

  // Faculty Form fields
  const [facultyName, setFacultyName] = useState('');
  const [facultyCode, setFacultyCode] = useState('');
  const [facultyDesc, setFacultyDesc] = useState('');

  // CRUD Forms State (Calendar Events)
  const [activeCalendarForm, setActiveCalendarForm] = useState<'none' | 'add' | 'edit'>('none');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<'libur' | 'akademik' | 'ujian' | 'pmb'>('akademik');
  const [eventDateStart, setEventDateStart] = useState('');
  const [eventDateEnd, setEventDateEnd] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventIsHoliday, setEventIsHoliday] = useState(false);

  // Status message
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'admin') {
      onSetLoggedIn(true);
      setLoginError('');
      showStatus('Selamat datang! Login berhasil sebagai Administrator.', 'success');
    } else {
      setLoginError('Username atau password salah. Petunjuk: gunakan "admin" & "admin"');
    }
  };

  const handleQuickLogin = () => {
    setUsername('admin');
    setPassword('admin');
    onSetLoggedIn(true);
    setLoginError('');
    showStatus('Login instan berhasil!', 'success');
  };

  // Calendar Event CRUD actions
  const handleCreateCalendarEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDateStart) {
      showStatus('Judul dan tanggal mulai wajib diisi!', 'error');
      return;
    }
    const newEvent: CalendarEvent = {
      id: 'event-' + Date.now(),
      title: eventTitle,
      dateStart: eventDateStart,
      dateEnd: eventDateEnd || undefined,
      category: eventCategory,
      description: eventDesc,
      isNationalHoliday: eventIsHoliday
    };
    onUpdateCalendarEvents([newEvent, ...calendarEvents]);
    showStatus('Berhasil menambahkan agenda baru!', 'success');
    setActiveCalendarForm('none');
    // Clear state
    setEventTitle('');
    setEventDateStart('');
    setEventDateEnd('');
    setEventDesc('');
    setEventIsHoliday(false);
  };

  const openEditCalendarEvent = (ev: CalendarEvent) => {
    setSelectedEventId(ev.id);
    setEventTitle(ev.title);
    setEventCategory(ev.category);
    setEventDateStart(ev.dateStart);
    setEventDateEnd(ev.dateEnd || '');
    setEventDesc(ev.description);
    setEventIsHoliday(ev.isNationalHoliday);
    setActiveCalendarForm('edit');
  };

  const handleUpdateCalendarEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDateStart) {
      showStatus('Judul dan tanggal mulai wajib diisi!', 'error');
      return;
    }
    const updated = calendarEvents.map(ev => {
      if (ev.id === selectedEventId) {
        return {
          ...ev,
          title: eventTitle,
          category: eventCategory,
          dateStart: eventDateStart,
          dateEnd: eventDateEnd || undefined,
          description: eventDesc,
          isNationalHoliday: eventIsHoliday
        };
      }
      return ev;
    });
    onUpdateCalendarEvents(updated);
    showStatus('Berhasil memperbarui agenda!', 'success');
    setActiveCalendarForm('none');
    // Clear state
    setEventTitle('');
    setEventDateStart('');
    setEventDateEnd('');
    setEventDesc('');
    setEventIsHoliday(false);
  };

  const handleDeleteCalendarEvent = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus agenda "${title}"?`)) {
      const filtered = calendarEvents.filter(ev => ev.id !== id);
      onUpdateCalendarEvents(filtered);
      showStatus('Berhasil menghapus agenda.', 'success');
    }
  };

  // Calendar search filters and sorting
  const [adminCalendarSearch, setAdminCalendarSearch] = useState('');
  const [adminCalendarCategory, setAdminCalendarCategory] = useState<string>('all');

  const filteredAdminEvents = useMemo(() => {
    return calendarEvents.filter(ev => {
      if (adminCalendarCategory !== 'all' && ev.category !== adminCalendarCategory) return false;
      if (adminCalendarSearch.trim()) {
        const query = adminCalendarSearch.toLowerCase();
        return ev.title.toLowerCase().includes(query) || ev.description.toLowerCase().includes(query);
      }
      return true;
    }).sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
  }, [calendarEvents, adminCalendarSearch, adminCalendarCategory]);

  // Open Form for Adding Program
  const openAddProgramForm = (facId: string) => {
    setSelectedFacultyId(facId);
    setProgramName('');
    setProgramJenjang('S1');
    setProgramAkreditasi('B');
    setProgramTuition1(500000);
    setProgramTuition2(6000000);
    setProgramTuition3(11000000);
    setProgramDesc('');
    setProgramProspectsText('');
    setActiveForm('add_program');
  };

  // Open Form for Editing Program
  const openEditProgramForm = (facId: string, prog: ProgramStudi) => {
    setSelectedFacultyId(facId);
    setSelectedProgramId(prog.id);
    setProgramName(prog.name);
    setProgramJenjang(prog.jenjang);
    setProgramAkreditasi(prog.akreditasi);
    setProgramTuition1(prog.tuitionGroup1);
    setProgramTuition2(prog.tuitionGroup2);
    setProgramTuition3(prog.tuitionGroup3);
    setProgramDesc(prog.description);
    setProgramProspectsText(prog.prospects.join(', '));
    setActiveForm('edit_program');
  };

  // Open Form for Adding Faculty
  const openAddFacultyForm = () => {
    setFacultyName('');
    setFacultyCode('');
    setFacultyDesc('');
    setActiveForm('add_faculty');
  };

  // Open Form for Editing Faculty
  const openEditFacultyForm = (fac: Faculty) => {
    setSelectedFacultyId(fac.id);
    setFacultyName(fac.name);
    setFacultyCode(fac.code);
    setFacultyDesc(fac.description);
    setActiveForm('edit_faculty');
  };

  // Create Faculty Action
  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyName || !facultyCode) {
      showStatus('Nama Fakultas dan Kode wajib diisi!', 'error');
      return;
    }

    const newFaculty: Faculty = {
      id: facultyCode.toLowerCase().replace(/\s+/g, '-'),
      name: facultyName,
      code: facultyCode.toUpperCase(),
      description: facultyDesc,
      programs: []
    };

    onUpdateFaculties([...faculties, newFaculty]);
    setActiveForm('none');
    showStatus(`Fakultas ${newFaculty.code} berhasil ditambahkan!`);
  };

  // Update Faculty Action
  const handleUpdateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyName || !facultyCode) {
      showStatus('Nama Fakultas dan Kode wajib diisi!', 'error');
      return;
    }

    const updated = faculties.map(fac => {
      if (fac.id === selectedFacultyId) {
        return {
          ...fac,
          name: facultyName,
          code: facultyCode.toUpperCase(),
          description: facultyDesc
        };
      }
      return fac;
    });

    onUpdateFaculties(updated);
    setActiveForm('none');
    showStatus(`Fakultas ${facultyCode} berhasil diperbarui!`);
  };

  // Delete Faculty Action
  const handleDeleteFaculty = (facId: string, facCode: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus Fakultas ${facCode} beserta seluruh program studinya? Tindakan ini tidak bisa dibatalkan.`)) {
      const filtered = faculties.filter(f => f.id !== facId);
      onUpdateFaculties(filtered);
      showStatus(`Fakultas ${facCode} berhasil dihapus!`);
    }
  };

  // Create Program Action
  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programName) {
      showStatus('Nama Program Studi wajib diisi!', 'error');
      return;
    }

    const prospectsArray = programProspectsText
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const newProg: ProgramStudi = {
      id: programName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: programName,
      jenjang: programJenjang,
      akreditasi: programAkreditasi,
      tuitionGroup1: Number(programTuition1),
      tuitionGroup2: Number(programTuition2),
      tuitionGroup3: Number(programTuition3),
      description: programDesc,
      prospects: prospectsArray.length > 0 ? prospectsArray : ['Lulusan Profesional']
    };

    const updated = faculties.map(fac => {
      if (fac.id === selectedFacultyId) {
        return {
          ...fac,
          programs: [...fac.programs, newProg]
        };
      }
      return fac;
    });

    onUpdateFaculties(updated);
    setActiveForm('none');
    showStatus(`Program Studi S1/D3 ${newProg.name} berhasil ditambahkan!`);
  };

  // Update Program Action
  const handleUpdateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programName) {
      showStatus('Nama Program Studi wajib diisi!', 'error');
      return;
    }

    const prospectsArray = programProspectsText
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const updated = faculties.map(fac => {
      if (fac.id === selectedFacultyId) {
        return {
          ...fac,
          programs: fac.programs.map(p => {
            if (p.id === selectedProgramId) {
              return {
                ...p,
                name: programName,
                jenjang: programJenjang,
                akreditasi: programAkreditasi,
                tuitionGroup1: Number(programTuition1),
                tuitionGroup2: Number(programTuition2),
                tuitionGroup3: Number(programTuition3),
                description: programDesc,
                prospects: prospectsArray.length > 0 ? prospectsArray : p.prospects
              };
            }
            return p;
          })
        };
      }
      return fac;
    });

    onUpdateFaculties(updated);
    setActiveForm('none');
    showStatus(`Program Studi ${programName} berhasil diperbarui!`);
  };

  // Delete Program Action
  const handleDeleteProgram = (facId: string, progId: string, progName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus program studi ${progName}?`)) {
      const updated = faculties.map(fac => {
        if (fac.id === facId) {
          return {
            ...fac,
            programs: fac.programs.filter(p => p.id !== progId)
          };
        }
        return fac;
      });

      onUpdateFaculties(updated);
      showStatus(`Program Studi ${progName} berhasil dihapus!`);
    }
  };

  // Stats calculation
  const totalPrograms = useMemo(() => {
    return faculties.reduce((total, fac) => total + fac.programs.length, 0);
  }, [faculties]);

  const avgTuition = useMemo(() => {
    let sum = 0;
    let count = 0;
    faculties.forEach(fac => {
      fac.programs.forEach(p => {
        sum += p.tuitionGroup2;
        count++;
      });
    });
    return count > 0 ? sum / count : 0;
  }, [faculties]);

  // If NOT Logged In, Render Beautiful Login Card
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 px-4 animate-in fade-in zoom-in duration-300" id="admin-login-container">
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-primary-900 px-6 py-8 text-center relative overflow-hidden text-white">
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-3 bg-white/10 rounded-2xl mb-3">
                <Shield className="h-8 w-8 text-primary-300" />
              </div>
              <h2 className="text-xl font-bold">Portal Administrasi UAB</h2>
              <p className="text-xs text-primary-200 mt-1">Kelola Fakultas, Program Studi, &amp; Biaya Kuliah</p>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-800 rounded-full -mr-10 -mt-10 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-700 rounded-full -ml-10 -mb-10 opacity-30"></div>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {loginError && (
              <div className="bg-rose-50 text-rose-700 border border-rose-100 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Username</label>
              <input
                type="text"
                placeholder="Cth: admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <Lock className="h-4 w-4" />
              <span>Masuk Sistem</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-[10px] uppercase font-bold tracking-widest">Atau</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs border border-slate-200 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Masuk Instan (Bypass Pengujian)</span>
            </button>

            <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
              *Hak akses penuh diberikan kepada operator PMB dan dekanat Universitas Anak Bangsa untuk menyunting data akademik.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard View (When Logged In)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="admin-dashboard-root">
      
      {/* Alert status notification bar floating */}
      {statusMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce border text-sm font-semibold ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
            : 'bg-rose-50 text-rose-800 border-rose-100'
        }`}>
          {statusMessage.type === 'success' ? <Check className="h-5 w-5 text-emerald-600" /> : <AlertTriangle className="h-5 w-5 text-rose-600" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Unlock className="h-3.5 w-3.5" />
            <span>Administrator Terhubung</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard Manajemen Akademik</h1>
          <p className="text-sm text-slate-500">Anda memiliki izin penuh untuk mengelola struktur fakultas, prodi, dan simulasi biaya kuliah.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onResetFaculties}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200 cursor-pointer"
            title="Reset Data ke Default"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span>Reset Data Default</span>
          </button>
          <button
            onClick={() => {
              onSetLoggedIn(false);
              showStatus('Anda telah berhasil keluar sistem.', 'success');
            }}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-all border border-rose-100 cursor-pointer"
          >
            Keluar Sesi
          </button>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-500 font-medium">Total Fakultas</span>
            <span className="block text-2xl font-extrabold text-slate-900">{faculties.length}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-500 font-medium">Total Prodi (S1/D3)</span>
            <span className="block text-2xl font-extrabold text-slate-900">{totalPrograms}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-500 font-medium">Rata-rata UKT II</span>
            <span className="block text-lg font-extrabold text-slate-900">
              Rp {avgTuition.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-500 font-medium">Mode Penyuntingan</span>
            <span className="block text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-100 uppercase">
              Aktif &amp; Real-time
            </span>
          </div>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex border-b border-slate-200 mb-8 gap-6">
        <button
          onClick={() => setAdminSubTab('prodi')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            adminSubTab === 'prodi'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Struktur Fakultas &amp; Prodi</span>
        </button>
        <button
          onClick={() => setAdminSubTab('kalender')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            adminSubTab === 'kalender'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CalendarIcon className="h-4 w-4" />
          <span>Kalender &amp; Agenda Akademik</span>
        </button>
      </div>

      {/* TAB 1: FACULTY & STUDY PROGRAM CRUD */}
      {adminSubTab === 'prodi' && (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Dynamic Form Sidebar / Column (Only visible when form active) */}
          {activeForm !== 'none' && (
            <div className="lg:col-span-5 bg-white border border-primary-100 rounded-3xl p-6 shadow-lg shadow-primary-50/50 sticky top-24 animate-in fade-in slide-in-from-left duration-200">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary-600" />
                  {activeForm === 'add_program' && 'Tambah Program Studi'}
                  {activeForm === 'edit_program' && 'Edit Program Studi'}
                  {activeForm === 'add_faculty' && 'Tambah Fakultas Baru'}
                  {activeForm === 'edit_faculty' && 'Edit Detail Fakultas'}
                </h3>
                <button
                  onClick={() => setActiveForm('none')}
                  className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* FACULTY FORMS */}
              {(activeForm === 'add_faculty' || activeForm === 'edit_faculty') && (
                <form onSubmit={activeForm === 'add_faculty' ? handleCreateFaculty : handleUpdateFaculty} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Nama Fakultas</label>
                    <input
                      type="text"
                      placeholder="Cth: Fakultas Ilmu Sosial &amp; Politik"
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Kode Fakultas (Singkatan)</label>
                    <input
                      type="text"
                      placeholder="Cth: FISIP"
                      value={facultyCode}
                      onChange={(e) => setFacultyCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500 uppercase font-bold"
                      required
                      disabled={activeForm === 'edit_faculty'}
                    />
                    <p className="text-[10px] text-slate-400">Kode unik sebagai singkatan resmi fakultas (Cth: FIK, FKK).</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Deskripsi Fakultas</label>
                    <textarea
                      rows={3}
                      placeholder="Deskripsi singkat mengenai fakultas dan fokus pembelajarannya..."
                      value={facultyDesc}
                      onChange={(e) => setFacultyDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Save className="h-4 w-4" />
                      <span>Simpan Fakultas</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveForm('none')}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}

              {/* PROGRAM STUDI FORMS */}
              {(activeForm === 'add_program' || activeForm === 'edit_program') && (
                <form onSubmit={activeForm === 'add_program' ? handleCreateProgram : handleUpdateProgram} className="space-y-4">
                  
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500 mb-2">
                    Fakultas Penempatan: <strong className="text-slate-800 font-bold">
                      {faculties.find(f => f.id === selectedFacultyId)?.name}
                    </strong>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Nama Program Studi</label>
                    <input
                      type="text"
                      placeholder="Cth: Ilmu Hukum, Psikologi"
                      value={programName}
                      onChange={(e) => setProgramName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Jenjang</label>
                      <select
                        value={programJenjang}
                        onChange={(e) => setProgramJenjang(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                      >
                        <option value="S1">Sarjana (S1)</option>
                        <option value="D3">Diploma (D3)</option>
                        <option value="S2">Magister (S2)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Akreditasi</label>
                      <select
                        value={programAkreditasi}
                        onChange={(e) => setProgramAkreditasi(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                      >
                        <option value="Unggul">Unggul</option>
                        <option value="Baik Sekali">Baik Sekali</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Deskripsi Program Studi</label>
                    <textarea
                      rows={2}
                      placeholder="Mempelajari seputar bidang ilmu keahlian ini..."
                      value={programDesc}
                      onChange={(e) => setProgramDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Prospek Karir Lulusan</label>
                    <input
                      type="text"
                      placeholder="Trainer, HRD, Konsultan (pisahkan dengan koma)"
                      value={programProspectsText}
                      onChange={(e) => setProgramProspectsText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                    />
                    <p className="text-[10px] text-slate-400">Masukkan karir lulusan, pisahkan dengan koma.</p>
                  </div>

                  {/* TUITION RANGE */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 space-y-3.5">
                    <span className="text-xs font-extrabold text-primary-950 uppercase tracking-wider block border-b border-slate-200 pb-1.5">
                      Tarif Uang Kuliah Tunggal (UKT)
                    </span>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Kelompok I</label>
                        <input
                          type="number"
                          value={programTuition1}
                          onChange={(e) => setProgramTuition1(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Kelompok II</label>
                        <input
                          type="number"
                          value={programTuition2}
                          onChange={(e) => setProgramTuition2(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Kelompok III</label>
                        <input
                          type="number"
                          value={programTuition3}
                          onChange={(e) => setProgramTuition3(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
                        />
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-normal">
                      UKT I standard subsidi penuh Rp 500.000. UKT II rata-rata kualifikasi kemitraan umum. UKT III standard maksimum program studi.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Save className="h-4 w-4" />
                      <span>Simpan Program</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveForm('none')}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* Tree List / Table of Faculties and Programs (Takes 7 or 12 columns based on form visibility) */}
          <div className={`space-y-6 ${activeForm !== 'none' ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            
            <div className="flex justify-between items-center pb-2">
              <h2 className="text-lg font-bold text-slate-900">Struktur Program Studi Aktif</h2>
              <button
                onClick={openAddFacultyForm}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-primary-100 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah Fakultas</span>
              </button>
            </div>

            {faculties.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-500">
                <GraduationCap className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold">Belum ada fakultas terdaftar</p>
                <p className="text-xs text-slate-400 mt-1">Silakan klik tombol &ldquo;Tambah Fakultas&rdquo; di atas untuk memulai struktur akademik.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {faculties.map((fac) => (
                  <div key={fac.id} className="bg-white border border-slate-150 rounded-3xl shadow-sm overflow-hidden">
                    
                    {/* Faculty Row */}
                    <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-primary-100 text-primary-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                            {fac.code}
                          </span>
                          <h3 className="text-base font-bold text-slate-900">{fac.name}</h3>
                        </div>
                        {fac.description && (
                          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{fac.description}</p>
                        )}
                      </div>

                      {/* Faculty Actions */}
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => openAddProgramForm(fac.id)}
                          className="px-3 py-1.5 bg-white hover:bg-primary-50 text-primary-600 hover:text-primary-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Tambah Prodi</span>
                        </button>
                        <button
                          onClick={() => openEditFacultyForm(fac)}
                          className="p-1.5 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg transition-all"
                          title="Sunting Fakultas"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaculty(fac.id, fac.code)}
                          className="p-1.5 bg-white hover:bg-rose-50 text-rose-500 hover:text-rose-700 border border-slate-200 rounded-lg transition-all"
                          title="Hapus Fakultas"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Study Programs Table inside Faculty */}
                    <div className="p-2 sm:p-4 overflow-x-auto">
                      {fac.programs.length === 0 ? (
                        <div className="text-center py-8 text-slate-400 text-xs italic">
                          Belum ada program studi di fakultas ini. Silakan klik &ldquo;Tambah Prodi&rdquo; di atas.
                        </div>
                      ) : (
                        <table className="w-full text-left text-xs text-slate-600 border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              <th className="pb-3 pl-3">Program Studi</th>
                              <th className="pb-3">Jenjang</th>
                              <th className="pb-3">Akreditasi</th>
                              <th className="pb-3 hidden sm:table-cell">Rincian UKT II (Rata-rata)</th>
                              <th className="pb-3 text-right pr-3">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {fac.programs.map((prog) => (
                              <tr key={prog.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="py-3 pl-3 font-semibold text-slate-950">
                                  <div>
                                    <span className="block text-sm">{prog.name}</span>
                                    <span className="block text-[10px] font-normal text-slate-400 max-w-sm truncate mt-0.5" title={prog.description}>
                                      {prog.description || 'Tidak ada deskripsi'}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3">
                                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                                    {prog.jenjang}
                                  </span>
                                </td>
                                <td className="py-3">
                                  <span className="bg-amber-50 text-amber-800 border border-amber-100 text-[10px] font-bold px-2 py-0.5 rounded">
                                    {prog.akreditasi}
                                  </span>
                                </td>
                                <td className="py-3 hidden sm:table-cell font-mono text-slate-700 font-semibold">
                                  Rp {prog.tuitionGroup2.toLocaleString('id-ID')}
                                </td>
                                <td className="py-3 text-right pr-3">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => openEditProgramForm(fac.id, prog)}
                                      className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition-all"
                                      title="Sunting Prodi"
                                    >
                                      <Edit2 className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProgram(fac.id, prog.id, prog.name)}
                                      className="p-1.5 hover:bg-rose-50 text-rose-500 hover:text-rose-700 rounded-lg transition-all"
                                      title="Hapus Prodi"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: CALENDAR AND ACADEMIC EVENTS CRUD */}
      {adminSubTab === 'kalender' && (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Dynamic Sidebar Form for Calendar Event */}
          {activeCalendarForm !== 'none' && (
            <div className="lg:col-span-5 bg-white border border-primary-100 rounded-3xl p-6 shadow-lg shadow-primary-50/50 sticky top-24 animate-in fade-in slide-in-from-left duration-200">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary-600" />
                  {activeCalendarForm === 'add' ? 'Tambah Agenda Baru' : 'Edit Agenda / Kegiatan'}
                </h3>
                <button
                  onClick={() => setActiveCalendarForm('none')}
                  className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={activeCalendarForm === 'add' ? handleCreateCalendarEvent : handleUpdateCalendarEvent} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Nama Kegiatan / Agenda</label>
                  <input
                    type="text"
                    placeholder="Cth: Hari Raya Idul Fitri, Masa UAS Genap"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Kategori Agenda</label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500"
                  >
                    <option value="akademik">Kegiatan Akademik (KRS / Perkuliahan)</option>
                    <option value="libur">Hari Libur / Tanggal Merah</option>
                    <option value="ujian">Masa Ujian (UTS / UAS)</option>
                    <option value="pmb">Registrasi Penerimaan PMB</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Tanggal Mulai</label>
                    <input
                      type="date"
                      value={eventDateStart}
                      onChange={(e) => setEventDateStart(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-primary-500 font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Tanggal Selesai (Opsional)</label>
                    <input
                      type="date"
                      value={eventDateEnd}
                      onChange={(e) => setEventDateEnd(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-primary-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Keterangan / Deskripsi</label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan detail agenda akademik atau informasi tambahan..."
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary-500 animate-none"
                  />
                </div>

                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-150">
                  <input
                    type="checkbox"
                    id="event-is-holiday"
                    checked={eventIsHoliday}
                    onChange={(e) => setEventIsHoliday(e.target.checked)}
                    className="h-4 w-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="event-is-holiday" className="text-xs font-bold text-slate-700 select-none cursor-pointer">
                    Apakah merupakan Hari Libur Nasional (Tanggal Merah)
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>{activeCalendarForm === 'add' ? 'Tambah Agenda' : 'Perbarui Agenda'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCalendarForm('none')}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List of Events */}
          <div className={`space-y-6 ${activeCalendarForm !== 'none' ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Agenda &amp; Libur Terdaftar</h2>
                <p className="text-xs text-slate-500 mt-0.5">Kelola hari libur, kegiatan KRS, UTS, UAS, dan registrasi pendaftaran mahasiswa baru.</p>
              </div>
              <div className="flex gap-2 self-start sm:self-auto">
                <button
                  onClick={onResetCalendarEvents}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border border-slate-200 cursor-pointer"
                  title="Reset agenda kalender ke kondisi default"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                  <span>Reset Default</span>
                </button>
                <button
                  onClick={() => {
                    setEventTitle('');
                    setEventCategory('akademik');
                    setEventDateStart('');
                    setEventDateEnd('');
                    setEventDesc('');
                    setEventIsHoliday(false);
                    setActiveCalendarForm('add');
                  }}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-primary-100 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Agenda Baru</span>
                </button>
              </div>
            </div>

            {/* Quick Filters inside Admin Calendar */}
            <div className="bg-white border border-slate-150 rounded-3xl p-4 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'Semua Agenda', color: 'bg-slate-100 text-slate-800' },
                  { id: 'akademik', label: 'Akademik', color: 'bg-indigo-100 text-indigo-800' },
                  { id: 'libur', label: 'Hari Libur', color: 'bg-rose-100 text-rose-800' },
                  { id: 'ujian', label: 'Ujian', color: 'bg-cyan-100 text-cyan-800' },
                  { id: 'pmb', label: 'PMB', color: 'bg-emerald-100 text-emerald-800' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAdminCalendarCategory(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      adminCalendarCategory === item.id
                        ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <input
                  type="text"
                  placeholder="Cari agenda..."
                  value={adminCalendarSearch}
                  onChange={(e) => setAdminCalendarSearch(e.target.value)}
                  className="w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {/* Table / List */}
            <div className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 pl-6">Tanggal / Masa</th>
                      <th className="py-3">Kategori</th>
                      <th className="py-3">Judul Kegiatan</th>
                      <th className="py-3 hidden md:table-cell">Deskripsi</th>
                      <th className="py-3 text-center">Status Libur</th>
                      <th className="py-3 text-right pr-6">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredAdminEvents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-400 italic">
                          Tidak ada agenda kalender yang cocok atau terdaftar.
                        </td>
                      </tr>
                    ) : (
                      filteredAdminEvents.map((ev) => (
                        <tr key={ev.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-4 pl-6 font-semibold text-slate-900 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span>
                                {new Date(ev.dateStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                              {ev.dateEnd && (
                                <span className="text-[10px] text-slate-400 font-normal">
                                  s.d. {new Date(ev.dateEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4">
                            <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              ev.category === 'libur' ? 'bg-rose-100 text-rose-800' :
                              ev.category === 'akademik' ? 'bg-indigo-100 text-indigo-800' :
                              ev.category === 'ujian' ? 'bg-cyan-100 text-cyan-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {ev.category}
                            </span>
                          </td>
                          <td className="py-4 font-bold text-slate-950 max-w-[200px] truncate" title={ev.title}>
                            {ev.title}
                          </td>
                          <td className="py-4 text-slate-500 max-w-[250px] truncate hidden md:table-cell" title={ev.description}>
                            {ev.description}
                          </td>
                          <td className="py-4 text-center">
                            {ev.isNationalHoliday ? (
                              <span className="bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-extrabold px-2 py-0.5 rounded">
                                Ya
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[10px]">-</span>
                            )}
                          </td>
                          <td className="py-4 text-right pr-6">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditCalendarEvent(ev)}
                                className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition-all"
                                title="Sunting Agenda"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCalendarEvent(ev.id, ev.title)}
                                className="p-1.5 hover:bg-rose-50 text-rose-500 hover:text-rose-700 rounded-lg transition-all"
                                title="Hapus Agenda"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
