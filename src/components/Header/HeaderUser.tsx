import { VFC } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import firebase from '../../../firebase/firebaseClient';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithGoogle } from '../../utils/signInFunc';
import { signOut } from '../../utils/signOutFunc';

const HeaderUser: VFC = () => {
  const [user, userLoading] = useAuthState(firebase.auth());
  return (
    <div
      onClick={() => (!user ? signInWithGoogle() : signOut())}
      className="md:link p-2"
    >
      <div className="flex items-center md:hidden">
        {!user && <p>ログイン</p>}
        <UserIcon className="h-8 ml-1" />
      </div>
      <p className="hidden md:block">
        {user ? `${user?.displayName}さん` : 'こんにちは、ログイン'}
      </p>
      <p className="hidden md:block header_bold">アカウント&リスト</p>
    </div>
  );
};

export default HeaderUser;
