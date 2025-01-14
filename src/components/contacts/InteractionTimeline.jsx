import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, MessageSquare, Globe } from 'lucide-react';

const interactionIcons = {
  'email': Mail,
  'call': Phone,
  'meeting': Calendar,
  'note': MessageSquare,
  'website_visit': Globe,
};

const interactionColors = {
  'email': 'bg-blue-500/10 text-blue-500',
  'call': 'bg-green-500/10 text-green-500',
  'meeting': 'bg-purple-500/10 text-purple-500',
  'note': 'bg-orange-500/10 text-orange-500',
  'website_visit': 'bg-gray-500/10 text-gray-500',
};

export function InteractionTimeline({ interactions }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Cronologia Interazioni</h3>
      
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
        
        <div className="space-y-6">
          {interactions.map((interaction, index) => {
            const Icon = interactionIcons[interaction.type];
            return (
              <div key={index} className="relative pl-10">
                <div className={`absolute left-0 p-2 rounded-lg ${interactionColors[interaction.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="bg-card rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{interaction.title}</h4>
                    <Badge variant="secondary">
                      {new Date(interaction.timestamp).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {interaction.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}