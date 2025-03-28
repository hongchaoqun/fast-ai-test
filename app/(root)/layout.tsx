"use client"

import AuthGuard from '@/components/auth/AuthGuard';
import Sidebar from '@/components/ui/Sidebar';
import React, { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
    <AuthGuard>
       <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 w-full overflow-auto">
            {children}
          </main>
        </div>
    </AuthGuard>
    </>
  );
}
