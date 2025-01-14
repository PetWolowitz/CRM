import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadScoring } from './LeadScoring';
import { Segmentation } from './Segmentation';
import { InteractionTimeline } from './InteractionTimeline';
import { SocialProfile } from './SocialProfile';

export function ContactDetails({ contact }) {
  return (
    <Tabs defaultValue="scoring" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="scoring">Scoring</TabsTrigger>
        <TabsTrigger value="segments">Segmenti</TabsTrigger>
        <TabsTrigger value="interactions">Interazioni</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="scoring">
          <LeadScoring contact={contact} />
        </TabsContent>

        <TabsContent value="segments">
          <Segmentation segments={contact.segments} />
        </TabsContent>

        <TabsContent value="interactions">
          <InteractionTimeline interactions={contact.interactions} />
        </TabsContent>

        <TabsContent value="social">
          <SocialProfile contact={contact} />
        </TabsContent>
      </div>
    </Tabs>
  );
}