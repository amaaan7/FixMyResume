import { Link } from 'react-router-dom'
import { FileText, ExternalLink, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-dark-200/50 dark:border-white/5 bg-dark-50/50 dark:bg-dark-950/50">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">Fix</span>
                <span className="text-dark-900 dark:text-white">MyResume</span>
              </span>
            </Link>
            <p className="text-dark-500 dark:text-dark-400 text-sm max-w-sm">
              AI-powered resume analyzer that helps you land your dream job. 
              Get instant feedback, keyword matching, and ATS optimization.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-dark-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/analyze', label: 'Analyze Resume' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/login', label: 'Log in' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-dark-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/amaaan7/FixMyResume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-400 dark:text-dark-500">
            © {new Date().getFullYear()} FixMyResume. All rights reserved.
          </p>
          <p className="text-sm text-dark-400 dark:text-dark-500 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by Amaan
          </p>
        </div>
      </div>
    </footer>
  )
}
