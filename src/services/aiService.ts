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
        return `就活軸診断結果を詳しく分析してください。

【診断結果】
${baseData.scores}

【パーソナリティタイプ】
${baseData.personalityType}

【上位カテゴリ】
${baseData.topCategories}

以下のフォーマットに従って、200-300字程度で分析を行ってください:

1. 全体的な特徴・傾向
(ここに全体的な特徴を記述)

2. 強み・特色
(ここに強みと特色を記述)

3. 注意点・バランス改善点
(ここに注意点を記述)

4. 就活での活かし方
(ここに活かし方を記述)

親しみやすく、実践的なアドバイスを心がけてください。必ず上記の番号付きリスト形式に従い、マークダウンの見出し記号(#や##など)は使わないでください。`;

      case 'smart_recommendations':
        return `以下の診断結果に基づき、具体的で実践的な推奨を行ってください。

【診断データ】
${baseData.scores}
パーソナリティ: ${baseData.personalityType}

以下の形式で回答してください:

1. おすすめ業界 (3つ)
   ・(業界名): (理由)
   ・(業界名): (理由)
   ・(業界名): (理由)

2. 適性職種 (3つ)
   ・(職種名): (理由)
   ・(職種名): (理由)
   ・(職種名): (理由)

3. 企業タイプの傾向
   ・(大手/ベンチャー/中小の適性について)

4. 避けるべき環境や注意点
   ・(注意点)

データに基づいて具体的で実用的な内容にしてください。太字での強調と箇条書きを適切に使用してください。`;

      case 'company_criteria':
        return `診断結果を基に、企業選びの評価基準を作成してください。

【価値観スコア】
${baseData.scores}

以下の形式で企業評価基準を提示してください:

1. 最重要チェックポイント (上位3項目)
   ・(項目1): (説明)
   ・(項目2): (説明)
   ・(項目3): (説明)

2. 企業研究で確認すべき具体的な質問 (5つ)
   ・(質問1)
   ・(質問2)
   ・(質問3)
   ・(質問4)
   ・(質問5)

3. 面接で聞くべき質問例 (3つ)
   ・(質問1)
   ・(質問2)
   ・(質問3)

4. 内定判断の決め手となるポイント
   ・(ポイントの説明)

実際の就活で使いやすい形で提示してください。番号付きリストと箇条書きを適切に使い、見やすさを心がけてください。`;

      default:
        throw new Error(`Unknown content type: ${contentType}`);
    }
  }

  private getSystemPrompt(contentType: AIContentType): string {
    const baseSystemPrompt = 'あなたは就活アドバイザーとしてユーザーに寄り添った回答を行います。回答はマークダウン形式で、見やすく構造化された形式で提供してください。装飾を過剰に使わず、シンプルで読みやすい形式を心がけてください。';
    
    switch (contentType) {
      case 'detailed_analysis':
        // return `${baseSystemPrompt}\n回答は見出し記号（###）は使わず、番号付きリストと太字のみで構造化してください。`;
        return `${baseSystemPrompt}\n`;
      case 'smart_recommendations':
        return `${baseSystemPrompt}\n各セクションは番号付きリストを使い、重要な見出しは太字で強調してください。箇条書きには「・」を使用してください。`;
      case 'company_criteria': 
        return `${baseSystemPrompt}\n箇条書きやリストは適切に使用し、重要ポイントは太字で強調してください。各セクションの区切りには「---」は使わないでください。`;
      default:
        return baseSystemPrompt;
    }
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
