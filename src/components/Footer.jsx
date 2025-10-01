import { Link } from 'react-router-dom'; // Updated import
import { useTranslation } from "react-i18next";


function Footer() {
  const { t } = useTranslation(); // Added for translations

  return (
    <footer className="relative bg-black text-white">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-black">
        {/* Subtle Golden Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234, 179, 8, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234, 179, 8, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: 'center center'
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-yellow-900/10"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="text-3xl font-bold text-white hover:text-yellow-300 transition duration-300">
                <span className="text-yellow-400">Hirpaa</span> Furniture
              </Link>
              <p className="mt-4 text-gray-300 max-w-md">
                Crafting timeless furniture pieces that blend luxury with comfort. 
                Transform your space with our exquisite collection of premium furniture.
              </p>

              {/* Social Links */}
              <div className="mt-6 flex space-x-4">
                {[
                  { icon: '📘', label: 'Facebook', url: '/Contact' },
                  { icon: '📷', label: 'Instagram', url: '/Contact' },
                  { icon: '🐦', label: 'Twitter', url: '/Contact' },
                  { icon: '💼', label: 'LinkedIn', url: '/Contact' },
                  { icon: '▶️', label: 'YouTube', url: '/Contact' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-300 hover:bg-yellow-500/30 hover:text-yellow-200 transition duration-300 border border-yellow-500/30"
                    aria-label={social.label}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-yellow-400 font-semibold text-lg mb-4">{t('quickLinks')}</h3> {/* Translated */}
              <ul className="space-y-3">
                {[
                  { name: 'home', path: '/' }, // Changed to translation keys
                  { name: 'products', path: '/products' },
                  { name: 'about', path: '/about' },
                  { name: 'contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-yellow-300 transition duration-300 hover:pl-2 block"
                    >
                      {t(link.name)} {/* Updated to use translation */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-yellow-400 font-semibold text-lg mb-4">{t('contactUs')}</h3> {/* Translated */}
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">📍</span>
                  <span>123 Furniture Street, Design District, City</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">📞</span>
                  <span>+251 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">✉️</span>
                  <span>info@hirpaafurniture.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">🕒</span>
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6">
                <h4 className="text-yellow-300 font-semibold mb-3">{t('newsletter')}</h4> {/* Translated */}
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-black/50 border border-yellow-500/30 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:border-yellow-400"
                  />
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-r-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 font-semibold">
                    {t('join')} {/* Translated */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-yellow-500/20 bg-black/70">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2025 {t('hirpaaFurniture')}. {t('allRightsReserved')} | {t('craftedWithLove')} for elegant living spaces
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/PrivacyPolicy" className="text-gray-400 hover:text-yellow-300 text-sm transition duration-300">{t('privacyPolicy')}</a>
                <a href="/TermsOfService" className="text-gray-400 hover:text-yellow-300 text-sm transition duration-300">{t('termsOfService')}</a>
                <a href="/ShippingInfo" className="text-gray-400 hover:text-yellow-300 text-sm transition duration-300">{t('shippingInfo')}</a>
              </div>
            </div>

            {/* Payment Icons */}
            <div className="flex justify-center mt-4 space-x-4">
              {['🏦', '📱'].map((method, index) => (
                <span key={index} className="text-2xl opacity-70 hover:opacity-100 transition duration-300">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer