import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/authContext'
import { supabase } from '../lib/supabase'
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [requests, setRequests] = useState([])
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [activeSection, setActiveSection] = useState('overview')
  const [showProductForm, setShowProductForm] = useState(false)
  const [orderProducts, setOrderProducts] = useState({})

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      fetchProducts()
      fetchOrders()
      fetchRequests()
      fetchMessages()
    }
  }, [user, navigate])

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*')
    if (error) setError(t('failedToLoadProducts'))
    else setProducts(data || [])
  }

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*')
    if (error) setError(t('failedToLoadOrders'))
    else {
      setOrders(data || [])
      // Fetch product names for orders
      if (data && data.length > 0) {
        const productIds = data.map(order => order.product_id).filter(Boolean)
        if (productIds.length > 0) {
          const { data: productsData } = await supabase
            .from('products')
            .select('id, name')
            .in('id', productIds)
          
          const productsMap = {}
          productsData?.forEach(product => {
            productsMap[product.id] = product.name
          })
          setOrderProducts(productsMap)
        }
      }
    }
  }

  const fetchRequests = async () => {
    const { data, error } = await supabase.from('requests').select('*')
    if (error) setError(t('failedToLoadRequests'))
    else setRequests(data || [])
  }

  const fetchMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*')
    if (error) setError(t('failedToLoadMessages'))
    else setMessages(data || [])
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    let imageUrl = null

    if (image) {
      const fileName = `${Date.now()}-${image.name}`
      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(`public/${fileName}`, image, {
          cacheControl: '3600',
          upsert: false,
        })
      if (uploadError) {
        setError(uploadError.message)
        return
      }
      imageUrl = `https://bsgewefyiudxqhhydsyg.supabase.co/storage/v1/object/public/product-images/public/${fileName}`
    }

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update({
          name,
          price: parseFloat(price),
          description,
          ...(imageUrl && { image_url: imageUrl }),
        })
        .eq('id', editingProduct.id)

      if (error) setError(error.message)
      else {
        setSuccess(t('productUpdatedSuccess'))
        setEditingProduct(null)
        setShowProductForm(false)
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert({ name, price: parseFloat(price), description, image_url: imageUrl })
      if (error) setError(error.message)
      else {
        setSuccess(t('productAddedSuccess'))
        setShowProductForm(false)
      }
    }

    setName('')
    setPrice('')
    setDescription('')
    setImage(null)
    fetchProducts()
  }

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) setError(error.message)
    else {
      setSuccess(t('productDeletedSuccess'))
      fetchProducts()
    }
  }

  const updateOrderStatus = async (id, status) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
    if (error) setError(error.message)
    else {
      setSuccess(t('orderStatusUpdated'))
      fetchOrders()
    }
  }

  const handleDeleteRequest = async (id) => {
    const { error } = await supabase.from('requests').delete().eq('id', id)
    if (error) setError(error.message)
    else {
      setSuccess(t('requestDeletedSuccess'))
      fetchRequests()
    }
  }

  const handleDeleteOrder = async (id) => {
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) setError(error.message)
    else {
      setSuccess(t('orderDeletedSuccess'))
      fetchOrders()
    }
  }

  const handleDeleteMessage = async (id) => {
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) setError(error.message)
    else {
      setSuccess(t('messageDeletedSuccess'))
      fetchMessages()
    }
  }

  const handleEditProduct = (product) => {
    setName(product.name)
    setPrice(product.price)
    setDescription(product.description)
    setEditingProduct(product)
    setShowProductForm(true)
    setActiveSection('products')
  }

  const resetProductForm = () => {
    setName('')
    setPrice('')
    setDescription('')
    setImage(null)
    setEditingProduct(null)
    setShowProductForm(false)
  }

  // Function to handle card clicks
  const handleCardClick = (section) => {
    setActiveSection(section)
    if (section !== 'products') {
      setShowProductForm(false)
    }
  }

  if (!user) return null

  // Stats data for overview with section mapping
  const stats = [
    { 
      title: t('totalProducts'), 
      value: products.length, 
      color: 'yellow', 
      icon: '📦',
      section: 'products'
    },
    { 
      title: t('totalOrders'), 
      value: orders.length, 
      color: 'amber', 
      icon: '🛒',
      section: 'orders'
    },
    { 
      title: t('pendingRequests'), 
      value: requests.length, 
      color: 'orange', 
      icon: '📋',
      section: 'requests'
    },
    { 
      title: t('unreadMessages'), 
      value: messages.length, 
      color: 'gold', 
      icon: '✉️',
      section: 'messages'
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'in progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Golden Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-black/50 border-b border-yellow-500/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  <span className="text-yellow-400">{t('admin')}</span> {t('dashboard')}
                </h1>
                <p className="mt-1 text-sm text-gray-300">
                  {t('welcomeBack')} <span className="font-semibold text-yellow-400">{user.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-yellow-500/20">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {['overview', 'products', 'orders', 'requests', 'messages'].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setActiveSection(section)
                      if (section !== 'products') {
                        setShowProductForm(false)
                      }
                    }}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeSection === section
                        ? 'border-yellow-400 text-yellow-400'
                        : 'border-transparent text-gray-400 hover:text-yellow-300 hover:border-yellow-300'
                    }`}
                  >
                    {t(section)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Success/Error Messages */}
          <div className="mb-8">
            {success && (
              <div className="rounded-lg bg-green-500/20 border border-green-500/30 p-4 mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-green-400">✅</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-300">{success}</p>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="rounded-lg bg-red-500/20 border border-red-500/30 p-4 mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-red-400">❌</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(stat.section)}
                  className="bg-black/40 rounded-xl border border-yellow-500/20 p-6 hover:border-yellow-500/40 hover:bg-yellow-500/5 transition-all duration-200 backdrop-blur-sm cursor-pointer transform hover:scale-105 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{stat.icon}</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-300 group-hover:text-yellow-300 transition-colors duration-200">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-semibold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-200">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg 
                        className="w-5 h-5 text-yellow-400 transform -rotate-45" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-yellow-500/20">
                    <p className="text-xs text-yellow-500/70 group-hover:text-yellow-400 transition-colors duration-200">
                      Click to view {stat.section}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products Section */}
          {activeSection === 'products' && (
            <div className="space-y-8">
              {/* Add Product Button */}
              {!showProductForm && (
                <div className="text-center">
                  <button
                    onClick={() => setShowProductForm(true)}
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    + {t('addNewProduct')}
                  </button>
                </div>
              )}

              {/* Add/Edit Product Form */}
              {showProductForm && (
                <div className="bg-black/40 rounded-xl border border-yellow-500/20 p-6 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-yellow-400">
                      {editingProduct ? t('editProduct') : t('addNewProduct')}
                    </h3>
                    <button
                      onClick={resetProductForm}
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-yellow-300 mb-2">
                          {t('productName')}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 bg-black/50 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white placeholder-gray-400"
                          placeholder={t('productNamePlaceholder')}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-yellow-300 mb-2">
                          {t('price')}
                        </label>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full px-3 py-2 bg-black/50 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white placeholder-gray-400"
                          placeholder={t('pricePlaceholder')}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-yellow-300 mb-2">
                          {t('productImage')}
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          className="w-full px-3 py-2 bg-black/50 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-yellow-300 mb-2">
                          {t('description')}
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full h-32 px-3 py-2 bg-black/50 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white placeholder-gray-400 resize-vertical"
                          placeholder={t('descriptionPlaceholder')}
                          required
                        />
                      </div>
                      <div className="flex space-x-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                        >
                          {editingProduct ? t('updateProduct') : t('addProduct')}
                        </button>
                        <button
                          type="button"
                          onClick={resetProductForm}
                          className="px-4 py-2 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/10 transition-colors duration-200"
                        >
                          {t('cancel')}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Grid */}
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-6">
                  {t('manageProducts')} ({products.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-black/40 rounded-xl border border-yellow-500/20 p-4 hover:border-yellow-500/40 transition-all duration-200 backdrop-blur-sm"
                    >
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h4 className="font-semibold text-white mb-2">{product.name}</h4>
                      <p className="text-yellow-400 font-bold text-lg mb-2">${product.price}</p>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 bg-yellow-500/20 text-yellow-300 py-2 rounded-lg font-medium hover:bg-yellow-500/30 transition-colors duration-200 border border-yellow-500/30"
                        >
                          {t('edit')}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex-1 bg-red-500/20 text-red-300 py-2 rounded-lg font-medium hover:bg-red-500/30 transition-colors duration-200 border border-red-500/30"
                        >
                          {t('delete')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === 'orders' && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-6">
                {t('manageOrders')} ({orders.length})
              </h3>
              <div className="bg-black/40 rounded-xl border border-yellow-500/20 overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-yellow-500/10">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                          {t('customer')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                          {t('product')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                          {t('status')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                          {t('actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-500/10">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-yellow-500/5 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{order.customer_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-yellow-300">
                              {orderProducts[order.product_id] || `Product #${order.product_id}`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="text-sm bg-black/50 border border-yellow-500/30 rounded-lg px-3 py-1 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white"
                            >
                              <option value="new" className="bg-black">{t('new')}</option>
                              <option value="in progress" className="bg-black">{t('inProgress')}</option>
                              <option value="completed" className="bg-black">{t('completed')}</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors duration-200"
                            >
                              {t('delete')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Requests Section */}
          {activeSection === 'requests' && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-6">
                {t('manageRequests')} ({requests.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-black/40 rounded-xl border border-yellow-500/20 p-6 hover:border-yellow-500/40 transition-all duration-200 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-white">{request.customer_name}</h4>
                      <button
                        onClick={() => handleDeleteRequest(request.id)}
                        className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors duration-200"
                      >
                        {t('delete')}
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm">{request.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Section */}
          {activeSection === 'messages' && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-6">
                {t('messageInbox')} ({messages.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-black/40 rounded-xl border border-yellow-500/20 p-6 hover:border-yellow-500/40 transition-all duration-200 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-white">{msg.name}</h4>
                        <p className="text-sm text-yellow-300">{msg.email}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors duration-200"
                      >
                        {t('delete')}
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard