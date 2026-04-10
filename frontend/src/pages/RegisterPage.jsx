import { useState, useContext, use } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FileText, User, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await register(name, email, password)
      navigate('/analyze')
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        // Safely extract the first error message from Django
        const firstKey = Object.keys(errorData)[0];
        setError(errorData[firstKey]);
      } else {
        setError("Registration failed. Please check your connection.")
      }
    } finally {

      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center pt-20 px-4'>
      {/* Glossy Card Container */}
      <div className='w-full max-w-md bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-dark-100 dark:border-dark-700 p-8 transform transition-all duration-300'>

        {/* Header Section */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 mb-4'>
            <FileText className='w-6 h-6 text-primary-600 dark:text-primary-400' />
          </div>
          <h2 className='text-2xl font-bold text-dark-900 dark:text-white'>
            Create an Account
          </h2>
          <p className='text-sm text-dark-500 dark:text-dark-400 mt-2'>
            Join us and start analyzing your resume today
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className='mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 flex items-start gap-3'>
            <AlertCircle className='w-5 h-5 text-red-500 flex-shrink-0 mt-0.5' />
            <p className='text-sm text-red-600 dark:text-red-400'>
              {error}
            </p>
          </div>
        )}

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className='space-y-1.5'>
            <label className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">
              Full Name
            </label>
            <div className='relative'>
              <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400' />
              <input
                type="text"
                required
                className='w-full pl-11 pr-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-xl text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none'
                placeholder='Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className='space-y-1.5'>
            <label className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">Email
            </label>
            <div className='relative'>
              <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400' />
              <input
                type="email"
                className='w-full pl-11 pr-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-xl text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className='space-y-1.5'>
            <label className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">
              Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400' />
              <input
                type="password"
                required
                className='w-full pl-11 pr-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-xl text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none'
                placeholder='********'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-primary hover:shadow-glow text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group mt-4'
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              </>
            )}
          </button>
        </form>

        {/* Switch to Login link */}
        <div className="mt-8 text-center text-sm text-dark-500 dark:text-dark-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
