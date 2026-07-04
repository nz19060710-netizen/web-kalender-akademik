/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { FACULTIES } from '../data';
import { Faculty } from '../types';
import { Calculator, HelpCircle, Check, Award, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface TuitionCalculatorProps {
  onNavigateToPmb: () => void;
  faculties?: Faculty[];
}

export default function TuitionCalculator({ onNavigateToPmb, faculties = FACULTIES }: TuitionCalculatorProps) {
  // Step selections
  const [selectedFacultyId, setSelectedFacultyId] = useState(() => faculties[0]?.id || '');
  const [selectedProgramId, setSelectedProgramId] = useState(() => faculties[0]?.programs[0]?.id || '');
  
  // Socioeconomic values
  const [income, setIncome] = useState<number>(4500000); // Rupiah
  const [dependents, setDependents] = useState<number>(2);
  const [electricity, setElectricity] = useState<string>('900'); // VA
  const [homeOwnership, setHomeOwnership] = useState<string>('milik'); // milik, sewa, numpang
  const [assetsValue, setAssetsValue] = useState<string>('low'); // low, mid, high

  const [calculationResult, setCalculationResult] = useState<any | null>(null);

  // List programs of selected faculty
  const currentPrograms = useMemo(() => {
    const fac = faculties.find(f => f.id === selectedFacultyId) || faculties[0];
    return fac ? fac.programs : [];
  }, [faculties, selectedFacultyId]);

  // Handle faculty change (reset selected program to first of the list)
  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fId = e.target.value;
    setSelectedFacultyId(fId);
    const fac = faculties.find(f => f.id === fId);
    if (fac && fac.programs.length > 0) {
      setSelectedProgramId(fac.programs[0].id);
    } else {
      setSelectedProgramId('');
    }
  };

  const selectedProgramObj = useMemo(() => {
    return currentPrograms.find(p => p.id === selectedProgramId) || currentPrograms[0];
  }, [currentPrograms, selectedProgramId]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgramObj) return;

    // Custom algorithm to calculate UKT Group (1, 2, or 3)
    let score = 0;
    
    // 1. Income score (per capita)
    const incomePerCapita = income / (dependents + 2); // adding parent as 2
    if (incomePerCapita <= 1200000) score += 1;
    else if (incomePerCapita <= 3500000) score += 3;
    else score += 5;

    // 2. Electricity score
    if (electricity === '450' || electricity === '900') score += 1;
    else if (electricity === '1300' || electricity === '2200') score += 3;
    else score += 5;

    // 3. Home ownership score
    if (homeOwnership === 'sewa' || homeOwnership === 'numpang') score += 1;
    else score += 3;

    // 4. Assets score
    if (assetsValue === 'low') score += 1;
    else if (assetsValue === 'mid') score += 3;
    else score += 5;

    // Map score to group
    let uktGroup = 2; // default
    let uktFee = selectedProgramObj.tuitionGroup2;
    let subsidyPercentage = 40; // baseline subsidy from Yayasan UAB

    if (score <= 5) {
      uktGroup = 1;
      uktFee = selectedProgramObj.tuitionGroup1;
      subsidyPercentage = 95; // highly subsidized
    } else if (score >= 13) {
      uktGroup = 3;
      uktFee = selectedProgramObj.tuitionGroup3;
      subsidyPercentage = 0; // standard full fee
    }

    // Subsidy amount in IDR (UAB baseline cost is group 3 as full market value)
    const fullValue = selectedProgramObj.tuitionGroup3;
    const subsidyAmount = fullValue - uktFee;

    setCalculationResult({
      groupName: `Kelompok UKT ${uktGroup === 1 ? 'I (Subsidi Penuh)' : uktGroup === 2 ? 'II (Subsidi Kemitraan)' : 'III (Standard)'}`,
      uktFee,
      subsidyAmount,
      subsidyPercentage: Math.round((subsidyAmount / fullValue) * 100),
      isBeasiswaEligible: uktGroup === 1 || (incomePerCapita < 1500000 && dependents >= 3)
    });
  };

  return (
    <div id="biaya-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <h2 className="text-xs font-bold text-primary-600 tracking-widest uppercase">Transparansi Biaya Pendidikan</h2>
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Kalkulator Simulasi UKT &amp; Beasiswa</h1>
        <p className="text-base text-slate-500">
          UAB menerapkan sistem **Uang Kuliah Tunggal (UKT)** berkeadilan tanpa uang pangkal bagi pendaftar jalur nasional. Gunakan simulator ini untuk melihat perkiraan kelompok biaya kuliah Anda per semester.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Form Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-sm">
          <form onSubmit={handleCalculate} className="space-y-6">
            
            {/* Step 1 heading */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block">Langkah 1 dari 2</span>
              <h3 className="text-lg font-bold text-slate-900">Pilih Fakultas &amp; Program Studi Pilihan</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              
              {/* Faculty selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Fakultas</label>
                <select
                  value={selectedFacultyId}
                  onChange={handleFacultyChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-700 focus:outline-none focus:border-primary-500"
                  id="calc-faculty-select"
                >
                  {faculties.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              {/* Program study selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Program Studi</label>
                <select
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-700 focus:outline-none focus:border-primary-500"
                  id="calc-program-select"
                >
                  {currentPrograms.map(p => (
                    <option key={p.id} value={p.id}>{p.jenjang} - {p.name}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Step 2 heading */}
            <div className="space-y-1 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block">Langkah 2 dari 2</span>
              <h3 className="text-lg font-bold text-slate-900">Profil Sosial-Ekonomi Keluarga</h3>
            </div>

            <div className="space-y-5">
              
              {/* Total Parents Income Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-500 uppercase tracking-wide">Total Pendapatan Orang Tua (Gabungan)</label>
                  <span className="text-primary-600 font-extrabold text-sm">
                    Rp {income.toLocaleString('id-ID')} / bulan
                  </span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="500000"
                  value={income}
                  onChange={(e) => setIncome(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  id="calc-income-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>Rp 1 Juta</span>
                  <span>Rp 5 Juta (Rata-rata)</span>
                  <span>Rp 10 Juta</span>
                  <span>Rp 20 Juta+</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Dependents Kids */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Jumlah Tanggungan Anak Sekolah</label>
                  <select
                    value={dependents}
                    onChange={(e) => setDependents(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-primary-500"
                    id="calc-dependents-select"
                  >
                    <option value="1">1 Orang Anak</option>
                    <option value="2">2 Orang Anak (Standar)</option>
                    <option value="3">3 Orang Anak</option>
                    <option value="4">4 Orang Anak atau Lebih</option>
                  </select>
                </div>

                {/* Electricity residence */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Daya Listrik Rumah Tinggal</label>
                  <select
                    value={electricity}
                    onChange={(e) => setElectricity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-primary-500"
                    id="calc-electricity-select"
                  >
                    <option value="450">Bersubsidi - 450 VA</option>
                    <option value="900">Standard - 900 VA</option>
                    <option value="1300">Menengah - 1300 VA</option>
                    <option value="2200">Menengah Atas - 220 VA</option>
                    <option value="3500">Mewah - &gt; 3500 VA</option>
                  </select>
                </div>

                {/* Home ownership status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kepemilikan Tempat Tinggal</label>
                  <select
                    value={homeOwnership}
                    onChange={(e) => setHomeOwnership(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-primary-500"
                    id="calc-home-select"
                  >
                    <option value="milik">Milik Sendiri / Keluarga</option>
                    <option value="sewa">Kontrak / Sewa Bulanan</option>
                    <option value="numpang">Numpang di Kerabat / Wali</option>
                  </select>
                </div>

                {/* Other Assets value */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Aset Kendaraan Keluarga</label>
                  <select
                    value={assetsValue}
                    onChange={(e) => setAssetsValue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-primary-500"
                    id="calc-assets-select"
                  >
                    <option value="low">Hanya Sepeda Motor (&lt;= 2 Unit)</option>
                    <option value="mid">1 Unit Mobil Sederhana &amp; Motor</option>
                    <option value="high">Lebih dari 1 Unit Mobil / Kendaraan Mewah</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary-600 text-white font-extrabold text-sm rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              id="submit-tuition-calc"
            >
              <Calculator className="h-4.5 w-4.5" />
              <span>Simulasikan Tarif UKT Saya</span>
            </button>

          </form>
        </div>

        {/* RIGHT COLUMN: Results Display Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {calculationResult ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6 text-slate-800 animate-in zoom-in-95 duration-200" id="tuition-calc-results">
              
              {/* Result header */}
              <div className="text-center pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Hasil Simulasi UKT</span>
                <h4 className="text-2xl font-black text-slate-900 mt-2">{selectedProgramObj.name}</h4>
                <p className="text-xs text-slate-400 font-bold uppercase mt-1">Jenjang {selectedProgramObj.jenjang} &bull; Akreditasi {selectedProgramObj.akreditasi}</p>
              </div>

              {/* Main UKT Fee Display */}
              <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Estimasi UKT Per Semester:</span>
                <span className="text-3xl font-black text-primary-600 block">
                  Rp {calculationResult.uktFee.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">
                  Dibayar flat per semester, sudah mencakup SKS, jas almamater, lab, &amp; ujian.
                </span>
              </div>

              {/* Subsidy details */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Detail Subsidi Lembaga:</span>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Tarif Riil Pendidikan:</span>
                  <span className="text-slate-900 font-bold">Rp {selectedProgramObj.tuitionGroup3.toLocaleString('id-ID')}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Bantuan Subsidi Yayasan ({calculationResult.subsidyPercentage}%):</span>
                  <span className="text-emerald-600 font-bold">- Rp {calculationResult.subsidyAmount.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between text-sm pt-2.5 border-t border-slate-100">
                  <span className="text-slate-800 font-bold">Klasifikasi UKT:</span>
                  <span className="text-primary-700 font-bold text-xs bg-primary-50 px-2 py-0.5 rounded-md">{calculationResult.groupName}</span>
                </div>
              </div>

              {/* Scholarship Alert */}
              {calculationResult.isBeasiswaEligible && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <Award className="h-4 w-4 text-emerald-600" />
                    <span>Rekomendasi Khusus Beasiswa</span>
                  </div>
                  <p className="text-xs text-emerald-700 leading-normal">
                    Berdasarkan profil finansial keluarga Anda, Anda berpeluang besar mengajukan **KIP-Kuliah** atau **Beasiswa Anak Bangsa Unggul (BABU)** untuk pembebasan biaya kuliah hingga Rp 0!
                  </p>
                </div>
              )}

              {/* Action and security note */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex gap-2 items-start text-[10px] text-slate-400 leading-relaxed">
                  <ShieldCheck className="h-4.5 w-4.5 text-primary-500 shrink-0" />
                  <span>
                    Hasil simulasi ini bersifat estimasi panduan sementara. Verifikasi dan penentuan akhir biaya UKT dilakukan saat pendaftaran ulang oleh dewan keuangan UAB dengan mencocokkan dokumen fisik Anda secara transparan.
                  </span>
                </div>

                <button
                  onClick={onNavigateToPmb}
                  className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-all"
                  id="calc-go-pmb"
                >
                  <span>Lihat Kalender Akademik &amp; Jadwal</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm text-center space-y-4">
              <Calculator className="h-12 w-12 text-slate-300 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">Belum Ada Perhitungan</h4>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                Silakan lengkapi pilihan program studi Anda serta jawab data kondisi sosial-ekonomi di formulir sebelah kiri, lalu klik tombol **"Simulasikan Tarif UKT Saya"** untuk melihat detailnya di sini.
              </p>
              
              <div className="p-4 bg-primary-50 rounded-2xl flex gap-3 text-left items-start max-w-xs mx-auto">
                <HeartHandshake className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" />
                <p className="text-[10px] text-slate-600 leading-normal font-medium">
                  UAB menjamin tidak ada pencabutan hak kuliah mahasiswa yang terkendala masalah ekonomi mendadak di masa perkuliahan aktif.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
