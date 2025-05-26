// Utility functions to generate evaluation prompts based on diagnosis results
import { DiagnosisResult, CategoryType, CategoryInfo, ValueCriterion, EvaluationPrompt } from '../types';

export const categoryInfoMap: Record<CategoryType, CategoryInfo> = {
  salary: {
    category: 'salary',
    name: '給与・待遇',
    description: '給与水準、福利厚生、昇給制度など経済的な待遇',
    icon: '💰',
    keywords: ['給与', '年収', '福利厚生', '賞与', '昇給', '手当', '退職金'],
    tradeoffPartners: ['worklife'],
  },
  growth: {
    category: 'growth',
    name: '成長・キャリア',
    description: '成長機会やキャリアアップの可能性',
    icon: '📈',
    keywords: ['研修', 'キャリア', '成長', '昇進', '教育'],
    tradeoffPartners: ['stability', 'worklife'],
  },
  worklife: {
    category: 'worklife',
    name: 'ワークライフバランス',
    description: '残業時間や休暇制度など仕事と生活の調和',
    icon: '🏖️',
    keywords: ['休暇', '残業', '有給', '時短', 'リモート'],
    tradeoffPartners: ['salary', 'growth', 'challenge'],
  },
  social: {
    category: 'social',
    name: '社会貢献',
    description: '社会課題への取り組みや倫理性',
    icon: '🌍',
    keywords: ['社会貢献', 'SDGs', '環境', 'ボランティア'],
    tradeoffPartners: ['salary', 'stability'],
  },
  stability: {
    category: 'stability',
    name: '安定性',
    description: '企業の安定性や雇用の継続性',
    icon: '🏢',
    keywords: ['上場', '経営', '雇用', '長期'],
    tradeoffPartners: ['growth', 'challenge'],
  },
  challenge: {
    category: 'challenge',
    name: 'チャレンジ・革新性',
    description: '新規事業や挑戦を歓迎する風土',
    icon: '🚀',
    keywords: ['スタートアップ', 'イノベーション', '挑戦', '変化'],
    tradeoffPartners: ['stability', 'worklife', 'relationship'],
  },
  relationship: {
    category: 'relationship',
    name: '人間関係・チームワーク',
    description: '社内の人間関係やチームワーク',
    icon: '🤝',
    keywords: ['チーム', '人間関係', '上司', '同僚'],
    tradeoffPartners: ['challenge', 'skill'],
  },
  culture: {
    category: 'culture',
    name: '企業文化・理念',
    description: '企業理念やカルチャーフィット',
    icon: '🏆',
    keywords: ['理念', '文化', 'ミッション', 'ビジョン'],
    tradeoffPartners: ['salary', 'location'],
  },
  location: {
    category: 'location',
    name: '勤務地・働き方',
    description: '勤務地やリモート可否など働く場所の条件',
    icon: '📍',
    keywords: ['勤務地', '転勤', 'リモート', '在宅', '地域'],
    tradeoffPartners: ['growth', 'culture'],
  },
  skill: {
    category: 'skill',
    name: '専門性・スキル',
    description: '専門性の活用度やスキル向上',
    icon: '🛠️',
    keywords: ['専門', 'スキル', '資格', '技術'],
    tradeoffPartners: ['relationship', 'growth'],
  },
};

const generateTradeoffInfo = (score: { category: CategoryType; percentage: number }, all: { category: CategoryType; percentage: number }[]): string[] | undefined => {
  const partners = categoryInfoMap[score.category].tradeoffPartners;
  if (!partners || partners.length === 0) return undefined;
  const conflicts = all.filter(s => partners.includes(s.category) && s.percentage >= 50);
  if (conflicts.length === 0) return undefined;
  return conflicts.map(c => `${categoryInfoMap[c.category].name}(${c.percentage}%)`);
};

export const generateValueCriteria = (result: DiagnosisResult): ValueCriterion[] => {
  return result.scores.map(score => {
    const categoryInfo = categoryInfoMap[score.category];
    let importance: 'high' | 'medium' | 'low';
    if (score.percentage >= 70) importance = 'high';
    else if (score.percentage >= 40) importance = 'medium';
    else importance = 'low';
    const tradeoffs = generateTradeoffInfo(score, result.scores);
    return {
      category: score.category,
      categoryName: categoryInfo.name,
      importance,
      score: score.score,
      percentage: score.percentage,
      description: categoryInfo.description,
      tradeoffs,
    };
  });
};

