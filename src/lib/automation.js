export class AutomationService {
  constructor() {
    this.rules = new Map();
    this.actions = new Map();
  }

  // Gestione Regole
  addRule(rule) {
    this.validateRule(rule);
    this.rules.set(rule.id, rule);
  }

  removeRule(ruleId) {
    this.rules.delete(ruleId);
  }

  // Gestione Azioni
  registerAction(actionType, handler) {
    this.actions.set(actionType, handler);
  }

  // Esecuzione Automazioni
  async processEvent(event) {
    const applicableRules = this.findApplicableRules(event);
    for (const rule of applicableRules) {
      await this.executeRule(rule, event);
    }
  }

  async executeRule(rule, event) {
    if (this.evaluateConditions(rule.conditions, event)) {
      for (const action of rule.actions) {
        await this.executeAction(action, event);
      }
    }
  }

  // Helpers
  validateRule(rule) {
    if (!rule.id || !rule.conditions || !rule.actions) {
      throw new Error('Invalid rule format');
    }
  }

  findApplicableRules(event) {
    return Array.from(this.rules.values())
      .filter(rule => rule.eventType === event.type);
  }

  evaluateConditions(conditions, event) {
    // Implementazione valutazione condizioni
    return true;
  }

  async executeAction(action, event) {
    const handler = this.actions.get(action.type);
    if (handler) {
      await handler(action.params, event);
    }
  }
}

// Predefined Actions
export const automationActions = {
  // Email Actions
  sendEmail: async (params, event) => {
    // Implementazione invio email
  },

  // Task Actions
  createTask: async (params, event) => {
    // Implementazione creazione task
  },

  // Notification Actions
  sendNotification: async (params, event) => {
    // Implementazione invio notifica
  },

  // Deal Actions
  updateDealStage: async (params, event) => {
    // Implementazione aggiornamento stato deal
  },

  // Lead Actions
  updateLeadScore: async (params, event) => {
    // Implementazione aggiornamento score lead
  }
};

export const automationService = new AutomationService();

// Register default actions
Object.entries(automationActions).forEach(([type, handler]) => {
  automationService.registerAction(type, handler);
});