import { VFC } from 'react';

type Props = {
  isMobileView: boolean;
};
const HeaderNavMenus: VFC<Props> = ({ isMobileView }) => {
  return isMobileView ? (
    <div className="md:hidden flex space-x-2 px-2 text-white mt-3 overflow-x-scroll w-screen pb-4">
      <p className="hover:text-yellow-400 whitespace-pre cursor-pointer">
        Amazon Basics
      </p>
      <p className="hover:text-yellow-400 whitespace-pre cursor-pointer">
        再購入
      </p>
      <p className="hover:text-yellow-400 whitespace-pre cursor-pointer">
        ドラッグストア
      </p>
      <p className="hover:text-yellow-400 whitespace-pre cursor-pointer">
        ビューティー&パーソナルケア
      </p>
      <p className="hover:text-yellow-400 whitespace-pre">新着商品</p>
      <p className="hover:text-yellow-400 whitespace-pre">ランキング</p>
      <p className="hover:text-yellow-400 whitespace-pre">Prime Video</p>
    </div>
  ) : (
    <div className="hidden items-center md:flex ml-2 space-x-3">
      <p className="link p-1">Amazon Basics</p>
      <p className="link p-1">再購入</p>
      <p className="link p-1">ドラッグストア</p>
      <p className="link p-1">ビューティー&パーソナルケア</p>
      <p className="link p-1">新着商品</p>
      <p className="link p-1">ランキング</p>
      <p className="link p-1">Prime Video</p>
    </div>
  );
};

export default HeaderNavMenus;
