import { Question } from '../types';

export const questions: Question[] = [
  // 給与・待遇のトレードオフ
  { id: '1', content: '高い給与のためなら週末も働くことは厭わない', category: 'salary', weight: 2 },
  { id: '11', content: '福利厚生が充実していれば、基本給が少し低くても良い', category: 'salary', weight: 2 },
  { id: '21', content: '成果給で収入が不安定になっても、頑張った分だけ稼ぎたい', category: 'salary', weight: 3 },

  // 成長・キャリアのトレードオフ  
  { id: '2', content: '安定性を犠牲にしても、急成長できる環境を選びたい', category: 'growth', weight: 3 },
  { id: '12', content: '教育制度が不十分でも、実戦で鍛えられる厳しい環境が良い', category: 'growth', weight: 3 },
  { id: '22', content: '転職前提でスキルアップするより、一社で着実にキャリアを積みたい', category: 'stability', weight: 2 },

  // ワークライフバランスのトレードオフ
  { id: '3', content: '昇進が遅くなっても、残業時間は抑えたい', category: 'worklife', weight: 2 },
  { id: '13', content: '有給を自由に取れるなら、給与が平均より低くても構わない', category: 'worklife', weight: 2 },
  { id: '23', content: '家族との時間を犠牲にしてでも、仕事で大きな成果を上げたい', category: 'growth', weight: 3 },

  // 社会貢献のトレードオフ
  { id: '4', content: '給与が低くても、社会課題の解決に取り組む仕事をしたい', category: 'social', weight: 3 },
  { id: '14', content: '社会貢献よりも、まずは自分の経済的安定を優先したい', category: 'salary', weight: 3 },
  { id: '24', content: '将来性が不透明でも、環境問題に取り組む企業で働きたい', category: 'social', weight: 2 },

  // 安定性のトレードオフ
  { id: '5', content: '大手企業の安定性より、ベンチャーでの挑戦を選ぶ', category: 'challenge', weight: 2 },
  { id: '15', content: '親の反対があっても、自分がやりたい不安定な業界を選ぶ', category: 'challenge', weight: 2 },
  { id: '25', content: '業界の将来性より、現在の企業の安定性を重視する', category: 'stability', weight: 3 },

  // チャレンジ・革新性のトレードオフ
  { id: '6', content: '失敗のリスクが高くても、新しい技術や仕組みに挑戦したい', category: 'challenge', weight: 3 },
  { id: '16', content: '周囲に理解されなくても、革新的なアイデアを追求したい', category: 'challenge', weight: 3 },
  { id: '26', content: '安定した業務より、常に変化のある刺激的な環境を選ぶ', category: 'challenge', weight: 2 },

  // 人間関係・チームワークのトレードオフ
  { id: '7', content: '人間関係が悪くても、自分のスキルアップを最優先にしたい', category: 'skill', weight: 2 },
  { id: '17', content: '個人の成果より、チーム全体の成功を重視したい', category: 'relationship', weight: 2 },
  { id: '27', content: '競争が激しい職場でも、切磋琢磨できる環境の方が良い', category: 'growth', weight: 3 },

  // 企業文化・理念のトレードオフ
  { id: '8', content: '企業理念が素晴らしくても、労働条件が悪ければ転職する', category: 'worklife', weight: 3 },
  { id: '18', content: '社風が合わなくても、有名企業で働くことを優先したい', category: 'stability', weight: 3 },
  { id: '28', content: '知名度が低くても、価値観が合う企業を選びたい', category: 'culture', weight: 2 },

  // 勤務地・働き方のトレードオフ
  { id: '9', content: '希望しない地方勤務でも、キャリアアップできるなら受け入れる', category: 'growth', weight: 2 },
  { id: '19', content: '転勤が多くても、全国規模で事業展開する企業で働きたい', category: 'growth', weight: 2 },
  { id: '29', content: '通勤時間が長くても、オフィスでの対面コミュニケーションを重視する', category: 'relationship', weight: 3 },

  // 専門性・スキルのトレードオフ
  { id: '10', content: '一つの分野を極めるより、幅広いスキルを身につけたい', category: 'growth', weight: 3 },
  { id: '20', content: '好きでない分野でも、将来性があれば専門性を磨きたい', category: 'skill', weight: 2 },
  { id: '30', content: '資格取得より、実務経験を積むことを優先したい', category: 'skill', weight: 2 },
];