import { useState } from 'react' // Updated import
import { supabase } from '../lib/supabase'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from "react-i18next";


function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top of the page
  }, [pathname])

  return null
}

function Contact() {
  const { t } = useTranslation() // Added for translations
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    
    const { error } = await supabase.from('messages').insert({
      name,
      email,
      message,
    })
    
    if (error) {
      setError(t('errorSendingMessage', { error: error.message })) // Translated
    } else {
      setSuccess(t('messageSentSuccess')) // Translated
      setName('')
      setEmail('')
      setMessage('')
    }
    setIsLoading(false)
  }

  return (
    <div className="relative overflow-hidden min-h-screen bg-black">
      {/* Scroll to Top */}
      <ScrollToTop />
      {/* Background Layer */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234,179,8,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234,179,8,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-yellow-900/10 to-black"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            <span className="text-yellow-400">{t('getIn')}</span> {t('touch')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('contactQuestionsIntro')} {/* Translated */}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-yellow-400 mb-6">{t('contactInformation')}</h2> {/* Translated */}
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                  <span className="text-2xl text-yellow-400 mt-1">📍</span>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300">{t('visitShowroom')}</h3> {/* Translated */}
                    <p className="text-gray-300">Ayartena<br />Addis ababa, City 1000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                  <span className="text-2xl text-yellow-400 mt-1">📞</span>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300">{t('callUs')}</h3> {/* Translated */}
                    <p className="text-gray-300">+251 567-890-12<br />Mon-Fri: 9AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                  <span className="text-2xl text-yellow-400 mt-1">📧</span>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300">{t('emailUs')}</h3> {/* Translated */}
                    <p className="text-gray-300">Hirphaa323@gmail.com<br />{t('respondWithin24h')}</p> {/* Translated */}
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                  <span className="text-2xl text-yellow-400 mt-1">🕒</span>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300">{t('businessHours')}</h3> {/* Translated */}
                    <p className="text-gray-300">
                      {t('monFriHours')}<br />
                      {t('satHours')}<br />
                      {t('sunClosed')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="bg-yellow-500/10 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">{t('whyContactHirpaa')}</h3> {/* Translated */}
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-2">✓</span>
                  {t('freeDesignConsultation')} {/* Translated */}
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-2">✓</span>
                  {t('customFurnitureSolutions')} {/* Translated */}
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-2">✓</span>
                  {t('professionalSpacePlanning')} {/* Translated */}
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-2">✓</span>
                  {t('bulkOrderDiscounts')} {/* Translated */}
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/30 p-8 rounded-2xl border border-yellow-500/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">{t('sendUsMessage')}</h2> {/* Translated */}
            <p className="text-gray-300 mb-8">{t('respondWithin24h')}</p> {/* Translated */}

            {/* Success/Error Messages */}
            {success && (
              <div className="bg-green-500/20 border border-green-500/30 text-green-300 p-4 rounded-lg mb-6">
                ✅ {success}
              </div>
            )}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-lg mb-6">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-yellow-300 font-semibold mb-2">{t('fullName')}</label> {/* Translated */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition duration-300"
                  placeholder={t('enterFullName')} 
                  required
                />
              </div>

              <div>
                <label className="block text-yellow-300 font-semibold mb-2">{t('emailAddress')}</label> {/* Translated */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition duration-300"
                  placeholder={t('enterEmail')} /* Translated */
                  required
                />
              </div>

              <div>
                <label className="block text-yellow-300 font-semibold mb-2">{t('yourMessage')}</label> {/* Translated */}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition duration-300 resize-vertical"
                  placeholder={t('messagePlaceholder')} /* Translated */
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></span>
                    {t('sending')}...
                  </span>
                ) : (
                  t('sendMessage') /* Translated */
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                {t('byContactingUs')} {' '}
                <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">
                  {t('privacyPolicy')} {/* Translated */}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Response Promise */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 px-6 py-3 rounded-full border border-yellow-500/20">
            <span className="text-yellow-400">⚡</span>
            <span className="text-gray-300">{t('responseWithin24h')}</span> {/* Translated */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact