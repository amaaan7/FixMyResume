import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import { FileText, Mail, Look, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

}