import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyOTP from '../pages/auth/VerifyOTP';
import ResetPassword from '../pages/auth/ResetPassword';
import Dashboard from '../pages/dashboard/Dashboard';
import Notifications from '../pages/dashboard/Notifications';
import Campaigns from '../pages/campaigns/Campaigns';
import Profile from '../pages/profile/Profile';
import LandingPage from '../pages/LandingPage';
import AboutUsPage from '../pages/AboutUsPage';
import ContactPage from '../pages/ContactPage';
import BlogPage from '../pages/BlogPage';
import FeaturesPage from '../pages/FeaturesPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import CaseStudiesPage from '../pages/CaseStudiesPage';
import HelpCenterPage from '../pages/HelpCenterPage';

// Feature Sub-pages
import FindMatchesPage from '../pages/features/FindMatchesPage';
import CampaignManagementPage from '../pages/features/CampaignManagementPage';
import AnalyticsPage from '../pages/features/AnalyticsPage';
import VerifiedProfilesPage from '../pages/features/VerifiedProfilesPage';

import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Public Static Pages */}
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      
      {/* Feature Sub-pages */}
      <Route path="/features/find-matches" element={<FindMatchesPage />} />
      <Route path="/features/campaign-management" element={<CampaignManagementPage />} />
      <Route path="/features/analytics" element={<AnalyticsPage />} />
      <Route path="/features/verified-profiles" element={<VerifiedProfilesPage />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brand" element={<Dashboard />} />
        <Route path="/brand/dashboard" element={<Dashboard />} />
        <Route path="/influencer" element={<Dashboard />} />
        <Route path="/influencer/dashboard" element={<Dashboard />} />
        <Route path="/influencer/dashboard-page" element={<Dashboard />} />
        <Route path="/admin" element={<Dashboard />} />
        
        {/* Notifications */}
        <Route path="/notifications" element={<Notifications />} />
        
        {/* Campaign & Collaboration Routes */}
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/create-campaign" element={<Campaigns />} />
        <Route path="/brand/collaboration-requests" element={<Campaigns />} />
        <Route path="/brand/active-campaigns" element={<Campaigns />} />
        <Route path="/brand/pending-campaigns" element={<Campaigns />} />
        <Route path="/brand/campaign-hub" element={<Campaigns />} />
        <Route path="/brand/collaborations" element={<Campaigns />} />
        <Route path="/brand/collaboration-hub" element={<Campaigns />} />
        <Route path="/brand/analytics" element={<Campaigns />} />
        <Route path="/brand/influencer-found" element={<Campaigns />} />
        <Route path="/brand/collaboration/:id" element={<Campaigns />} />
        <Route path="/brand/deliverable-board/:id" element={<Campaigns />} />
        
        <Route path="/influencer/requests-page" element={<Campaigns />} />
        <Route path="/influencer/collaborations-page" element={<Campaigns />} />
        <Route path="/influencer/search-brands" element={<Campaigns />} />
        <Route path="/influencer/analytics-page" element={<Campaigns />} />
        <Route path="/influencer/portfolio-page" element={<Campaigns />} />
        <Route path="/influencer/collaboration/:id" element={<Campaigns />} />
        <Route path="/influencer/deliverable-board/:id" element={<Campaigns />} />
        
        <Route path="/search" element={<Campaigns />} />
        <Route path="/requests" element={<Campaigns />} />
        <Route path="/admin/verifications" element={<Campaigns />} />
        <Route path="/admin/users" element={<Campaigns />} />
        <Route path="/admin/reports" element={<Campaigns />} />
        <Route path="/admin/settings" element={<Campaigns />} />
        
        {/* Profile & Settings Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Profile />} />
        <Route path="/brand/settings" element={<Profile />} />
        <Route path="/brand/profile-settings" element={<Profile />} />
        <Route path="/influencer/settings" element={<Profile />} />
        <Route path="/influencer/profile-settings" element={<Profile />} />
      </Route>

      {/* Fallback Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
