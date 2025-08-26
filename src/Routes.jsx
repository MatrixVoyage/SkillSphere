import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CommunityExplorer from './pages/community-explorer';
import SkillVerificationCenter from './pages/skill-verification-center';
import ProjectWorkspace from './pages/project-workspace';
import KnowledgeHub from './pages/knowledge-hub';
import ProfileShowcase from './pages/profile-showcase';
import Homepage from './pages/homepage';
import LoginPage from "./pages/login-page";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CommunityExplorer />} />
        <Route path="/community-explorer" element={<CommunityExplorer />} />
        <Route path="/skill-verification-center" element={<SkillVerificationCenter />} />
        <Route path="/project-workspace" element={<ProjectWorkspace />} />
        <Route path="/knowledge-hub" element={<KnowledgeHub />} />
        <Route path="/profile-showcase" element={<ProfileShowcase />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
