import Sidebar from '@/components/ui/Sidebar';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 w-full overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
