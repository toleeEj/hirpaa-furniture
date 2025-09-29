import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom'

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]);

  return null;
}

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      <div className="text-yellow-400 text-xl">Loading products...</div>
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-red-400 text-xl">{error}</div>
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
              backgroundImage: "url('/images/owner2.webp')",
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
              Discover luxury furniture that transforms your space into a masterpiece of comfort and style
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 font-semibold text-lg shadow-lg"
              >
                Shop Collection
              </Link>
              <Link
                to="/contact"
                className="border-2 border-yellow-500 text-yellow-400 px-8 py-4 rounded-lg hover:bg-yellow-500/10 transition duration-300 font-semibold text-lg"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Company Intro */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">Crafting Excellence Since 2012</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              At Hirpaa Furniture, we blend traditional craftsmanship with contemporary design to create 
              furniture pieces that are not just functional, but tell a story. Each piece is meticulously 
              crafted to bring luxury, comfort, and timeless elegance to your living space.
            </p>
          </div>
        </section>

        {/* Promotional Banners */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Special Offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 p-8 rounded-2xl border border-yellow-500/30 text-center hover:scale-105 transition duration-300">
                <div className="text-4xl mb-4">🔥</div>
                <h4 className="text-2xl font-semibold text-yellow-300 mb-3">Summer Sale!</h4>
                <p className="text-gray-300 text-lg">Get 20% off on all premium seating. Limited time offer!</p>
                <div className="mt-4 text-yellow-400 font-bold text-xl">Use code: SUMMER20</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 p-8 rounded-2xl border border-yellow-500/30 text-center hover:scale-105 transition duration-300">
                <div className="text-4xl mb-4">🆕</div>
                <h4 className="text-2xl font-semibold text-yellow-300 mb-3">New Arrivals</h4>
                <p className="text-gray-300 text-lg">Explore our latest luxury furniture collections for 2024</p>
                <div className="mt-4 text-yellow-400 font-bold text-xl">Exclusive Designs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 bg-black/50">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Featured Collection</h3>
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
                    View Details
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
                  View All Products ({products.length})
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center">What Our Customers Say</h3>
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

        {/* Final CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-yellow-600/10 to-yellow-500/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">Ready to Transform Your Space?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let our design experts help you create the home of your dreams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 font-semibold text-lg"
              >
                Free Design Consultation
              </Link>
              <Link
                to="/about"
                className="border-2 border-yellow-500 text-yellow-400 px-8 py-4 rounded-lg hover:bg-yellow-500/10 transition duration-300 font-semibold text-lg"
              >
                Learn Our Story
              </Link>
            </div>
          </div>
        </section>
        {/* Meet the Owners Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-400 mb-6">Meet the Owners</h2>
          <p className="text-xl text-gray-300 mb-10">
            The visionaries behind Hirpaa Furniture. Each owner brings their unique expertise and passion to our company.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {['owner1.webp', 'owner2.webp', 'owner3.jpg', 'owner4.jpg', 'owner5.webp'].map((image, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <img 
                  src={`/images/${image}`} 
                  alt={`Owner ${index + 1}`} 
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-xl border-4 border-yellow-400" 
                />
                <h3 className="text-xl font-semibold text-yellow-300">Owner {index + 1}</h3>
                <p className="text-gray-300">Owner {index + 1} is passionate about crafting timeless pieces that blend function and beauty.</p>
              </div>
            ))}
          </div>
        </div>
        {/* Why Choose Us Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">Why Choose Hirpaa?</h2>
            <p className="text-gray-300 text-lg">Discover what sets us apart in the world of fine furniture</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔨',
                title: 'Expert Craftsmanship',
                description: 'Each piece handcrafted by skilled artisans with decades of experience'
              },
              {
                icon: '🌿',
                title: 'Sustainable Materials',
                description: 'Ethically sourced wood and eco-friendly finishes for a greener future'
              },
              {
                icon: '⚡',
                title: 'Custom Solutions',
                description: 'Tailored designs to fit your unique space and personal style'
              },
              {
                icon: '🏆',
                title: 'Award-Winning Design',
                description: 'Recognized internationally for innovation and aesthetic excellence'
              },
              {
                icon: '🚚',
                title: 'White-Glove Delivery',
                description: 'Professional installation and setup included with every purchase'
              },
              {
                icon: '🔒',
                title: 'Lifetime Warranty',
                description: 'Comprehensive warranty because we stand behind our craftsmanship'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-yellow-300 mb-3">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;

