import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { Toaster } from 'react-hot-toast';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'FFMS - Fish Farm Management System',
  description: 'Manage ponds, batches, feed, harvests, and sales',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      {/* 1. We set body background to black, and relative/overflow-hidden */}
      <body className="bg-[#050505] text-slate-200 selection:bg-amber-900 selection:text-amber-50 relative min-h-screen overflow-hidden">
        
        {/* 2. THE NEW BACKGROUND LAYER */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          
          {/* If you have the image, uncomment this block and add your image to public/bg-elegance.jpg */}
          {/* 
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 animate-slow-pan"
            style={{ backgroundImage: "url('/bg-elegance.jpg')" }}
          />
          */}

          {/* If you don't have an image, this creates a slow-moving, moody mesh gradient */}
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-amber-900/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#1a2332]/50 rounded-full blur-[120px] animate-pulse-slow-reverse" />
        </div>

        {/* 3. THE APP CONTENT */}
        <AuthProvider>
          <div className="relative z-10">
            {children}
            <Toaster 
              position="top-right" 
              toastOptions={{
                style: {
                  background: '#171717',
                  color: '#fbbf24',
                  border: '1px solid #333',
                },
              }}
            />
          </div>
        </AuthProvider>

      </body>
    </html>
  );
}