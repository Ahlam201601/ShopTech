import "./globals.css";
import Sidebar from '@/app/components/Sidebar';
import Providers from "./redux/Providers";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Toaster position="top-right" /> 
        <Providers>
          <Sidebar />
          <main className="w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
