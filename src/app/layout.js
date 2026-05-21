import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DriveFleet",
  description: "Premium car rental platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="drivefleet-dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
                        try {
                            const theme = localStorage.getItem('theme') || 'drivefleet-dark';
                            document.documentElement.setAttribute('data-theme', theme);
                        } catch(e) {}
                    `
        }} />
      </head>
      <body className={inter.className}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}