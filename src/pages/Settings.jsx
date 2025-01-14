import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { Bell, Mail, Moon, Sun, Lock } from 'lucide-react';

export function Settings() {
  const { user, updatePassword } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Errore",
        description: "Le nuove password non coincidono",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await updatePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast({
        title: "Password aggiornata",
        description: "La password è stata modificata con successo",
      });

      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Impostazioni</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Notifiche</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email di notifica</Label>
                <p className="text-sm text-muted-foreground">
                  Ricevi email per appuntamenti e scadenze
                </p>
              </div>
              <Switch
                checked={isEmailNotifications}
                onCheckedChange={setIsEmailNotifications}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Tema</h2>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tema scuro</Label>
              <p className="text-sm text-muted-foreground">
                Attiva/disattiva il tema scuro
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              />
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Sicurezza</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Password attuale</Label>
              <Input
                id="current-password"
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nuova password</Label>
              <Input
                id="new-password"
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Conferma password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Aggiornamento...' : 'Aggiorna password'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}