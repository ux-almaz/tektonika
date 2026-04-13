import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import RequirePassword from "./components/RequirePassword";

const Login = lazy(() => import("./pages/Login"));
const Project = lazy(() => import("./pages/Project"));
const Catalog = lazy(() => import("./pages/Catalog"));
const ParkingCatalog = lazy(() => import("./pages/ParkingCatalog"));
const ParkingAssetDetail = lazy(() => import("./pages/ParkingAssetDetail"));
const Apartment = lazy(() => import("./pages/Apartment"));
const About = lazy(() => import("./pages/About"));
const HowToBuy = lazy(() => import("./pages/HowToBuy"));
const Projects = lazy(() => import("./pages/Projects"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Media = lazy(() => import("./pages/Media"));
const Publication = lazy(() => import("./pages/Publication"));
const NotFound = lazy(() => import("./pages/NotFound"));
import MouseTrail from "./components/MouseTrail";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MouseTrail />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequirePassword><Index /></RequirePassword>} />
            <Route path="/project" element={<RequirePassword><Project /></RequirePassword>} />
            <Route path="/catalog" element={<RequirePassword><Catalog /></RequirePassword>} />
            <Route path="/parking" element={<RequirePassword><ParkingCatalog /></RequirePassword>} />
            <Route path="/parking/:id" element={<RequirePassword><ParkingAssetDetail /></RequirePassword>} />
            <Route path="/flats/:id" element={<RequirePassword><Apartment /></RequirePassword>} />
            <Route path="/about" element={<RequirePassword><About /></RequirePassword>} />
            <Route path="/purchase" element={<RequirePassword><HowToBuy /></RequirePassword>} />
            <Route path="/projects" element={<RequirePassword><Projects /></RequirePassword>} />
            <Route path="/contacts" element={<RequirePassword><Contacts /></RequirePassword>} />
            <Route path="/media" element={<RequirePassword><Media /></RequirePassword>} />
            <Route path="/media/:id" element={<RequirePassword><Publication /></RequirePassword>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
