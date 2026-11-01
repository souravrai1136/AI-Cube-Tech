import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Send,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MapPin,
  Building2,
} from 'lucide-react';
import { categoriesData } from '../../data/categoriesData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                AI Cube <span className="text-brand-400">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering ambitious learners worldwide with high-impact, industry-curated video courses and live mentor-led interactive workshops.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-300">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <div>
                <span className="text-[11px] text-slate-400 block">Admissions & Helpline:</span>
                <a
                  href="tel:+919517285338"
                  className="font-bold text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  +91 95172 85338
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/live-classes" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>Live Workshops</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & FAQ
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {categoriesData.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/courses?category=${encodeURIComponent(category.name)}`}
                    className="hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches & Campus Centers */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Our Branches</span>
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-4 text-brand-400 font-bold">1.</span>
                <span className="font-medium text-slate-200">Noida</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 text-brand-400 font-bold">2.</span>
                <span className="font-medium text-slate-200">Ghaziabad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 text-brand-400 font-bold">3.</span>
                <span className="font-medium text-slate-200">Ludhiana</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 text-brand-400 font-bold">4.</span>
                <span className="font-medium text-slate-200">Chandigarh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 text-brand-400 font-bold">5.</span>
                <span className="font-medium text-slate-200">Azamgarh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 text-brand-400 font-bold">6.</span>
                <span className="font-medium text-slate-200">Jaunpur</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 text-brand-400 font-bold">7.</span>
                <span className="font-medium text-slate-200">Delhi</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <Link
                to="/contact"
                className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
              >
                <span>View Center Addresses</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Email Newsletter Subscription (Commented out as requested)
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Weekly Learning Digest
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get free tutorials, upcoming live session schedules, and career roadmaps directly in your inbox.
            </p>
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 p-3 rounded-xl flex items-center gap-2 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Thank you! You are subscribed to our demo newsletter.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>No spam. Unsubscribe at any time.</span>
            </div>
          </div>
          */}
        </div>

        {/* Bottom Bar & Demo Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AI Cube Tech Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span className="text-slate-400">Demo Prototype — Sample courses, reviews & simulated payments</span>
            <Link to="/about" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/about" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
