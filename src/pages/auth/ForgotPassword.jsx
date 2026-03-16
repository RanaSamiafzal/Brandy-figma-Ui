import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { Input } from '../../components/common/FormComponents';
import { Button } from '../../components/common/Button';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      toast.success('OTP sent to your email');
      // Pass email to next page via state
      navigate('/verify-otp', { state: { email } });
    }, 1500);
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
            <h1 className="text-2xl font-bold text-[#111827] mb-2">Forgot Password</h1>
            <p className="text-[#6b7280]">
              Enter your email address and we'll send you an OTP to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full mb-4"
              isLoading={isLoading}
            >
              Send OTP
            </Button>
          </form>

          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-[#3b82f6] hover:underline font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
