import { Routes, Route, Navigate } from 'react-router';
import { useLenis } from '@/hooks/useLenis';
import CustomCursor from '@/components/CustomCursor';
import CookieConsent from '@/components/CookieConsent';
import Navbar from '@/components/Navbar';
import HeroSection from '@/sections/HeroSection';
import SituationSection from '@/sections/SituationSection';
import ApprocheSection from '@/sections/ApprocheSection';
import DimensionsSection from '@/sections/DimensionsSection';
import ExpertisesSection from '@/sections/ExpertisesSection';
import ProfilsSection from '@/sections/ProfilsSection';
import SolutionsSection from '@/sections/SolutionsSection';
import MethodeSection from '@/sections/MethodeSection';
import VisionSection from '@/sections/VisionSection';
import StatsSection from '@/sections/StatsSection';
import QuoteSection from '@/sections/QuoteSection';
import TeamSection from '@/sections/TeamSection';
import RessourcesSection from '@/sections/RessourcesSection';
import SimulateursSection from '@/sections/SimulateursSection';
import ContactSection from '@/sections/ContactSection';
import ContactFooter from '@/sections/ContactFooter';
import RessourcesPage from '@/pages/RessourcesPage';
import ArticlePage from '@/pages/ArticlePage';
import AdminLogin from '@/pages/AdminLogin';
import AdminArticles from '@/pages/AdminArticles';
import ClientLogin from '@/pages/ClientLogin';
import ClientPortal from '@/pages/ClientPortal';
import MentionsLegales from '@/pages/MentionsLegales';
import PolitiqueConfidentialite from '@/pages/PolitiqueConfidentialite';

function HomePage() {
  return (
    <main>
      <HeroSection />
      <SituationSection />
      <ApprocheSection />
      <DimensionsSection />
      <ExpertisesSection />
      <ProfilsSection />
      <SolutionsSection />
      <MethodeSection />
      <VisionSection />
      <StatsSection />
      <QuoteSection />
      <TeamSection />
      <RessourcesSection />
      <SimulateursSection />
      <ContactSection />
    </main>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <ContactFooter />
    </>
  );
}

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <CookieConsent />
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout>
              <HomePage />
            </PageLayout>
          }
        />
        <Route
          path="/ressources"
          element={
            <PageLayout>
              <RessourcesPage />
            </PageLayout>
          }
        />
        <Route
          path="/ressources/:slug"
          element={
            <PageLayout>
              <ArticlePage />
            </PageLayout>
          }
        />
        <Route
          path="/mentions-legales"
          element={
            <PageLayout>
              <MentionsLegales />
            </PageLayout>
          }
        />
        <Route
          path="/politique-confidentialite"
          element={
            <PageLayout>
              <PolitiqueConfidentialite />
            </PageLayout>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/articles" element={<AdminArticles />} />
        <Route path="/espace-client" element={<ClientLogin />} />
        <Route path="/espace-client/dashboard" element={<ClientPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
