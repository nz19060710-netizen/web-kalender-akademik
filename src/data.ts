/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CalendarEvent, AdmissionPath, Faculty, FAQItem } from './types';

export const ADMISSION_PATHS: AdmissionPath[] = [
  {
    id: 'snbp',
    name: 'Seleksi Nasional Berdasarkan Prestasi (SNBP)',
    slug: 'jalur-prestasi',
    description: 'Jalur seleksi nasional tanpa tes tertulis yang menitikberatkan pada prestasi akademik dan non-akademik siswa selama masa sekolah menengah.',
    registrationPeriod: '14 - 28 Februari 2026',
    announcementDate: '26 Maret 2026',
    registrationFee: 0,
    requirements: [
      'Siswa SMA/MA/SMK kelas XII pada tahun berjalan dengan prestasi unggul.',
      'Memiliki NISN dan terdaftar di PDSS (Pangkalan Data Sekolah dan Siswa).',
      'Memiliki nilai rapor semester 1 s.d. 5 yang telah diisikan di PDSS.',
      'Mengunggah portofolio untuk program studi Seni dan Olahraga.'
    ],
    steps: [
      'Registrasi Akun SNPMB melalui portal resmi.',
      'Pengisian PDSS oleh pihak sekolah dan verifikasi oleh siswa.',
      'Pendaftaran SNBP dengan memilih Universitas Anak Bangsa dan maksimal 2 program studi.',
      'Mengunggah portofolio (jika memilih prodi seni/olahraga).',
      'Mengunduh dan mencetak Kartu Pendaftaran SNBP.',
      'Menunggu pengumuman kelulusan di laman resmi.'
    ]
  },
  {
    id: 'snbt',
    name: 'Seleksi Nasional Berdasarkan Tes (SNBT)',
    slug: 'jalur-tes-utbk',
    description: 'Jalur seleksi nasional berbasis tes komputer (UTBK) yang mengukur potensi kognitif, penalaran matematika, literasi Bahasa Indonesia, dan literasi Bahasa Inggris.',
    registrationPeriod: '21 Maret - 5 April 2026',
    examDate: 'Gelombang I: 2 - 8 Mei 2026, Gelombang II: 14 - 20 Mei 2026',
    announcementDate: '13 Juni 2026',
    registrationFee: 200000,
    requirements: [
      'Siswa SMA/MA/SMK Kelas XII atau lulusan paket C tahun berjalan dengan umur maksimal 25 tahun.',
      'Lulusan SMA/MA/SMK/Sederajat dua tahun sebelumnya (tahun lulus 2024 & 2025).',
      'Membayar biaya pendaftaran UTBK sebesar Rp 200.000.',
      'Sehat jasmani dan rohani yang tidak mengganggu kelancaran proses studi.'
    ],
    steps: [
      'Registrasi Akun SNPMB menggunakan NISN dan NPSN.',
      'Login ke Portal SNPMB, lengkapi data diri, dan pilih lokasi pusat UTBK.',
      'Pilih Universitas Anak Bangsa dan program studi tujuan.',
      'Lakukan pembayaran biaya pendaftaran melalui bank mitra (Mandiri, BNI, BRI, BTN).',
      'Cetak Kartu Peserta UTBK-SNBT.',
      'Mengikuti ujian UTBK sesuai jadwal dan lokasi yang tertera pada kartu.',
      'Melihat pengumuman hasil seleksi sesuai jadwal.'
    ]
  },
  {
    id: 'mandiri',
    name: 'Seleksi Mandiri Kemitraan & Prestasi (SMKP)',
    slug: 'jalur-mandiri',
    description: 'Jalur seleksi mandiri Universitas Anak Bangsa yang diselenggarakan secara lokal menggunakan kombinasi nilai UTBK, nilai rapor, dan prestasi tambahan lainnya.',
    registrationPeriod: '15 Juni - 10 Juli 2026',
    examDate: '18 - 20 Juli 2026 (Ujian Tulis Online Mandiri)',
    announcementDate: '25 Juli 2026',
    registrationFee: 350000,
    requirements: [
      'Lulusan SMA/MA/SMK/Sederajat tiga tahun terakhir (2024, 2025, 2026).',
      'Memiliki nilai rapor semester 1 s.d. 6.',
      'Memiliki kartu peserta UTBK-SNBT 2026 (opsional, memberikan poin tambahan).',
      'Sertifikat prestasi akademik/non-akademik minimal tingkat kabupaten/kota (bila ada).'
    ],
    steps: [
      'Membuat akun pendaftaran di Portal PMB Universitas Anak Bangsa (pmb.anakbangsa.ac.id).',
      'Mengisi formulir biodata lengkap, riwayat pendidikan, dan mengunggah dokumen pendukung.',
      'Memilih maksimal 3 program studi pilihan.',
      'Melakukan pembayaran biaya seleksi sebesar Rp 350.000 melalui Virtual Account.',
      'Mencetak Kartu Ujian Mandiri UAB.',
      'Mengikuti Ujian Tulis Mandiri secara online dari rumah/sekolah.',
      'Melihat hasil kelulusan di portal PMB UAB.'
    ]
  },
  {
    id: 'beasiswa',
    name: 'Beasiswa Anak Bangsa Unggul (BABU)',
    slug: 'jalur-beasiswa',
    description: 'Program beasiswa penuh yang ditujukan untuk calon mahasiswa dengan kemampuan akademik luar biasa atau dari keluarga kurang mampu secara finansial.',
    registrationPeriod: '1 Maret - 31 Mei 2026',
    examDate: '10 Juni 2026 (Wawancara & Tes Potensi Akademik)',
    announcementDate: '30 Juni 2026',
    registrationFee: 0,
    requirements: [
      'Siswa lulusan tahun berjalan (2026) dengan nilai rata-rata rapor minimal 85.00.',
      'Memiliki piagam prestasi minimal juara 3 tingkat provinsi/nasional.',
      'Bagi jalur kurang mampu: Memiliki KIP-Kuliah atau Surat Keterangan Tidak Mampu (SKTM) yang divalidasi.',
      'Rekomendasi tertulis dari Kepala Sekolah.'
    ],
    steps: [
      'Mengisi formulir pengajuan beasiswa di portal PMB UAB.',
      'Mengunggah berkas portofolio prestasi, sertifikat juara, serta dokumen finansial keluarga.',
      'Verifikasi berkas administratif oleh tim penilai beasiswa UAB.',
      'Mengikuti seleksi wawancara dan tes psikologi komprehensif bagi yang lolos seleksi berkas.',
      'Pengumuman penerima Beasiswa Anak Bangsa Unggul.'
    ]
  }
];

