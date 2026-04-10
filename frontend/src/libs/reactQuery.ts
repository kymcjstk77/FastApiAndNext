import { ZodiosHooks } from "@zodios/react";
import axios from "axios";
axios.defaults.withCredentials = true;

import { createApiClient } from "@/_generated";
import { useAppStore } from "@/stores";
//import { JwtHelper, getAccessToken, getRefreshToken } from "@/utils";
import { QueryClient } from "@tanstack/react-query";
//import { notification } from "antd";

//const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const baseURL = "http://localhost:8000";

function createAxiosObject() {
  const instance = axios.create({
    baseURL,
    // headers:
    //   "undefined" !== typeof window
    //     ? {
    //         "User-Agent": window.navigator.userAgent,
    //       }
    //     : undefined,
  });
  instance.defaults.withCredentials = true;
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error?.response?.data?.resultMessage) {                                                                                                                                                                                  
        Object.assign(error, {
          message: error.response.data.resultMessage,
        });
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

const privateInstance = createAxiosObject();
const publicInstance = createAxiosObject();

privateInstance.interceptors.request.use(
  async function (config) {
    let token = getAccessToken();
    const refreshToken = getRefreshToken();
    const accessToken = getAccessToken();
    const redirectUrl = window.location.href.includes("/kr/ad/")
      ? "/kr/ad-login"
      : "/kr/login";
    if (accessToken && refreshToken) {
      const jwtObject = JwtHelper.getJwtObject(accessToken);              
      if(jwtObject?.getLoginKeepUpYn == 'Y'){
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
            }
          );
          if (
            res.resultCode === 200 &&
            res.body?.accessToken &&
            res.body?.refreshToken
          ) {
            useAppStore.getState().onLogin({
              accessToken: res.body.accessToken,
              refreshToken: res.body.refreshToken,
            });
          } else {
             useAppStore.getState().onLogout(redirectUrl);
            throw new axios.Cancel("회원의 토큰 재발급이 실패되었습니다.");
          }
        } catch (e) {
          useAppStore.getState().onLogout(redirectUrl);
          // 엑세스 or 리프레시 토큰이 없는경우
          throw new axios.Cancel("회원의 토큰 재발급이 실패되었습니다.");
        }
      } else {
        if (jwtObject?.isExpired) {
        useAppStore.getState().onLogout(redirectUrl);
        throw new axios.Cancel("회원의 토큰이 만료되었습니다.");        
        } else {
          // 토큰이 유효한경우
          useAppStore.getState().onLogin({
            accessToken,
            refreshToken,
          });
        }
      }
    } else {
      useAppStore.getState().onLogout(redirectUrl);
      throw new axios.Cancel("회원의 토큰이 만료되었습니다.");
    }

    config.headers.set({
      Authorization: `Bearer ${accessToken}`,
    });
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      // cacheTime: Infinity,
      retry: false,
    },
  },
});

export const publicApiClient = createApiClient(baseURL, {
  validate: "none",
  axiosInstance: publicInstance,
});

export const privateApiClient = createApiClient(baseURL, {
  axiosInstance: privateInstance,
  validate: "none",
});

export const publicZodiosHooks = new ZodiosHooks(
  "publicZodiosHooks",
  publicApiClient
);

export const privateZodiosHooks = new ZodiosHooks(
  "privateZodiosHooks",
  privateApiClient
);
