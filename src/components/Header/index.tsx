import { VFC } from 'react';
import Image from "next/image";

const Header: VFC = () => {
  return (
    <header>
      {/* Top Nav */}
      <div>
        <div className="flex items-center p bg-amazon_blue">
          <Image
            src='https://links.papareact.com/f90'
            width={150}
            height={40}
            quality={100}
            objectFit="contain"
            className='cursor-pointer'
          />
        </div>
      </div>
    </header>
  )
}

export default Header;
