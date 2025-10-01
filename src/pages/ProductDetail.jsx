import { useEffect, useState } from 'react' // Updated import
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useLocation } from 'react-router-dom'
import { useTranslation } from "react-i18next";


// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top of the page
  }, [pathname])

  return null
}

function ProductDetail() {
  const { t } = useTranslation() // Added for translations
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(null)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      if (error) setError(t('productNotFound')) // Translated
      else setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  const handleOrder = async (e) => {
    e.preventDefault()
    if (!product) return
    setIsSubmitting(true)
    setError(null)
    
    const { error } = await supabase.from('orders').insert({
      customer_name: customerName,
      product_id: product.id,
      message,
      status: 'new',
    })
    if (error) setError(error.message)
    else {
      setSuccess(t('orderPlacedSuccess')) // Translated
      setCustomerName('')
      setMessage('')
      setShowOrderForm(false)
    }
    setIsSubmitting(false)
  }

  const handleRequest = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const { error } = await supabase.from('requests').insert({
      customer_name: customerName,
      message,
    })
    if (error) setError(error.message)
    else {
      setSuccess(t('requestSubmittedSuccess')) // Translated
      setCustomerName('')
      setMessage('')
      setShowRequestForm(false)
    }
    setIsSubmitting(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-yellow-400 text-xl">{t('loadingProductDetails')}</div> {/* Translated */}
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-400 text-xl mb-4">{error}</div>
        <Link to="/products" className="text-yellow-400 hover:text-yellow-300 underline">
          {t('backToProducts')}
        </Link>
      </div>
    </div>
  )
  
  if (!product) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-xl mb-4">{t('noProductData')}</div> {/* Translated */}
        <Link to="/products" className="text-yellow-400 hover:text-yellow-300 underline">
          {t('browseCollection')}
        </Link>
      </div>
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/" className="text-yellow-400 hover:text-yellow-300">{t('home')}</Link>
          <span className="text-gray-400 mx-2">/</span>
          <Link to="/products" className="text-yellow-400 hover:text-yellow-300">{t('products')}</Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-300">{product.name}</span>
        </nav>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-500/20 border border-green-500/30 text-green-300 p-4 rounded-lg mb-6 text-center">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-lg mb-6 text-center">
            ❌ {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="bg-yellow-500/5 rounded-2xl border border-yellow-500/20 p-6">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-full h-96 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 text-2xl">🛋️</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-black/30 rounded-2xl border border-yellow-500/20 p-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-yellow-300">${product.price}</span>
              <span className="text-gray-400 ml-2">{t('freeShipping')}</span> {/* Translated */}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">{t('description')}</h3> {/* Translated */}
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description || t('noDescriptionAvailable')} {/* Translated */}
              </p>
            </div>

            {/* Product Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">{t('features')}</h3> {/* Translated */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  'premiumMaterials',
                  'expertCraftsmanship',
                  'freeShipping',
                  'lifetimeWarranty',
                  'easyAssembly',
                  'ecoFriendly'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-2">✓</span>
                    {t(feature)} {/* Translated */}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-6">
              <button
                onClick={() => {
                  setShowOrderForm(true)
                  setShowRequestForm(false)
                  setCustomerName('')
                  setMessage('')
                  setSuccess(null)
                  setError(null)
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 shadow-lg"
              >
                {t('orderNow')}
              </button>
              
              <button
                onClick={() => {
                  setShowRequestForm(true)
                  setShowOrderForm(false)
                  setCustomerName('')
                  setMessage('')
                  setSuccess(null)
                  setError(null)
                }}
                className="w-full border-2 border-yellow-500 text-yellow-400 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500/10 transition duration-300"
              >
                {t('customRequest')}
              </button>
            </div>

            {/* Order Form */}
            {showOrderForm && (
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20 mb-4">
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">{t('placeOrder')}</h3> {/* Translated */}
                <form onSubmit={handleOrder} className="space-y-4">
                  <div>
                    <label className="block text-yellow-300 font-semibold mb-2">{t('yourName')}</label> {/* Translated */}
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      placeholder={t('enterFullName')} /* Translated */
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-300 font-semibold mb-2">{t('specialRequests')}</label> {/* Translated */}
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 resize-vertical"
                      placeholder={t('customizationPlaceholder')} /* Translated */
                      rows="3"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? t('placingOrder') : t('confirmOrder')} {/* Translated */}
                  </button>
                </form>
              </div>
            )}

            {/* Request Form */}
            {showRequestForm && (
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">{t('customProductRequest')}</h3> {/* Translated */}
                <form onSubmit={handleRequest} className="space-y-4">
                  <div>
                    <label className="block text-yellow-300 font-semibold mb-2">{t('yourName')}</label> {/* Translated */}
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      placeholder={t('enterFullName')} /* Translated */
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-300 font-semibold mb-2">{t('requestDetails')}</label> {/* Translated */}
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 resize-vertical"
                      placeholder={t('requestPlaceholder')} /* Translated */
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? t('submitting') : t('submitRequest')} {/* Translated */}
                  </button>
                </form>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
                <span>🔒</span>
                <span>{t('secureTransaction')} • {t('24_7Support')} • {t('freeReturns')}</span> {/* Translated */}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Products */}
        <div className="text-center mt-12">
          <Link 
            to="/products" 
            className="inline-block border-2 border-yellow-500 text-yellow-400 px-8 py-3 rounded-lg hover:bg-yellow-500/10 transition duration-300 font-semibold"
          >
            ← {t('backToProductsCollection')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail