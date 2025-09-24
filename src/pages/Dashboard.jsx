import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/authContext'
import { supabase } from '../lib/supabase'

function Dashboard() {
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
    if (error) setError('Failed to load products.')
    else setProducts(data || [])
  }

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*')
    if (error) setError('Failed to load orders.')
    else setOrders(data || [])
  }

  const fetchRequests = async () => {
    const { data, error } = await supabase.from('requests').select('*')
    if (error) setError('Failed to load requests.')
    else setRequests(data || [])
  }

  const fetchMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*')
    if (error) setError('Failed to load messages.')
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
      // Editing an existing product
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
        setSuccess('Product updated successfully!')
        setEditingProduct(null)
      }
    } else {
      // Adding new product
      const { error } = await supabase
        .from('products')
        .insert({ name, price: parseFloat(price), description, image_url: imageUrl })
      if (error) setError(error.message)
      else setSuccess('Product added successfully!')
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
      setSuccess('Product deleted successfully!')
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
      setSuccess('Order status updated successfully!')
      fetchOrders()
    }
  }

  const handleDeleteRequest = async (id) => {
    const { error } = await supabase.from('requests').delete().eq('id', id)
    if (error) setError(error.message)
    else {
      setSuccess('Request deleted successfully!')
      fetchRequests()
    }
  }

  const handleDeleteOrder = async (id) => {
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) setError(error.message)
    else {
      setSuccess('Order deleted successfully!')
      fetchOrders()
    }
  }

  const handleDeleteMessage = async (id) => {
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) setError(error.message)
    else {
      setSuccess('Message deleted successfully!')
      fetchMessages()
    }
  }

  const handleEditProduct = (product) => {
    setName(product.name)
    setPrice(product.price)
    setDescription(product.description)
    setEditingProduct(product)
  }

  if (!user) return null

  return (
    <div className="relative overflow-hidden min-h-screen bg-black">
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
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-yellow-400">Admin</span> Dashboard
          </h2>
          <p className="text-gray-300 text-lg">Welcome back, <span className="text-yellow-400">{user.email}</span>!</p>
        </div>

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

        {/* Product Management Section */}
        <div className="bg-black/30 p-6 rounded-2xl border border-yellow-500/20 mb-8">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          
          <form onSubmit={handleAddProduct} className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-yellow-300 font-semibold mb-2">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                placeholder="e.g., Luxury Wooden Sofa"
                required
              />
            </div>
            <div>
              <label className="block text-yellow-300 font-semibold mb-2">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                placeholder="e.g., 299"
                required
              />
            </div>
            <div>
              <label className="block text-yellow-300 font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 resize-vertical"
                placeholder="Detailed product description..."
                rows="3"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-yellow-300 font-semibold mb-2">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 shadow-lg"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null)
                  setName('')
                  setPrice('')
                  setDescription('')
                  setImage(null)
                }}
                className="w-full border-2 border-yellow-500 text-yellow-400 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500/10 transition duration-300"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* Manage Products */}
        <div className="bg-black/30 p-6 rounded-2xl border border-yellow-500/20 mb-8">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Manage Products ({products.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/10 transition duration-300">
                <h4 className="text-xl font-semibold text-yellow-300 mb-2">{product.name}</h4>
                <p className="text-yellow-400 font-bold text-lg mb-2">${product.price}</p>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 bg-blue-500/20 text-blue-300 py-2 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-500/20 text-red-300 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manage Orders */}
        <div className="bg-black/30 p-6 rounded-2xl border border-yellow-500/20 mb-8">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Manage Orders ({orders.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/20">
                <div className="space-y-2 mb-4">
                  <p className="text-yellow-300"><span className="font-semibold">Customer:</span> {order.customer_name}</p>
                  <p className="text-gray-300"><span className="font-semibold">Product ID:</span> {order.product_id}</p>
                  <p className="text-gray-300"><span className="font-semibold">Message:</span> {order.message || 'No message'}</p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      order.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                      order.status === 'in progress' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="flex-1 p-2 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="new" className="bg-black">New</option>
                    <option value="in progress" className="bg-black">In Progress</option>
                    <option value="completed" className="bg-black">Completed</option>
                  </select>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="px-4 bg-red-500/20 text-red-300 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manage Requests */}
        <div className="bg-black/30 p-6 rounded-2xl border border-yellow-500/20 mb-8">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Customer Requests ({requests.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((request) => (
              <div key={request.id} className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/20">
                <p className="text-yellow-300 font-semibold mb-2">{request.customer_name}</p>
                <p className="text-gray-300 text-sm mb-4">{request.message}</p>
                <button
                  onClick={() => handleDeleteRequest(request.id)}
                  className="w-full bg-red-500/20 text-red-300 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition duration-300"
                >
                  Delete Request
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Message Inbox */}
        <div className="bg-black/30 p-6 rounded-2xl border border-yellow-500/20">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Message Inbox ({messages.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/20">
                <div className="space-y-2 mb-4">
                  <p className="text-yellow-300"><span className="font-semibold">Name:</span> {msg.name}</p>
                  <p className="text-gray-300"><span className="font-semibold">Email:</span> {msg.email}</p>
                  <p className="text-gray-300 text-sm"><span className="font-semibold">Message:</span> {msg.message}</p>
                </div>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="w-full bg-red-500/20 text-red-300 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition duration-300"
                >
                  Delete Message
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard