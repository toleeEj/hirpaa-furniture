import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      navigate('/dashboard')
    }
    setIsLoading(false)
  }

  return (
    <div className="relative overflow-hidden min-h-screen bg-black flex items-center justify-center py-8">
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

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Login Card */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/20 shadow-2xl overflow-hidden">
          {/* Golden Header Bar */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 h-2 w-full"></div>
          
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">Admin Login</h2>
              <p className="text-gray-300">Access your dashboard to manage products and orders</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-lg mb-6 text-center">
                ⚠️ {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-yellow-300 font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition duration-300"
                  placeholder="admin@hirpaafurniture.com"
                  required
                />
              </div>

              <div>
                <label className="block text-yellow-300 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></span>
                    Signing In...
                  </span>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Forgot your password?{' '}
                <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">
                  Contact System Administrator
                </a>
              </p>
            </div>

          
          </div>

        </div>

        {/* Brand Footer */}
        <div className="text-center mt-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition duration-300">
            <span className="text-2xl font-bold">Hirpaa Furniture</span>
          </Link>
          <p className="text-gray-400 text-sm mt-2">Luxury Furniture & Interior Solutions</p>
        </div>
      </div>
    </div>
  )
}

export default Login