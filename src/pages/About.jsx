import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next' // Updated import
import { useEffect } from "react";


function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top of the page
  }, [pathname])

  return null
}

function About() {
  const { t } = useTranslation() // Added for translations

  return (
    <div className="relative overflow-hidden min-h-screen bg-black">
      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Simplified Background */}
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-white">
        
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
          
          {/* Our Story */}
          <div>
            <div className="mb-8">
              <span className="text-yellow-400 font-semibold text-lg">{t('ourJourney')}</span> {/* Translated */}
              <h2 className="text-4xl font-bold mt-2 text-white">{t('theHirpaaStory')}</h2> {/* Translated */}
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                {t('foundedIn2012')} {/* Translated */}
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {t('craftedByArtisans')} {/* Translated */}
              </p>

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

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-2xl border border-yellow-500/30">
          <h3 className="text-3xl font-bold text-yellow-300 mb-4">{t('readyToTransform')}</h3> {/* Translated */}
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            {t('exploreCollectionsConsultation')} {/* Translated */}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 rounded-lg font-semibold text-lg shadow-lg"
            >
              {t('viewCollections')} {/* Translated */}
            </Link>
            <Link
                to="/products"
                className="bg-gradient-to-r from-yellow-800 to-yellow-600 text-black px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 font-semibold text-lg"
              >
                {t('shopCollection')} {/* Translated */}
              </Link>
            <Link
              to="/contact"
              className="border-2 border-yellow-500 text-yellow-400 px-8 py-3 rounded-lg font-semibold text-lg"
            >
              {t('bookConsultation')} {/* Translated */}
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-yellow-300">{t('getInTouch')}</h3> {/* Translated */}
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <span className="text-2xl text-yellow-400">📧</span>
              <a href="mailto:info@hirpaafurniture.com" className="hover:text-yellow-300">
                info@hirpaafurniture.com
              </a>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <span className="text-2xl text-yellow-400">📞</span>
              <a href="tel:+1234567890" className="hover:text-yellow-300">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <span className="text-2xl text-yellow-400">📍</span>
              <Link to="/contact" className="hover:text-yellow-300">
                {t('visitShowroom')} {/* Translated */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About