export const generateEvaluationPrompt = (result: DiagnosisResult): EvaluationPrompt => {
  const valueCriteria = generateValueCriteria(result);
  const sortedCriteria = valueCriteria.sort((a, b) => {
    const importanceOrder = { high: 3, medium: 2, low: 1 } as const;
    return importanceOrder[b.importance] - importanceOrder[a.importance];
  });

  const prompt = `# 企業評価プロンプト（就活軸診断結果より生成）

## あなたの就活軸分析結果
**パーソナリティタイプ**: ${result.personalityType}

### 【最重要項目】
${sortedCriteria
    .filter(c => c.importance === 'high')
    .map(criterion => `- **${criterion.categoryName}** (${criterion.percentage}%): ${criterion.description}${criterion.tradeoffs?.length ? `\n  ⚠️ トレードオフ: ${criterion.tradeoffs.join('、')}` : ''}`)
    .join('\n')}

### 【重要項目】  
${sortedCriteria
    .filter(c => c.importance === 'medium')
    .map(criterion => `- **${criterion.categoryName}** (${criterion.percentage}%): ${criterion.description}`)
    .join('\n')}

## 企業情報
**企業情報**: [ここに評価したい企業の情報を貼り付けてください]
（求人票、企業HP、説明会資料など）

## 評価基準と形式

以下の表形式で、各価値基準について企業を評価してください：

| 価値基準 | 重要度 | 評価 | 評価理由 | トレードオフ考慮 |
|---------|--------|------|----------|----------------|
${sortedCriteria
    .filter(c => c.importance !== 'low')
    .map(
      criterion =>
        `| ${criterion.categoryName} | ${criterion.importance === 'high' ? '◎最重要' : '○重要'} | [○/△/×] | [具体的理由] | ${
          criterion.tradeoffs?.length ? '[影響する要素があれば記載]' : '－'
        } |`
    )
    .join('\n')}

### 評価基準詳細
- **○ (適合)**: この企業はこの価値基準を十分に満たしている
- **△ (部分適合)**: この企業はこの価値基準を部分的に満たしている  
- **× (不適合)**: この企業はこの価値基準を満たしていない、または情報不足

## 総合判定

### 適合度スコア
**総合適合度**: [★★★★★ / ★★★★☆ / ★★★☆☆ / ★★☆☆☆ / ★☆☆☆☆]

### 総合評価コメント
[あなたの価値基準と企業特徴を踏まえた総合判断を記載]

### 推奨アクション
- **応募判断**: [応募推奨度と理由]
- **確認事項**: [面接・説明会で質問すべき具体的項目]
- **注意点**: [入社前に調査・覚悟すべき点]

### トレードオフ分析
[重視する価値基準間でのトレードオフがある場合の分析]

---
*このプロンプトは JobSwipe 就活軸診断結果 (${new Date().toLocaleDateString('ja-JP')}) を基に生成されました*`;

  return {
    valueCriteria: sortedCriteria,
    prompt,
    generatedAt: new Date(),
    promptType: 'detailed',
  };
};

export const generateSimplePrompt = (result: DiagnosisResult): EvaluationPrompt => {
  const valueCriteria = generateValueCriteria(result);
  const topCriteria = valueCriteria
    .filter(c => c.importance === 'high')
    .map(c => `${c.categoryName}(${c.percentage}%)`)
    .join('、');

  const prompt = `# 企業評価（簡易版）

あなたの就活軸診断結果：**${result.personalityType}**

## 重要な価値基準
${topCriteria}

## 評価依頼
**企業情報**: [ここに企業情報を貼り付け]

上記の価値基準について、この企業を○△×で評価し、それぞれ理由も教えてください。
最後に5段階で総合適合度も判定してください。`;

  return {
    valueCriteria,
    prompt,
    generatedAt: new Date(),
    promptType: 'simple',
  };
};
