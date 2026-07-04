/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { FACULTIES } from '../data';
import { Faculty } from '../types';
import { Search, BookOpen, GraduationCap, ArrowRight, Award, CheckCircle, Calculator, ChevronRight } from 'lucide-react';

interface FacultiesAndProgramsProps {
  onNavigateToCalculator: () => void;
  faculties?: Faculty[];
}

export default function FacultiesAndPrograms({ onNavigateToCalculator, faculties = FACULTIES }: FacultiesAndProgramsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  const [selectedJenjang, setSelectedJenjang] = useState<string>('all');
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

  // Filter study programs
  const filteredPrograms = useMemo(() => {
    const results: Array<{ facultyName: string; facultyCode: string; program: any }> = [];
    
    faculties.forEach((faculty) => {
      // Filter by faculty
      if (selectedFaculty !== 'all' && faculty.id !== selectedFaculty) return;
      
      faculty.programs.forEach((prog) => {
        // Filter by jenjang
        if (selectedJenjang !== 'all' && prog.jenjang !== selectedJenjang) return;
        
        // Filter by search term
        const matchesSearch = 
          prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faculty.name.toLowerCase().includes(searchTerm.toLowerCase());
          
        if (matchesSearch) {
          results.push({
            facultyName: faculty.name,
            facultyCode: faculty.code,
            program: prog
          });
        }
      });
    });
    
    return results;
  }, [searchTerm, selectedFaculty, selectedJenjang]);

  return (
    <div id="prodi-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <h2 className="text-xs font-bold text-primary-600 tracking-widest uppercase">Fakultas &amp; Program Studi</h2>
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Temukan Masa Depan Anda</h1>
        <p className="text-base text-slate-500">
          Universitas Anak Bangsa memiliki berbagai pilihan fakultas dan program studi unggulan terakreditasi BAN-PT yang dirancang untuk membekali mahasiswanya dengan keahlian relevan di era global.
        </p>
      </div>

      {/* Control panel: Search and Filters */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mb-10 space-y-6">
        <div className="grid md:grid-cols-12 gap-4">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari program studi (cth: Sistem Informasi, Psikologi)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              id="search-prodi-input"
            />
          </div>

          {/* Faculty filter */}
          <div className="md:col-span-3">
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              id="filter-faculty-select"
            >
              <option value="all">Semua Fakultas</option>
              {faculties.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.code} - {fac.name.replace('Fakultas ', '')}
                </option>
              ))}
            </select>
          </div>

          {/* Jenjang filter */}
          <div className="md:col-span-3">
            <select
              value={selectedJenjang}
              onChange={(e) => setSelectedJenjang(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              id="filter-jenjang-select"
            >
              <option value="all">Semua Jenjang</option>
              <option value="S1">Sarjana (S1)</option>
              <option value="D3">Diploma (D3)</option>
            </select>
          </div>

        </div>

        {/* Quick Tags / Badge Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-50 text-xs font-semibold text-slate-500">
          <span>Pencarian Cepat:</span>
          <button 
            onClick={() => { setSearchTerm('Sistem Informasi'); setSelectedFaculty('all'); }} 
            className="px-3 py-1.5 bg-slate-100 hover:bg-primary-50 hover:text-primary-600 rounded-full transition-colors"
          >
            Sistem Informasi
          </button>
          <button 
            onClick={() => { setSearchTerm('Psikologi'); setSelectedFaculty('all'); }} 
            className="px-3 py-1.5 bg-slate-100 hover:bg-primary-50 hover:text-primary-600 rounded-full transition-colors"
          >
            Psikologi
          </button>
          <button 
            onClick={() => { setSearchTerm('Administrasi Rumah Sakit'); setSelectedFaculty('all'); }} 
            className="px-3 py-1.5 bg-slate-100 hover:bg-primary-50 hover:text-primary-600 rounded-full transition-colors"
          >
            Administrasi RS
          </button>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedFaculty('fik'); setSelectedJenjang('all'); }} 
            className="px-3 py-1.5 bg-slate-100 hover:bg-primary-50 hover:text-primary-600 rounded-full transition-colors"
          >
            Ilmu Komputer (FIK)
          </button>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedFaculty('all'); setSelectedJenjang('all'); }} 
            className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full transition-colors hover:bg-primary-200 ml-auto"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Grid of study programs */}
      {filteredPrograms.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="prodi-grid">
          {filteredPrograms.map(({ facultyName, facultyCode, program }) => {
            const isExpanded = expandedProgram === program.id;
            return (
              <div
                key={program.id}
                className={`bg-white border rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm ${
                  isExpanded 
                    ? 'border-primary-500 ring-2 ring-primary-50/50 scale-[1.01] md:col-span-2 lg:col-span-3' 
                    : 'border-slate-100 hover:border-primary-200 hover:shadow-md'
                }`}
              >
                {/* Main Header / Card Info */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {program.jenjang}
                      </span>
                      <span className="text-slate-400 font-bold text-xs uppercase tracking-wide block">
                        {facultyCode} &bull; {facultyName.replace('Fakultas ', '')}
                      </span>
                    </div>
                    {/* Accreditation Badge */}
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-lg shadow-sm">
                      <Award className="h-3.5 w-3.5 text-amber-500" />
                      <span>Akreditasi {program.akreditasi}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600">
                    {program.name}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Expanded Information */}
                  {isExpanded && (
                    <div className="grid md:grid-cols-12 gap-6 pt-6 mt-6 border-t border-slate-100 animate-in fade-in duration-300">
                      
                      {/* Prospects */}
                      <div className="md:col-span-6 space-y-3">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          Prospek Karir Lulusan:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                          {program.prospects.map((prospect: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                              <span>{prospect}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tuition (UKT) Rates */}
                      <div className="md:col-span-6 space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            <Calculator className="h-4 w-4 text-primary-600" />
                            Estimasi Biaya UKT per Semester:
                          </h4>
                          <button
                            onClick={onNavigateToCalculator}
                            className="text-xs font-semibold text-primary-600 hover:text-primary-800 underline"
                          >
                            Simulasikan Subsidi
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                          <div className="bg-white border border-slate-100 p-2.5 rounded-xl">
                            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Kelompok I</span>
                            <span className="block text-xs font-semibold text-slate-500 mt-0.5">Subsidi Penuh</span>
                            <span className="block text-sm font-extrabold text-emerald-600 mt-1">
                              Rp {program.tuitionGroup1.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="bg-white border border-slate-100 p-2.5 rounded-xl">
                            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Kelompok II</span>
                            <span className="block text-xs font-semibold text-slate-500 mt-0.5">Rata-rata</span>
                            <span className="block text-sm font-extrabold text-primary-600 mt-1">
                              Rp {program.tuitionGroup2.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="bg-white border border-slate-100 p-2.5 rounded-xl">
                            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Kelompok III</span>
                            <span className="block text-xs font-semibold text-slate-500 mt-0.5">Maksimum</span>
                            <span className="block text-sm font-extrabold text-slate-700 mt-1">
                              Rp {program.tuitionGroup3.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          * UKT Kelompok I berlaku khusus untuk mahasiswa berhak mendapat beasiswa atau kriteria khusus tidak mampu. Seluruh mahasiswa UAB disubsidi oleh yayasan sesuai dengan data sosio-ekonomi.
                        </p>
                      </div>

                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-medium">
                    {isExpanded ? 'Klik "Tutup" untuk menyembunyikan detail' : 'Klik "Detail" untuk prospek & UKT'}
                  </span>
                  <button
                    onClick={() => setExpandedProgram(isExpanded ? null : program.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                      isExpanded
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                    }`}
                    id={`prodi-detail-btn-${program.id}`}
                  >
                    <span>{isExpanded ? 'Tutup Detail' : 'Detail Program Studi'}</span>
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl space-y-4">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto" />
          <p className="text-lg font-semibold text-slate-700">Program Studi Tidak Ditemukan</p>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Maaf, kami tidak dapat menemukan program studi yang cocok dengan pencarian "{searchTerm}" atau saringan fakultas saat ini. Coba perkecil kata kunci Anda atau ganti filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedFaculty('all');
              setSelectedJenjang('all');
            }}
            className="px-5 py-2.5 bg-primary-600 text-white font-semibold text-sm rounded-xl hover:bg-primary-700 transition-colors"
          >
            Hapus Semua Saringan
          </button>
        </div>
      )}

      {/* Faculties Cards Overview */}
      <div className="mt-20 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-primary-600 tracking-widest uppercase">Grup Akademik</h3>
          <h2 className="text-2xl font-extrabold text-slate-900">{faculties.length} Fakultas Unggulan UAB</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {faculties.map((fac) => (
            <div key={fac.id} className="border border-slate-100 bg-white p-6 rounded-3xl flex gap-5 items-start shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-700 font-extrabold text-sm shrink-0">
                {fac.code}
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-lg">{fac.name}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{fac.description}</p>
                <div className="flex gap-2 text-xs font-semibold text-slate-400">
                  <span>{fac.programs.length} Program Studi</span>
                  <span>&bull;</span>
                  <span>Akreditasi Rata-rata: B / Baik Sekali</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
