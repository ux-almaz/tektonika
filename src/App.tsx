import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RequirePassword from "./components/RequirePassword";

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

const P = ({ children }: { children: React.ReactNode }) => (
  <RequirePassword>{children}</RequirePassword>
);

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
            <Route path="/" element={<P><Index /></P>} />
            <Route path="/project" element={<P><Project /></P>} />
            <Route path="/catalog" element={<P><Catalog /></P>} />
            <Route path="/parking" element={<P><ParkingCatalog /></P>} />
            <Route path="/parking/:id" element={<P><ParkingAssetDetail /></P>} />
            <Route path="/flats/:id" element={<P><Apartment /></P>} />
            <Route path="/about" element={<P><About /></P>} />
            <Route path="/purchase" element={<P><HowToBuy /></P>} />
            <Route path="/projects" element={<P><Projects /></P>} />
            <Route path="/contacts" element={<P><Contacts /></P>} />
            <Route path="/media" element={<P><Media /></P>} />
            <Route path="/media/:id" element={<P><Publication /></P>} />
            <Route path="*" element={<P><NotFound /></P>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
