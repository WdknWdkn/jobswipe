import { CategoryType } from '../types';

export interface Recommendation {
  industry: string;
  pros: string[];
  cons: string[];
  requiredTradeoffs: string[];
}

export const recommendations: Record<CategoryType, Recommendation[]> = {
  salary: [
    {
      industry: '投資銀行・金融',
      pros: ['業界トップクラスの高収入'],
      cons: ['長時間労働が常態化'],
      requiredTradeoffs: ['ワークライフバランスを犠牲にした高収入'],
    },
  ],
  growth: [
    {
      industry: 'コンサルティング',
      pros: ['急成長環境でスキルを磨ける'],
      cons: ['激務になりがち'],
      requiredTradeoffs: ['プライベートを犠牲にした成長'],
    },
  ],
  worklife: [
    {
      industry: '公務員',
      pros: ['安定した勤務時間'],
      cons: ['給与水準が低め'],
      requiredTradeoffs: ['高収入を諦める'],
    },
  ],
  social: [
    {
      industry: 'NPO',
      pros: ['社会への貢献度が高い'],
      cons: ['報酬が低い'],
      requiredTradeoffs: ['経済的報酬よりも社会貢献を優先'],
    },
  ],
  stability: [
    {
      industry: 'インフラ',
      pros: ['景気に左右されにくい'],
      cons: ['変化が少ない'],
      requiredTradeoffs: ['チャレンジより安定を優先'],
    },
  ],
  challenge: [
    {
      industry: 'スタートアップ',
      pros: ['大きな裁量がある'],
      cons: ['雇用リスクが高い'],
      requiredTradeoffs: ['安定性を犠牲にして挑戦'],
    },
  ],
  relationship: [
    {
      industry: '人材',
      pros: ['チームワークを重視'],
      cons: ['人間関係のストレスが大きい'],
      requiredTradeoffs: ['個人プレーより協調を優先'],
    },
  ],
  culture: [
    {
      industry: '外資',
      pros: ['自由な社風'],
      cons: ['成果主義が強い'],
      requiredTradeoffs: ['合わない場合の離職リスク'],
    },
  ],
  location: [
    {
      industry: '地方企業',
      pros: ['地域密着で働ける'],
      cons: ['選択肢が限られる'],
      requiredTradeoffs: ['都市部でのキャリア機会を減らす'],
    },
  ],
  skill: [
    {
      industry: '専門職',
      pros: ['専門性を高められる'],
      cons: ['他分野へ転身しにくい'],
      requiredTradeoffs: ['汎用性より専門性を優先'],
    },
  ],
};
