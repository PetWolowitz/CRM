import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Github, Mail, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const authSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z
    .string()
    .min(8, 'La password deve essere di almeno 8 caratteri')
    .regex(/[A-Z]/, 'La password deve contenere almeno una lettera maiuscola')
    .regex(/[a-z]/, 'La password deve contenere almeno una lettera minuscola')
    .regex(/[0-9]/, 'La password deve contenere almeno un numero')
    .regex(/[^A-Za-z0-9]/, 'La password deve contenere almeno un carattere speciale'),
});

export function Login() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data, isSignUp = false) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const result = isSignUp ? await signUp(data) : await signIn(data);
      
      if (result.error) {
        toast({
          title: "Errore",
          description: result.error.message,
          variant: "destructive",
        });
        return;
      }
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (email) => {
    toast({
      title: "Non disponibile",
      description: "La funzione di reset password non è ancora disponibile",
      variant: "destructive",
    });
    setIsResetting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Accedi al CRM</CardTitle>
          <CardDescription>
            Gestisci i tuoi contatti e le tue trattative
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isResetting ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword(e.target.email.value);
            }}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    name="email"
                    type="email"
                    placeholder="nome@esempio.it"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Invia email di reset
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setIsResetting(false)}
                >
                  Torna al login
                </Button>
              </div>
            </form>
          ) : (
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Accedi</TabsTrigger>
                <TabsTrigger value="register">Registrati</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleSubmit((data) => onSubmit(data, false))}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        {...register('email')}
                        type="email"
                        placeholder="nome@esempio.it"
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        {...register('password')}
                        type="password"
                        disabled={isSubmitting}
                        autoComplete="current-password"
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Accesso in corso...
                        </>
                      ) : (
                        'Accedi'
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleSubmit((data) => onSubmit(data, true))}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        {...register('email')}
                        type="email"
                        placeholder="nome@esempio.it"
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        {...register('password')}
                        type="password"
                        disabled={isSubmitting}
                        autoComplete="new-password"
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                      )}
                      <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                        <li>Almeno 8 caratteri</li>
                        <li>Almeno una lettera maiuscola</li>
                        <li>Almeno una lettera minuscola</li>
                        <li>Almeno un numero</li>
                        <li>Almeno un carattere speciale</li>
                      </ul>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registrazione in corso...
                        </>
                      ) : (
                        'Registrati'
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          )}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Oppure
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                toast({
                  title: "Non disponibile",
                  description: "Il login con Google non è ancora disponibile",
                  variant: "destructive",
                });
              }}
            >
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                toast({
                  title: "Non disponibile",
                  description: "Il login con GitHub non è ancora disponibile",
                  variant: "destructive",
                });
              }}
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            className="w-full"
            onClick={() => setIsResetting(true)}
          >
            Password dimenticata?
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}