export const FACULTIES: Faculty[] = [
  {
    id: 'fk',
    name: 'Fakultas Kedokteran & Kesehatan',
    code: 'FKK',
    description: 'Menyelenggarakan pendidikan di bidang kesehatan dan administrasi layanan medis untuk melahirkan tenaga profesional yang adaptif dan berdedikasi tinggi.',
    programs: [
      {
        id: 'kesmas',
        name: 'Kesehatan Masyarakat',
        jenjang: 'S1',
        akreditasi: 'B',
        tuitionGroup1: 500000,
        tuitionGroup2: 5800000,
        tuitionGroup3: 10500000,
        description: 'Mempelajari promosi kesehatan, epidemiologi, kesehatan lingkungan, serta perencanaan program pencegahan penyakit di masyarakat.',
        prospects: ['Penyuluh Kesehatan', 'Epidemiolog', 'K3 Officer (Keselamatan Kerja)', 'Konsultan Kesehatan']
      },
      {
        id: 'ars',
        name: 'Administrasi Rumah Sakit',
        jenjang: 'S1',
        akreditasi: 'Baik Sekali',
        tuitionGroup1: 500000,
        tuitionGroup2: 6200000,
        tuitionGroup3: 11500000,
        description: 'Mengkaji manajemen strategis rumah sakit, hukum kesehatan, pengelolaan keuangan faskes, serta penjaminan mutu pelayanan medis.',
        prospects: ['Manajer Administrasi Rumah Sakit', 'Analis Kebijakan Kesehatan', 'Supervisor Unit Layanan Faskes']
      },
      {
        id: 'mprs',
        name: 'Manajemen Pelayanan Rumah Sakit',
        jenjang: 'D3',
        akreditasi: 'Baik Sekali',
        tuitionGroup1: 500000,
        tuitionGroup2: 5000000,
        tuitionGroup3: 9000000,
        description: 'Membekali mahasiswa dengan keahlian operasional administratif, manajemen rekam medis, dan pengelolaan sistem informasi rumah sakit.',
        prospects: ['Administrator Rumah Sakit/Klinik', 'Rekam Medis Specialist', 'Staf Operasional Faskes']
      }
    ]
  },
  {
    id: 'fpsi',
    name: 'Fakultas Psikologi',
    code: 'FPSI',
    description: 'Mengembangkan ilmu perilaku dan proses mental manusia berlandaskan etika profesional untuk meningkatkan kesejahteraan psikologis masyarakat.',
    programs: [
      {
        id: 'psikologi',
        name: 'Psikologi',
        jenjang: 'S1',
        akreditasi: 'B',
        tuitionGroup1: 500000,
        tuitionGroup2: 6000000,
        tuitionGroup3: 11000000,
        description: 'Mempelajari perilaku, proses mental, dan interaksi manusia untuk mendukung kesejahteraan mental individu dan masyarakat.',
        prospects: ['HRD Specialist', 'Konselor', 'Guru BK', 'Trainer/Motivator', 'Peneliti Sosial']
      }
    ]
  },
  {
    id: 'fik',
    name: 'Fakultas Ilmu Komputer',
    code: 'FIK',
    description: 'Pusat keunggulan pendidikan teknologi digital, rekayasa perangkat lunak, dan manajemen sistem informasi.',
    programs: [
      {
        id: 'si',
        name: 'Sistem Informasi',
        jenjang: 'S1',
        akreditasi: 'Baik Sekali',
        tuitionGroup1: 500000,
        tuitionGroup2: 6500000,
        tuitionGroup3: 12000000,
        description: 'Mengintegrasikan teknologi informasi dengan proses bisnis untuk membantu organisasi mencapai tujuan secara efektif dan efisien.',
        prospects: ['Business Analyst', 'IT Consultant', 'Systems Analyst', 'Project Manager', 'IS/IT Auditor']
      }
    ]
  },
  {
    id: 'feb',
    name: 'Fakultas Ekonomi & Bisnis',
    code: 'FEB',
    description: 'Mendidik wirausahawan, akuntan profesional, dan analis keuangan yang kritis, adaptif, dan berjiwa sosial tinggi.',
    programs: [
      {
        id: 'man',
        name: 'Manajemen',
        jenjang: 'S1',
        akreditasi: 'B',
        tuitionGroup1: 500000,
        tuitionGroup2: 6000000,
        tuitionGroup3: 11000000,
        description: 'Mempelajari pengelolaan operasional bisnis, manajemen pemasaran, manajemen keuangan, SDM, dan kewirausahaan strategis.',
        prospects: ['Business Development Manager', 'Human Resource Specialist', 'Marketing Specialist', 'Entrepreneur']
      },
      {
        id: 'akt',
        name: 'Akuntansi',
        jenjang: 'S1',
        akreditasi: 'B',
        tuitionGroup1: 500000,
        tuitionGroup2: 6000000,
        tuitionGroup3: 11000000,
        description: 'Mempelajari pencatatan keuangan, audit keuangan, akuntansi perpajakan, dan sistem pelaporan keuangan korporasi.',
        prospects: ['Auditor Publik (KAP)', 'Tax Consultant', 'Financial Controller', 'Analyst Investasi']
      }
    ]
  }
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  // 2026 Academic Events
  {
    id: 'sem-ganjil-mulai',
    title: 'Awal Kuliah Semester Ganjil TA 2026/2027',
    dateStart: '2026-09-01',
    category: 'akademik',
    description: 'Hari pertama perkuliahan aktif untuk seluruh mahasiswa Universitas Anak Bangsa Semester Ganjil.',
    isNationalHoliday: false
  },
  {
    id: 'maulid-nabi',
    title: 'Hari Raya Maulid Nabi Muhammad SAW 1448 H',
    dateStart: '2026-09-15',
    category: 'libur',
    description: 'Hari libur nasional memperingati kelahiran Nabi Muhammad SAW.',
    isNationalHoliday: true
  },
  {
    id: 'uts-ganjil',
    title: 'Ujian Tengah Semester (UTS) Ganjil',
    dateStart: '2026-10-19',
    dateEnd: '2026-10-30',
    category: 'ujian',
    description: 'Evaluasi tengah semester ganjil untuk semua mata kuliah teori.',
    isNationalHoliday: false
  },
  {
    id: 'natal-2026',
    title: 'Hari Raya Natal',
    dateStart: '2026-12-25',
    category: 'libur',
    description: 'Hari libur nasional memperingati kelahiran Yesus Kristus.',
    isNationalHoliday: true
  },
  {
    id: 'cuti-natal-2026',
    title: 'Cuti Bersama Hari Raya Natal',
    dateStart: '2026-12-26',
    category: 'libur',
    description: 'Cuti bersama pemerintah Republik Indonesia.',
    isNationalHoliday: true
  },
  // 2027 Academic Events
  {
    id: 'tahun-baru-2027',
    title: 'Tahun Baru Masehi 2027',
    dateStart: '2027-01-01',
    category: 'libur',
    description: 'Hari libur nasional menyambut tahun baru masehi.',
    isNationalHoliday: true
  },
  {
    id: 'uas-ganjil',
    title: 'Ujian Akhir Semester (UAS) Ganjil',
    dateStart: '2027-01-04',
    dateEnd: '2027-01-15',
    category: 'ujian',
    description: 'Evaluasi akhir semester ganjil untuk seluruh jenjang pendidikan.',
    isNationalHoliday: false
  },
  {
    id: 'libur-semester-ganjil',
    title: 'Libur Semester Ganjil & Registrasi Ulang',
    dateStart: '2027-01-18',
    dateEnd: '2027-02-05',
    category: 'akademik',
    description: 'Masa libur akademik mahasiswa dan waktu pengisian Kartu Rencana Studi (KRS) untuk semester genap.',
    isNationalHoliday: false
  },
  {
    id: 'imlek-2027',
    title: 'Tahun Baru Imlek 2578 Kongzili',
    dateStart: '2027-02-06',
    category: 'libur',
    description: 'Hari libur nasional Tahun Baru Imlek.',
    isNationalHoliday: true
  },
  {
    id: 'sem-genap-mulai',
    title: 'Awal Kuliah Semester Genap TA 2026/2027',
    dateStart: '2027-02-08',
    category: 'akademik',
    description: 'Hari pertama perkuliahan aktif untuk seluruh mahasiswa Universitas Anak Bangsa Semester Genap.',
    isNationalHoliday: false
  },
  {
    id: 'isra-miraj',
    title: 'Isra Miraj Nabi Muhammad SAW 1448 H',
    dateStart: '2027-02-15',
    category: 'libur',
    description: 'Hari libur nasional memperingati peristiwa Isra Miraj Nabi Muhammad SAW.',
    isNationalHoliday: true
  },
  {
    id: 'nyepi-2027',
    title: 'Hari Raya Nyepi (Tahun Baru Saka 1949)',
    dateStart: '2027-03-09',
    category: 'libur',
    description: 'Hari libur nasional Hari Raya Nyepi bagi umat Hindu.',
    isNationalHoliday: true
  },
  {
    id: 'wafat-isa-almasih',
    title: 'Wafat Yesus Kristus (Jumat Agung)',
    dateStart: '2027-03-26',
    category: 'libur',
    description: 'Hari libur nasional memperingati wafatnya Yesus Kristus.',
    isNationalHoliday: true
  },
  {
    id: 'idul-fitri-1',
    title: 'Hari Raya Idul Fitri 1448 H (1 Syawal)',
    dateStart: '2027-03-31',
    dateEnd: '2027-04-01',
    category: 'libur',
    description: 'Hari Libur Nasional Hari Raya Idul Fitri.',
    isNationalHoliday: true
  },
  {
    id: 'libur-idul-fitri-mhs',
    title: 'Libur Akademik Hari Raya Idul Fitri',
    dateStart: '2027-03-29',
    dateEnd: '2027-04-09',
    category: 'libur',
    description: 'Masa libur kuliah bagi seluruh mahasiswa Universitas Anak Bangsa untuk merayakan Idul Fitri.',
    isNationalHoliday: false
  },
  {
    id: 'uts-genap',
    title: 'Ujian Tengah Semester (UTS) Genap',
    dateStart: '2027-04-12',
    dateEnd: '2027-04-23',
    category: 'ujian',
    description: 'Evaluasi tengah semester genap secara tertulis.',
    isNationalHoliday: false
  },
  {
    id: 'hari-buruh',
    title: 'Hari Buruh Internasional',
    dateStart: '2027-05-01',
    category: 'libur',
    description: 'Hari libur nasional memperingati Hari Buruh.',
    isNationalHoliday: true
  },
  {
    id: 'waisak-2027',
    title: 'Hari Raya Waisak 2571 BE',
    dateStart: '2027-05-20',
    category: 'libur',
    description: 'Hari libur nasional Hari Raya Waisak.',
    isNationalHoliday: true
  },
  {
    id: 'kenaikan-isa-almasih',
    title: 'Hari Kenaikan Yesus Kristus',
    dateStart: '2027-05-27',
    category: 'libur',
    description: 'Hari libur nasional memperingati kenaikan Yesus Kristus.',
    isNationalHoliday: true
  },
  {
    id: 'lahir-pancasila',
    title: 'Hari Lahir Pancasila',
    dateStart: '2027-06-01',
    category: 'libur',
    description: 'Hari libur nasional memperingati lahirnya dasar negara Pancasila.',
    isNationalHoliday: true
  },
  {
    id: 'uas-genap',
    title: 'Ujian Akhir Semester (UAS) Genap',
    dateStart: '2027-06-14',
    dateEnd: '2027-06-25',
    category: 'ujian',
    description: 'Evaluasi akhir semester genap sekaligus akhir tahun akademik 2026/2027.',
    isNationalHoliday: false
  },
  {
    id: 'libur-akhir-ta',
    title: 'Libur Akhir Tahun Akademik 2026/2027',
    dateStart: '2027-06-28',
    dateEnd: '2027-08-31',
    category: 'akademik',
    description: 'Masa libur panjang semester genap dan persiapan masuk tahun akademik baru.',
    isNationalHoliday: false
  },
  // Admission related events in Calendar
  {
    id: 'cal-snbp-daftar',
    title: 'PMB: Pendaftaran Jalur SNBP',
    dateStart: '2026-02-14',
    dateEnd: '2026-02-28',
    category: 'pmb',
    description: 'Pendaftaran SNBP resmi bagi siswa SMA/SMK berprestasi yang terdaftar.',
    isNationalHoliday: false
  },
  {
    id: 'cal-snbt-daftar',
    title: 'PMB: Pendaftaran UTBK-SNBT',
    dateStart: '2026-03-21',
    dateEnd: '2026-04-05',
    category: 'pmb',
    description: 'Pendaftaran ujian tertulis berbasis komputer nasional.',
    isNationalHoliday: false
  },
  {
    id: 'cal-mandiri-daftar',
    title: 'PMB: Pendaftaran Jalur Mandiri UAB',
    dateStart: '2026-06-15',
    dateEnd: '2026-07-10',
    category: 'pmb',
    description: 'Pembukaan pendaftaran mandiri kemitraan dan prestasi secara online.',
    isNationalHoliday: false
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Kapan perkuliahan semester ganjil dimulai?',
    answer: 'Perkuliahan semester ganjil tahun akademik 2026/2027 akan dimulai secara serentak pada tanggal 1 September 2026.',
    category: 'akademik'
  },
  {
    id: 'faq-2',
    question: 'Berapa biaya pendaftaran jalur Mandiri UAB?',
    answer: 'Biaya pendaftaran untuk Seleksi Mandiri Kemitraan & Prestasi (SMKP) adalah sebesar Rp 350.000 yang dapat dibayarkan melalui Virtual Account bank mitra.',
    category: 'biaya'
  },
  {
    id: 'faq-3',
    question: 'Apakah ada program beasiswa penuh untuk mahasiswa baru?',
    answer: 'Ya, Universitas Anak Bangsa memiliki program Beasiswa Anak Bangsa Unggul (BABU) yang mencakup pembebasan UKT 100% selama 8 semester dan bantuan biaya hidup bulanan bagi siswa berprestasi tinggi atau siswa kurang mampu.',
    category: 'pmb'
  },
  {
    id: 'faq-4',
    question: 'Bagaimana penentuan kelompok UKT (Uang Kuliah Tunggal)?',
    answer: 'UKT ditentukan berdasarkan kemampuan sosio-ekonomi orang tua/penanggung jawab biaya mahasiswa yang divalidasi melalui dokumen pendapatan, tagihan listrik, pajak bumi bangunan, dan kepemilikan aset saat daftar ulang.',
    category: 'biaya'
  },
  {
    id: 'faq-5',
    question: 'Kapan libur semester ganjil berlangsung?',
    answer: 'Libur semester ganjil dijadwalkan mulai 18 Januari hingga 5 Februari 2027. Pada masa ini juga dibuka pelayanan pengisian KRS untuk Semester Genap.',
    category: 'akademik'
  },
  {
    id: 'faq-6',
    question: 'Apakah UAB memiliki program magang bersertifikat?',
    answer: 'Tentu. UAB telah terintegrasi dengan program Magang dan Studi Independen Bersertifikat (MSIB) Kampus Merdeka, serta memiliki kerja sama eksklusif dengan lebih dari 150 perusahaan teknologi, manufaktur, dan lembaga riset nasional.',
    category: 'umum'
  },
  {
    id: 'faq-7',
    question: 'Apakah mahasiswa jalur SNBP/SNBT dikenakan uang pangkal?',
    answer: 'Tidak. Mahasiswa yang diterima melalui jalur nasional SNBP dan SNBT hanya membayar Uang Kuliah Tunggal (UKT) per semester tanpa dikenakan uang pangkal (Iuran Pengembangan Institusi / IPI). Uang pangkal hanya diterapkan untuk jalur Mandiri dengan kriteria yang transparan.',
    category: 'biaya'
  }
];

