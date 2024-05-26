// src/app/layout.js
import Navigation from "../components/Navigation";
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
        <main style={{ flex: 1 }}>{children}</main> {/* Ensure the main content takes up the remaining space */}
        <Footer /> {/* Add the Footer component */}
      </body>
    </html>
  );
}

