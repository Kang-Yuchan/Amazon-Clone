import { VFC } from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  MenuIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import HeaderPost from './HeaderPost';
import HeaderUser from './HeaderUser';
import HeaderMenu from './HeaderMenu';
import HeaderNavMenus from './HeaderNavMenus';

const Header: VFC = () => {
  return (
    <header className="relative">
      {/* Top Nav */}
      <div className="flex flex-col md:flex-row md:items-center md:h-16 bg-amazon_blue-light md:bg-amazon_blue flex-grow">
        <div className="md:link flex items-center flex-grow sm:flex-grow-0 pt-3 md:pr-1 md:ml-1">
          <HeaderMenu isMobileView />
          <Image
            src="https://links.papareact.com/f90"
            width={120}
            height={38}
            quality={100}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <HeaderPost isMobileView={false} />

        {/* Search */}
        <div className="h-10 flex-grow rounded-md flex px-2 md:px-0">
          <input
            type="text"
            className=" bg-white p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none"
          />
          <button
            type="button"
            className="flex items-center justify-center h-full bg-yellow-400 hover:bg-yellow-500 rounded-r-md w-11"
          >
            <SearchIcon className="h-6" />
          </button>
        </div>
        {/* Right */}
        <div className="absolute top-0 right-0 mr-3 space-x-2 md:static flex text-white items-center text-xs md:space-x-6 md:mx-6">
          <HeaderUser />
          <div className="hidden md:block md:link p-2">
            <p>返品もこちら</p>
            <p className="header_bold">注文履歴</p>
          </div>
          <div className="md:link md:p-2 flex items-end">
            <ShoppingCartIcon className="h-9" />
            <div className="text-center">
              <span className="text-yellow-500 text-base font-bold">0</span>
              <p className="hidden md:block header_bold">カート</p>
            </div>
          </div>
        </div>
        <HeaderNavMenus isMobileView />
      </div>
      {/* Bottom Nav */}
      <div className="flex items-center bg-amazon_blue-moreLight md:bg-amazon_blue-light text-white py-1 md:pl-2 pl-1">
        <HeaderPost isMobileView />
        <HeaderMenu isMobileView={false} />
        <HeaderNavMenus isMobileView={false} />
      </div>
    </header>
  );
};

export default Header;
