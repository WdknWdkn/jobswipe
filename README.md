# JobSwipe

JobSwipeはReactとTypeScriptで構築された、スワイプ操作による就活軸診断アプリです。

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
- **pages/**: ルーティング先となる画面コンポーネント。
  - `Landing.tsx` : トップページ。
  - `Instructions.tsx` : 診断の説明ページ。
  - `Diagnosis.tsx` : 質問をスワイプで回答するページ。
  - `Results.tsx` : 診断結果ページ。
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
