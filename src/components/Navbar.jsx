import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Keep existing
import { useState } from 'react';
import i18n from '../i18n'; 

const navLinks = [
  { to: '/', label: 'home' }, // Keep existing translation keys
  { to: '/products', label: 'products' },
  { to: '/about', label: 'about' },
  { to: '/contact', label: 'contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false); // Add state for language dropdown
  const location = useLocation();
  const { t } = useTranslation(); // Keep existing

  const isActive = (path) =>
    location.pathname === path
      ? 'text-yellow-300 font-bold drop-shadow-lg'
      : 'text-gray-200 hover:text-yellow-300';

  const linkClass =
    'transition duration-300 px-3 py-2 rounded-lg hover:bg-yellow-500/10';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false); // Close dropdown after selection
  };

  return (
    <nav className="relative sticky top-0 z-50 shadow-md">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-black">
        {/* Subtle Golden Grid */}
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

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-yellow-900/5 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/10 via-transparent to-yellow-600/10" />
      </div>

      {/* Navbar Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png" // Make sure the logo.png is located correctly
              alt="Logo"
              className="h-12" // Adjust the height based on your logo's size
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={`${linkClass} ${isActive(to)}`}>
                {t(label)} {/* Keep existing translation */}
              </Link>
            ))}
            {/* Language Switcher for Desktop */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 px-4 py-2 rounded-lg flex items-center transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                aria-label="Language Switcher"
              >
                <span className="mr-2 text-lg">🌐</span>
                {t('language')} {/* Optional: Translate "Language" if needed */}
                <svg
                  className={`w-4 h-4 ml-2 transform transition duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Language Dropdown for Desktop */}
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-yellow-500/30 rounded-lg shadow-xl py-2 z-50 animate-fadeIn">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="w-full text-left px-4 py-3 text-yellow-300 hover:bg-yellow-500/20 transition duration-300 text-sm"
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => changeLanguage('am')}
                    className="w-full text-left px-4 py-3 text-yellow-300 hover:bg-yellow-500/20 transition duration-300 text-sm"
                  >
                    🇪🇹 Amharic
                  </button>
                  <button
                    onClick={() => changeLanguage('om')}
                    className="w-full text-left px-4 py-3 text-yellow-300 hover:bg-yellow-500/20 transition duration-300 text-sm"
                  >
                    🇪🇹 Oromo
                  </button>
                </div>
              )}
            </div>
          </div>

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
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all overflow-hidden duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 border-t border-yellow-500/20 pt-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`py-3 px-4 rounded-lg hover:bg-yellow-500/10 transition ${isActive(to)}`}
                onClick={() => setIsOpen(false)}
              >
                {t(label)} {/* Keep existing translation */}
              </Link>
            ))}
            {/* Language Switcher for Mobile */}
            <div className="px-4 pt-4 border-t border-yellow-500/20">
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="w-full bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 px-4 py-3 rounded-lg flex items-center justify-between transition duration-300 focus:outline-none"
                >
                  <span className="text-lg mr-2">🌐</span>
                  {t('language')}
                  <svg
                    className={`w-4 h-4 transform transition duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Language Dropdown for Mobile */}
                {isLanguageOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-black/95 backdrop-blur-md border border-yellow-500/30 rounded-lg shadow-xl py-2 z-50 animate-fadeIn">
                    <button
                      onClick={() => changeLanguage('en')}
                      className="w-full text-left px-4 py-3 text-yellow-300 hover:bg-yellow-500/20 transition duration-300 text-sm"
                    >
                      🇺🇸 English
                    </button>
                    <button
                      onClick={() => changeLanguage('am')}
                      className="w-full text-left px-4 py-3 text-yellow-300 hover:bg-yellow-500/20 transition duration-300 text-sm"
                    >
                      🇪🇹 Amharic
                    </button>
                    <button
                      onClick={() => changeLanguage('om')}
                      className="w-full text-left px-4 py-3 text-yellow-300 hover:bg-yellow-500/20 transition duration-300 text-sm"
                    >
                      🇪🇹 Oromo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
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