import { VFC } from 'react';
import { MenuIcon } from '@heroicons/react/outline';

type Props = {
  isMobileView: boolean;
};
const HeaderMenu: VFC<Props> = ({ isMobileView }) => {
  return isMobileView ? (
    <p className="md:hidden flex items-center pb-4 pl-2 mr-1">
      <MenuIcon className="h-7 text-white" />
    </p>
  ) : (
    <p className="hidden md:flex header_bold items-center link p-1">
      <MenuIcon className="h-6 mr-1" />
      すべて
    </p>
  );
};

export default HeaderMenu;
