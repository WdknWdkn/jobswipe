# JobSwipe

JobSwipeはReactとTypeScriptで構築された、スワイプ操作による就活軸診断アプリです。

## 機能概要

1. 約30問の質問を左右にスワイプして回答します。
2. 回答結果をもとに10カテゴリのスコアを算出し、バランスをレーダーチャートで表示します。
3. スコア上位5カテゴリからパーソナリティタイプを決定し、業界別のおすすめ情報を提示します。
4. 結果はTwitter・LINE・Facebookで共有できます。
5. 診断結果からAI向けの企業評価プロンプトを生成し、コピーやダウンロードが可能です。
6. スワイプ完了後に名前とメールアドレスを送信すると、AIによる詳細診断が生成されます。

### 診断ロジック

質問ごとにカテゴリと1～3の重みを設定しています。`utils/scoring.ts` でYes回答の重み合計から
カテゴリスコア(0～100%)を計算し、給与とワークライフバランスなどのトレードオフを考慮して調整します。
`utils/diagnostics.ts` ではスコアを降順に並べ、最上位カテゴリからパーソナリティタイプを決定、
上位5カテゴリに対応する業界推薦を返します。

`scoring.ts` ではカテゴリ間のトレードオフを定義し、肯定回答によって相反するカテゴリへ15%のペナルティを与える仕組みを導入しています。また `promptGenerator.ts` を利用すると、診断結果から企業評価に使えるプロンプトを自動生成できます。

カテゴリは次の10種類です。

- 給与・待遇
- 成長・キャリア
- ワークライフバランス
- 社会貢献
- 安定性
- チャレンジ・革新性
- 人間関係・チームワーク
- 企業文化・理念
- 勤務地・働き方
- 専門性・スキル

## ディレクトリ構成

```
jobswipe/
├── index.html              # アプリのエントリ HTML
├── package.json            # 依存パッケージと npm スクリプト
├── vite.config.ts          # Vite の設定
├── tailwind.config.js      # Tailwind CSS の設定
├── tsconfig.json           # TypeScript の設定
├── jest.config.js          # Jest の設定
├── src/                    # アプリケーション本体
│   ├── App.tsx             # ルーティングを定義
│   ├── main.tsx            # ReactDOM のエントリ
│   ├── index.css           # 全体スタイル (Tailwind)
│   ├── components/         # 共通コンポーネント
│   ├── pages/              # 各画面コンポーネント
│   ├── data/               # 診断に使用するデータ
│   ├── context/            # React Context 定義
│   ├── utils/              # 計算ロジック等のユーティリティ
│   ├── types/              # TypeScript 型定義
│   └── __tests__/          # テストコード
```

## 各ファイル概要

### ルートディレクトリ
- **index.html**: シングルページアプリケーションのベースとなる HTML。
- **package.json**: 依存ライブラリと `npm run` スクリプトを管理。
- **vite.config.ts**: ビルドツール Vite の設定ファイル。
- **tailwind.config.js**: Tailwind CSS の設定。
- **tsconfig.json**: TypeScript のコンパイル設定。
- **jest.config.js**: テストランナー Jest の設定。
- **src/**: アプリケーションのソースコードを格納するディレクトリ。

### src ディレクトリ
- **App.tsx**: `react-router-dom` を用いたページルーティングを定義。
- **main.tsx**: ルート要素へのアプリのマウント処理を行うエントリポイント。
- **index.css**: Tailwind のベース・コンポーネント・ユーティリティを読み込むスタイル。
- **components/**: レイアウトや UI 部品など再利用可能なコンポーネント群。
  - `Layout/Layout.tsx` : 画面全体のレイアウトを提供。
  - `ProgressBar/ProgressBar.tsx` : 診断の進捗バーを表示。
  - `ResultChart/ResultChart.tsx` : 診断結果をレーダーチャートで描画。
  - `ShareButton/ShareButton.tsx` : 結果共有ボタン。
  - `SwipeCard/` : スワイプ操作用カードコンポーネント。
  - `CompanyEvaluator/CompanyEvaluator.tsx` : 企業評価用プロンプト生成機能。
  - `PromptDisplay/PromptDisplay.tsx` : 生成したプロンプトの表示・コピー。
- **pages/**: ルーティング先となる画面コンポーネント。
  - `Landing.tsx` : トップページ。
  - `Instructions.tsx` : 診断の説明ページ。
  - `Diagnosis.tsx` : 質問をスワイプで回答するページ。
  - `Results.tsx` : 診断結果ページ。企業評価プロンプト生成機能もここに実装。
- **data/**: 診断項目やカテゴリ名などの静的データ。
- **context/**: 診断結果をアプリ全体で共有するための React Context。
- **utils/**: 点数計算やストレージ操作などの補助関数。
- **types/**: アプリで利用する TypeScript 型定義。
- **__tests__/**: Jest によるテストコード。

## 開発環境構築

1. Node.js (推奨バージョン 16 以上) をインストールします。
2. リポジトリをクローン後、依存関係をインストールします。

```bash
npm install
```

3. 開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスして動作を確認できます。

4. テスト実行

```bash
npm test
```

5. ビルド

```bash
npm run build
```

生成物は `dist/` フォルダに出力されます。
