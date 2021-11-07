import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import { useSession } from 'next-auth/client';
import Image from 'next/image';

const Index: NextPage = () => {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>{session ? '注文完了' : '該当するユーザーがありません'}</title>
      </Head>
      <div className="bg-gray-100">
        <Header />
        <main className="flex flex-col-reverse md:flex-row mx-autol">
          <div className="flex flex-col flex-grow justify-center items-center m-5 shadow-sm md:mr-10">
            <Image
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
              quality={100}
            />
            <div className="md:bg-white md:p-5 space-y-10 w-full mt-5">
              {session ? (
                <h1 className="text-3xl pb-4 border-b-2 border-gray-200 w-full">
                  注文が完了いたしました！
                </h1>
              ) : (
                <h1 className="text-3xl pb-4 border-b-2 border-gray-200 w-full">
                  該当するユーザーがありません
                </h1>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
