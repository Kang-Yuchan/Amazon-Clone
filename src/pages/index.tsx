import { VFC } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';

const Home: VFC = () => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>
          Amazon Clone | 本, ファッション, 家電から食品まで | アマゾン
        </title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed />
      </main>
    </div>
  );
};

export default Home;
