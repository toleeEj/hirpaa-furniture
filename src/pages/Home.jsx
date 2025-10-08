import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
// import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom' // Updated import
import { useTranslation } from 'react-i18next' // Added for translations

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top of the page
  }, [pathname])

  return null
}

function Home() {
  const { t } = useTranslation() // Added for translations
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(null)
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



  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.from('products').select('*')
      if (error) setError('Failed to load products.')
      else setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-yellow-400 text-xl">{t('loadingProducts')}</div> {/* Translated */}
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-red-400 text-xl">{t('errorLoadingProducts')}</div> {/* Translated */}
    </div>
  )
  



  

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

      <div className="relative z-10">
        {/* Hero Banner */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/landing.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-yellow-400">Hirphaa</span> Furniture
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {t('discoverLuxuryFurniture')} {/* Translated */}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 font-semibold text-lg shadow-lg"
              >
                {t('shopCollection')} {/* Translated */}
              </Link>
              <Link
                to="/contact"
                className="border-2 border-yellow-500 text-yellow-400 px-8 py-4 rounded-lg hover:bg-yellow-500/10 transition duration-300 font-semibold text-lg"
              >
                {t('bookConsultation')} {/* Translated */}
              </Link>
            </div>
          </div>
        </div>

        {/* Promotional Banners */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center">{t('specialOffers')}</h3> {/* Translated */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 p-8 rounded-2xl border border-yellow-500/30 text-center hover:scale-105 transition duration-300">
                <div className="text-4xl mb-4">🔥</div>
                <h4 className="text-2xl font-semibold text-yellow-300 mb-3">{t('summerSale')}</h4> {/* Translated */}
                <p className="text-gray-300 text-lg">{t('summerSaleDescription')}</p> {/* Translated */}
                <div className="mt-4 text-yellow-400 font-bold text-xl">{t('summerSaleCode')}</div> {/* Translated */}
              </div>
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 p-8 rounded-2xl border border-yellow-500/30 text-center hover:scale-105 transition duration-300">
                <div className="text-4xl mb-4">🆕</div>
                <h4 className="text-2xl font-semibold text-yellow-300 mb-3">{t('newArrivals')}</h4> {/* Translated */}
                <p className="text-gray-300 text-lg">{t('newArrivalsDescription')}</p> {/* Translated */}
                <div className="mt-4 text-yellow-400 font-bold text-xl">{t('exclusiveDesigns')}</div> {/* Translated */}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 bg-black/50">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center">{t('featuredCollection')}</h3> {/* Translated */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="bg-yellow-500/5 p-6 rounded-2xl border border-yellow-500/20 hover:bg-yellow-500/10 transition duration-300 hover:scale-105 group"
                >
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-110 transition duration-300"
                    />
                  )}
                  <h4 className="text-xl font-semibold text-yellow-300 mb-2">{product.name}</h4>
                  <p className="text-yellow-400 font-bold text-lg mb-3">${product.price}</p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-2 rounded-lg text-center font-semibold hover:from-yellow-400 hover:to-yellow-500 transition duration-300"
                  >
                    {t('viewDetails')} {/* Translated */}
                  </Link>
                </div>
              ))}
            </div>
            {products.length > 6 && (
              <div className="text-center mt-8">
                <Link
                  to="/products"
                  className="inline-block border-2 border-yellow-500 text-yellow-400 px-8 py-3 rounded-lg hover:bg-yellow-500/10 transition duration-300 font-semibold"
                >
                  {t('viewAllProducts')} ({products.length}) {/* Translated */}
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center">{t('whatCustomersSay')}</h3> {/* Translated */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 text-lg italic">"The quality and craftsmanship exceeded my expectations. My living room has never looked better!"</p>
                <p className="text-yellow-300 mt-4 font-semibold">- Sarah Johnson</p>
              </div>
              <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 text-lg italic">"From consultation to delivery, the service was impeccable. The furniture is absolutely stunning!"</p>
                <p className="text-yellow-300 mt-4 font-semibold">- Michael Chen</p>
              </div>
            </div>
          </div>
        </section>

        


        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-yellow-400">{t('crafting')}</span> 
            <span className="text-white">{t('excellence')}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('aboutDecadeIntro')} {/* Translated */}
          </p>
        </div>


         {/* Meet the Owners Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-yellow-400 mb-6">{t('meetTheOwners')}</h2> {/* Translated */}
        <p className="text-xl text-gray-300 mb-10">
          {t('ownersVisionaries')} {/* Translated */}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { name: "test 1", passion: "Passionate about crafting custom furniture, while expertly combining traditional woodworking with modern design techniques." },
            { name: "test 2", passion: "Driven to restore and upcycle old pieces, applying deep expertise in furniture restoration to bring new life to cherished antiques." },
            { name: "test 3", passion: "Eager to experiment with innovative materials and tools, blending artistic vision with the technical expertise required for flawless execution." },
            { name: "test 4", passion: "Committed to creating functional yet aesthetically pleasing pieces, with a keen understanding of design principles and ergonomics." },
            { name: "test 5", passion: "Enthusiastic about continually improving their craft through learning and adapting, demonstrating both a passion for the art of furniture-making and mastery of the skills involved." },
          ].map((worker, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <img 
                src={`/images/${index + 1}.jpg`} 
                alt={`Worker ${worker.name}`} 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-xl border-4 border-yellow-400" 
              />
              <h3 className="text-xl font-semibold text-yellow-300">{worker.name}</h3>
              <p className="text-gray-300">{worker.passion}</p> {/* Display worker's passion */}
            </div>
          ))}
        </div>
      </div>



          {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '12+', label: 'years Experience' },
            { number: '5000+', label: 'Happy Customers' },
            { number: '200+', label: 'Unique Designs' },
            { number: '15+', label: 'Awards Won' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm">{t(stat.label)}</div> {/* Translated */}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Our Story Section */}
          <div className="max-w-3xl mx-auto px-6 py-8 bg-gray-900 rounded-lg">
            {/* Section Heading */}
            <div className="mb-8">
              <span className="text-yellow-400 font-semibold text-lg">{t('ourJourney')}</span> {/* Translated */}
              <h2 className="text-4xl font-bold mt-2 text-white">{t('theHirpaaStory')}</h2> {/* Translated */}
            </div>
            
            {/* Story Content */}
            <div className="space-y-6">
              {/* Founding Information */}
              <p className="text-gray-300 text-lg leading-relaxed">
                {t('foundedIn2012')} {/* Translated */}
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {t('craftedByArtisans')} {/* Translated */}
              </p>

              {/* Highlighted Quote from Founder */}
              <div className="bg-yellow-500/10 p-6 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-200 italic text-lg">
                  {t('furnitureInspires')} {/* Translated */}
                </p>
                <p className="text-yellow-400 mt-2 font-semibold">- {t('samuelHirpaa')} {t('founder')}</p> {/* Translated */}
              </div>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="space-y-8">
            {/* Mission */}
            <div className="bg-black/30 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300 flex items-center">
                <span className="text-yellow-400 mr-3">🎯</span>
                {t('ourMission')} {/* Translated */}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('enhanceLivingSpaces')} {/* Translated */}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-black/30 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300 flex items-center">
                <span className="text-yellow-400 mr-3">✨</span>
                {t('ourVision')} {/* Translated */}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('leadingChoiceHomeowners')} {/* Translated */}
              </p>
            </div>

            {/* Values */}
            <div className="bg-black/30 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300 flex items-center">
                <span className="text-yellow-400 mr-3">💎</span>
                {t('coreValues')} {/* Translated */}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Quality Craftsmanship',
                  'Sustainability',
                  'Customer Focus',
                  'Innovation',
                  'Timeless Design',
                  'Integrity'
                ].map((value, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-2">✓</span>
                    {t(value)} {/* Translated */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Why Choose Us Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">{t('whyChooseHirpaa')}</h2> {/* Translated */}
            <p className="text-gray-300 text-lg">{t('whatSetsUsApart')}</p> {/* Translated */}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔨',
                title: 'expertCraftsmanship',
                description: 'Each piece handcrafted by skilled artisans with decades of experience'
              },
              {
                icon: '🌿',
                title: 'sustainableMaterials',
                description: 'Ethically sourced wood and eco-friendly finishes for a greener future'
              },
              {
                icon: '⚡',
                title: 'customSolutions',
                description: 'Tailored designs to fit your unique space and personal style'
              },
              {
                icon: '🏆',
                title: 'awardWinningDesign',
                description: 'Recognized internationally for innovation and aesthetic excellence'
              },
              {
                icon: '🚚',
                title: 'whiteGloveDelivery',
                description: 'Professional installation and setup included with every purchase'
              },
              {
                icon: '🔒',
                title: 'lifetimeWarranty',
                description: 'Comprehensive warranty because we stand behind our craftsmanship'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-yellow-300 mb-3">{t(feature.title)}</h4> {/* Translated */}
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

            {/* Final CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-yellow-600/10 to-yellow-500/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">{t('transformYourSpace')}</h2> {/* Translated */}
            <p className="text-xl text-gray-300 mb-8">
              {t('designExpertHelp')} {/* Translated */}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 font-semibold text-lg"
              >
                {t('freeDesignConsultation')} {/* Translated */}
              </Link>
              <Link
                to="/products"
                className="bg-gradient-to-r from-yellow-800 to-yellow-600 text-black px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 font-semibold text-lg"
              >
                {t('shopCollection')} {/* Translated */}
              </Link>
              <Link
                to="/about"
                className="border-2 border-yellow-500 text-yellow-400 px-8 py-4 rounded-lg hover:bg-yellow-500/10 transition duration-300 font-semibold text-lg"
              >
                {t('learnOurStory')} {/* Translated */}
              </Link>
            </div>
          </div>
        </section>
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
                    <p className="text-gray-300">123 Furniture Street<br />Design District, City 10001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                  <span className="text-2xl text-yellow-400 mt-1">📞</span>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300">{t('callUs')}</h3> {/* Translated */}
                    <p className="text-gray-300">+1 (234) 567-890<br />Mon-Fri: 9AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                  <span className="text-2xl text-yellow-400 mt-1">📧</span>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300">{t('emailUs')}</h3> {/* Translated */}
                    <p className="text-gray-300">info@hirpaafurniture.com<br />{t('respondWithin24h')}</p> {/* Translated */}
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

      </div>
    </div>
    
  )
}

export default Home