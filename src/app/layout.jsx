import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import CustomCursor from '@/components/ui/CustomCursor';
import ToastContainer from '@/components/ui/ToastContainer';
import StorefrontShell from '@/components/layout/StorefrontShell';

export const metadata = {
  title: 'Shipflux – Premium Multi-Category E-Commerce Marketplace',
  description: 'Explore thoughtfully selected products across fashion, technology, lifestyle, home decor and beauty.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen relative selection:bg-accent selection:text-white pb-16 lg:pb-0">
        <ShopProvider>
          <CustomCursor />
          <ToastContainer />
          <StorefrontShell>
            {children}
          </StorefrontShell>
        </ShopProvider>
      </body>
    </html>
  );
}
