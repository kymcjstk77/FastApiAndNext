import { useEffect } from 'react';
/*import { create } from 'zustand';
import { SpinLoading } from '@/components';
import { publicApiClient } from '@/libs';
import { IReducerForm, IReducerModal, reducerForm, reducerModal } from '@/reducers';
import { TSchema } from '@/types';
import { JwtHelper, JwtObject, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils';
*/
//import { notification } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

interface IProps {
  children: React.ReactNode;
}
/*
interface IGetEnumDetailByCodeProps {
  key: keyof TSchema<'EnumResponseObject'>;
  code: string;
}

interface IGetEnumDetailByNameProps {
  key: keyof TSchema<'EnumResponseObject'>;
  name: string;
}
*/
interface ILayout {
  opacityHeader: boolean;
}

interface IConfirmPopup {
  /** 열림여부 */
  open?: boolean;
  /** 내용 */
  message?: string | React.ReactNode;
  /** 확인 콜백 함수 */
  onOk?: () => void;
  /** 취소 콜백 함수 */
  onCancel?: () => void;
  /** 열림여부 */
  showCancelButton?: boolean;
  cancelBtnNm?: string;
  confirmBtnNm?: string;
}

/*
interface IContext {
  formLayout: IReducerForm<ILayout>;
  alertMessage?: string | React.ReactNode;
  modalLoggedIn: IReducerModal;
  // 개인정보 열람 목록 조회 팝업 
  modalPrivacyHistories: IReducerModal;
  // 개인정보 열람 사유 작성 팝업 
  modalPrivacyHistoryEditor: IReducerModal;
  enumObject?: TSchema<'EnumResponseObject'>;
  jwtObject?: JwtObject | null;
  confirmPopup: IConfirmPopup;

  onLogin: ({ accessToken, refreshToken, redirectPath }: { accessToken: string; refreshToken: string; redirectPath?: string }) => void;
  onLogout: (pathname?: string) => void;
  onOpenAlertMessage: (message: string | React.ReactNode) => void;
  onOpenConfirmPopup: (props: IConfirmPopup) => void;
  onCloseConfirmPopup: () => void;
  onCloseAlertMessage: () => void;
  getEnumDetailByCode: (props: IGetEnumDetailByCodeProps) => TSchema<'EnumResponseDetail'> | undefined;
  getEnumDetailByName: (props: IGetEnumDetailByNameProps) => TSchema<'EnumResponseDetail'> | undefined;
  getEnumByEnumName: (enumName: string) => TSchema<'EnumResponseDetail'>[] | undefined;
  onChangeEnumObject: (enumObject: TSchema<'EnumResponseObject'>) => void;
}
*/

// TODO : 로그인 창 모달여부 표기하기.
export const useAppStore = () => {
  return {
    jwtObject: null,
    enumObject: undefined
  };
};

