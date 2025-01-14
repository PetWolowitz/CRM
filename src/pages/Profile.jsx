import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Camera, Mail, Phone, Building } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Mario Rossi',
    email: user?.email || '',
    phone: '+39 123 456 7890',
    company: 'Acme Corp',
    role: 'Sales Manager',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profilo aggiornato",
      description: "Le modifiche sono state salvate con successo",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Profilo</h1>

      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-0 right-0 rounded-full"
              onClick={() => setIsAvatarDialogOpen(true)}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.role}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Nome completo</Label>
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                type="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Telefono</Label>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Azienda</Label>
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <Input
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annulla
                </Button>
                <Button onClick={handleSave}>
                  Salva
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Modifica
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Linee guida per l'avatar</DialogTitle>
            <DialogDescription>
              Segui queste linee guida per caricare un avatar ottimale.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Per ottenere il miglior risultato, carica un'immagine che rispetti queste linee guida:
            </p>
            <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-2">
              <li>Formato: JPG, PNG o GIF</li>
              <li>Dimensione massima: 5MB</li>
              <li>Risoluzione consigliata: 400x400 pixel</li>
              <li>Forma: preferibilmente quadrata</li>
              <li>Contenuto: il viso dovrebbe essere centrato e ben visibile</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}