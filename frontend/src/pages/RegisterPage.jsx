import { useState, useContext, use } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FileText, User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

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
        const backendErrors = Object.keys(backendErrors)[0];
        setError(backendErrors[firstErrorKey]);
      } else {
        setError("Registration failed. Please Check your connection.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center pt-20 px-4'>
      {/* Glossy Card Container */}
      <div className='w-full max-w-md bg-white dark:bg-dark-800 rounded-2x1 shadow-x1 border border-dark-100 dark:border-dark-700 p-8 transform transition-all duration-300'>

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

        </form>
      </div>

    </div>
  )
}
