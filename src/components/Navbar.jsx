import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-yellow-300 font-bold drop-shadow-lg'
      : 'text-gray-200 hover:text-yellow-300';

  const linkClass =
    'transition duration-300 px-3 py-2 rounded-lg hover:bg-yellow-500/10';

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
                {label}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg font-semibold border-2 border-yellow-300 shadow-lg hover:from-yellow-400 hover:to-yellow-500 hover:shadow-yellow-500/25 transform hover:scale-105 transition-all"
            >
              Login
            </Link>
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
        <div className={`md:hidden transition-all overflow-hidden duration-300 ${isOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 border-t border-yellow-500/20 pt-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`py-3 px-4 rounded-lg hover:bg-yellow-500/10 transition ${isActive(to)}`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold border-2 border-yellow-300 mt-2 text-center hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 transform transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
