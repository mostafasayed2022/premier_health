'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepEmail } from './StepEmail';
import { StepOtp } from './StepOtp';
import { StepNewPassword } from './StepNewPassword';

type Step = 'email' | 'otp' | 'new-password';

export function ForgotPasswordFlow() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Restore state from sessionStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedStep = sessionStorage.getItem('forgot_password_step') as Step;
    const savedEmail = sessionStorage.getItem('forgot_password_email');
    const savedOtp = sessionStorage.getItem('forgot_password_otp');

    if (savedEmail) setEmail(savedEmail);
    if (savedOtp) setOtp(savedOtp);
    if (savedStep && ['email', 'otp', 'new-password'].includes(savedStep)) {
      setStep(savedStep);
    }
  }, []);

  // Sync state to sessionStorage
  useEffect(() => {
    if (!isMounted) return;
    sessionStorage.setItem('forgot_password_step', step);
    if (email) sessionStorage.setItem('forgot_password_email', email);
    if (otp) sessionStorage.setItem('forgot_password_otp', otp);
  }, [step, email, otp, isMounted]);

  const handleEmailSuccess = (newEmail: string) => {
    setEmail(newEmail);
    setStep('otp');
  };

  const handleOtpSuccess = (newOtp: string) => {
    setOtp(newOtp);
    setStep('new-password');
  };

  const handleBackToEmail = () => {
    setStep('email');
  };

  if (!isMounted) return null; // Avoid hydration mismatch

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Step Indicator */}
      <div className="flex justify-center mb-10 px-4">
        {(['email', 'otp', 'new-password'] as Step[]).map((s, i) => {
          const isActive = step === s;
          const isCompleted =
            (step === 'otp' && s === 'email') ||
            (step === 'new-password' && (s === 'email' || s === 'otp'));

          return (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-110'
                    : isCompleted
                    ? 'bg-accent/20 text-accent'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < 2 && (
                <div
                  className={`w-12 sm:w-16 h-1 mx-2 rounded-full transition-colors duration-300 ${
                    isCompleted ? 'bg-accent/40' : 'bg-gray-100'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Content with Animation */}
      <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepEmail initialEmail={email} onSuccess={handleEmailSuccess} />
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepOtp
                email={email}
                initialOtp={otp}
                onSuccess={handleOtpSuccess}
                onBack={handleBackToEmail}
              />
            </motion.div>
          )}

          {step === 'new-password' && (
            <motion.div
              key="new-password"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepNewPassword email={email} otp={otp} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
