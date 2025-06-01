import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// 質問データを模擬的に定義
const questionMap: Record<string, string> = {
  '1': '高い給与のためなら週末も働くことは厭わない',
  '2': '安定性を犠牲にしても、急成長できる環境を選びたい',
  '3': '昇進が遅くなっても、残業時間は抑えたい',
  '4': '給与が低くても、社会課題の解決に取り組む仕事をしたい',
  '5': '大手企業の安定性より、ベンチャーでの挑戦を選ぶ',
  '6': '失敗のリスクが高くても、新しい技術や仕組みに挑戦したい',
  '7': '人間関係が悪くても、自分のスキルアップを最優先にしたい',
  '8': '企業理念が素晴らしくても、労働条件が悪ければ転職する',
  '9': '希望しない地方勤務でも、キャリアアップできるなら受け入れる',
  '10': '一つの分野を極めるより、幅広いスキルを身につけたい',
  '11': '福利厚生が充実していれば、基本給が少し低くても良い',
  '12': '教育制度が不十分でも、実戦で鍛えられる厳しい環境が良い',
  '13': '有給を自由に取れるなら、給与が平均より低くても構わない',
  '14': '社会貢献よりも、まずは自分の経済的安定を優先したい',
  '15': '親の反対があっても、自分がやりたい不安定な業界を選ぶ',
  '16': '周囲に理解されなくても、革新的なアイデアを追求したい',
  '17': '個人の成果より、チーム全体の成功を重視したい',
  '18': '社風が合わなくても、有名企業で働くことを優先したい',
  '19': '転勤が多くても、全国規模で事業展開する企業で働きたい',
  '20': '好きでない分野でも、将来性があれば専門性を磨きたい',
  '21': '成果給で収入が不安定になっても、頑張った分だけ稼ぎたい',
  '22': '転職前提でスキルアップするより、一社で着実にキャリアを積みたい',
  '23': '家族との時間を犠牲にしてでも、仕事で大きな成果を上げたい',
  '24': '将来性が不透明でも、環境問題に取り組む企業で働きたい',
  '25': '業界の将来性より、現在の企業の安定性を重視する',
  '26': '安定した業務より、常に変化のある刺激的な環境を選ぶ',
  '27': '競争が激しい職場でも、切磋琢磨できる環境の方が良い',
  '28': '知名度が低くても、価値観が合う企業を選びたい',
  '29': '通勤時間が長くても、オフィスでの対面コミュニケーションを重視する',
  '30': '資格取得より、実務経験を積むことを優先したい',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS設定
  const allowedOrigins = [
    'https://jobswipe.vercel.app',
    'https://your-custom-domain.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.setHeader('Access-Control-Allow-Origin', origin as string);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONSリクエストに対する応答
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POSTメソッドのみ許可
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, answers } = req.body;
  
  // デバッグ用ログを追加
  console.log('=== メール送信リクエスト受信 ===');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Answers length:', answers ? answers.length : 0);
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }

  // SMTP設定の確認
  const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

  let transport: nodemailer.Transporter | null = null;

  if (hasSmtpConfig) {
    transport = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    console.warn('SMTP configuration not found. Email sending will be simulated.');
  }

  // スワイプ結果を整理
  let swipeResultsText = '';
  if (answers && Array.isArray(answers)) {
    console.log('Processing answers...');
    swipeResultsText = '\n各質問のスワイプ結果:\n';
    swipeResultsText += '========================\n';
    answers.forEach((answer, index) => {
      const result = answer.value === 'yes' ? 'YES（右スワイプ）' : 'NO（左スワイプ）';
      const date = new Date(answer.timestamp).toLocaleString('ja-JP');
      const questionText = questionMap[answer.questionId] || '質問内容不明';
      swipeResultsText += `質問${index + 1} (ID: ${answer.questionId}):\n`;
      swipeResultsText += `  内容: ${questionText}\n`;
      swipeResultsText += `  回答: ${result}\n`;
      swipeResultsText += `  回答時刻: ${date}\n\n`;
    });
    swipeResultsText += '========================\n';
    console.log('Swipe results text constructed:', swipeResultsText.substring(0, 200) + '...');
  } else {
    console.log('No answers provided or answers is not an array');
  }

  // メール内容を構築
  const emailContent = `
名前: ${name}
メールアドレス: ${email}
診断完了日時: ${new Date().toLocaleString('ja-JP')}

この方が就活軸診断を完了しました。
${swipeResultsText}
  `.trim();
  
  console.log('=== 構築されたメール内容 ===');
  console.log(emailContent);
  console.log('=== メール内容終了 ===');

  try {
    if (transport && hasSmtpConfig) {
      // 実際にメール送信
      await transport.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.EMAIL_TO || 'k-wada@ielove-group.jp', // 環境変数から取得可能
        subject: `就活軸診断の結果登録: ${name}さん`,
        text: emailContent,
      });
      console.log(`Email sent successfully for ${name} (${email})`);
    } else {
      // SMTP設定がない場合はログのみ出力
      console.log(`Email simulation for ${name} (${email}) - SMTP not configured`);
      console.log('Registration data:', {
        name,
        email,
        answers,
        timestamp: new Date().toLocaleString('ja-JP')
      });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error('Email sending error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}