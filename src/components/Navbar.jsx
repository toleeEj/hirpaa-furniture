import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import i18n from '../i18n';

const navLinks = [
  { to: '/', label: 'home' },
  { to: '/products', label: 'products' },
  { to: '/about', label: 'about' },
  { to: '/contact', label: 'contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-yellow-300 font-bold drop-shadow-lg'
      : 'text-gray-200 hover:text-yellow-300';

  const linkClass =
    'transition duration-300 px-3 py-2 rounded-lg hover:bg-yellow-500/10';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  return (
    <nav className="relative sticky top-0 z-50 shadow-md">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234,179,8,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234,179,8,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-yellow-900/5 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/10 via-transparent to-yellow-600/10" />
      </div>

      {/* Navbar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 bg-yellow-500/10 rounded-lg hover:bg-yellow-500/20 transition"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-yellow-300 transition ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-6 bg-yellow-300 transition ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-yellow-300 transition ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={`${linkClass} ${isActive(to)}`}>
                {t(label)}
              </Link>
            ))}

            {/* Language Dropdown (Desktop) */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 px-3 py-2 rounded-lg flex items-center transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <span className="mr-2 text-lg">🌐</span>
                {t('language')}
                <svg
                  className={`w-4 h-4 ml-1 transform transition ${isLanguageOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-black/95 backdrop-blur-md border border-yellow-500/30 rounded-lg shadow-xl py-2 z-50 animate-fadeIn">
                  {[
                    { code: 'en', label: '🇺🇸 English' },
                    { code: 'am', label: '🇪🇹 Amharic' },
                    { code: 'om', label: '🇪🇹 Oromo' },
                  ].map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => changeLanguage(code)}
                      className="w-full text-left px-4 py-2 text-yellow-300 hover:bg-yellow-500/20 transition text-sm"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-2 border-t border-yellow-500/20 pt-3">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`py-3 px-4 rounded-lg hover:bg-yellow-500/10 transition ${isActive(to)}`}
                onClick={() => setIsOpen(false)}
              >
                {t(label)}
              </Link>
            ))}

            {/* Mobile Language Dropdown */}
            <div className="px-4 pt-3 border-t border-yellow-500/20">
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="w-full bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 px-4 py-3 rounded-lg flex items-center justify-between transition"
                >
                  <span className="flex items-center">
                    🌐 <span className="ml-2">{t('language')}</span>
                  </span>
                  <svg
                    className={`w-4 h-4 transform transition ${isLanguageOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isLanguageOpen && (
                  <div className="fixed inset-x-4 mt-2 bg-black/95 backdrop-blur-md border border-yellow-500/30 rounded-lg shadow-xl py-2 z-[100] animate-fadeIn">
                    {[
                      { code: 'en', label: '🇺🇸 English' },
                      { code: 'am', label: '🇪🇹 Amharic' },
                      { code: 'om', label: '🇪🇹 Oromo' },
                    ].map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => changeLanguage(code)}
                        className="w-full text-left px-4 py-2 text-yellow-300 hover:bg-yellow-500/20 transition text-sm"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
