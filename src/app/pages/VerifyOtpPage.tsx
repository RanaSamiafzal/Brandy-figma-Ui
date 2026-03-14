import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { Shield, ArrowLeft } from 'lucide-react';
import { InfluButton } from '../components/InfluButton';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { toast } from 'sonner';

export function VerifyOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your email';
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTestFill = () => {
    setOtp('123456');
    toast.info('Test OTP filled!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    // Mock OTP verification
    setTimeout(() => {
      setIsLoading(false);
      if (otp.trim() === '123456') {
        toast.success('OTP verified! Redirecting...');
        console.log('Navigating to /new-password');
        navigate('/new-password', { 
          state: { 
            email, 
            otpVerified: true,
            timestamp: Date.now() 
          },
          replace: true
        });
      } else {
        toast.error(`Incorrect OTP (${otp}). Please use 123456 for testing.`);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#3b82f6] rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#111827] mb-2">Verify OTP</h1>
            <p className="text-[#6b7280] mb-2">
              We've sent a 6-digit code to <span className="font-semibold text-[#111827]">{email}</span>.
            </p>
            <p className="text-sm text-[#f59e0b] font-medium bg-[#fffbeb] py-2 px-4 rounded-lg inline-block">
              OTP will expire in 10 minutes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <label className="block mb-4 text-[#374151] font-medium">Enter 6-digit code</label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(val) => setOtp(val)}
                autoFocus
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                  <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
                </InputOTPGroup>
              </InputOTP>
              <button 
                type="button"
                onClick={handleTestFill}
                className="mt-4 text-xs text-[#3b82f6] hover:underline cursor-pointer bg-[#eff6ff] px-3 py-1 rounded-full border border-[#dbeafe]"
              >
                Click to auto-fill: 123456
              </button>
            </div>

            <InfluButton 
              type="submit" 
              variant="primary" 
              className="w-full"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </InfluButton>

            <div className="text-center">
              <p className="text-sm text-[#6b7280]">
                Didn't receive the code?{' '}
                <button 
                  type="button" 
                  className="text-[#3b82f6] hover:underline font-medium"
                  onClick={() => toast.success('A new OTP has been sent!')}
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </form>

          <div className="text-center mt-6">
            <Link to="/forgot-password" className="inline-flex items-center text-sm text-[#3b82f6] hover:underline font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
