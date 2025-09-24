import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AuthProvider } from "./components/Auth/AuthProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import theme from "./theme";
import Navigation from "./components/Navigation";
import BreadcrumbNavigation from "./components/BreadcrumbNavigation";
import QuickActionsMenu from "./components/QuickActionsMenu";
import useKeyboardNavigation from "./hooks/useKeyboardNavigation";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ThemeSelector from "./components/ThemeSelector";

function AppContent() {
  const navigate = useNavigate();

  // Initialize keyboard navigation
  useKeyboardNavigation([], (path) => navigate(path));
  useKeyboardShortcuts();

  return (
    <>
      <Navigation />
      <BreadcrumbNavigation />
      <QuickActionsMenu />
      <Toaster position="top-center" />
      <ThemeSelector />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
