/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CalendarEvent } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Calendar as CalendarIcon, 
  MapPin, 
  Download, 
  Printer, 
  Info,
  CalendarDays,
  FileSpreadsheet,
  Shield,
  Lock,
  Unlock,
  ArrowRight
} from 'lucide-react';

interface CalendarAndHolidaysProps {
  events: CalendarEvent[];
  onUpdateEvents: (events: CalendarEvent[]) => void;
  onResetEvents: () => void;
  isLoggedIn: boolean;
  onSetLoggedIn: (loggedIn: boolean) => void;
}

export default function CalendarAndHolidays({
  events,
  onUpdateEvents,
  onResetEvents,
  isLoggedIn,
  onSetLoggedIn
}: CalendarAndHolidaysProps) {
  // We represent the academic year from Sept 2026 to August 2027
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 0-indexed (8 = September)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchEvent, setSearchEvent] = useState<string>('');
  const [selectedDayEvent, setSelectedDayEvent] = useState<CalendarEvent | null>(null);

  // Month names in Indonesian
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const weekdayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  // Boundaries of academic calendar (Sept 2026 - Aug 2027)
  const handlePrevMonth = () => {
    if (currentMonth === 8 && currentYear === 2026) return; // limit min Sept 2026
    
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDayEvent(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 7 && currentYear === 2027) return; // limit max Aug 2027
    
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDayEvent(null);
  };

  // Generate calendar grid
  const calendarCells = useMemo(() => {
    const cells = [];
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Previous month padding
    const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({
        dayNum: prevMonthTotalDays - i,
        isCurrentMonth: false,
        dateString: `${currentMonth === 0 ? currentYear - 1 : currentYear}-${String(currentMonth === 0 ? 12 : currentMonth).padStart(2, '0')}-${String(prevMonthTotalDays - i).padStart(2, '0')}`
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      cells.push({
        dayNum: d,
        isCurrentMonth: true,
        dateString: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      });
    }

    // Next month padding (up to multiples of 7)
    const remainingCells = 42 - cells.length;
    for (let n = 1; n <= remainingCells; n++) {
      cells.push({
        dayNum: n,
        isCurrentMonth: false,
        dateString: `${currentMonth === 11 ? currentYear + 1 : currentYear}-${String(currentMonth === 11 ? 1 : currentMonth + 2).padStart(2, '0')}-${String(n).padStart(2, '0')}`
      });
    }

    return cells;
  }, [currentYear, currentMonth]);

  // Map events to their specific dates
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((event) => {
      const start = new Date(event.dateStart);
      const end = event.dateEnd ? new Date(event.dateEnd) : start;
      
      // Iterate through range
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (!map[dateStr]) map[dateStr] = [];
        map[dateStr].push(event);
      }
    });
    return map;
  }, [events]);

  // Filtered lists of events for directory view
  const filteredEventsList = useMemo(() => {
    return events.filter((ev) => {
      // Filter by category
      if (selectedCategory !== 'all' && ev.category !== selectedCategory) return false;
      
      // Filter by search text
      if (searchEvent) {
        const query = searchEvent.toLowerCase();
        return (
          ev.title.toLowerCase().includes(query) ||
          ev.description.toLowerCase().includes(query)
        );
      }
      return true;
    }).sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
  }, [events, selectedCategory, searchEvent]);

  // Helper for class styles based on category
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'libur':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'akademik':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'ujian':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'pmb':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getEventMarkerStyles = (category: string) => {
    switch (category) {
      case 'libur':
        return 'bg-rose-500';
      case 'akademik':
        return 'bg-indigo-500';
      case 'ujian':
        return 'bg-cyan-500';
      case 'pmb':
        return 'bg-emerald-500';
      default:
        return 'bg-slate-500';
    }
  };

  // Check if a day has events
  const getDayEvents = (dateStr: string) => {
    return eventsByDate[dateStr] || [];
  };

  // Simulated print trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="kalender-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <h2 className="text-xs font-bold text-primary-600 tracking-widest uppercase font-sans">Jadwal Kuliah &amp; Kalender Akademik</h2>
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Kalender Akademik &amp; Hari Libur</h1>
        <p className="text-base text-slate-500">
          Akses informasi lengkap tentang hari libur nasional, hari libur perkuliahan mahasiswa UAB, serta seluruh agenda penting kegiatan perkuliahan, KRS, dan ujian sepanjang tahun akademik 2026/2027.
        </p>
      </div>

      {/* Admin / Authorized user status banner */}
      {isLoggedIn ? (
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-emerald-800 animate-in fade-in duration-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 rounded-2xl text-emerald-600">
              <Unlock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-950">Sesi Administrator Terhubung</p>
              <p className="text-xs text-emerald-700">Anda memiliki izin untuk mengedit, menambah, dan menghapus seluruh agenda kegiatan &amp; hari libur akademis.</p>
            </div>
          </div>
          <button
            onClick={() => {
              const adminTabBtn = document.querySelector('[data-tab-id="admin"]') as HTMLButtonElement | null;
              if (adminTabBtn) adminTabBtn.click();
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Buka Manajemen Kalender</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-slate-700 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-200/60 rounded-2xl text-slate-500">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Mode Informasi (Siswa &amp; Umum)</p>
              <p className="text-xs text-slate-400">Kalender bersifat Terkunci. Penambahan atau pengubahan agenda kalender akademik hanya dapat dilakukan oleh Admin.</p>
            </div>
          </div>
          <button
            onClick={() => {
              const adminTabBtn = document.querySelector('[data-tab-id="admin"]') as HTMLButtonElement | null;
              if (adminTabBtn) adminTabBtn.click();
            }}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0"
          >
            Login Admin
          </button>
        </div>
      )}

      {/* Grid Layout: Calendar on Left, Directory on Right */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Interactive Grid Calendar (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          
          {/* Calendar Header / Navigation */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold text-slate-900">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <span className="text-xs font-semibold text-primary-600 tracking-wider uppercase">Tahun Akademik 2026/2027</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handlePrevMonth}
                disabled={currentMonth === 8 && currentYear === 2026}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
                id="cal-prev-month"
                title="Bulan Sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextMonth}
                disabled={currentMonth === 7 && currentYear === 2027}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
                id="cal-next-month"
                title="Bulan Berikutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Visual Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Hari Libur Resmi / Nasional</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>Kegiatan Akademik (KRS/Awal Kuliah)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <span>Masa Ujian (UTS/UAS)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Registrasi Penerimaan PMB</span>
            </div>
          </div>

          {/* Calendar Grid rendering */}
          <div className="grid grid-cols-7 gap-1 text-center" id="academic-calendar-grid">
            {/* Weekday labels */}
            {weekdayNames.map((name, idx) => (
              <div 
                key={idx} 
                className={`py-3 text-xs font-bold uppercase tracking-wider ${
                  name === 'Min' ? 'text-rose-600' : 'text-slate-400'
                }`}
              >
                {name}
              </div>
            ))}

            {/* Grid Cells */}
            {calendarCells.map((cell, idx) => {
              const dayEvents = getDayEvents(cell.dateString);
              const hasEvents = dayEvents.length > 0;
              const isSunday = new Date(cell.dateString).getDay() === 0;
              
              // Is active day selected
              const isSelectedDay = selectedDayEvent && dayEvents.some(e => e.id === selectedDayEvent.id);

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (hasEvents) {
                      setSelectedDayEvent(dayEvents[0]);
                    }
                  }}
                  disabled={!cell.isCurrentMonth}
                  className={`min-h-[64px] sm:min-h-[72px] p-2 border border-slate-50 rounded-xl flex flex-col justify-between items-start relative transition-all ${
                    !cell.isCurrentMonth 
                      ? 'bg-slate-50 text-slate-300 pointer-events-none' 
                      : isSunday 
                        ? 'bg-rose-50/20 text-rose-600 hover:bg-rose-50/50' 
                        : 'bg-white text-slate-800 hover:bg-primary-50/40'
                  } ${isSelectedDay ? 'ring-2 ring-primary-500 bg-primary-50/30' : ''}`}
                >
                  <span className="text-sm font-bold">{cell.dayNum}</span>
                  
                  {/* Event indicator bars */}
                  {hasEvents && cell.isCurrentMonth && (
                    <div className="w-full flex flex-wrap gap-1 mt-1">
                      {dayEvents.map((ev, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 rounded-full flex-1 ${getEventMarkerStyles(ev.category)}`}
                          title={ev.title}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Day details popup/panel */}
          {selectedDayEvent ? (
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-2xl space-y-3 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getCategoryStyles(selectedDayEvent.category)}`}>
                    {selectedDayEvent.category === 'libur' ? 'Hari Libur / Tanggal Merah' :
                     selectedDayEvent.category === 'akademik' ? 'Kegiatan Akademik' :
                     selectedDayEvent.category === 'ujian' ? 'Masa Ujian' : 'PMB / Registrasi'}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-base">{selectedDayEvent.title}</h4>
                </div>
                <button 
                  onClick={() => setSelectedDayEvent(null)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Tutup
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedDayEvent.description}</p>
              <div className="flex gap-4 text-[10px] text-slate-400 font-semibold pt-1 border-t border-primary-100">
                <span>Mulai: {new Date(selectedDayEvent.dateStart).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                {selectedDayEvent.dateEnd && (
                  <span>Selesai: {new Date(selectedDayEvent.dateEnd).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl flex gap-3 items-center text-slate-500">
              <Info className="h-5 w-5 text-slate-400 shrink-0" />
              <p className="text-xs">
                Klik pada kotak hari yang memiliki penanda warna di kalender untuk melihat detail detail acara/hari libur tersebut secara langsung.
              </p>
            </div>
          )}

        </div>

        {/* RIGHT PANEL: Directory Search / Filtering Lists */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Agenda &amp; Daftar Hari Libur</h3>
              <p className="text-xs text-slate-500">Gunakan saringan di bawah ini untuk mencari tanggal libur akademik atau jadwal registrasi pendaftaran tertentu.</p>
            </div>

            {/* Event Filtering controls */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari acara (cth: Lebaran, UAS)..."
                  value={searchEvent}
                  onChange={(e) => setSearchEvent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary-500 transition-all"
                />
              </div>

              {/* Quick Filters */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`py-2 rounded-lg font-bold border transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  Semua Acara ({events.length})
                </button>
                <button
                  onClick={() => setSelectedCategory('libur')}
                  className={`py-2 rounded-lg font-bold border transition-colors ${
                    selectedCategory === 'libur'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-rose-700 border-slate-200'
                  }`}
                >
                  Hari Libur ({events.filter(e => e.category === 'libur').length})
                </button>
                <button
                  onClick={() => setSelectedCategory('akademik')}
                  className={`py-2 rounded-lg font-bold border transition-colors ${
                    selectedCategory === 'akademik'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-indigo-700 border-slate-200'
                  }`}
                >
                  Akademik ({events.filter(e => e.category === 'akademik').length})
                </button>
                <button
                  onClick={() => setSelectedCategory('ujian')}
                  className={`py-2 rounded-lg font-bold border transition-colors ${
                    selectedCategory === 'ujian'
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-cyan-700 border-slate-200'
                  }`}
                >
                  Masa Ujian ({events.filter(e => e.category === 'ujian').length})
                </button>
              </div>
            </div>

            {/* List Results scrolling container */}
            <div className="max-h-[360px] overflow-y-auto pr-1 space-y-3" id="calendar-events-list">
              {filteredEventsList.length > 0 ? (
                filteredEventsList.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => setSelectedDayEvent(ev)}
                    className="w-full text-left p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-primary-200 transition-all flex gap-3 items-start"
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 text-center font-bold text-[10px] w-12 bg-slate-100 text-slate-600 ${
                      ev.category === 'libur' ? 'bg-rose-50 text-rose-700' :
                      ev.category === 'akademik' ? 'bg-indigo-50 text-indigo-700' :
                      ev.category === 'ujian' ? 'bg-cyan-50 text-cyan-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      <span className="block font-semibold">
                        {new Date(ev.dateStart).toLocaleDateString('id-ID', {month: 'short'})}
                      </span>
                      <span className="block text-base leading-none font-bold mt-0.5">
                        {new Date(ev.dateStart).getDate()}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${getCategoryStyles(ev.category)}`}>
                        {ev.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{ev.title}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{ev.description}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-sm">Tidak ada agenda yang cocok</p>
                </div>
              )}
            </div>

            {/* Export options inside directory card */}
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                id="export-print-btn"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak Kalender</span>
              </button>
              <button
                onClick={() => alert('Simulator: File Universitas_Anak_Bangsa_Kalender_Akademik_2026_2027.ics siap diunduh!')}
                className="flex-1 py-2.5 bg-primary-550 hover:bg-primary-600 text-primary-900 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-primary-200 transition-colors"
                id="export-ics-btn"
              >
                <Download className="h-4 w-4" />
                <span>Ekspor ke HP</span>
              </button>
            </div>

          </div>

          {/* Quick Informative banner */}
          <div className="bg-primary-950 text-white rounded-3xl p-6 shadow-sm flex gap-4 items-start relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-primary-800/20 rounded-full blur-xl pointer-events-none" />
            <CalendarDays className="h-6 w-6 text-primary-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm">Catatan Penting UAB:</h4>
              <p className="text-[11px] text-primary-100 leading-relaxed">
                Toleransi keterlambatan kehadiran mahasiswa dalam perkuliahan tatap muka adalah maksimal 15 menit. Pengajuan cuti akademik wajib diselesaikan paling lambat minggu ke-2 setelah masa KRS resmi berakhir.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
