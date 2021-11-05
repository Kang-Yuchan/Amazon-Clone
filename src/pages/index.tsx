import { VFC } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';

const Home: VFC = () => {
  return (
    <div>
      <Head>
        <title>
          Amazon Clone | 本, ファッション, 家電から食品まで | アマゾン
        </title>
      </Head>
      <Header />
      <Banner />
    </div>
  );
};

export default Home;
