import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  Clock,
  Building2,
  PhoneCall,
  Navigation,
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface BranchLocation {
  id: number;
  city: string;
  state: string;
  landmark: string;
  contact: string;
  badge: string;
}

const BRANCHES: BranchLocation[] = [
  {
    id: 1,
    city: 'Noida',
    state: 'Uttar Pradesh (Delhi-NCR)',
    landmark: 'Sector 62, Near Electronic City Metro',
    contact: '+91 95172 85338',
    badge: 'Main Center',
  },
  {
    id: 2,
    city: 'Ghaziabad',
    state: 'Uttar Pradesh (Delhi-NCR)',
    landmark: 'RDC, Raj Nagar Commercial Hub',
    contact: '+91 95172 85338',
    badge: 'Learning Center',
  },
  {
    id: 3,
    city: 'Ludhiana',
    state: 'Punjab',
    landmark: 'Ferozepur Road, Near City Center',
    contact: '+91 95172 85338',
    badge: 'Tech & Training Hub',
  },
  {
    id: 4,
    city: 'Chandigarh',
    state: 'Punjab & Haryana',
    landmark: 'Sector 34-A, Sub-City Center',
    contact: '+91 95172 85338',
    badge: 'Regional Center',
  },
  {
    id: 5,
    city: 'Azamgarh',
    state: 'Uttar Pradesh',
    landmark: 'Civil Lines Road, Near Collectorate',
    contact: '+91 95172 85338',
    badge: 'Learning Center',
  },
  {
    id: 6,
    city: 'Jaunpur',
    state: 'Uttar Pradesh',
    landmark: 'Near TD College Road, Civil Lines',
    contact: '+91 95172 85338',
    badge: 'Learning Center',
  },
  {
    id: 7,
    city: 'Delhi',
    state: 'Delhi-NCR',
    landmark: 'Connaught Place & Laxmi Nagar District Center',
    contact: '+91 95172 85338',
    badge: 'Corporate Center',
  },
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate contact form dispatch
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: 'How does live class access work after registration?',
      a: 'Once you click "Register" on any upcoming live masterclass, it automatically attaches to your student dashboard. When the session starts, a "Join Live Classroom" button activates, giving you one-click access to the interactive video stream and live chat studio.',
    },
    {
      q: 'Do recorded courses include lifetime access and updates?',
      a: 'Yes! When you enroll in any recorded course, you receive lifetime access to all lectures, downloadable code repositories, and future lesson updates added by the instructors.',
    },
    {
      q: 'Can I switch between the student and admin demo interfaces?',
      a: 'Absolutely! The top bar on every page features a quick role switcher toggle so you can evaluate the platform from both the student perspective and the platform owner / admin management view.',
    },
    {
      q: 'What technologies are taught in AI Cube Tech courses?',
      a: 'Our curriculum covers Cloud Computing (AWS, Azure, GCP 10 Core Services), Web Development (HTML5, CSS3, Bootstrap 5, Angular, RESTful Web APIs), AI & Data Science (Python, R Programming, AI/ML/DL, Excel, Power BI), Enterprise Databases (MySQL, SQL Service, Amazon RDS, MongoDB, CouchDB, IndexedDB), and DevOps (Git, GitLab CI/CD, Jira).',
    },
    {
      q: 'How does the payment flow work in this version?',
      a: 'This version of AI Cube Tech is an interactive frontend prototype. The checkout flow simulates real payment gateway latency and transaction confirmation, and enrolls you immediately without charging any real funds.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 pb-24">
      {/* Header */}
      <div>
        <Breadcrumbs items={[{ label: 'Contact & FAQ' }]} className="mb-4" />
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch with AI Cube Tech
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-xl">
          Have questions about our curriculums, live sessions, or enterprise team training? We're here to help.
        </p>
      </div>

      {/* Grid: Contact Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              {/* Email contact commented out as requested
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Support & Inquiries</p>
                  <p className="text-slate-500">support@aicubetech.com</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Average response: &lt; 4 hours</p>
                </div>
              </div>
              */}

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Direct Contact & Admission Helpline</p>
                  <a
                    href="tel:+919517285338"
                    className="text-base font-extrabold text-emerald-600 hover:text-emerald-700 transition-colors block mt-0.5"
                  >
                    +91 95172 85338
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Call or WhatsApp • Mon - Sat, 9:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Our Branches (7 Cities)</p>
                  <p className="text-slate-600 font-medium">1. Noida, 2. Ghaziabad, 3. Ludhiana, 4. Chandigarh, 5. Azamgarh, 6. Jaunpur, 7. Delhi</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Classroom & Lab training centers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-300">
              <Clock className="w-4 h-4 text-brand-400" />
              <span>Interactive Live Help Hours</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our engineering mentors host weekly open office hours every Thursday inside the live classroom studio.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-7 shadow-xs">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Delivered!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, <strong>{formData.name}</strong>. In this frontend demo environment, your inquiry has been simulated and logged.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Send Us a Message</h3>
                <p className="text-slate-500">
                  Fill in the form below and our team will get back to you promptly.
                </p>
              </div>

              {/* Demo Notice */}
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Frontend Demo Notice:</strong> Form submissions are handled locally for prototype demonstration purposes.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Course curriculum inquiry or live class schedule"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist your learning journey?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending simulated inquiry...</span>
                ) : (
                  <>
                    <span>Submit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Our 7 Offline Branches Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              Pan-India Campus Network
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Branches Across 7 Cities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Visit any of our 7 learning centers across Noida, Ghaziabad, Ludhiana, Chandigarh, Azamgarh, Jaunpur, and Delhi for offline classroom training and hands-on lab sessions.
            </p>
          </div>
          <a
            href="tel:+919517285338"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 95172 85338</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-lg hover:border-brand-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
                    Branch {branch.id}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {branch.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{branch.city}</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {branch.state}
                </p>
                <div className="text-xs text-slate-600 mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">
                    Center Location:
                  </span>
                  <span className="font-medium text-slate-700">{branch.landmark}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Contact Number</span>
                  <a href="tel:+919517285338" className="text-xs font-bold text-slate-800 hover:text-emerald-600 transition-colors">
                    {branch.contact}
                  </a>
                </div>
                <a
                  href={`tel:${branch.contact.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Answers to Common Inquiries
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">
            Everything you need to know about our video masterclasses and live mentorship.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-slate-100">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-800 hover:text-brand-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed pr-4">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
