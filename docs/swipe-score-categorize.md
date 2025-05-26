# スワイプ→スコアリング→カテゴライズの仕様

このドキュメントでは、JobSwipe アプリにおける質問スワイプからスコア算出、結果カテゴライズまでの流れを解説します。

## フロー概要
1. **スワイプ (回答入力)**
   - `/diagnosis` ページで `SwipeCard` コンポーネントが表示されます。
   - 左右へのスワイプ操作で **YES/NO** を選択します。
   - `Diagnosis.tsx` 内の `handleSwipe` 関数で回答が `answers` 配列に追加されます。
   - 全ての質問に回答すると `/results` へ遷移し、回答情報を状態として渡します。
2. **スコアリング**
   - `utils/scoring.ts` の `calculateCategoryScores` 関数で回答を処理します。
   - 各質問は `questions.ts` で `category` と `weight` を持ちます。
   - カテゴリごとに以下を計算します。
     - そのカテゴリの質問の **合計 weight**
     - YES と回答した質問の **weight 合計**
   - (YES の weight 合計 / 総 weight) × 100 をパーセンテージとして算出します。
3. **カテゴライズ**
   - `utils/diagnostics.ts` の `calculateScores` でスコアをもとに以下を決定します。
     - 各カテゴリのスコアをパーセンテージ順に並び替え、上位 3 つを `topCategories` とする。
     - 最上位カテゴリから `personalityType` を決定する (`personalityMap`)。
     - `topCategories` を用いて `recommendations` を生成する。
   - `Results.tsx` で `ResultChart` とともにこれらの情報を表示します。

## 主な関連ファイル
- `src/pages/Diagnosis.tsx` – スワイプ操作のロジック。
- `src/utils/scoring.ts` – カテゴリスコア計算ロジック。
- `src/utils/diagnostics.ts` – スコアからタイプや推薦を決定。
- `src/data/questions.ts` – 質問データとカテゴリ定義。
- `src/data/recommendations.ts` – 各カテゴリへのおすすめ情報。

