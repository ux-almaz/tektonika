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
            <Route path="/" element={<Index />} />
            <Route path="/project" element={<Project />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/parking" element={<ParkingCatalog />} />
            <Route path="/parking/:id" element={<ParkingAssetDetail />} />
            <Route path="/flats/:id" element={<Apartment />} />
            <Route path="/about" element={<About />} />
            <Route path="/purchase" element={<HowToBuy />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/media" element={<Media />} />
            <Route path="/media/:id" element={<Publication />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
