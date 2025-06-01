import { Answer } from '../types';

export class EmailService {
  private endpoint: string;

  constructor() {
    this.endpoint = import.meta.env.VITE_EMAIL_API_URL || '/api/send';
  }

  async sendRegistration(name: string, email: string, answers: Answer[]): Promise<void> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, answers }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.status}`);
    }
  }
}
