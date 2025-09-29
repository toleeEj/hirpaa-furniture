import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useLocation } from 'react-router-dom'

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]);

  return null;
}

function ProductDetail() {
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
      if (error) setError('Product not found.')
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
      setSuccess('Order placed successfully! We will contact you shortly.')
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
      setSuccess('Request submitted successfully! Thank you for your interest.')
      setCustomerName('')
      setMessage('')
      setShowRequestForm(false)
    }
    setIsSubmitting(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-yellow-400 text-xl">Loading product details...</div>
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-400 text-xl mb-4">{error}</div>
        <Link to="/products" className="text-yellow-400 hover:text-yellow-300 underline">
          Back to Products
        </Link>
      </div>
    </div>
  )
  
  if (!product) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-xl mb-4">No product data available.</div>
        <Link to="/products" className="text-yellow-400 hover:text-yellow-300 underline">
          Browse Our Collection
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
          <Link to="/" className="text-yellow-400 hover:text-yellow-300">Home</Link>
          <span className="text-gray-400 mx-2">/</span>
          <Link to="/products" className="text-yellow-400 hover:text-yellow-300">Products</Link>
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
              <span className="text-gray-400 ml-2">+ Free Shipping</span>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">Description</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description || 'No description available for this product.'}
              </p>
            </div>

            {/* Product Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Premium Materials',
                  'Expert Craftsmanship',
                  'Free Shipping',
                  'Lifetime Warranty',
                  'Easy Assembly',
                  'Eco-Friendly'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-2">✓</span>
                    {feature}
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
                🛒 Order Now
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
                💬 Custom Request
              </button>
            </div>

            {/* Order Form */}
            {showOrderForm && (
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20 mb-4">
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Place Your Order</h3>
                <form onSubmit={handleOrder} className="space-y-4">
                  <div>
                    <label className="block text-yellow-300 font-semibold mb-2">Your Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-300 font-semibold mb-2">Special Requests</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 resize-vertical"
                      placeholder="Any customization or special requirements?"
                      rows="3"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
                  </button>
                </form>
              </div>
            )}

            {/* Request Form */}
            {showRequestForm && (
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Custom Product Request</h3>
                <form onSubmit={handleRequest} className="space-y-4">
                  <div>
                    <label className="block text-yellow-300 font-semibold mb-2">Your Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-300 font-semibold mb-2">Request Details</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 resize-vertical"
                      placeholder="Describe your custom furniture requirements..."
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
                <span>🔒</span>
                <span>Secure transaction • 24/7 Support • Free Returns</span>
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
            ← Back to Products Collection
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
