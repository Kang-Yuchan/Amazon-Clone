import { UserIcon } from '@heroicons/react/outline';
import { VFC } from 'react';

const HeaderUser: VFC = () => {
  return (
    <div className="md:link p-2">
      <div className="flex items-center md:hidden">
        {/* <p>ログイン</p> */}
        <UserIcon className="h-8 ml-1" />
      </div>
      <p className="hidden md:block">hogeさん</p>
      <p className="hidden md:block header_bold">アカウント&リスト</p>
    </div>
  );
};

export default HeaderUser;
