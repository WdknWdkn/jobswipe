import { AIAnalysisRequest, AIGeneratedContent, AIContentType } from '../types/ai';

export class AIService {
  private apiKey: string;
  private baseURL: string;
  private model: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.baseURL = 'https://api.openai.com/v1';
    this.model = import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini';
  }

  async generateContent(
    request: AIAnalysisRequest,
    contentType: AIContentType
  ): Promise<AIGeneratedContent> {
    const prompt = this.buildPrompt(request, contentType);

    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(contentType),
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API Error: ${response.status}`);
    }

    const data = await response.json();
    return this.formatResponse(data, contentType);
  }

  private buildPrompt(request: AIAnalysisRequest, contentType: AIContentType): string {
    const baseData = {
      scores: request.scores.map(s => `${s.category}: ${s.percentage}%`).join('\n'),
      personalityType: request.personalityType,
      topCategories: request.topCategories.join(', '),
    };

    switch (contentType) {
      case 'detailed_analysis':
        return `\n就活軸診断結果を詳しく分析してください。\n\n【診断結果】\n${baseData.scores}\n\n【パーソナリティタイプ】\n${baseData.personalityType}\n\n【上位カテゴリ】\n${baseData.topCategories}\n\n以下の形式で200-300字程度で分析してください：\n1. 全体的な特徴・傾向\n2. 強み・特色\n3. 注意点・バランス改善点\n4. 就活での活かし方\n\n親しみやすく、実践的なアドバイスを心がけてください。\n        `;
      case 'smart_recommendations':
        return `\n以下の診断結果に基づき、具体的で実践的な推奨を行ってください。\n\n【診断データ】\n${baseData.scores}\nパーソナリティ: ${baseData.personalityType}\n\n以下を含めて推奨してください：\n1. おすすめ業界（3つ、理由付き）\n2. 適性職種（3つ、具体的な職種名と理由）\n3. 企業タイプの傾向（大手/ベンチャー/中小の適性）\n4. 避けるべき環境や注意点\n\nデータに基づいて具体的で実用的な内容にしてください。\n        `;
      case 'company_criteria':
        return `\n診断結果を基に、企業選びの評価基準を作成してください。\n\n【価値観スコア】\n${baseData.scores}\n\n以下を含めて企業評価基準を提示してください：\n1. 最重要チェックポイント（上位3項目）\n2. 企業研究で確認すべき具体的な質問（5つ）\n3. 面接で聞くべき質問例（3つ）\n4. 内定判断の決め手となるポイント\n\n実際の就活で使いやすい形で提示してください。\n        `;
      default:
        throw new Error(`Unknown content type: ${contentType}`);
    }
  }

  // Fallback system prompt
  private getSystemPrompt(contentType: AIContentType): string {
    return 'あなたは就活アドバイザーとしてユーザーに寄り添った回答を行います。';
  }

  private formatResponse(data: any, type: AIContentType): AIGeneratedContent {
    const content = data.choices?.[0]?.message?.content ?? '';
    return {
      id: crypto.randomUUID(),
      type,
      content,
      metadata: {
        confidence: 90,
        generatedAt: Date.now(),
        tokensUsed: data.usage?.total_tokens ?? 0,
        model: this.model,
      },
      sections: [
        {
          title: '',
          content,
          type: 'text',
          priority: 1,
        },
      ],
    };
  }
}
