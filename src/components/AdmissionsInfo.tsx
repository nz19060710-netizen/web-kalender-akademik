/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ADMISSION_PATHS } from '../data';
import { 
  CheckCircle, 
  Calendar, 
  CreditCard, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  HelpCircle,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function AdmissionsInfo() {
  const [selectedPathId, setSelectedPathId] = useState('snbp');
  
  // Eligibility check state
  const [gradYear, setGradYear] = useState('2026');
  const [averageScore, setAverageScore] = useState<number>(80);
  const [hasAchievements, setHasAchievements] = useState('no');
  const [economicStatus, setEconomicStatus] = useState('normal');
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);

  const activePath = ADMISSION_PATHS.find(path => path.id === selectedPathId) || ADMISSION_PATHS[0];

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    
    let recommendation = '';
    
    if (gradYear === '2026' && averageScore >= 85 && hasAchievements === 'yes') {
      recommendation = 'Selamat! Anda sangat direkomendasikan untuk mendaftar melalui jalur Beasiswa Anak Bangsa Unggul (BABU) untuk mendapatkan kuliah gratis 100%, atau mengikuti jalur SNBP (Prestasi) nasional.';
    } else if (gradYear === '2026' && hasAchievements === 'yes') {
      recommendation = 'Anda berpeluang besar lolos melalui jalur prestasi nasional SNBP. Siapkan rapor semester 1-5 Anda dan unggah piagam kejuaraan terbaik Anda!';
    } else if (economicStatus === 'kurtim' && averageScore >= 80) {
      recommendation = 'Anda berhak mengajukan jalur Beasiswa Anak Bangsa Unggul (BABU) kategori kurang mampu atau mendaftar jalur SNBT/Mandiri dengan melampirkan kartu KIP-Kuliah untuk pembebasan biaya kuliah.';
    } else if (parseInt(gradYear) < 2024) {
      recommendation = 'Mengingat kelulusan sekolah Anda di bawah tahun 2024, jalur yang paling sesuai adalah Seleksi Mandiri UAB (SMKP) yang fleksibel tanpa batasan umur ketat selama lulus sekolah menengah.';
    } else {
      recommendation = 'Jalur terbaik untuk Anda adalah Seleksi Nasional Berdasarkan Tes (SNBT) dengan mempersiapkan ujian UTBK nasional, atau mengikuti Seleksi Mandiri UAB (SMKP) menggunakan nilai UTBK / ujian tulis online.';
    }
    
    setEligibilityResult(recommendation);
  };

  return (
    <div id="pmb-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <h2 className="text-xs font-bold text-primary-600 tracking-widest uppercase">Admisi &amp; Penerimaan Mahasiswa Baru</h2>
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Penerimaan Mahasiswa Baru 2026</h1>
        <p className="text-base text-slate-500">
          UAB mengundang putra-putri terbaik bangsa untuk bergabung melalui berbagai jalur seleksi. Pilih jalur pendaftaran yang sesuai dengan kualifikasi, bakat, dan rencana karir Anda.
        </p>
      </div>

      {/* Path Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10" id="pmb-path-tabs">
        {ADMISSION_PATHS.map((path) => (
          <button
            key={path.id}
            onClick={() => {
              setSelectedPathId(path.id);
              setEligibilityResult(null);
            }}
            className={`px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
              selectedPathId === path.id
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-400 hover:text-primary-600'
            }`}
            id={`pmb-tab-btn-${path.id}`}
          >
            {path.id === 'beasiswa' && <Award className="h-4.5 w-4.5 shrink-0" />}
            {path.name.split(' (')[1] ? path.name.split(' (')[1].replace(')', '') : path.name}
          </button>
        ))}
      </div>

      {/* Selected Path Details Card */}
      <div className="grid lg:grid-cols-12 gap-8 mb-16">
        
        {/* Left column: key dates & general description */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">{activePath.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{activePath.description}</p>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              
              {/* Important periods */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-primary-50 rounded-xl text-primary-600 mt-1 shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Masa Pendaftaran</span>
                  <span className="block text-base font-extrabold text-slate-800 mt-0.5">{activePath.registrationPeriod}</span>
                </div>
              </div>

              {activePath.examDate && (
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-rose-50 rounded-xl text-rose-600 mt-1 shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Jadwal Seleksi / Ujian</span>
                    <span className="block text-sm font-semibold text-slate-700 mt-0.5">{activePath.examDate}</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 mt-1 shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Pengumuman Kelulusan</span>
                  <span className="block text-base font-extrabold text-slate-800 mt-0.5">{activePath.announcementDate}</span>
                </div>
              </div>

              {/* Registration Fee */}
              <div className="flex items-start gap-4 pt-2 border-t border-slate-50">
                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 mt-1 shrink-0">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Biaya Pendaftaran Seleksi</span>
                  <span className="block text-lg font-extrabold text-slate-800 mt-0.5">
                    {activePath.registrationFee === 0 ? (
                      <span className="text-emerald-600 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-lg text-sm inline-block">Gratis / Subsidi Penuh</span>
                    ) : (
                      `Rp ${activePath.registrationFee.toLocaleString('id-ID')}`
                    )}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right column: Requirements and Step flow */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Requirements Box */}
          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              Persyaratan Pendaftaran
            </h4>
            <ul className="space-y-3.5">
              {activePath.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="p-1 bg-primary-50 rounded-full text-primary-600 mt-0.5 shrink-0">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps list Box */}
          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary-500" />
              Alur Pengajuan &amp; Registrasi
            </h4>
            <div className="relative border-l-2 border-slate-100 pl-6 space-y-6">
              {activePath.steps.map((step, i) => (
                <div key={i} className="relative">
                  {/* Step bubble marker */}
                  <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center justify-center border-4 border-white shadow-md">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{step.split(' melalui ')[0].split(' dengan ')[0]}</h5>
                    <p className="text-xs text-slate-500 mt-1">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Eligibility Widget */}
      <div className="bg-gradient-to-tr from-primary-900 via-primary-950 to-primary-900 text-white rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Form left description */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-primary-400 tracking-wider uppercase block">Rekomendasi Pintar</span>
            <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight">Bingung Pilih Jalur Penerimaan yang Cocok?</h3>
            <p className="text-sm text-primary-100 leading-relaxed">
              Gunakan simulator rekomendasi pintar kami dengan memasukkan profil kelulusan dan prestasi Anda. Sistem kami akan menganalisis kecocokan terbaik secara otomatis.
            </p>
            <div className="p-4 bg-primary-850 rounded-2xl border border-primary-800 flex gap-3 items-start text-xs text-primary-200">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <span>Analisis ini bersifat rekomendasi panduan berdasarkan kriteria sejarah pendaftaran terdahulu di Universitas Anak Bangsa.</span>
            </div>
          </div>

          {/* Form Fields inputs */}
          <div className="lg:col-span-7 bg-white text-slate-800 p-6 lg:p-8 rounded-2xl shadow-lg border border-primary-800/30">
            <form onSubmit={handleCheckEligibility} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Graduation Year */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tahun Lulus Sekolah</label>
                  <select
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-primary-500"
                    id="eligibility-grad-year"
                  >
                    <option value="2026">Lulusan Tahun Ini (2026)</option>
                    <option value="2025">Lulusan 2025 (Gap Year 1 Tahun)</option>
                    <option value="2024">Lulusan 2024 (Gap Year 2 Tahun)</option>
                    <option value="2023">Lulusan 2023 / Sebelumnya</option>
                  </select>
                </div>

                {/* Average Score */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex justify-between">
                    <span>Rata-Rata Rapor R-S5</span>
                    <span className="text-primary-600 font-extrabold">{averageScore} / 100</span>
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    step="1"
                    value={averageScore}
                    onChange={(e) => setAverageScore(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    id="eligibility-score-range"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>60 (Kkm)</span>
                    <span>80 (Baik)</span>
                    <span>100 (Sempurna)</span>
                  </div>
                </div>

                {/* Achievement */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Prestasi Akademik/Seni/Olahraga</label>
                  <select
                    value={hasAchievements}
                    onChange={(e) => setHasAchievements(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-primary-500"
                    id="eligibility-achievement"
                  >
                    <option value="no">Tidak Ada Sertifikat Juara</option>
                    <option value="yes">Ada (Minimal Tingkat Kota/Provinsi)</option>
                  </select>
                </div>

                {/* Economic status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kondisi Ekonomi Keluarga</label>
                  <select
                    value={economicStatus}
                    onChange={(e) => setEconomicStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-primary-500"
                    id="eligibility-economy"
                  >
                    <option value="normal">Mampu secara finansial</option>
                    <option value="kurtim">Butuh Subsidi (Memiliki KIP-K / SKTM)</option>
                  </select>
                </div>

              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary-600 text-white font-bold text-sm rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
                id="check-eligibility-btn"
              >
                <span>Analisis Kelayakan Daftar</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Eligibility Result Container */}
            {eligibilityResult && (
              <div className="mt-5 p-4 bg-primary-50 border border-primary-200 rounded-xl animate-in zoom-in-95 duration-250" id="eligibility-result-box">
                <span className="block text-xs font-bold text-primary-700 uppercase tracking-wide">Rekomendasi Sistem:</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed font-medium">
                  {eligibilityResult}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
