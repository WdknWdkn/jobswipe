import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';

export const Landing = (): JSX.Element => (
  <Layout>
    <h1 className="text-2xl font-bold mb-4">JobSwipe</h1>
    <Link to="/instructions" className="px-4 py-2 bg-blue-500 text-white rounded">
      診断を始める
    </Link>
  </Layout>
);
