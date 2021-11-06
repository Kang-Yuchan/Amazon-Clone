import { VFC } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/client';

type Props = {
  isMobileView: boolean;
};
const HeaderPost: VFC<Props> = ({ isMobileView }) => {
  const [session] = useSession();
  return isMobileView ? (
    <div className="flex md:hidden p-1 text-white items-center mr-3">
      <LocationMarkerIcon className="h-5" />
      <div className="flex h-full ml-1 pr-3">
        <p className="text-amazon_gray text-xs">
          {session
            ? `${session.user?.name}さん - 567-0815 にお届け`
            : 'お届け先の住所を選択'}
        </p>
      </div>
    </div>
  ) : (
    <div className="hidden link p-1 text-white md:flex items-end my-1 mr-3">
      <LocationMarkerIcon className="h-6" />
      <div className="h-full ml-1 pr-3">
        <p className="text-amazon_gray text-xs">
          {session ? `お届け先 ${session.user?.name}さん` : 'こんにちは'}
        </p>
        <p className="header_bold">{session ? '567-0815' : 'お届け先を選択'}</p>
      </div>
    </div>
  );
};

export default HeaderPost;
