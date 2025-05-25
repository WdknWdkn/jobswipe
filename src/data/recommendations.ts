import { CategoryType } from '../types';

export const recommendations: Record<CategoryType, string[]> = {
  salary: ['金融', '商社'],
  growth: ['IT', 'コンサル'],
  worklife: ['公務員', '大手企業'],
  social: ['NPO', '教育'],
  stability: ['インフラ', '製薬'],
  challenge: ['スタートアップ', 'R&D'],
  relationship: ['サービス業', '人材'],
  culture: ['ベンチャー', '外資'],
  location: ['リモートワーク', '地方企業'],
  skill: ['専門職', '技術職'],
};
