import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import Image from 'next/image';
import firebase from '../../../firebase/firebaseClient';
import { useAuthState } from 'react-firebase-hooks/auth';

const Index: NextPage = () => {
  const [user, userLoading] = useAuthState(firebase.auth());
  if (userLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <Head>
        <title>{user ? '注文完了' : '該当するユーザーがありません'}</title>
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
              {user ? (
                <h1 className="text-3xl pb-4 border-b-2 border-gray-200 w-full">
                  {user?.displayName}さん、注文が完了いたしました！
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
