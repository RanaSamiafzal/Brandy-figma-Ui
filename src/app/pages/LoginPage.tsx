import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Shield } from 'lucide-react';
import { Input } from '../components/FormComponents';
import { InfluButton } from '../components/InfluButton';

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would call an API
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Logo and Title */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#3b82f6] rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] mb-1 sm:mb-2">Brandly</h1>
            <p className="text-sm sm:text-base text-[#6b7280]">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-[#d1d5db]" />
                <span className="text-xs sm:text-sm text-[#6b7280]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-xs sm:text-sm text-[#3b82f6] hover:underline">
                Forgot password?
              </Link>
            </div>

            <InfluButton type="submit" variant="primary" className="w-full mb-4">
              Sign In
            </InfluButton>
          </form>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-[#6b7280]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#3b82f6] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}