import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2, Lock, AlertCircle } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'student@aicubetech.demo');

  const handleSimulatedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const result = await paymentService.processSimulatedCheckout({
        courseId: course.id,
        courseTitle: course.title,
        amount: course.isFree ? 0 : course.price,
        billingName: name,
        billingEmail: email,
        paymentMethod: course.isFree ? 'free_enroll' : paymentMethod,
      });

      setTransactionId(result.transactionId);
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
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSuccess ? 'Enrollment Confirmed!' : `Complete Enrollment`}
      description={isSuccess ? undefined : `Access full curriculum, downloadable resources & certificate`}
      size="md"
    >
      {isSuccess ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">You're All Set!</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              You now have full lifetime access to <strong>{course.title}</strong>.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Demo Transaction ID:</span>
              <strong className="font-mono text-slate-900">{transactionId}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Course:</span>
              <strong className="text-slate-900 truncate max-w-[200px]">{course.title}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Amount Billed:</span>
              <strong className="text-emerald-600">
                {course.isFree ? 'Free (₹0)' : formatCurrency(course.price)}
              </strong>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-colors"
          >
            Start Learning Now
          </button>
        </div>
      ) : (
        <form onSubmit={handleSimulatedSubmit} className="space-y-4">
          {/* Order Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-16 h-12 object-cover rounded-lg shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">{course.title}</h4>
              <p className="text-[11px] text-slate-500">Instructor: {course.instructor.name}</p>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-slate-900">
                {course.isFree ? 'Free' : formatCurrency(course.price)}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Billing Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Payment Method Selector if paid */}
          {!course.isFree && (
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-slate-700">
                Select Demo Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${paymentMethod === 'card'
                    ? 'border-brand-600 bg-brand-50/70 text-brand-700 ring-1 ring-brand-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <CreditCard className="w-4 h-4 text-brand-600" />
                  <span>Card (Demo)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${paymentMethod === 'paypal'
                    ? 'border-brand-600 bg-brand-50/70 text-brand-700 ring-1 ring-brand-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <Lock className="w-4 h-4 text-brand-600" />
                  <span>PayPal (Demo)</span>
                </button>
              </div>

              {/* Simulated Card Placeholder */}
              <div className="bg-slate-100/80 p-3 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Card Number:</span>
                  <span className="font-mono">•••• •••• •••• 4242</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Expiry / CVC:</span>
                  <span className="font-mono">12/28 • 888</span>
                </div>
              </div>
            </div>
          )}

          {/* Clear Demo Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-start gap-2 text-blue-800 text-xs">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Simulated Demo Flow:</strong> No real payment is processed. Clicking confirm will simulate a live checkout roundtrip and grant immediate access.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing simulated transaction...
              </span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {course.isFree
                    ? 'Confirm Free Enrollment'
                    : `Simulate Payment (${formatCurrency(course.price)})`}
                </span>
              </>
            )}
          </button>
        </form>
      )}
    </Modal>
  );
};
