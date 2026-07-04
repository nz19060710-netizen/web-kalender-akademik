/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GraduationCap, Menu, X, Calendar, PhoneCall, Calculator, HelpCircle, BookOpen, Layers, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'beranda', label: 'Beranda', icon: GraduationCap },
    { id: 'prodi', label: 'Fakultas & Prodi', icon: BookOpen },
    { id: 'kalender', label: 'Kalender & Libur', icon: Calendar },
    { id: 'biaya', label: 'Simulasi UKT', icon: Calculator },
    { id: 'faq', label: 'FAQ & Asisten', icon: HelpCircle },
    { id: 'admin', label: 'Portal Admin', icon: ShieldCheck },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm" id="main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <button 
              onClick={() => setActiveTab('beranda')}
              className="flex items-center gap-3 group text-left focus:outline-none"
              id="brand-logo-btn"
            >
              <div className="p-2.5 bg-primary-600 rounded-xl text-white shadow-md shadow-primary-200 transition-all duration-300 group-hover:bg-primary-700">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-lg font-bold tracking-tight text-slate-900 font-sans leading-tight">
                  UNIVERSITAS
                </span>
                <span className="block text-sm font-semibold text-primary-600 tracking-wider font-sans -mt-0.5 uppercase">
                  Anak Bangsa
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-semibold border-b-2 border-primary-600 rounded-b-none'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Call-to-Action Info */}
          <div className="hidden lg:flex items-center">
            <button 
              onClick={() => setActiveTab('kalender')}
              className="flex items-center gap-2 bg-primary-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-primary-100 hover:bg-primary-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none"
              id="cta-kalender-btn"
            >
              <span>Kalender Akademik</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md font-normal">TA 2026/2027</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-expanded="false"
              id="mobile-menu-toggle"
            >
              <span className="sr-only">Buka menu utama</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl animate-in slide-in-from-top duration-200" id="mobile-navbar-drawer">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 pb-2 border-t border-slate-100 px-4">
              <button
                onClick={() => handleTabClick('kalender')}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:bg-primary-700"
                id="mobile-cta-btn"
              >
                <span>Lihat Kalender Akademik</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
