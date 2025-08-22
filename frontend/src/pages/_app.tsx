import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

/*
import Layout from '@/components/Layout';
import { queryClient } from '@/libs';
import { AppProvider, useAppStore } from '@/stores';
import { TNextPageWithLayout } from '@/types';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
*/
/*
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import { useEffect } from 'react';
*/
//import '../styles/styles_default.scss'; //자체css
//import '../styles/styles.scss'; //front용 + 기본값
//import '../styles/adstyles.scss'; //admin용

/*
type AppPropsWithLayout = AppProps & {
  Component: TNextPageWithLayout;
};
*/

/*
function LoginChecker({
  authType,
  children,
}: {
  authType?: "user" | "admin";
  children?: any;
}) {
  if (authType) {
    const [jwtObject, modalLoggedIn] = useAppStore((s) => [
      s.jwtObject,
      s.modalLoggedIn,
    ]);
    // modalLoggedIn.onOpen();
    // if (!jwtObject) {
    //   return <LoginForm />;
    // }

    return children;
  }

  return children;
}
*/

/*
type AppPropsWithLayout = AppProps & {
  Component: null;  // TNextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  //const getLayout = Component.PageLayout || ((page) => page);
  //const userTyList = Component.userTyList || [];
  //const authType = Component.authType;

  return <></>;
}
*/



import App, { AppContext, AppInitialProps, AppProps } from 'next/app' 
type AppOwnProps = { }
 
export default function Apps({
  Component,
  pageProps,
}: AppProps & AppOwnProps) {
  return (
    <>1111   
    </>
  )
}
 
Apps.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx }
}
