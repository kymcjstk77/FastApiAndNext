import { NextPage } from 'next';
import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';

type TNextPageWithLayout<P = { userTy?: string[] }, IP = P> = NextPage<P, IP> & {
  PageLayout?: (page: { children?: React.ReactNode } & ReactNode) => JSX.Element;
  userTyList?: string[];
  /** 페이지 접근시 로그인 체크  */
  authType?: 'user' | 'admin';
};

export default TNextPageWithLayout;
