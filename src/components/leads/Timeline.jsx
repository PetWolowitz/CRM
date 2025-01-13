import { Card } from '@/components/ui/card';
import { Calendar, Mail, MessageSquare, ArrowRight } from 'lucide-react';

const getActivityIcon = (type) => {
  switch (type) {
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'note':
      return <MessageSquare className="h-4 w-4" />;
    case 'status':
      return <ArrowRight className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

export function Timeline({ activities }) {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}