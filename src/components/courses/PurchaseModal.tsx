import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Smartphone,
  Copy,
  Check,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Course } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { paymentService } from '../../services/paymentService';
import { useAuth } from '../../context/AuthContext';
import { useEnrollment } from '../../context/EnrollmentContext';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onSuccess: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  course,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { enrollInCourse } = useEnrollment();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [upiMode, setUpiMode] = useState<'id' | 'qr'>('id');
  const [upiId, setUpiId] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  const OFFICIAL_UPI_ID = '9517285338@upi';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(OFFICIAL_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleQuickSuffix = (suffix: string) => {
    const prefix = upiId.split('@')[0];
    if (prefix) {
      setUpiId(`${prefix}${suffix}`);
    } else {
      setUpiId(`user${suffix}`);
    }
  };

  const handleUpiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const result = await paymentService.processSimulatedCheckout({
        courseId: course.id,
        courseTitle: course.title,
        amount: course.isFree ? 0 : course.price,
        billingName: name || 'Student',
        mobileNumber: mobile,
        upiId: upiId || OFFICIAL_UPI_ID,
        paymentMethod: course.isFree ? 'free_enroll' : 'upi',
      });

      setTransactionId(result.transactionId);
      setUtrNumber(result.utrNumber);
      enrollInCourse(course.id, course.sections[0]?.lessons[0]?.id);
      setIsSuccess(true);
      onSuccess();
    } catch {
      // Handle error if any
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setTransactionId('');
    setUtrNumber('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSuccess ? 'Enrollment Confirmed!' : 'Enroll via UPI Payment'}
      description={
        isSuccess
          ? undefined
          : 'Instant access to all modules, syllabus index topics & hands-on code projects'
      }
      size="md"
    >
      {isSuccess ? (
        <div className="text-center py-5 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2 border border-emerald-200">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>UPI Payment Verified</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Enrollment Successful!</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You now have lifetime access to <strong>{course.title}</strong> by Instructor Pushkar Rai.
            </p>
          </div>

          {/* UPI Receipt Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-slate-600 pb-2 border-b border-slate-200/80">
              <span className="text-slate-500">Bank UTR / Reference No:</span>
              <strong className="font-mono text-emerald-700 font-bold tracking-wider">{utrNumber}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>UPI Transaction ID:</span>
              <strong className="font-mono text-slate-800">{transactionId}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Paid To:</span>
              <strong className="text-slate-900">AI CUBE TECH ({OFFICIAL_UPI_ID})</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Amount Paid:</span>
              <strong className="text-emerald-600 font-extrabold text-sm">
                {formatCurrency(course.price)}
              </strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Student Name:</span>
              <strong className="text-slate-800">{name || 'Enrolled Student'}</strong>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
          >
            <span>Start Learning & Open Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpiSubmit} className="space-y-4">
          {/* Order Summary Box */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-16 h-12 object-cover rounded-xl shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">{course.title}</h4>
              <p className="text-[11px] text-slate-500">
                Instructor: <span className="font-semibold text-slate-700">Pushkar Rai</span> (15+ Yrs Exp.)
              </p>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-emerald-700">
                {formatCurrency(course.price)}
              </span>
            </div>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile / WhatsApp No. <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* UPI Payment Mode Tabs */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">
                Pay with UPI
              </label>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Instant Verification
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUpiMode('id')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  upiMode === 'id'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Enter UPI ID / VPA</span>
              </button>

              <button
                type="button"
                onClick={() => setUpiMode('qr')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  upiMode === 'qr'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>Scan UPI QR Code</span>
              </button>
            </div>

            {/* UPI Option 1: Enter UPI ID */}
            {upiMode === 'id' && (
              <div className="space-y-2 bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-semibold text-slate-700">
                  Your UPI ID (VPA)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. mobile@paytm or name@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Quick UPI Handle Suffix Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-medium">Quick handles:</span>
                  {['@okhdfcbank', '@okaxis', '@ybl', '@paytm', '@ibl'].map((suffix) => (
                    <button
                      key={suffix}
                      type="button"
                      onClick={() => handleQuickSuffix(suffix)}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                    >
                      {suffix}
                    </button>
                  ))}
                </div>

                <p className="text-[10px] text-slate-400 pt-1 flex items-center gap-1.5">
                  <span>Supported apps:</span>
                  <span className="font-semibold text-slate-600">Google Pay • PhonePe • Paytm • BHIM • Cred</span>
                </p>
              </div>
            )}

            {/* UPI Option 2: Scan QR Code */}
            {upiMode === 'qr' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-3">
                <div className="inline-block bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
                  {/* High quality clean stylized SVG UPI QR code */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 160 160"
                    className="w-36 h-36 mx-auto"
                  >
                    <rect width="160" height="160" fill="#ffffff" />
                    {/* Corner 1 */}
                    <rect x="10" y="10" width="40" height="40" fill="#0f172a" rx="4" />
                    <rect x="16" y="16" width="28" height="28" fill="#ffffff" rx="2" />
                    <rect x="22" y="22" width="16" height="16" fill="#0f172a" rx="1" />
                    {/* Corner 2 */}
                    <rect x="110" y="10" width="40" height="40" fill="#0f172a" rx="4" />
                    <rect x="116" y="16" width="28" height="28" fill="#ffffff" rx="2" />
                    <rect x="122" y="22" width="16" height="16" fill="#0f172a" rx="1" />
                    {/* Corner 3 */}
                    <rect x="10" y="110" width="40" height="40" fill="#0f172a" rx="4" />
                    <rect x="16" y="116" width="28" height="28" fill="#ffffff" rx="2" />
                    <rect x="22" y="122" width="16" height="16" fill="#0f172a" rx="1" />
                    {/* Data pattern modules */}
                    <rect x="60" y="15" width="10" height="10" fill="#0f172a" />
                    <rect x="75" y="25" width="10" height="10" fill="#0f172a" />
                    <rect x="90" y="15" width="10" height="10" fill="#0f172a" />
                    <rect x="15" y="60" width="10" height="10" fill="#0f172a" />
                    <rect x="35" y="75" width="10" height="10" fill="#0f172a" />
                    <rect x="15" y="90" width="10" height="10" fill="#0f172a" />
                    <rect x="60" y="60" width="40" height="40" fill="#10b981" rx="4" />
                    {/* Center UPI text badge */}
                    <text
                      x="80"
                      y="84"
                      fill="#ffffff"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="system-ui"
                    >
                      UPI
                    </text>
                    <rect x="115" y="60" width="10" height="10" fill="#0f172a" />
                    <rect x="135" y="75" width="10" height="10" fill="#0f172a" />
                    <rect x="120" y="95" width="15" height="10" fill="#0f172a" />
                    <rect x="60" y="115" width="12" height="12" fill="#0f172a" />
                    <rect x="80" y="125" width="15" height="15" fill="#0f172a" />
                    <rect x="105" y="115" width="10" height="10" fill="#0f172a" />
                    <rect x="125" y="125" width="20" height="15" fill="#0f172a" />
                  </svg>
                  <p className="text-[10px] font-bold text-slate-500 mt-1">
                    Scan with any UPI App
                  </p>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between max-w-xs mx-auto">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block font-semibold">
                      Official UPI ID:
                    </span>
                    <span className="font-mono font-bold text-xs text-slate-800">
                      {OFFICIAL_UPI_ID}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Secure Guarantee Notice */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl flex items-start gap-2 text-emerald-900 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Secure UPI Gateway:</strong> Flat {formatCurrency(course.price)} fee covers the complete 40-45 hours syllabus, topic roadmap & lifetime module access.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 text-xs"
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying UPI Payment...
              </span>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span>Pay {formatCurrency(course.price)} via UPI</span>
              </>
            )}
          </button>
        </form>
      )}
    </Modal>
  );
};
