export class ContactSegmentationService {
  constructor() {
    this.segments = new Map();
    this.rules = new Map();
  }

  defineSegment(segmentId, name, description, rules) {
    this.segments.set(segmentId, {
      id: segmentId,
      name,
      description,
      rules
    });
  }

  evaluateContact(contact) {
    const segments = [];
    
    for (const [segmentId, segment] of this.segments) {
      if (this.matchesSegment(contact, segment.rules)) {
        segments.push(segmentId);
      }
    }
    
    return segments;
  }

  matchesSegment(contact, rules) {
    return rules.every(rule => {
      const value = this.getNestedValue(contact, rule.field);
      
      switch (rule.operator) {
        case 'equals':
          return value === rule.value;
        case 'notEquals':
          return value !== rule.value;
        case 'contains':
          return value?.includes(rule.value);
        case 'greaterThan':
          return value > rule.value;
        case 'lessThan':
          return value < rule.value;
        case 'between':
          return value >= rule.value[0] && value <= rule.value[1];
        case 'in':
          return rule.value.includes(value);
        default:
          return false;
      }
    });
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => 
      current ? current[key] : undefined, obj
    );
  }

  // Segmenti predefiniti
  initializeDefaultSegments() {
    this.defineSegment('high-value', 'Alto Valore', 'Contatti con alto potenziale di vendita', [
      { field: 'score', operator: 'greaterThan', value: 80 }
    ]);

    this.defineSegment('engaged', 'Molto Coinvolti', 'Contatti con alto livello di engagement', [
      { field: 'engagementScore', operator: 'greaterThan', value: 50 }
    ]);

    this.defineSegment('enterprise', 'Enterprise', 'Grandi aziende', [
      { field: 'employees', operator: 'greaterThan', value: 1000 }
    ]);

    this.defineSegment('cold', 'Da Riattivare', 'Contatti inattivi da tempo', [
      { field: 'daysSinceLastContact', operator: 'greaterThan', value: 30 }
    ]);
  }
}

export const contactSegmentationService = new ContactSegmentationService();
contactSegmentationService.initializeDefaultSegments();