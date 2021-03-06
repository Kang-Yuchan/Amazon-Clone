import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';
import { Product } from '../types';

type Props = {
  products: Product[];
};
const Home: NextPage<Props> = ({ products }) => {
  return (
    <>
      <Head>
        <title>
          Amazon Clone | 本, ファッション, 家電から食品まで | アマゾン
        </title>
      </Head>
      <div className="bg-gray-100">
        <Header />
        <main className="max-w-screen-2xl mx-auto">
          <Banner />
          <ProductFeed products={products} />
        </main>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const products: Product[] = await fetch(
    'https://fakestoreapi.com/products/',
  ).then((res) => res.json());
  return {
    props: {
      products,
    },
  };
};
