/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { FAQ_ITEMS, CHATBOT_RULES } from '../data';
import { ChatMessage, FAQItem } from '../types';
import { 
  HelpCircle, 
  Send, 
  ChevronDown, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  MapPin, 
  Mail, 
  PhoneCall, 
  Info,
  Users,
  Search,
  Check
} from 'lucide-react';

export default function FAQAndContact() {
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Chatbot state
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Halo! Selamat datang di Universitas Anak Bangsa. Saya Asisten Akademik virtual UAB. Tanyakan apa saja mengenai pendaftaran mahasiswa baru (PMB), kalender akademik, biaya kuliah/UKT, atau program studi kami!',
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Handle FAQ list filtering
  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (selectedFaqCategory !== 'all' && item.category !== selectedFaqCategory) return false;
    if (faqSearch) {
      const q = faqSearch.toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    }
    return true;
  });

  // Simple Offline NLP for Chatbot
  const handleSendMessage = (textToSend?: string) => {
    const rawText = textToSend || chatInput;
    if (!rawText.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: rawText,
      timestamp: new Date()
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput(''); // Clear input if typed
    setIsTyping(true);

    // Simulated reply delay (300-500ms)
    setTimeout(() => {
      const normalizedText = rawText.toLowerCase();
      let botResponse = '';

      // Find keyword match
      const matchedRule = CHATBOT_RULES.find((rule) => {
        return rule.keywords.some((keyword) => normalizedText.includes(keyword));
      });

      if (matchedRule) {
        botResponse = matchedRule.response;
      } else {
        botResponse = `Maaf, saya belum memahami pertanyaan Anda sepenuhnya. \n\nSilakan coba tanyakan menggunakan kata kunci seperti: **"PMB"**, **"Daftar"**, **"Libur"**, **"Biaya"**, **"Fakultas"**, atau **"Lokasi"**.\n\nAlternatifnya, Anda bisa langsung menghubungi Panitia Admisi kami via WhatsApp di **+62 812-3456-7890** atau email ke **pmb@anakbangsa.ac.id** pada jam operasional (Senin-Jumat, 08:00 - 16:00 WIB).`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botResponse,
        timestamp: new Date()
      };

      setChatMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  // Quick prompt buttons
  const quickPrompts = [
    'Kapan pendaftaran PMB ditutup?',
    'Daftar hari libur tahun akademik ini',
    'Berapa rincian biaya UKT Administrasi RS?',
    'Apa saja syarat Beasiswa?'
  ];

  return (
    <div id="faq-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <h2 className="text-xs font-bold text-primary-600 tracking-widest uppercase font-sans">Layanan Informasi Terpadu</h2>
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Pertanyaan Sering Diajukan &amp; Pusat Bantuan</h1>
        <p className="text-base text-slate-500">
          Temukan solusi instan atas pertanyaan Anda seputar proses pendaftaran mahasiswa baru, biaya studi, kalender akademik, atau tanyakan langsung pada asisten pintar kami secara interaktif.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: FAQ List & Contact Info (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* FAQ section */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary-600" />
                Daftar Tanya Jawab (FAQ)
              </h3>
              
              {/* FAQ categories */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
                {['all', 'pmb', 'akademik', 'biaya', 'umum'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFaqCategory(cat)}
                    className={`px-3 py-1.5 rounded-full font-semibold border capitalize transition-colors ${
                      selectedFaqCategory === cat
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'Semua' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search FAQ */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Ketik topik pertanyaan yang ingin Anda cari..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-primary-500 transition-all"
                id="search-faq-input"
              />
            </div>

            {/* FAQ Items Accordion list */}
            <div className="space-y-3" id="faq-accordion-list">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen 
                          ? 'border-primary-500 bg-primary-50/10' 
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 focus:outline-none"
                        id={`faq-btn-${faq.id}`}
                      >
                        <span className="font-bold text-slate-900 text-sm">{faq.question}</span>
                        <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary-600' : ''}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100/50 animate-in fade-in duration-200">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Tidak ada pertanyaan yang sesuai dengan kata kunci "{faqSearch}"
                </div>
              )}
            </div>

          </div>

          {/* Contact Details Directory Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-primary-600" />
              Kontak Kantor Sekretariat PMB UAB
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div className="flex gap-3.5 items-start">
                  <div className="p-2 bg-primary-50 rounded-xl text-primary-600 shrink-0 mt-0.5">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kampus Pusat Senayan</span>
                    <span className="block text-xs text-slate-600 mt-1 leading-normal">
                      Jl. Pendidikan Nusantara No. 45, Kebayoran Baru, Jakarta Pusat, DKI Jakarta - 12190
                    </span>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="p-2 bg-primary-50 rounded-xl text-primary-600 shrink-0 mt-0.5">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jam Operasional Pelayanan</span>
                    <span className="block text-xs text-slate-600 mt-1">
                      Senin - Jumat: 08:00 - 16:00 WIB <br />
                      Sabtu (Masa PMB): 08:00 - 12:00 WIB
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3.5 items-start">
                  <div className="p-2 bg-primary-50 rounded-xl text-primary-600 shrink-0 mt-0.5">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Surat Elektronik (Email)</span>
                    <span className="block text-xs font-bold text-slate-800 mt-1">info@anakbangsa.ac.id</span>
                    <span className="block text-xs text-slate-500">pmb@anakbangsa.ac.id (Khusus Admisi)</span>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="p-2 bg-primary-50 rounded-xl text-primary-600 shrink-0 mt-0.5">
                    <PhoneCall className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Layanan Telepon &amp; WhatsApp</span>
                    <span className="block text-xs font-bold text-slate-800 mt-1">Telp: (021) 555-0123</span>
                    <span className="block text-xs text-emerald-600 font-bold">WA: +62 812-3456-7890</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Simulated Chatbot (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[580px]" id="asisten-virtual-card">
          
          {/* Chat Header */}
          <div className="bg-primary-900 text-white p-5 flex items-center justify-between relative overflow-hidden shrink-0">
            {/* Background vector */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary-600/20 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center shadow-md">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm font-extrabold leading-none">Asisten PMB Virtual</span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wide flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Online &bull; Respon Instan
                </span>
              </div>
            </div>

            <span className="text-[10px] font-bold bg-white/15 px-2 py-0.5 rounded-md text-primary-100 uppercase tracking-wider">UAB Chat</span>
          </div>

          {/* Messages body scrolling container */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50 space-y-4 text-xs" id="chat-messages-container">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm border ${
                    msg.sender === 'user'
                      ? 'bg-primary-600 text-white border-primary-600 rounded-tr-none'
                      : 'bg-white text-slate-800 border-slate-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1 flex items-center gap-1">
                  {msg.sender === 'assistant' ? 'Asisten UAB' : 'Anda'}
                  &bull;
                  {msg.timestamp.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start max-w-[80%] mr-auto">
                <div className="p-3.5 bg-white border border-slate-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{animationDelay: '0ms'}} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{animationDelay: '150ms'}} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{animationDelay: '300ms'}} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt guides */}
          <div className="p-3 bg-white border-t border-slate-50 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 bg-slate-50 hover:bg-primary-50 text-slate-600 hover:text-primary-600 border border-slate-100 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors focus:outline-none"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat input footer */}
          <div className="p-3 border-t border-slate-100 bg-white shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ketik pertanyaan Anda di sini..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-primary-500 transition-all"
                id="chatbot-text-input"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-md shadow-primary-100 shrink-0"
                id="chatbot-send-btn"
                title="Kirim pesan"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
