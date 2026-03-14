import { createBrowserRouter } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { BrandDashboard } from './pages/BrandDashboard';
import { SearchInfluencers } from './pages/SearchInfluencers';
import { MyRequests } from './pages/MyRequests';
import { AdminPanel } from './pages/AdminPanel';
import { ProfileSettings } from './pages/ProfileSettings';
import { AdminUsers } from './pages/AdminUsers';
import { AdminReports } from './pages/AdminReports';
import { AdminSettings } from './pages/AdminSettings';
import { InfluencerDashboard } from './pages/InfluencerDashboard';
import { CreateCampaign } from './pages/CreateCampaign';
import { FeaturesPage } from './pages/FeaturesPage';
import { FindMatchesPage } from './pages/features/FindMatchesPage';
import { CampaignManagementPage } from './pages/features/CampaignManagementPage';
import { AnalyticsPage } from './pages/features/AnalyticsPage';
import { VerifiedProfilesPage } from './pages/features/VerifiedProfilesPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { VerifyOtpPage } from './pages/VerifyOtpPage';
import { NewPasswordPage } from './pages/NewPasswordPage';
import { InfluencerProfilePage } from './pages/InfluencerProfilePage';

// Brand pages
import { CollaborationRequestsPage } from './pages/brand/CollaborationRequestsPage';
import { ActiveCampaignsPage } from './pages/brand/ActiveCampaignsPage';
import { PendingCampaignsPage } from './pages/brand/PendingCampaignsPage';
import { InfluencerFoundPage } from './pages/brand/InfluencerFoundPage';
import { CollaborationsPage } from './pages/brand/CollaborationsPage';
import { BrandAnalyticsPage } from './pages/brand/BrandAnalyticsPage';
import { BrandProfileSettings } from './pages/brand/BrandProfileSettings';
import { CollaborationHubPage } from './pages/brand/CollaborationHubPage';
import { CampaignHubPage } from './pages/brand/CampaignHubPage';
import { CollaborationDetailsPage } from './pages/brand/CollaborationDetailsPage';
import { DeliverableBoardPage } from './pages/brand/DeliverableBoardPage';

// Influencer pages
import { InfluencerDashboardPage } from './pages/influencer/InfluencerDashboardPage';
import { InfluencerPortfolioPage } from './pages/influencer/InfluencerPortfolioPage';
import { SearchBrandsPage } from './pages/influencer/SearchBrandsPage';
import { InfluencerCollaborationsPage } from './pages/influencer/InfluencerCollaborationsPage';
import { InfluencerRequestsPage } from './pages/influencer/InfluencerRequestsPage';
import { InfluencerAnalyticsPage } from './pages/influencer/InfluencerAnalyticsPage';
import { InfluencerProfileSettings } from './pages/influencer/InfluencerProfileSettings';
import { InfluencerCollaborationDetailsPage } from './pages/influencer/InfluencerCollaborationDetailsPage';

// Admin pages
import { AdminVerificationsPage } from './pages/admin/AdminVerificationsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignupPage,
  },
  {
    path: '/forgot-password',
    Component: ForgotPasswordPage,
  },
  {
    path: '/verify-otp',
    Component: VerifyOtpPage,
  },
  {
    path: '/new-password',
    Component: NewPasswordPage,
  },
  {
    path: '/privacy-policy',
    Component: PrivacyPolicyPage,
  },
  {
    path: '/about',
    Component: AboutUsPage,
  },
  {
    path: '/contact',
    Component: ContactPage,
  },
  {
    path: '/blog',
    Component: BlogPage,
  },
  {
    path: '/case-studies',
    Component: CaseStudiesPage,
  },
  {
    path: '/help-center',
    Component: HelpCenterPage,
  },
  {
    path: '/features',
    Component: FeaturesPage,
  },
  {
    path: '/features/find-matches',
    Component: FindMatchesPage,
  },
  {
    path: '/features/campaign-management',
    Component: CampaignManagementPage,
  },
  {
    path: '/features/analytics',
    Component: AnalyticsPage,
  },
  {
    path: '/features/verified-profiles',
    Component: VerifiedProfilesPage,
  },
  {
    path: '/dashboard',
    Component: BrandDashboard,
  },
  {
    path: '/influencer/dashboard',
    Component: InfluencerDashboard,
  },
  {
    path: '/search',
    Component: SearchInfluencers,
  },
  {
    path: '/influencer/:name',
    Component: InfluencerProfilePage,
  },
  {
    path: '/requests',
    Component: MyRequests,
  },
  {
    path: '/create-campaign',
    Component: CreateCampaign,
  },
  {
    path: '/settings',
    Component: ProfileSettings,
  },
  {
    path: '/profile',
    Component: ProfileSettings,
  },
  {
    path: '/admin',
    Component: AdminPanel,
  },
  {
    path: '/admin/users',
    Component: AdminUsers,
  },
  {
    path: '/admin/reports',
    Component: AdminReports,
  },
  {
    path: '/admin/settings',
    Component: AdminSettings,
  },
  {
    path: '/admin/verifications',
    Component: AdminVerificationsPage,
  },
  {
    path: '/brand/collaboration-requests',
    Component: CollaborationRequestsPage,
  },
  {
    path: '/brand/active-campaigns',
    Component: ActiveCampaignsPage,
  },
  {
    path: '/brand/pending-campaigns',
    Component: PendingCampaignsPage,
  },
  {
    path: '/brand/influencer-found',
    Component: InfluencerFoundPage,
  },
  {
    path: '/brand/collaborations',
    Component: CollaborationsPage,
  },
  {
    path: '/brand/collaboration/:id',
    Component: CollaborationDetailsPage,
  },
  {
    path: '/brand/deliverable-board/:id',
    Component: DeliverableBoardPage,
  },
  {
    path: '/brand/analytics',
    Component: BrandAnalyticsPage,
  },
  {
    path: '/brand/settings',
    Component: BrandProfileSettings,
  },
  {
    path: '/brand/profile-settings',
    Component: BrandProfileSettings,
  },
  {
    path: '/brand/collaboration-hub',
    Component: CollaborationHubPage,
  },
  {
    path: '/brand/campaign-hub',
    Component: CampaignHubPage,
  },
  {
    path: '/influencer/dashboard-page',
    Component: InfluencerDashboardPage,
  },
  {
    path: '/influencer/portfolio-page',
    Component: InfluencerPortfolioPage,
  },
  {
    path: '/influencer/search-brands',
    Component: SearchBrandsPage,
  },
  {
    path: '/influencer/collaborations-page',
    Component: InfluencerCollaborationsPage,
  },
  {
    path: '/influencer/collaboration/:id',
    Component: InfluencerCollaborationDetailsPage,
  },
  {
    path: '/influencer/deliverable-board/:id',
    Component: DeliverableBoardPage,
  },
  {
    path: '/influencer/requests-page',
    Component: InfluencerRequestsPage,
  },
  {
    path: '/influencer/analytics-page',
    Component: InfluencerAnalyticsPage,
  },
  {
    path: '/influencer/settings',
    Component: InfluencerProfileSettings,
  },
  {
    path: '/influencer/profile-settings',
    Component: InfluencerProfileSettings,
  },
  {
    path: '*',
    Component: () => (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#111827] mb-4">404</h1>
          <p className="text-[#6b7280] mb-4">Page not found</p>
          <a href="/" className="text-[#3b82f6] hover:underline">
            Go to Home
          </a>
        </div>
      </div>
    ),
  },
]);