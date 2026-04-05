import { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { AuthContext } from '../../context/AuthContext' // <-- 1. Import Auth Context
import { Sun, Moon, Menu, X, FileText, UserCircle, LogOut } from 'lucide-react' // <-- 2. New Icons

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme()
  // 3. Grab the auth state and functions from Context!
  const { isAuthenticated, user, logout } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Detect scroll for navbar glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Optional: Only show certain links based on Auth state
  // But for now we just show these 3 to everyone
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/analyze', label: 'Analyze' },
    { to: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'nav-blur shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="nav-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">Fix</span>
              <span className="text-dark-900 dark:text-white">MyResume</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" id="nav-desktop">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${location.pathname === link.to
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-800'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side — theme toggle + auth */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700 transition-all duration-200"
              aria-label="Toggle theme"
              id="theme-toggle"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-primary-600" />
              )}
            </button>

            {/* 4. Desktop Auth Buttons - Dynamic Check */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4 border-l border-dark-200 dark:border-dark-700 pl-4 ml-2">
                <div className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300">
                  <UserCircle className="w-5 h-5 text-primary-500" />
                  <span>{user?.name || user?.email || 'User'}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-secondary !px-4 !py-2 text-sm" id="nav-login">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary !px-4 !py-2 text-sm" id="nav-register">
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-dark-600 dark:text-dark-400" />
              ) : (
                <Menu className="w-5 h-5 text-dark-600 dark:text-dark-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden animate-slide-down pb-4" id="mobile-menu">
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${location.pathname === link.to
                      ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-dark-200 dark:border-dark-700" />

              {/* 5. Mobile Auth Buttons - Dynamic Check */}
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 flex items-center gap-3 bg-dark-50 dark:bg-dark-800 rounded-xl mb-2 mx-1 mt-2">
                    <UserCircle className="w-8 h-8 text-primary-500" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-dark-900 dark:text-white">{user?.name || 'Welcome!'}</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-5 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-3 rounded-xl text-sm font-medium text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800">
                    Log in
                  </Link>
                  <Link to="/register" className="btn-primary text-center text-sm mx-4 mt-2">
                    Sign up
                  </Link>
                </>
              )}

            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
