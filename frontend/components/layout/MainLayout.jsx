import React from "react";
import Header from "@/components/layout/Header";
import SEO from "./SEO";
import Footer from "@/components/layout/Footer";
import { Toaster } from "../ui/Toaster";

const MainLayout = ({ children, title, className }) => (
  <>
    <SEO title={title} />
    <Header />
    <main className={`min-h-[calc(100vh-80px)] ${className}`}>{children}</main>
    <Toaster />
    <Footer />
  </>
);

export default MainLayout;
