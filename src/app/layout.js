import "./globals.css";
import Sidebar from '@/app/components/Sidebar';
import Providers from "./redux/Providers";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Providers>
          <Sidebar />
          <main className="w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
