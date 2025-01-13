import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BadgeDollarSign, 
  CheckSquare,
  Settings,
  UserCheck
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Contatti', href: '/contacts', icon: Users },
  { name: 'Clienti', href: '/customers', icon: UserCheck },
  { name: 'Trattative', href: '/deals', icon: BadgeDollarSign },
  { name: 'Attività', href: '/tasks', icon: CheckSquare },
  { name: 'Impostazioni', href: '/settings', icon: Settings },
];

export function Sidebar({ onNavigate }) {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onNavigate}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground'
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