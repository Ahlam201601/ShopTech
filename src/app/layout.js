import "./globals.css";
import Sidebar from '@/app/components/Sidebar';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
