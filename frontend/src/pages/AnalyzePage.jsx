import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from '../api/axios'
import FileDropzone from '../components/FileDropzone'
import { FileText, Briefcase, Sparkles, Loader2, AlertCircle } from 'lucide-react'

export default function AnalyzePage() {
    const [file, setFile] = useState(null)
    const [jobDescription, setJobDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleAnalyze = async () => {
        // 1. Basic Validation
        if (!file) {
            setError("Please upload your resume first.")
            return
        }
        if (!jobDescription.trim() || jobDescription.length < 50) {
            setError("Please paste a detailed job description (at least 50 characters).")
            return
        }

        setError(null)
        setIsLoading(true)

        // 2. Prepare the data to be sent
        // When sending files, we MUST use FormData instead of a regular JSON object
        const formData = new FormData()
        formData.append('resume_file', file)
        formData.append('job_description', jobDescription)

        try {
            // 3. Send to your Django backend endpoint (adjust the URL if your backend uses a different endpoint)
            const response = await api.post('/api/analyzer/analyze/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            // 4. Success! We get the new resume ID from Django and go to the Results page
            // Adjust response.data.id depending on what your Django model returns
            const newResumeId = response.data.id
            navigate(`/results/${newResumeId}`)

        } catch (err) {
            console.error("Upload error details:", err)
            // Show a friendly error to the user
            setError(err.response?.data?.error || "We encountered an error while analyzing. Please check if the backend is running.")
        } finally {
            // Stop the spinning loader whether it succeeded or failed
            setIsLoading(false)
        }
    }


    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-primary shadow-glow mb-2">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white tracking-tight">
                        Analyze Your Resume
                    </h1>
                    <p className="text-lg text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">
                        Upload your resume and the job description you're applying for.
                        Our AI will score your match and give you actionable feedback.
                    </p>
                </div>

                {/* Main Application Container */}
                <div className="bg-white dark:bg-dark-800 rounded-3xl p-6 md:p-8 shadow-xl border border-dark-100 dark:border-dark-700">

                    {error && (
                        <div className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Left Side: Drag & Drop */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-dark-900 dark:test-white font-semibold">
                                <FileText className="w-5 h-5 text-primary-500" />
                                <h3>1. Upload Resume</h3>
                            </div>
                            <p className="text-sm text-dark-500 dark:text-dark-400" >
                                PDF or DOCX format, max 5MB
                            </p>

                            {/* We import and use your beautiful new Component! */}
                            <FileDropzone onFileSelect={(selectedFile) => setFile(selectedFile)} />
                        </div>

                        {/* Right Side: Job Description */}
                        <div className="space-y-4 flex flex-col">
                            <div className="flex items-center gap-2 text-dark-900 dark:test-white font-semibold">
                                <Briefcase className="w-5 h-5 text-primary-500" />
                                <h3>2. Paste Job Description</h3>
                            </div>
                            <p className="text-sm text-dark-500 dark:text-dark-400" >
                                Copy and paste the full job description here.
                            </p>

                            <textarea
                                className="flex-1 w-full p-4 rounded-2xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none min-h-[240px]"
                                placeholder='We are looking for a Software Engineer with 3+ years of experience in React, Node.js, and Python...'
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* Bottom Area: Submit Button */}
                    <div className="mt-8 pt-8 border-t border-dark-100 dark:border-dark-700 flex justify-center">
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading}
                            className="w-full md:w-auto px-12 py-4 bg-gradient-primary hover:shadow-glow text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Analyzing with AI... (Takes ~10 seconds)
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-6 h-6" />
                                    Analyze Application
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}