import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]);

  return null;
}

function Products() {
  const { t } = useTranslation(); // Added for translations
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // To store categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortOption, setSortOption] = useState('price-asc');
  const [selectedCategory, setSelectedCategory] = useState(''); // To track selected category

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      setError(null);
      // Fetch products along with their category_id
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('id, name, price, image_url, category_id');

      // Fetch available categories for the dropdown
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id, name');

      if (productError) {
        setError(t('failedToLoadProducts')); // Translated
        console.error('Fetch error:', productError);
      } else {
        setProducts(productData || []);
      }

      if (categoryError) {
        setError(t('failedToLoadCategories')); // Translated
        console.error('Category fetch error:', categoryError);
      } else {
        setCategories(categoryData || []);
      }

      setLoading(false);
    };

    fetchProductsAndCategories();
  }, []);

  // Filter products based on search term, price, and selected category
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => product.price >= minPrice && product.price <= maxPrice)
    .filter((product) => (selectedCategory ? product.category_id === parseInt(selectedCategory) : true));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'newest') return b.id - a.id;
    return 0;
  });

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-yellow-200 text-lg">{t('loadingProducts')}</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-center p-8 bg-red-900 bg-opacity-20 rounded-xl border border-red-500 border-opacity-30 max-w-md">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-900 bg-opacity-20 to-yellow-800 bg-opacity-10 border-b border-yellow-500 border-opacity-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {t('luxuryCollection')}
            </span>
          </h1>
          <p className="text-yellow-200 text-center text-lg">{t('discoverPremiumProducts')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-yellow-300">{t('filterByCategory')}</h3> {/* Translated */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-900 text-white p-3 rounded-xl border border-yellow-500 bg-opacity-50"
            >
              <option value="">{t('allCategories')}</option> {/* Translated */}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Filters and Search */}
        <div className="mb-8 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 border-opacity-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Bar */}
            <div>
              <label className="block text-yellow-300 mb-2 font-medium">{t('searchProducts')}</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 bg-gray-900 bg-opacity-50 border border-yellow-500 border-opacity-30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 focus:border-yellow-500 transition-all duration-300"
                placeholder={t('searchPlaceholder')}
              />
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-yellow-300 mb-2 font-medium">
                {t('priceRange')} <span className="text-yellow-400">${minPrice} - ${maxPrice}</span>
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
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

            {/* Sort Options */}
            <div>
              <label className="block text-yellow-300 mb-2 font-medium">{t('sortBy')}</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-3 bg-gray-900 bg-opacity-50 border border-yellow-500 border-opacity-30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 focus:border-yellow-500 transition-all duration-300"
              >
                <option value="price-asc">{t('priceLowToHigh')}</option>
                <option value="price-desc">{t('priceHighToLow')}</option>
                <option value="newest">{t('newestFirst')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product List Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {t('ourProducts')}
            </span>
          </h2>
          <span className="text-yellow-300 bg-yellow-500 bg-opacity-10 px-4 py-2 rounded-full border border-yellow-500 border-opacity-20 text-sm font-medium">
            {sortedProducts.length} {sortedProducts.length === 1 ? t('item') : t('items')} {t('found')}
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
                {/* Category Label */}
                {product.category_id && (
                  <p className="text-sm text-yellow-300">{t('category')}: {categories.find(cat => cat.id === product.category_id)?.name}</p> 
                )}
                
                <Link
                  to={`/products/${product.id}`}
                  className="w-full mt-3 inline-flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-medium group-hover:shadow-lg group-hover:shadow-yellow-500 group-hover:shadow-opacity-25"
                >
                  {t('viewDetails')}
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
            <h3 className="text-2xl font-semibold text-yellow-300 mb-2">{t('noProductsFound')}</h3> {/* Translated */}
            <p className="text-gray-400">{t('adjustSearchFilters')}</p> {/* Translated */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
