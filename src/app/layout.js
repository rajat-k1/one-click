// src/app/layout.js
import Navigation from "../components/Navigation";
import "./globals.css";
import { SocialProvider } from "@/contexts/socialContext";

const inter = Inter({ subsets: ["latin"] });
import Footer from "../components/Footer"; // Import the Footer component
import '../../src/app/globals.css';

export const metadata = {
  title: "One-Click Platform",
  description: "One-Click Social Media Analytics and Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}

