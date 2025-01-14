export class InteractionTrackingService {
  constructor() {
    this.interactions = new Map();
  }

  trackInteraction(contactId, interaction) {
    if (!this.interactions.has(contactId)) {
      this.interactions.set(contactId, []);
    }

    const newInteraction = {
      ...interaction,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };

    this.interactions.get(contactId).push(newInteraction);
    return newInteraction;
  }

  getInteractions(contactId, options = {}) {
    const interactions = this.interactions.get(contactId) || [];
    
    if (options.type) {
      return interactions.filter(i => i.type === options.type);
    }
    
    if (options.startDate) {
      return interactions.filter(i => 
        new Date(i.timestamp) >= new Date(options.startDate)
      );
    }
    
    return interactions;
  }

  getInteractionStats(contactId) {
    const interactions = this.getInteractions(contactId);
    
    return {
      total: interactions.length,
      byType: this.groupByType(interactions),
      lastInteraction: this.getLastInteraction(interactions),
      frequency: this.calculateFrequency(interactions)
    };
  }

  groupByType(interactions) {
    return interactions.reduce((acc, interaction) => {
      acc[interaction.type] = (acc[interaction.type] || 0) + 1;
      return acc;
    }, {});
  }

  getLastInteraction(interactions) {
    if (interactions.length === 0) return null;
    return interactions.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    )[0];
  }

  calculateFrequency(interactions) {
    if (interactions.length < 2) return 0;
    
    const timestamps = interactions.map(i => new Date(i.timestamp))
      .sort((a, b) => b - a);
    
    const totalDays = (timestamps[0] - timestamps[timestamps.length - 1]) / (1000 * 60 * 60 * 24);
    return interactions.length / totalDays;
  }
}

export const interactionTrackingService = new InteractionTrackingService();