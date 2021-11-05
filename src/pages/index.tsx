import { VFC } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';
import { Product } from '../types';

type Props = {
  products: Product[];
};
const Home: VFC<Props> = ({ products }) => {
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
        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products: Product[] = await fetch(
    'https://fakestoreapi.com/products/',
  ).then((res) => res.json());
  return {
    props: {
      products,
    },
  };
};