export const CHATBOT_RULES = [
  {
    keywords: ['halo', 'hi', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'permisi', 'tanya'],
    response: 'Halo! Selamat datang di Pusat Informasi Universitas Anak Bangsa (UAB). Saya Asisten Akademik virtual Anda. Ada yang bisa saya bantu terkait pendaftaran mahasiswa baru (PMB), kalender akademik, hari libur, atau program studi kami?'
  },
  {
    keywords: ['daftar', 'pmb', 'pendaftaran', 'cara masuk', 'masuk uab', 'jalur masuk', 'snbp', 'snbt', 'mandiri', 'seleksi'],
    response: 'Universitas Anak Bangsa membuka 4 jalur penerimaan mahasiswa baru 2026:\n1. **SNBP** (Prestasi): Tanpa tes, pendaftaran 14-28 Feb 2026.\n2. **SNBT** (Tes UTBK): Ujian komputer nasional, pendaftaran 21 Maret-5 April 2026.\n3. **Mandiri** (SMKP): Ujian tulis mandiri online, pendaftaran 15 Juni-10 Juli 2026.\n4. **Beasiswa** (BABU): Beasiswa penuh untuk siswa berprestasi/kurang mampu, pendaftaran 1 Maret-31 Mei 2026.\n\nAnda dapat mengeksplorasi tab **"Admisi & PMB"** untuk detail syarat dan alur pendaftaran masing-masing jalur!'
  },
  {
    keywords: ['libur', 'tanggal merah', 'lebaran', 'idul fitri', 'natal', 'waisak', 'kalender', 'kapan libur', 'cuti', 'nyepi'],
    response: 'UAB mematuhi kalender libur nasional Indonesia. Beberapa libur besar terdekat di tahun akademik 2026/2027:\n- **Maulid Nabi**: 15 September 2026\n- **Hari Raya Natal**: 25 Desember 2026\n- **Tahun Baru Imlek**: 6 Februari 2027\n- **Hari Raya Nyepi**: 9 Maret 2027\n- **Libur Lebaran/Idul Fitri**: 29 Maret s.d. 9 April 2027 (libur akademik kuliah)\n- **Hari Buruh**: 1 Mei 2027\n\nUntuk kalender akademik lengkap (UTS, UAS, pengisian KRS), silakan kunjungi tab **"Kalender & Libur"**.'
  },
  {
    keywords: ['biaya', 'kuliah', 'ukt', 'uang kuliah', 'bayar', 'mahal', 'gratis', 'beasiswa', 'pembayaran', 'uang pangkal', 'ipi'],
    response: 'Sistem biaya kuliah di UAB menggunakan **Uang Kuliah Tunggal (UKT)** yang dibayar per semester tanpa uang pangkal bagi jalur SNBP & SNBT. Tarif UKT dibagi beberapa kelompok sesuai kemampuan finansial:\n- Kelompok I (Subsidi Penuh): Rp 500.000\n- Kelompok II (Rata-rata umum): Rp 5.000.000 s.d. Rp 6.500.000 (tergantung prodi)\n- Kelompok III (Maksimum): Rp 9.000.000 s.d. Rp 12.000.000\n\nKami juga menawarkan **Beasiswa Anak Bangsa Unggul (BABU)** yang membebaskan biaya kuliah 100% bagi siswa berprestasi atau dari keluarga tidak mampu. Silakan cek menu **"Simulasi Biaya & UKT"** untuk menghitung estimasi biaya kuliah Anda!'
  },
  {
    keywords: ['jurusan', 'prodi', 'program studi', 'fakultas', 'psikologi', 'kesehatan', 'komputer', 'manajemen', 'sistem informasi', 'akuntansi'],
    response: 'UAB memiliki 4 Fakultas dengan 7 Pilihan Program Studi S1/D3:\n1. **Fakultas Kedokteran & Kesehatan**: Kesehatan Masyarakat (S1, Akreditasi B), Administrasi Rumah Sakit (S1, Akreditasi Baik Sekali), Manajemen Pelayanan Rumah Sakit (D3, Akreditasi Baik Sekali).\n2. **Fakultas Psikologi**: Psikologi (S1, Akreditasi B).\n3. **Fakultas Ilmu Komputer**: Sistem Informasi (S1, Akreditasi Baik Sekali).\n4. **Fakultas Ekonomi & Bisnis**: Manajemen (S1, Akreditasi B), Akuntansi (S1, Akreditasi B).\n\nAnda dapat menyaring dan melihat deskripsi lengkap serta prospek kerja lulusan di tab **"Fakultas & Prodi"**.'
  },
  {
    keywords: ['lokasi', 'alamat', 'gedung', 'kampus', 'kontak', 'email', 'nomor telp', 'telepon', 'whatsapp', 'ig', 'instagram'],
    response: '**Universitas Anak Bangsa (UAB)**\n📍 **Kampus Utama**: Jl. Pendidikan Nusantara No. 45, Jakarta Pusat, DKI Jakarta\n📧 **Email**: info@anakbangsa.ac.id / pmb@anakbangsa.ac.id\n📞 **Telepon/Hotline**: (021) 555-0123 / WA: +62 812-3456-7890\n🌐 **Instagram/Twitter**: @UniversitasAnakBangsa'
  }
];
