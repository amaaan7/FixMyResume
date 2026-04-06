import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, File, X, AlertCircle } from 'lucide-react'

// `onFileSelect` is a prop we will pass from the AnalyzePage later.
// It's how THIS component sends the PDF back up to the page!
export default function FileDropzone({ onFileSelect }) {
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)

    // 1. This runs the moment someone drops a file into the box
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setError(null)

        // Did they upload something weird like an MP4?
        if (rejectedFiles.length > 0) {
            setError('Invalid file type. Please upload a valid PDF or DOCX file.')
            return
        }

        // Did they upload a good file?
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0]
            setFile(selectedFile)

            // Pass the file back to the parent page so it can be sent to Django
            if (onFileSelect) {
                onFileSelect(selectedFile)
            }
        }
    }, [onFileSelect])

    // 2. Configure the Dropzone library
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1 // Only one resume at a time!
    })

    // 3. Let the user delete the file if they picked the wrong one
    const removeFile = (e) => {
        e.stopPropagation() // Stops the file dialog window from opening when clicking the "X"
        setFile(null)
        setError(null)
        if (onFileSelect) {
            onFileSelect(null)
        }
    }

    return (
        <div className="w-full">
            {/* The Upload Area - It changes colors dynamically if you drag a file over it! */}
            <div
                {...getRootProps()}
                className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer p-8 flex flex-col items-center justify-center min-h-[240px]
          ${isDragActive
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                        : file
                            ? 'border-green-500 bg-green-50 dark:bg-green-500/10'
                            : 'border-dark-300 dark:border-dark-600 hover:border-primary-400 hover:bg-dark-50 dark:hover:bg-dark-800'
                    }
        `}
            >
                {/* Hidden HTML input required for clicking to upload */}
                <input {...getInputProps()} />

                {/* State A: A File is currently uploaded */}
                {file ? (
                    <div className="flex flex-col items-center space-y-3 animate-fade-in text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                            <File className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-dark-900 dark:text-white max-w-[200px] truncate">
                                {file.name}
                            </p>
                            <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">
                                {/* Convert bytes to Megabytes! */}
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                        <button
                            onClick={removeFile}
                            className="mt-2 px-4 py-1.5 rounded-full bg-white dark:bg-dark-800 shadow-sm border border-dark-200 dark:border-dark-700 text-xs font-medium text-dark-600 hover:text-red-500 hover:border-red-200 transition-colors flex items-center gap-1"
                        >
                            <X className="w-3 h-3" /> Remove File
                        </button>
                    </div>

                ) : (

                    /* State B: Waiting for the user to drop a file */
                    <div className="flex flex-col items-center space-y-4 text-center pointer-events-none">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${isDragActive ? 'bg-primary-100 dark:bg-primary-500/20' : 'bg-dark-100 dark:bg-dark-800'}`}>
                            <UploadCloud className={`w-8 h-8 ${isDragActive ? 'text-primary-600 dark:text-primary-400' : 'text-dark-500 max-w-sm'}`} />
                        </div>
                        <div>
                            <p className="text-base font-bold text-dark-900 dark:text-white">
                                {isDragActive ? 'Drop your resume here' : 'Click or drag your resume'}
                            </p>
                            <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">
                                Supports .PDF and .DOCX
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Error Message Section */}
            {error && (
                <div className="mt-3 flex items-start gap-2 text-red-500 text-sm p-3 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-100 dark:border-red-500/20">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}
