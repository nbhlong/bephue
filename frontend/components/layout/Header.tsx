'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/menu', label: 'Thực đơn' },
    { href: '/about', label: 'Về chúng tôi' },
    { href: '/contact', label: 'Liên hệ' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bep-cream shadow-bep-md border-b border-bep-bamboo/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-heading font-bold text-bep-red transition-colors group-hover:text-bep-red-dark">
              Bếp Huế
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body font-medium transition-colors relative ${
                  isActive(link.href)
                    ? 'text-bep-red'
                    : 'text-bep-brown hover:text-bep-red'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-bep-red rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/reservation"
              className="bg-bep-red hover:bg-bep-red-dark text-white px-6 py-3 rounded-bep font-semibold transition-all duration-300 shadow-bep hover:shadow-bep-glow"
            >
              Đặt bàn
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-bep-brown hover:text-bep-red transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-bep-bamboo/20">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-body font-medium transition-colors px-4 py-2 rounded-bep ${
                    isActive(link.href)
                      ? 'text-bep-red bg-bep-cream-light'
                      : 'text-bep-brown hover:text-bep-red hover:bg-bep-cream-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/reservation"
                onClick={() => setIsMenuOpen(false)}
                className="bg-bep-red hover:bg-bep-red-dark text-white px-6 py-3 rounded-bep font-semibold transition-all duration-300 mx-4 text-center shadow-bep hover:shadow-bep-glow"
              >
                Đặt bàn
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
