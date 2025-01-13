import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const emailTemplates = [
  {
    id: 'follow-up',
    name: 'Follow-up Iniziale',
    subject: 'Seguito alla nostra conversazione',
    content: 'Gentile {nome},\n\nGrazie per il tempo dedicato alla nostra conversazione...',
  },
  {
    id: 'proposal',
    name: 'Invio Proposta',
    subject: 'Proposta Commerciale',
    content: 'Gentile {nome},\n\nCome discusso, le invio la nostra proposta...',
  },
];

export function EmailTemplate({ lead }) {
  const handleSend = (template) => {
    // TODO: Implement email sending
    console.log('Sending email with template:', template);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Email</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Invia Email</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Template</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona template" />
              </SelectTrigger>
              <SelectContent>
                {emailTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Destinatario</Label>
            <Input value={lead?.email || ''} readOnly />
          </div>

          <div className="space-y-2">
            <Label>Oggetto</Label>
            <Input />
          </div>

          <div className="space-y-2">
            <Label>Contenuto</Label>
            <Textarea className="min-h-[200px]" />
          </div>

          <div className="flex justify-end space-x-2">
            <Button onClick={() => handleSend()}>Invia</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}