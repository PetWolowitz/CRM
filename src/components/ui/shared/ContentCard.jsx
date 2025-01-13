import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function ContentCard({
  title,
  subtitle,
  description,
  metadata = [],
  actions = [],
  rightAction,
  onDelete,
  className = '',
}) {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {rightAction}
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}

      {metadata.length > 0 && (
        <div className="space-y-2">
          {metadata.map((item, index) => (
            <p key={index} className="text-sm flex items-center gap-2">
              <item.icon className="h-4 w-4 text-muted-foreground" />
              {item.content}
            </p>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-end items-center gap-2">
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}