/*
export const useAppStore = create<IContext>((set, get) => {
  return {
    jwtObject: null,
    enumObject: undefined,
    modalLoggedIn: reducerModal<IContext>(set, 'modalLoggedIn', false),
    modalPrivacyHistories: reducerModal<IContext>(set, 'modalPrivacyHistories', false),
    modalPrivacyHistoryEditor: reducerModal<IContext>(set, 'modalPrivacyHistoryEditor', false),
    formLayout: reducerForm<IContext, ILayout>(set, 'formLayout', {
      opacityHeader: false,
    }),
    alertMessage: undefined,
    confirmPopup: {
      message: '',
      onCancel: () => {},
      onOk: () => {},
    },
    onLogin: ({ accessToken, refreshToken, redirectPath }: { accessToken: string; refreshToken: string; redirectPath?: string }) => {
      const jwtObject = JwtHelper.getJwtObject(accessToken);

      // accessToken의 expiredAt값
      // const expiredAt = dayjs(jwtObject?.getExp).toDate();
      const expiredAt = dayjs().add(1, 'hour').toDate();
      setAccessToken({
        token: accessToken,
        expiredAt,
      });
      setRefreshToken({ token: refreshToken, expiredAt });
      set({
        jwtObject,
      });
      if (redirectPath) {
        window.location.replace(redirectPath);
      }
    },
    onLogout: (pathname = '/kr/login') => {
      setAccessToken(undefined);
      setRefreshToken(undefined);
      const jwtObject = get().jwtObject;
      set({
        jwtObject: undefined,
      });
      if (jwtObject === null) {
        // 최초에 접근시
        set({
          jwtObject: undefined,
        });
      } else {
        set({
          jwtObject: undefined,
        });
        window.location.replace(pathname);
      }
    },
    onOpenAlertMessage: (alertMessage: string | React.ReactNode) => {
      set({ alertMessage });
    },
    onCloseConfirmPopup: () => {
      set({
        confirmPopup: {
          open: false,
          message: undefined,
          onCancel: () => {},
          onOk: () => {},
        },
      });
    },
    onOpenConfirmPopup: ({ open = true, message, showCancelButton, onCancel, onOk, cancelBtnNm, confirmBtnNm }) => {
      set({
        confirmPopup: {
          open,
          showCancelButton,
          message,
          onCancel,
          onOk,
          cancelBtnNm,
          confirmBtnNm,
        },
      });
    },
    onCloseAlertMessage: () => {
      set({ alertMessage: undefined });
    },
    getEnumDetailByCode: ({ key, code }: IGetEnumDetailByCodeProps) => {
      const { enumObject } = get();
      if (enumObject && enumObject[key]) {
        return enumObject[key].find((v) => v.code === code);
      }
      return enumObject;
    },
    getEnumDetailByName: ({ key, name }: IGetEnumDetailByNameProps) => {
      const { enumObject } = get();
      if (enumObject && enumObject[key]) {
        return enumObject[key].find((v) => v.name === name);
      }
      return enumObject;
    },
    getEnumByEnumName: (enumName) => {
      const { enumObject } = get();
      if (enumObject) {
        return enumObject[enumName];
      }
      return enumObject;
    },
    onChangeEnumObject: (enumObject: TSchema<'EnumResponseObject'>) => {
      set({
        enumObject,
      });
    },
  };
});

export const AppProvider = ({ children }: IProps) => {
  const { replace } = useRouter();
  const { jwtObject } = useAppStore((s) => s);

  useEffect(() => {
    async function onRefreshToken(accessToken: string, refreshToken: string) {
      try {
        const res = await publicApiClient.refresh(
          {
            accessToken,
            refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (res.resultCode === 200 && res.body?.accessToken && res.body?.refreshToken) {
          useAppStore.getState().onLogin({
            accessToken: res.body.accessToken,
            refreshToken: res.body.refreshToken,
          });
        } else {
          notification.error({
            duration: 0,
            message: '토큰 재발급 실패',
            description: res.resultMessage,
          });
          useAppStore.getState().onLogout();
        }
      } catch (e) {
        // 엑세스 or 리프레시 토큰이 없는경우
        notification.error({
          duration: 0,
          message: '토큰 재발급 에러',
          description: e + '',
        });
        useAppStore.getState().onLogout();
      } finally {
      }
    }

    let jwtObject: JwtObject | undefined = undefined;
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (accessToken && refreshToken) {
      jwtObject = JwtHelper.getJwtObject(accessToken);
      if (jwtObject?.isExpired) {
        // 토큰 만료시 재발급 요청.
        onRefreshToken(accessToken, refreshToken);
      } else {
        useAppStore.getState().onLogin({ accessToken, refreshToken });
      }
    } else {
      useAppStore.getState().onLogout();
    }
  }, []);

  if (jwtObject === null) {
    return <SpinLoading />;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.

  return <>{children}</>;
};
*/

export default useAppStore;
//export const useAppStore = () => useContext<IContext>(AppContext);
