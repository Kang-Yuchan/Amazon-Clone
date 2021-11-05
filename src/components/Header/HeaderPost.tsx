import { VFC } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/outline';

type Props = {
  isMobileView: boolean;
};
const HeaderPost: VFC<Props> = ({ isMobileView }) => {
  return isMobileView ? (
    <div className="flex md:hidden p-1 text-white items-center mr-3">
      <LocationMarkerIcon className="h-5" />
      <div className="flex h-full ml-1 pr-3">
        <p className="text-amazon_gray text-xs">hogeさん - 567-0815 にお届け</p>
      </div>
    </div>
  ) : (
    <div className="hidden link p-1 text-white md:flex items-end my-1 mr-3">
      <LocationMarkerIcon className="h-6" />
      <div className="h-full ml-1 pr-3">
        <p className="text-amazon_gray text-xs">お届け先 hogeさん</p>
        <p className="header_bold">567-0815</p>
      </div>
    </div>
  );
};

export default HeaderPost;
