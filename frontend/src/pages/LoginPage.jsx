import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FileText, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // 1. Grab our login function from the Context
    const { login } = useContext(AuthContext)
    // 2. React Router tool to seamlessly change URLs
    const navigate = useNavigate()

    // 3. What happens when they click Submit
    const handleSubmit = async (e) => {
        e.preventDefault() // Stop page from refreshing
        setError(null)
        setIsLoading(true)

        try {
            // Call the magic function we built in Step 28
            await login(email, password)

            // If it succeeded, send them directly to the AI Analysis page
            navigate('/analyze')
        } catch (err) {
            // If Django rejected the credentials, catch the error and display it
            if (err.response && err.response.data.error) {
                setError(err.response.data.error)
            } else {
                setError("Failed to log in. Please check your connection.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center pt-20 px-40'>
            {/* Glossy Card Container */}
            <div className='w-full max-w-md bg-white dark:bg-dark-800 rounded-2xl shadow-xl  border border-dark-100 dark:border-dark-700 p-8 transform transition-all duration-300'>

                {/* Header Section */}
                < div className='text-center mb-8' >
                    <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 mb-4'>
                        <FileText className='w-6 h-6 text-primary-600 dark:text-primary-400' />
                    </div>
                    <h2 className='text-2xl font-bold text-dark-900 dark:text-white'>
                        Welcome Back
                    </h2>
                    <p className='text-sm text-dark-500 dark:text-dark-400 mt-2'>
                        Log in to continue analyzing your resume
                    </p>
                </div >

                {/* Error Alert Box - Only shows if 'error' state is not null */}
                {error && (
                    <div className='mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-start gap-3'>
                        <AlertCircle className='w-5 h-5 text-red-500 flex-shrink-0 mt-0.5' />
                        <p className='text-sm text-red-600 dark:text-red-400'>
                            {error}
                        </p>
                    </div>
                )}

            </div>

        </div>
    )

}
