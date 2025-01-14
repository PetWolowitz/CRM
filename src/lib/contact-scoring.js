import { LeadScoringModel } from './ai';

export class ContactScoringService {
  constructor() {
    this.scoringModel = new LeadScoringModel();
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      await this.scoringModel.initialize();
      this.initialized = true;
    }
  }

  calculateEngagementScore(interactions) {
    const weights = {
      email: 2,
      call: 3,
      meeting: 5,
      website_visit: 1,
      document_view: 1.5
    };

    return interactions.reduce((score, interaction) => {
      return score + (weights[interaction.type] || 0) * interaction.count;
    }, 0);
  }

  calculateProfileCompleteness(contact) {
    const requiredFields = [
      'name',
      'email',
      'phone',
      'company',
      'position',
      'industry'
    ];

    const optionalFields = [
      'website',
      'linkedin',
      'address',
      'employees',
      'revenue'
    ];

    const requiredScore = requiredFields.reduce((score, field) => {
      return score + (contact[field] ? 1 : 0);
    }, 0) / requiredFields.length * 0.7;

    const optionalScore = optionalFields.reduce((score, field) => {
      return score + (contact[field] ? 1 : 0);
    }, 0) / optionalFields.length * 0.3;

    return (requiredScore + optionalScore) * 100;
  }

  async predictConversionProbability(contact) {
    if (!this.initialized) {
      await this.initialize();
    }

    return await this.scoringModel.predict({
      engagementScore: contact.engagementScore,
      profileCompleteness: contact.profileCompleteness,
      interactionCount: contact.interactions?.length || 0,
      daysSinceLastContact: this.calculateDaysSinceLastContact(contact),
      industryScore: this.getIndustryScore(contact.industry),
      companySize: contact.employees || 0,
      budget: contact.budget || 0,
      previousPurchases: contact.previousPurchases || 0
    });
  }

  calculateDaysSinceLastContact(contact) {
    if (!contact.lastContactDate) return 999;
    const lastContact = new Date(contact.lastContactDate);
    const now = new Date();
    return Math.floor((now - lastContact) / (1000 * 60 * 60 * 24));
  }

  getIndustryScore(industry) {
    const industryScores = {
      'technology': 0.9,
      'healthcare': 0.8,
      'finance': 0.85,
      'manufacturing': 0.75,
      'retail': 0.7
    };
    return industryScores[industry?.toLowerCase()] || 0.5;
  }
}

export const contactScoringService = new ContactScoringService();