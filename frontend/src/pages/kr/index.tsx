import React from 'react';
import { IComponentProps } from '@/types';
import MainTempate from '@/templates/MainTemplate/MainTempate';

interface IProps extends IComponentProps {
  defaultMuted?: boolean;
}

function MainPage({ defaultMuted = true }: IProps) {
  return <MainTempate defaultMuted={defaultMuted} previewType={undefined} />;
}

export default MainPage;
