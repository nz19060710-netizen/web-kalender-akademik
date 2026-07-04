/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Users, 
  Award, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Building,
  Calendar,
  FileCheck
} from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Stats
  const stats = [
    { label: 'Akreditasi Kampus', value: 'Baik Sekali (B)', icon: Award, color: 'text-amber-500 bg-amber-50' },
    { label: 'Mahasiswa Aktif', value: '18,500+', icon: Users, color: 'text-primary-600 bg-primary-50' },
    { label: 'Pilihan Program Studi', value: '7 Prodi S1/D3', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Alumni Terserap Kerja', value: '94.2%', icon: FileCheck, color: 'text-indigo-600 bg-indigo-50' },
  ];

  // News / Announcement
  const announcements = [
    {
      date: '25 Juni 2026',
      tag: 'Pengumuman',
      title: 'Hasil Seleksi Jalur Beasiswa Unggulan Tahap I Diumumkan',
      desc: 'Peserta yang lolos seleksi berkas administrasi berhak mengikuti tes wawancara dan potensi akademik pada 30 Juni 2026.'
    },
    {
      date: '20 Juni 2026',
      tag: 'Penerimaan',
      title: 'Pendaftaran Seleksi Mandiri UAB Resmi Dibuka',
      desc: 'Segera daftarkan diri Anda secara mandiri online menggunakan nilai UTBK maupun ujian tulis daring s.d. 10 Juli 2026.'
    },
    {
      date: '15 Juni 2026',
      tag: 'Akademik',
      title: 'Kalender Akademik Resmi TA 2026/2027 Dirilis',
      desc: 'Kalender resmi mencakup jadwal libur nasional, libur lebaran, jadwal KRS, UTS, dan UAS telah dapat diakses secara publik.'
    }
  ];

  // Key advantages
  const advantages = [
    {
      title: 'Kurikulum Berbasis Industri',
      desc: 'Kurikulum adaptif yang dikembangkan bersama pakar industri internasional untuk memastikan kesiapan kerja lulusan sejak hari pertama.'
    },
    {
      title: 'Fasilitas Laboratorium Modern',
      desc: 'Akses penuh ke lab sains medis berstandar internasional, lab robotika canggih, dan pusat simulasi bisnis termutakhir.'
    },
    {
      title: 'Dukungan Beasiswa Melimpah',
      desc: 'Skema pembiayaan beragam mulai dari beasiswa prestasi akademik, atlet berprestasi, hingga beasiswa penuh tidak mampu.'
    },
    {
      title: 'Ekosistem Kampus Merdeka',
      desc: 'Kesempatan magang bersertifikat di 150+ korporasi mitra, pertukaran pelajar internasional, dan proyek riset mandiri.'
    }
  ];

  return (
    <div id="beranda-section" className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white py-16 lg:py-24">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-primary-600 animate-pulse" />
                Penerimaan Mahasiswa Baru TA 2026/2027
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Mendidik Pemimpin <br className="hidden sm:inline" />
                <span className="text-primary-600 relative inline-block">
                  Masa Depan Bangsa
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-primary-100 -z-10 rounded" />
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                Selamat datang di Universitas Anak Bangsa (UAB). Kami berkomitmen menyelenggarakan pendidikan tinggi berkualitas dunia dengan kurikulum adaptif, teknologi modern, dan lingkungan belajar inklusif yang melahirkan tunas-tunas unggul bangsa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => onNavigate('kalender')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-200 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-300 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none"
                  id="hero-cta-kalender"
                >
                  Lihat Kalender Akademik
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onNavigate('prodi')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 font-bold rounded-2xl hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
                  id="hero-cta-prodi"
                >
                  Eksplor Program Studi
                </button>
              </div>

              {/* Badges / Accreditations */}
              <div className="flex flex-wrap gap-y-3 gap-x-6 justify-center lg:justify-start pt-6 border-t border-slate-100 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4.5 w-4.5 text-primary-600" />
                  <span>Kampus Terakreditasi BAN-PT</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4.5 w-4.5 text-primary-600" />
                  <span>Uang Kuliah Tunggal Bersubsidi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4.5 w-4.5 text-primary-600" />
                  <span>Tanpa Biaya Pangkal (Jalur Nasional)</span>
                </div>
              </div>
            </div>

            {/* Right Column Custom Graphic Element (Aesthetic campus shield banner/portal) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glowing backdrops */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-sky-300 rounded-3xl rotate-3 scale-95 blur-xl opacity-20" />
                
                {/* Main Premium Banner Box */}
                <div className="relative bg-white border border-slate-100 rounded-3xl shadow-xl p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-10" />
                  
                  {/* University Identity Header */}
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                    <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                      <GraduationCap className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-none text-lg">Universitas Anak Bangsa</h3>
                      <span className="text-xs text-slate-500 font-medium">Lembaga Pendidikan Tinggi Unggulan</span>
                    </div>
                  </div>

                  {/* Highlights Panel */}
                  <div className="space-y-5 py-6">
                    <div className="p-4 bg-slate-50 rounded-2xl flex gap-3.5 items-start">
                      <div className="p-2 bg-primary-100 rounded-xl text-primary-700 font-semibold text-xs mt-0.5">PMB</div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">Penerimaan Gelombang Mandiri</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Pendaftaran Seleksi Mandiri Online ditutup 10 Juli 2026.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl flex gap-3.5 items-start">
                      <div className="p-2 bg-rose-100 rounded-xl text-rose-700 font-semibold text-xs mt-0.5">LIBUR</div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">Libur Idul Fitri & Akademik</h4>
                        <p className="text-xs text-slate-500 mt-0.5">29 Maret s.d 9 April 2027. Libur resmi perkuliahan aktif.</p>
                      </div>
                    </div>
                  </div>

                  {/* Campus Address footer inside graphics */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary-600" />
                      <span>Kampus Senayan, Jakarta</span>
                    </div>
                    <span className="text-primary-600 font-semibold">UAB Terakreditasi B</span>
                  </div>
                </div>

                {/* Micro Floater Card */}
                <div className="absolute -bottom-6 -left-6 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center gap-3 hidden sm:flex animate-bounce duration-1000">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Akreditasi BAN-PT</span>
                    <span className="block text-sm font-bold text-slate-900">Peringkat &ldquo;BAIK SEKALI (B)&rdquo;</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200">
                  <div className={`p-4 rounded-2xl ${stat.color} shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="block text-2xl font-extrabold text-slate-900">{stat.value}</span>
                    <span className="block text-xs font-semibold text-slate-500 tracking-wider uppercase mt-1">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantage & Excellence Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold text-primary-600 tracking-widest uppercase">Keunggulan Universitas</h2>
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Mengapa Memilih Universitas Anak Bangsa?</p>
            <p className="text-base text-slate-500">
              UAB berdedikasi menciptakan ekosistem belajar yang mendorong kreativitas, inovasi, dan nilai-nilai integritas kebangsaan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 font-extrabold text-lg group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-slate-950 text-lg group-hover:text-primary-700 transition-colors duration-200">{adv.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates / Announcement Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-primary-600 tracking-widest uppercase">Pengumuman Terbaru</h2>
              <p className="text-3xl font-extrabold text-slate-900">Kabar Terkini Universitas</p>
            </div>
            <button
              onClick={() => onNavigate('kalender')}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 border-b border-primary-200 hover:border-primary-600 pb-0.5 self-start sm:self-auto transition-all"
            >
              Lihat Kalender Akademik Lengkap
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {announcements.map((ann, i) => (
              <div 
                key={i} 
                className="border border-slate-100 rounded-3xl p-6 hover:bg-slate-50/50 hover:border-primary-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {ann.date}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      ann.tag === 'Pengumuman' ? 'bg-amber-100 text-amber-800' :
                      ann.tag === 'Penerimaan' ? 'bg-primary-100 text-primary-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}>
                      {ann.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg hover:text-primary-600 transition-colors line-clamp-2">
                    {ann.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {ann.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex justify-end">
                  <button 
                    onClick={() => {
                      if (ann.tag === 'Penerimaan') onNavigate('kalender');
                      else if (ann.tag === 'Akademik') onNavigate('kalender');
                      else onNavigate('faq');
                    }}
                    className="text-xs font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1"
                  >
                    Selengkapnya
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16 relative overflow-hidden rounded-t-[3rem]">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute right-0 bottom-0 -mr-24 -mb-24 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Siap Bergabung Bersama Universitas Anak Bangsa?</h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto font-medium">
            Jangan lewatkan kesempatan menjadi bagian dari institusi pendidikan terbaik. Ambil langkah pertama untuk menggapai cita-cita mulia Anda hari ini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => onNavigate('kalender')}
              className="px-8 py-3.5 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg shadow-black/10"
              id="cta-bottom-kalender"
            >
              Lihat Kalender Akademik 2026/2027
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className="px-8 py-3.5 bg-primary-800 text-white font-bold rounded-xl hover:bg-primary-750 transition-colors border border-primary-700"
              id="cta-bottom-kontak"
            >
              Tanya Asisten Virtual
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
