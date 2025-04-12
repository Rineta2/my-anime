"use client";

import React, { useEffect, useRef } from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
  FiHome,
  FiCompass,
  FiBookmark,
  FiBook,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

import { RiPagesFill } from "react-icons/ri";

import logo from "@/base/assets/icons/logo.png"

import Image from 'next/image';

const menuItems = [
  { href: '/', label: 'Home', icon: FiHome },
  { href: '/anime-terbaru', label: 'Anime Terbaru', icon: FiCompass },
  { href: '/daftar-anime', label: 'Daftar Anime', icon: FiBookmark },
  { href: '/daftar-manga', label: 'Daftar Manga', icon: FiBook },
  { href: '/jadwal-rilis', label: 'Jadwal Rilis', icon: FiCalendar },
  { href: '/articles', label: 'Artikel', icon: RiPagesFill },
];

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (value: boolean) => void;
  isMobile: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isCollapsed, onCollapse, isMobile, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const handleToggle = () => {
    if (!isMobile) {
      onCollapse(!isCollapsed);
    }
  };

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && onClose) {
        const target = event.target as Node;
        if (sidebarRef.current && !sidebarRef.current.contains(target) &&
          overlayRef.current && overlayRef.current.contains(target)) {
          onClose();
        }
      }
    };

    if (isMobile && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      {isMobile && isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-50 bg-[var(--header-bg)] backdrop-blur-md border-r border-[var(--header-border)] shadow-[0_4px_20px_var(--header-shadow)]
          transition-all duration-300 ease-in-out
          ${isMobile
            ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-72`
            : `${isCollapsed ? 'w-20' : 'w-60'}`
          }
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-[var(--header-border)]">
          <Link href="/" className="flex items-center justify-center" onClick={handleLinkClick}>
            <div className={`rounded-lg flex items-center justify-center shadow-lg hover:shadow-primary/25 transition-all duration-300 ${isCollapsed && !isMobile ? 'w-12 h-12' : 'w-28 h-28'}`}>
              <Image
                src={logo}
                alt="Anime Indo Logo"
                width={isCollapsed && !isMobile ? 32 : 500}
                height={isCollapsed && !isMobile ? 32 : 500}
                priority
                quality={100}
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Collapse Button */}
        {!isMobile && (
          <button
            onClick={handleToggle}
            className="absolute -right-4 top-8 p-2 rounded-full bg-[var(--header-bg)] border border-[var(--header-border)] shadow-[0_4px_20px_var(--header-shadow)] hover:bg-[var(--hover-bg)] transition-all duration-300 group z-50"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? (
              <FiChevronRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            ) : (
              <FiChevronLeft className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            )}
          </button>
        )}

        {/* Navigation */}
        <nav className="p-4 mt-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 ${isLinkActive(item.href)
                    ? 'bg-gradient-to-br from-primary to-primary-hover text-white shadow-lg shadow-primary/25 hover:shadow-primary/40'
                    : 'hover:bg-[var(--hover-bg)] hover:text-[var(--text)]'
                    } ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
                  title={isCollapsed && !isMobile ? item.label : undefined}
                >
                  <item.icon
                    className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 ${isCollapsed && !isMobile ? '' : 'mr-3'
                      } ${isLinkActive(item.href) ? 'text-white' : 'text-[var(--text-secondary)] group-hover:text-primary'}`}
                  />
                  {(!isCollapsed || isMobile) && (
                    <span className={`text-sm font-medium transition-colors duration-300 ${isLinkActive(item.href) ? 'text-white' : 'text-[var(--text)] group-hover:text-primary'
                      }`}>
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--header-border)]">
          <div className="flex">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
              <span className="text-white text-lg font-bold">A</span>
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="ml-3">
                <p className="text-sm font-semibold text-[var(--text)]">Anime Indo</p>
                <p className="text-xs text-[var(--text-secondary)]">v1.0.1</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 