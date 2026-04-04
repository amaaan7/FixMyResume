import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileSearch, 
  Target, 
  PenTool, 
  Upload, 
  Sparkles, 
  TrendingUp,
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-screen flex items-center pt-20" id="hero">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[80px]" />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20 text-sm font-medium text-primary-700 dark:text-primary-400">
                <Sparkles className="w-4 h-4" />
                Powered by Google Gemini AI
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
            >
              <span className="text-dark-900 dark:text-white">Fix Your Resume</span>
              <br />
              <span className="gradient-text">with AI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-dark-500 dark:text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Upload your resume, paste a job description, and get instant AI-powered feedback. 
              Boost your ATS score, find missing keywords, and rewrite weak bullet points — 
              all in under 5 seconds.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/analyze"
                className="btn-primary text-lg !px-8 !py-4 flex items-center gap-2 group"
                id="cta-analyze"
              >
                Analyze My Resume
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="btn-secondary text-lg !px-8 !py-4"
                id="cta-signup"
              >
                Create Free Account
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-dark-400 dark:text-dark-500"
            >
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-500" />
                100% Private & Secure
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary-500" />
                Results in Under 5s
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===================== STATS BAR ===================== */}
      <section className="py-16 border-y border-dark-200/50 dark:border-white/5 bg-dark-50/50 dark:bg-dark-950/30" id="stats">
        <div className="section-container">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {[
              { value: '35%', label: 'Avg. Score Improvement', icon: TrendingUp },
              { value: '<5s', label: 'Analysis Time', icon: Zap },
              { value: '100%', label: 'ATS Optimized', icon: Target },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center">
                <stat.icon className="w-6 h-6 text-primary-500 mb-2" />
                <span className="text-4xl font-extrabold gradient-text">{stat.value}</span>
                <span className="text-dark-500 dark:text-dark-400 mt-1 text-sm font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== FEATURES GRID ===================== */}
      <section className="py-24" id="features">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Everything You Need to <span className="gradient-text">Land the Job</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-dark-500 dark:text-dark-400 max-w-xl mx-auto">
              Our AI analyzes every aspect of your resume against the job description to give you a competitive edge.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {[
              {
                icon: FileSearch,
                title: 'AI Resume Analysis',
                description: 'Get a comprehensive breakdown of your resume with match score, ATS score, and per-section feedback powered by Google Gemini.',
                gradient: 'from-primary-500 to-accent-500',
              },
              {
                icon: Target,
                title: 'Keyword Matching',
                description: 'Instantly see which keywords from the job description are in your resume and which critical ones you\'re missing.',
                gradient: 'from-accent-500 to-pink-500',
              },
              {
                icon: PenTool,
                title: 'Smart Bullet Rewriting',
                description: 'AI identifies weak bullet points and rewrites them with strong action verbs and measurable impact — one click away.',
                gradient: 'from-emerald-500 to-teal-500',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="glass-card p-8 group cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-500 dark:text-dark-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="py-24 bg-dark-50/50 dark:bg-dark-950/30" id="how-it-works">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Three Steps to a <span className="gradient-text">Better Resume</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-dark-500 dark:text-dark-400 max-w-xl mx-auto">
              It takes less than a minute to get actionable AI feedback on your resume.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {[
              {
                step: '01',
                icon: Upload,
                title: 'Upload Resume',
                description: 'Drag and drop your PDF or DOCX resume file. We\'ll extract all the text automatically.',
              },
              {
                step: '02',
                icon: Sparkles,
                title: 'AI Analyzes',
                description: 'Google Gemini AI compares your resume against the job description across multiple dimensions.',
              },
              {
                step: '03',
                icon: TrendingUp,
                title: 'Improve & Apply',
                description: 'Get your scores, fix missing keywords, rewrite weak bullets, and apply with confidence.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative text-center"
              >
                {/* Step number */}
                <span className="text-8xl font-black text-primary-500/10 dark:text-primary-500/5 absolute -top-4 left-1/2 -translate-x-1/2 select-none">
                  {item.step}
                </span>
                <div className="relative pt-8">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-dark-800 border border-dark-200/50 dark:border-white/10 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <item.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-dark-500 dark:text-dark-400 leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== BOTTOM CTA ===================== */}
      <section className="py-24" id="cta">
        <div className="section-container">
          <motion.div
            className="relative glass-card p-12 sm:p-16 text-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/20 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10">
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
                Ready to <span className="gradient-text">Fix Your Resume?</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-dark-500 dark:text-dark-400 max-w-lg mx-auto mb-8">
                Join thousands of job seekers who improved their resumes with AI. 
                It's free, fast, and private.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  to="/analyze"
                  className="btn-primary text-lg !px-10 !py-4 inline-flex items-center gap-2 group"
                  id="cta-bottom"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
