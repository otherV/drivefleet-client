import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "DriveFleet",
  description: "Premium car rental platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="drivefleet-dark"
    >
      <body className={inter.className}>
        {children}
        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}