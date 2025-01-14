import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gauge, Target, Users, Clock, Building } from 'lucide-react';

export function LeadScoring({ contact }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Lead Scoring</h3>
        <Badge variant={contact.score > 70 ? "success" : "warning"}>
          {contact.score} punti
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Probabilità di conversione</span>
            <span className="font-medium">{contact.conversionProbability}%</span>
          </div>
          <Progress value={contact.conversionProbability} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              <span>Engagement Score</span>
            </div>
            <p className="text-2xl font-semibold">{contact.engagementScore}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Completezza Profilo</span>
            </div>
            <p className="text-2xl font-semibold">{contact.profileCompleteness}%</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Ultimo Contatto</span>
            </div>
            <p className="text-2xl font-semibold">{contact.daysSinceLastContact}g</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>Industry Score</span>
            </div>
            <p className="text-2xl font-semibold">{contact.industryScore * 100}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}