import 'ress';
import '../styles/globalTailwind.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Provider } from 'next-auth/client';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Provider>
  );
}
export default App;
