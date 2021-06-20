import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import Axios from 'axios';
import jp from 'jsonpath';
import { forEach, isNull, merge } from 'lodash';
import qs from 'qs';
import { API_STATUS } from './constants';
import { FileServices } from './file-services';

const DEVICE_ID = DeviceInfo.getUniqueId();

type Request = {
  abort: () => void;
  promise: Promise<any>;
};

type ServicesStatus = { loading: boolean; error: any };

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Options = {
  method?: Method;
  headers?: { [key: string]: string } | null;
  data?: { [key: string]: any };
  qs?: any;
  isAuth?: boolean;
  timeout?: number;
  useLoadGlobal?: boolean;
  useSecret?: boolean;
  useDeviceId?: boolean;
  url?: string;
  newEndpoint?: string;
  isServices?: boolean;
  token65Doctor?: string;
};

function ajaxOptions(url: string, options: Options = {}) {
  const baseOptions: Record<string, any> = {
    ...options,
    url,
    timeout: 16000,
    useLoadGlobal: false,
    useSecret: true,
    useDeviceId: true,
    headers: {
      accept: '*/*',
      'content-type': 'application/json; charset=utf-8',
    },
  };

  if (options.newEndpoint) {
    delete options.newEndpoint;
  }
  if (options.isServices) {
    delete options.isServices;
  }

  if (options.headers) {
    baseOptions.headers = options.headers;
  }
  if (options.timeout) {
    baseOptions.timeout = options.timeout;
  }

  if (
    options?.method === 'GET' &&
    options.data &&
    Object.keys(options.data).length
  ) {
    url = `${url}?${qs.stringify(options.data, options.qs)}`;
    return Object.assign({}, baseOptions, { url });
  }

  const formData = new FormData();
  let hasFile = false;

  forEach(options.data, (val: any, attr: string) => {
    // eslint-disable-next-line no-undef
    hasFile = hasFile || val instanceof File || val instanceof Blob;

    if (!isNull(val)) {
      formData.append(attr, val);
    }
  });

  if (hasFile) {
    return Object.assign({}, baseOptions, {
      cache: false,
      processData: false,
      data: formData,
    });
  }

  return Object.assign({}, baseOptions, {
    data: {
      ...options.data,
      ...(options.useDeviceId ? { device_id: DEVICE_ID } : {}),
      ...(options.useSecret
        ? {
            client_secret: Config.SECRET_API,
            client_id: Config.CLIENT_ID,
          }
        : {}),
    },
  });
}

function ajax(
  url: string,
  options: Options,
  axiosInstance: any,
  servicesStatus: ServicesStatus,
): Request {
  const { CancelToken } = axiosInstance;
  let cancel: any;
  const { auth, appState } = require('@/app-store/app-store').default;

  let ops = options;
  if (ops?.isAuth) {
    ops = {
      ...ops,
      headers: {
        accept: '*/*',
        'content-type': 'application/json; charset=utf-8',
        authorization: `Bearer ${
          ops.token65Doctor || jp.value(auth, '$.infoLogged.access_token')
        }`,
        // authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOi8vbW9iaWxlLWNtcy42NWRvY3RvcmxhYi5jb20vL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjA4Mjg4OTAzLCJleHAiOjE2MTQyODg4NDMsIm5iZiI6MTYwODI4ODkwMywianRpIjoiNE1uSFFpY3M5a0tZd2g5WiJ9.bpg-GpRyUPbwUKfWcb8FPxOWBZWIk2hYErwqI0q41b0`,
        ...ops.headers,
      },
    };
    delete ops.isAuth;
  }
  if (options.useLoadGlobal) {
    appState.isShowLoading = options.useLoadGlobal;
  } else if (!options.isServices) {
    servicesStatus.loading = true;
  }
  console.log('ops', ops);

  const ajaxOps = ajaxOptions(url, ops);
  if (ops.method === 'GET') {
    delete ajaxOps.data;
  }
  console.log('Info Request', ajaxOps);
  const xhr = axiosInstance(ajaxOps, {
    cancelToken: new CancelToken((c: any) => {
      cancel = c;
    }),
  });

  const handleUnauthorize = (error) => {
    if (error.response.status === API_STATUS.UNAUTHORIZE) {
      auth.infoLogged = undefined;
      auth.data = {} as any;
    }
  };

  const promise = new Promise((resolve, reject) => {
    xhr
      .then(
        (response: any) => {
          console.log('====================================');
          console.log('response', response);
          console.log('====================================');
          resolve(response.data);
        },
        (error: any) => {
          console.log('====================================');
          console.log('error', error, error.response, ajaxOps);
          console.log('====================================');
          handleUnauthorize(error);
          reject(error.response);
        },
      )
      .finally(() => {
        appState.isShowLoading = false;
        servicesStatus.loading = false;
      });
  });

  const abort = () => {
    appState.isShowLoading = false;
    cancel?.();
  };

  return { abort, promise };
}

export class NetworkService extends FileServices {
  apiPath = '';
  commonOptions = {};
  serviceStatus = { loading: false, error: null };

  constructor(apiPath = Config.ENDPOINT_API, commonOptions = {}) {
    super(apiPath);
    this.apiPath = apiPath;
    this.commonOptions = commonOptions;
    this.urlUpload = apiPath;
  }

  get(path: string, data: any = {}, options: Options = {}): Request {
    return ajax(
      `${options.newEndpoint || this.apiPath}${path}`,
      merge({}, { method: 'GET', data }, this.commonOptions, options),
      Axios,
      this.serviceStatus,
    );
  }

  post(path: string, data: any, options: Options = {}): Request {
    return ajax(
      `${options.newEndpoint || this.apiPath}${path}`,
      merge({}, { method: 'POST', data }, this.commonOptions, options),
      Axios,
      this.serviceStatus,
    );
  }

  put(path: string, data: any, options: Options = {}): Request {
    return ajax(
      `${options.newEndpoint || this.apiPath}${path}`,
      merge({}, { method: 'PUT', data }, this.commonOptions, options),
      Axios,
      this.serviceStatus,
    );
  }

  patch(path: string, data: any, options: Options = {}): Request {
    return ajax(
      `${options.newEndpoint || this.apiPath}${path}`,
      merge({}, { method: 'PATCH', data }, this.commonOptions, options),
      Axios,
      this.serviceStatus,
    );
  }

  delete(path: string, data: any, options: Options = {}): Request {
    return ajax(
      `${options.newEndpoint || this.apiPath}${path}`,
      merge({}, { method: 'DELETE', data }, this.commonOptions, options),
      Axios,
      this.serviceStatus,
    );
  }

  del(path: string, options: Options = {}): Request {
    return ajax(
      `${this.apiPath}${path}`,
      merge({}, { method: 'DELETE' }, this.commonOptions, options),
      Axios,
      this.serviceStatus,
    );
  }
}
