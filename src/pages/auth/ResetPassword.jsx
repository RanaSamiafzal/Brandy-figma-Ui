import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '../../components/common/FormComponents';
import { Button } from '../../components/common/Button';
import { toast } from 'sonner';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  // Ensure OTP was verified before allowing reset
  const otpVerified = location.state?.otpVerified || false; 
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!otpVerified) {
      toast.error('Session expired. Please start the password reset process again.');
      navigate('/forgot-password');
    }
  }, [otpVerified, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    
    // Simulating API call to update password
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password updated successfully! Please login with your new credentials.');
      navigate('/login');
    }, 1500);
  };

  if (!otpVerified) return null;

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
            <h1 className="text-2xl font-bold text-[#111827] mb-2">Create New Password</h1>
            <p className="text-[#6b7280]">
              Your identity is verified. Now, set your new account password.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-[#6b7280] hover:text-[#111827]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="bg-[#f9fafb] p-4 rounded-lg mb-6 border border-[#e5e7eb]">
              <h3 className="text-sm font-medium text-[#374151] mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-[#3b82f6]" />
                Password Requirements:
              </h3>
              <ul className="text-xs text-[#6b7280] space-y-1">
                <li className={formData.password.length >= 8 ? 'text-[#10b981]' : 'text-[#ef4444]'}>
                  • Minimum 8 characters
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'text-[#10b981]' : 'text-[#ef4444]'}>
                  • At least one uppercase letter
                </li>
                <li className={/[0-9]/.test(formData.password) ? 'text-[#10b981]' : 'text-[#ef4444]'}>
                  • At least one number
                </li>
              </ul>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              isLoading={isLoading}
              disabled={formData.password !== formData.confirmPassword || formData.password.length < 8}
            >
              Update Password
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link to="/login" university-link="true" className="text-sm text-[#3b82f6] hover:underline font-medium">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
