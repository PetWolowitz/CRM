import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Building2, Clock } from 'lucide-react';

const segmentIcons = {
  'high-value': Target,
  'engaged': Users,
  'enterprise': Building2,
  'cold': Clock,
};

const segmentColors = {
  'high-value': 'bg-green-500/10 text-green-500',
  'engaged': 'bg-blue-500/10 text-blue-500',
  'enterprise': 'bg-purple-500/10 text-purple-500',
  'cold': 'bg-orange-500/10 text-orange-500',
};

export function Segmentation({ segments }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Segmentazione</h3>
      
      <div className="grid gap-4">
        {segments.map(segment => {
          const Icon = segmentIcons[segment.id];
          return (
            <div
              key={segment.id}
              className="flex items-center gap-4 p-4 rounded-lg border"
            >
              <div className={`p-2 rounded-lg ${segmentColors[segment.id]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">{segment.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {segment.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}