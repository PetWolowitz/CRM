import { io } from 'socket.io-client';

class RealtimeService {
  constructor() {
    this.socket = null;
    this.handlers = new Map();
  }

  connect(url, token) {
    this.socket = io(url, {
      auth: { token },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('Connected to realtime service');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from realtime service');
    });

    // Eventi standard
    this.setupStandardEvents();
  }

  setupStandardEvents() {
    // Notifiche
    this.socket.on('notification', (data) => {
      this.triggerHandlers('notification', data);
    });

    // Aggiornamenti lead
    this.socket.on('lead:update', (data) => {
      this.triggerHandlers('lead:update', data);
    });

    // Aggiornamenti deal
    this.socket.on('deal:update', (data) => {
      this.triggerHandlers('deal:update', data);
    });

    // Chat
    this.socket.on('chat:message', (data) => {
      this.triggerHandlers('chat:message', data);
    });
  }

  subscribe(event, handler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event).add(handler);
  }

  unsubscribe(event, handler) {
    if (this.handlers.has(event)) {
      this.handlers.get(event).delete(handler);
    }
  }

  triggerHandlers(event, data) {
    if (this.handlers.has(event)) {
      this.handlers.get(event).forEach(handler => handler(data));
    }
  }

  // Metodi per l'invio di eventi
  sendChatMessage(message) {
    this.socket.emit('chat:send', message);
  }

  updateDealStatus(dealId, status) {
    this.socket.emit('deal:status', { dealId, status });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const realtimeService = new RealtimeService();