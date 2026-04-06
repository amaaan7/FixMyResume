import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, File, X, AlertCircle } from "lucide-react"


export default function FileDropzone({ onFileSelect }) {
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setError(null)

        if (rejectedFiles.length > 0) {
            setError('Invalid file type. Please upload a valid PDF or DOCX file.')
            return
        }

        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0]
            setFile(selectedFile)

            if (onFileSelect) {
                onFileSelect(selectedFile)
            }
        }
    }, [onFileSelect])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1
    })
}