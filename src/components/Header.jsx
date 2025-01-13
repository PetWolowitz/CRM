import { Button } from './ui/button';
import { UserNav } from './UserNav';
import { ThemeToggle } from './ThemeToggle';
import { Building } from 'lucide-react';

export function Header({ children }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 max-w-7xl flex items-center">
        <div className="flex items-center gap-2 lg:gap-4">
          {children}
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="font-bold hidden sm:inline">Modern CRM</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 lg:space-x-4">
          <nav className="flex items-center space-x-2 lg:space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Aiuto
            </Button>
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}