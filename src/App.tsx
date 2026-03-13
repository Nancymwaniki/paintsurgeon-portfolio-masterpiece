import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollToTop } from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { LoginPage } from "./pages/admin/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { ActivityPage } from "./pages/admin/ActivityPage";
import { CategoriesPage } from "./pages/admin/CategoriesPage";
import { showErrorToast } from "@/utils/errorHandler";

// Configure QueryClient with global error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<LoginPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            
            {/* Protected admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <DashboardPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/activity"
              element={
                <ProtectedAdminRoute>
                  <ActivityPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedAdminRoute>
                  <CategoriesPage />
                </ProtectedAdminRoute>
              }
            />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
