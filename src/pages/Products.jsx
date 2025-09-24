import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100000)
  const [sortOption, setSortOption] = useState('price-asc')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.from('products').select('*')
      if (error) {
        setError('Failed to load products. Check Supabase connection or permissions.')
        console.error('Fetch error:', error)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => product.price >= minPrice && product.price <= maxPrice)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price
    if (sortOption === 'price-desc') return b.price - a.price
    if (sortOption === 'newest') return b.id - a.id
    return 0
  })

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-yellow-200 text-lg">Loading products...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-center p-8 bg-red-900 bg-opacity-20 rounded-xl border border-red-500 border-opacity-30 max-w-md">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-900 bg-opacity-20 to-yellow-800 bg-opacity-10 border-b border-yellow-500 border-opacity-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Luxury Collection
            </span>
          </h1>
          <p className="text-yellow-200 text-center text-lg">Discover our premium products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Promotional Banners */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-yellow-900 bg-opacity-30 to-yellow-800 bg-opacity-20 p-6 rounded-2xl border border-yellow-500 border-opacity-30 shadow-2xl shadow-yellow-500 shadow-opacity-10">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-black font-bold">%</span>
                </div>
                <h4 className="text-xl font-semibold text-yellow-300">Special Discount!</h4>
              </div>
              <p className="text-yellow-100">Get 15% off on selected items. Shop now!</p>
            </div>
            <div className="bg-gradient-to-r from-amber-900 bg-opacity-30 to-amber-800 bg-opacity-20 p-6 rounded-2xl border border-amber-500 border-opacity-30 shadow-2xl shadow-amber-500 shadow-opacity-10">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-black font-bold">🔥</span>
                </div>
                <h4 className="text-xl font-semibold text-amber-300">Clearance Sale</h4>
              </div>
              <p className="text-amber-100">Up to 30% off on last season's stock.</p>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <div className="mb-8 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 border-opacity-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Bar */}
            <div>
              <label className="block text-yellow-300 mb-2 font-medium">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 bg-gray-900 bg-opacity-50 border border-yellow-500 border-opacity-30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 focus:border-yellow-500 transition-all duration-300"
                  placeholder="Search products by name..."
                />
                <div className="absolute right-3 top-3 text-yellow-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-yellow-300 mb-2 font-medium">
                Price Range: <span className="text-yellow-400">${minPrice} - ${maxPrice}</span>
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-yellow-300 mb-2 font-medium">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-3 bg-gray-900 bg-opacity-50 border border-yellow-500 border-opacity-30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 focus:border-yellow-500 transition-all duration-300"
              >
                <option value="price-asc" className="bg-gray-900">Price: Low to High</option>
                <option value="price-desc" className="bg-gray-900">Price: High to Low</option>
                <option value="newest" className="bg-gray-900">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product List Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Our Products
            </span>
          </h2>
          <span className="text-yellow-300 bg-yellow-500 bg-opacity-10 px-4 py-2 rounded-full border border-yellow-500 border-opacity-20 text-sm font-medium">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'} found
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-gradient-to-br from-gray-800 bg-opacity-50 to-gray-900 bg-opacity-70 rounded-2xl overflow-hidden border border-yellow-500 border-opacity-20 hover:border-yellow-500 hover:border-opacity-40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500 hover:shadow-opacity-10"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-yellow-900 bg-opacity-30 to-yellow-800 bg-opacity-20 flex items-center justify-center">
                    <span className="text-4xl">🛍️</span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-black bg-opacity-70 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
                  {product.name}
                </h4>
                
                <Link
                  to={`/products/${product.id}`}
                  className="w-full mt-3 inline-flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-medium group-hover:shadow-lg group-hover:shadow-yellow-500 group-hover:shadow-opacity-25"
                >
                  View Details
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-yellow-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500 border-opacity-20">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-semibold text-yellow-300 mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Custom CSS for range slider */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 1rem;
          width: 1rem;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #000;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 1rem;
          width: 1rem;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #000;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
        }
        
        .slider-thumb::-webkit-slider-track {
          background: #374151;
          height: 0.5rem;
          border-radius: 0.5rem;
        }
        
        .slider-thumb::-moz-range-track {
          background: #374151;
          height: 0.5rem;
          border-radius: 0.5rem;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default Products