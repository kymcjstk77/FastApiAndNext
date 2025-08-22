import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');


import localFont from 'next/font/local';
import Head from 'next/head';
import { useEffect } from 'react';

import { TNextPageWithLayout } from '@/types';

//import '../styles/styles_default.scss'; //css설정

/*
import Layout from '@/components/Layout';
import { queryClient } from '@/libs';
import { AppProvider, useAppStore } from '@/stores';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
*/

import App, { AppContext, AppInitialProps, AppProps } from 'next/app' 
type AppPropsWithLayout = AppProps & {   //해석필요
  Component: TNextPageWithLayout;
};

export default function Apps({
  Component,
  pageProps,
}: AppPropsWithLayout) {

  const getLayout = Component.PageLayout || ((page) => page);
  const userTyList = Component.userTyList || [];
  const authType = Component.authType;

  return (
    <>1111   
    </>
  )

}

 
Apps.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx }
}
