import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      {/* 공통 레이아웃 영역 */}
      <main>{children}</main>
      {/* 푸터 또는 다른 공통 요소들을 여기에 추가 */}
    </div>
  );
}
