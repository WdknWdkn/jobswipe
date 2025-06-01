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

## 環境変数

開発時には `.env.local` を作成し、以下の値を設定してください。

```
VITE_OPENAI_API_KEY=your_api_key_here
VITE_AI_PROVIDER=openai
VITE_AI_MODEL=gpt-4o-mini
VITE_ENABLE_AI_FEATURES=true
VITE_EMAIL_API_URL=https://example.com/api/send
```

`VITE_EMAIL_API_URL` は登録情報を送信するメール送信APIのエンドポイントを指します。

## メール送信サーバー

プロジェクト内には簡易的なメール送信APIが含まれています。以下の手順で起動できます。

1. ルートに `.env.server` を作成し、SMTP設定を記入します。
   ```
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your@example.com
   SMTP_PASS=yourpassword
   SMTP_FROM=your@example.com
   PORT=3000
   ```
2. サーバーを起動します。
   ```bash
   npm run server:start
   ```
3. デフォルトでは `http://localhost:3000/send` でメール送信エンドポイントが利用できます。

フロントエンド側の `VITE_EMAIL_API_URL` をこのエンドポイントに合わせて設定してください。

### メール送信機能の運用方法

#### 開発環境での運用

1. 開発中はターミナルを2つ使用し、フロントエンドとメールサーバーを別々に起動します：
   ```bash
   # ターミナル1: フロントエンド
   npm run dev
   
   # ターミナル2: メールサーバー
   npm run server:start
   ```

2. テスト用SMTPサーバーの利用:
   - 開発中は [Mailtrap](https://mailtrap.io/) や [Ethereal Email](https://ethereal.email/) などのテスト用SMTPサービスの使用を推奨します
   - これらのサービスではメール送信をシミュレートし、実際のアドレスにメールは配信されません

3. トラブルシューティング:
   - `npm run server:start`でエラーが発生する場合は、プロジェクトルートディレクトリにいることを確認してください
   - package.jsonに`server:start`スクリプトが定義されていない場合は、以下を追加してください:
     ```json
     "scripts": {
       // 他のスクリプト
       "server:start": "ts-node server/index.ts"
     }
     ```
   - ts-nodeがインストールされていない場合は以下のコマンドでインストールします:
     ```bash
     npm install -D ts-node
     ```
   - 必要な依存関係が不足している場合は以下をインストールします:
     ```bash
     npm install express nodemailer dotenv
     npm install -D @types/express @types/nodemailer
     ```

#### 本番環境での運用

1. サーバー設定:
   - 本番環境では `.env.server.production` を作成し、適切なSMTP設定を行います
   - セキュリティのため、`SMTP_PASS` は環境変数として直接設定することも検討してください

2. プロセス管理:
   - 本番環境では [PM2](https://pm2.keymetrics.io/) などのプロセス管理ツールを使用してサーバーを実行します
   ```bash
   # PM2のインストール
   npm install -g pm2
   
   # メールサーバーの起動
   pm2 start server/index.ts --name "mail-server" -- --interpreter node_modules/.bin/ts-node
   
   # 起動時に自動実行するよう設定
   pm2 startup
   pm2 save
   ```

3. エラーハンドリング:
   - ログ監視を設定し、メール送信エラーを追跡してください
   - クリティカルなメール送信の失敗時には管理者に通知される仕組みを検討します

4. セキュリティ設定:
   - 本番環境ではプロキシ（Nginx/Apacheなど）の背後にメールサーバーを配置し、直接外部からアクセスできないようにします
   - CORS設定を適切に行い、信頼できるドメインからのリクエストのみを許可します
   ```javascript
   // server/index.tsに追加
   import cors from 'cors';
   
   // CORSミドルウェアを設定
   app.use(cors({
     origin: process.env.ALLOWED_ORIGIN || 'https://yourdomain.com',
     methods: ['POST']
   }));
   ```

5. 監視と保守:
   - 定期的にログを確認し、送信エラーやパフォーマンス問題を検出します
   - SMTP認証情報の定期的な更新を行います

#### API仕様

メール送信APIは以下のJSONリクエストを受け付けます:

```json
POST /send
{
  "to": "recipient@example.com",
  "subject": "メールの件名",
  "text": "メール本文"
}
```

成功時のレスポンス:
```json
{
  "success": true
}
```

エラー時のレスポンス:
```json
{
  "error": "エラーメッセージ"
}
```

#### パフォーマンス考慮事項

1. 大量のメール送信が予想される場合:
   - キューシステム（Bull, Kueなど）の導入を検討
   - メール送信のバッチ処理化を検討

2. 高可用性:
   - 複数のSMTPプロバイダのフォールバック設定
   - メール送信失敗時の自動リトライ機能の実装
