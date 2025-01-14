import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/Header';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}