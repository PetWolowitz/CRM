import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export function Error404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Pagina non trovata</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          <Home className="mr-2 h-4 w-4" />
          Torna alla Home
        </Button>
      </div>
    </div>
  );
}