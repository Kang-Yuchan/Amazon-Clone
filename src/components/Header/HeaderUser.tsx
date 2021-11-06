import { VFC } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';

const HeaderUser: VFC = () => {
  const [session] = useSession();
  return (
    <div
      onClick={() => (!session ? signIn() : signOut())}
      className="md:link p-2"
    >
      <div className="flex items-center md:hidden">
        {!session && <p>ログイン</p>}
        <UserIcon className="h-8 ml-1" />
      </div>
      <p className="hidden md:block">
        {session ? `${session?.user?.name}さん` : 'こんにちは、ログイン'}
      </p>
      <p className="hidden md:block header_bold">アカウント&リスト</p>
    </div>
  );
};

export default HeaderUser;
