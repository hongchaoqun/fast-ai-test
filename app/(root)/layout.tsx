"use client"

import Sidebar from '@/components/ui/Sidebar';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  let token;
  useEffect(() => {
    token = localStorage.getItem('token');
    if (!token) {
      router.push("/login");
    }
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

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
