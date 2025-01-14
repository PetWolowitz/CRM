import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, DollarSign } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function LeadDialog({ lead, onSave, trigger }) {
  const [formData, setFormData] = useState(lead || {
    title: '',
    value: '',
    nextAction: new Date(),
    description: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{lead ? 'Modifica Lead' : 'Nuovo Lead'}</DialogTitle>
          <DialogDescription>
            {lead ? 'Modifica i dettagli del lead esistente.' : 'Inserisci i dettagli del nuovo lead.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rest of the form content remains the same */}
        </form>
      </DialogContent>
    </Dialog>
  );
}