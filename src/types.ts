/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CalendarEvent {
  id: string;
  title: string;
  dateStart: string; // YYYY-MM-DD
  dateEnd?: string;  // YYYY-MM-DD
  category: 'libur' | 'akademik' | 'ujian' | 'pmb';
  description: string;
  isNationalHoliday: boolean;
}

export interface AdmissionPath {
  id: string;
  name: string;
  slug: string;
  description: string;
  registrationPeriod: string;
  examDate?: string;
  announcementDate: string;
  registrationFee: number;
  requirements: string[];
  steps: string[];
}

export interface ProgramStudi {
  id: string;
  name: string;
  jenjang: 'D3' | 'S1' | 'S2';
  akreditasi: 'A' | 'Unggul' | 'B' | 'Baik Sekali';
  tuitionGroup1: number; // UKT Kelompok I
  tuitionGroup2: number; // UKT Kelompok II (Rata-rata)
  tuitionGroup3: number; // UKT Kelompok III (Maksimum)
  description: string;
  prospects: string[];
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  description: string;
  programs: ProgramStudi[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'pmb' | 'akademik' | 'biaya' | 'umum';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
