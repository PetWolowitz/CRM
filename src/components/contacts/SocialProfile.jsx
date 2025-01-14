import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Twitter, ExternalLink } from 'lucide-react';

export function SocialProfile({ contact }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Profilo Social</h3>
      
      <div className="space-y-6">
        {contact.linkedInProfile && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                <h4 className="font-medium">LinkedIn</h4>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {contact.linkedInProfile.position} presso {contact.linkedInProfile.company}
              </p>
              <Badge variant="secondary">
                {contact.linkedInProfile.connections}+ collegamenti
              </Badge>
            </div>
          </div>
        )}

        {contact.twitterProfile && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                <h4 className="font-medium">Twitter</h4>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href={contact.twitter} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {contact.twitterProfile.name}
              </p>
              <Badge variant="secondary">
                {contact.twitterProfile.followers} follower
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}