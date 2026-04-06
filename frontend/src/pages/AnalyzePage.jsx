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

            </div>

        </div>
    )
}