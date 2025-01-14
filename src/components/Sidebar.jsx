import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BadgeDollarSign, 
  CheckSquare,
  Settings,
  UserCheck,
  Calendar,
  FileText
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Contatti', href: '/contacts', icon: Users },
  { name: 'Clienti', href: '/customers', icon: UserCheck },
  { name: 'Trattative', href: '/deals', icon: BadgeDollarSign },
  { name: 'Calendario', href: '/calendar', icon: Calendar },
  { name: 'Attività', href: '/tasks', icon: CheckSquare },
  { name: 'Fatture', href: '/invoices', icon: FileText },
  { name: 'Impostazioni', href: '/settings', icon: Settings },
];

function Sidebar({ onNavigate }) {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-[#69247C] to-[#FAC67A] overflow-hidden">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onNavigate}
              className={cn(
                'group flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-white/20 text-white backdrop-blur-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 transition-colors duration-200',
                  isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;