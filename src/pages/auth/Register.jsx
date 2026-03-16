import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Shield, Briefcase, Users } from 'lucide-react';
import { Input } from '../../components/common/FormComponents';
import { Button } from '../../components/common/Button';
import { registerUser } from '../../redux/slices/authSlice';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    try {
      await dispatch(registerUser({ ...formData, role: userType })).unwrap();
      alert("Registration successful! Please login.");
      navigate('/login');
    } catch (err) {
      // Error is handled by thunk and stored in state.error
      console.error("Registration failed:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#3b82f6] rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#111827] mb-1 sm:mb-2">Join Brandly</h1>
              <p className="text-sm sm:text-base text-[#6b7280]">Choose your account type to get started</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <button
                onClick={() => setUserType('brand')}
                className="p-6 sm:p-8 border-2 border-[#e5e7eb] rounded-xl hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#eff6ff] rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#3b82f6] transition-colors">
                    <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-[#3b82f6] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-1 sm:mb-2">I'm a Brand</h3>
                  <p className="text-sm sm:text-base text-[#6b7280]">
                    Find and collaborate with influencers to boost your brand
                  </p>
                </div>
              </button>

              <button
                onClick={() => setUserType('influencer')}
                className="p-6 sm:p-8 border-2 border-[#e5e7eb] rounded-xl hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#eff6ff] rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#3b82f6] transition-colors">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#3b82f6] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-1 sm:mb-2">I'm an Influencer</h3>
                  <p className="text-sm sm:text-base text-[#6b7280]">
                    Get discovered and work with amazing brands
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs sm:text-sm text-[#6b7280]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#3b82f6] hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#3b82f6] rounded-full flex items-center justify-center">
                {userType === 'brand' ? (
                  <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                ) : (
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                )}
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] mb-1 sm:mb-2">
              Sign up as {userType === 'brand' ? 'Brand' : 'Influencer'}
            </h1>
            <button
              onClick={() => setUserType(null)}
              className="text-xs sm:text-sm text-[#3b82f6] hover:underline"
            >
              Change account type
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <Input
              label={userType === 'brand' ? 'Brand Name' : 'Full Name'}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={userType === 'brand' ? 'Your Company' : 'John Doe'}
              required
            />

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

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Button type="submit" variant="primary" className="w-full mb-4" isLoading={loading}>
              Create Account
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-[#6b7280]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#3b82f6] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
