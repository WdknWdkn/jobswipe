import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';

export const Instructions = (): JSX.Element => (
  <Layout>
    <h2 className="text-xl font-bold mb-4">診断のやり方</h2>
    <p className="mb-4">表示される質問に対してスワイプで回答してください。</p>
    <Link to="/diagnosis" className="px-4 py-2 bg-blue-500 text-white rounded">
      スタート
    </Link>
  </Layout>
);
