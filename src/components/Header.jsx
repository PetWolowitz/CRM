import { useState } from 'react';
import { Button } from './ui/button';
import { UserNav } from './UserNav';
import { ThemeToggle } from './ThemeToggle';
import { Building } from 'lucide-react';
import { HelpDialog } from './HelpDialog';

export function Header({ children }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full relative overflow-hidden" style={{ height: '3.5rem' }}>
      {/* Video di sfondo */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/navbar-bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay con gradiente */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(90deg, rgba(105, 36, 124, 0.9) 0%, rgba(218, 73, 141, 0.7) 100%)',
          }}
        />
      </div>

      {/* Contenuto navbar */}
      <div className="container h-14 max-w-7xl flex items-center relative z-10">
        <div className="flex items-center gap-2 lg:gap-4">
          {children}
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            <span className="font-bold hidden sm:inline text-white">Modern CRM</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 lg:space-x-4">
          <nav className="flex items-center space-x-2 lg:space-x-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:inline-flex text-white hover:text-white hover:bg-white/10"
              onClick={() => setIsHelpOpen(true)}
            >
              Aiuto
            </Button>
            <UserNav />
          </nav>
        </div>
      </div>

      <HelpDialog 
        open={isHelpOpen} 
        onOpenChange={setIsHelpOpen} 
      />
    </header>
  );
}