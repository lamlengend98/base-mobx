import RNBackgroundUpload, {
  MultipartUploadOptions,
} from 'react-native-background-upload';
import jp from 'jsonpath';

type BackgroundUploadCompletedData = {
  id: string;
  responseCode: string;
  responseBody: string;
};

type BackgroundUploadProgressData = {
  id: string;
  progress: number;
};

type BackgroundUploadErrorData = {
  id: string;
  error: string;
};

type OnProgressCallback = {
  uploadId?: string;
  progress?: number;
  status: 'error' | 'cancelled' | 'completed' | 'progress';
  result?: BackgroundUploadCompletedData;
};

type BackgroundUploadOptions = {
  path: string;
  field?: string;
  url: string;
  type?: 'raw' | 'multipart';
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  parameters?: { [k: string]: string };
  onProgress?: (e: OnProgressCallback) => void;
};

export class FileServices {
  herderCommon: Headers = {
    accept: '*/*',
  };
  urlUpload = '';

  constructor(urlUpload: string) {
    this.urlUpload = urlUpload;
  }

  backgroundUpload({
    path,
    field = 'file',
    method = 'POST',
    parameters,
    url,
    onProgress,
  }: BackgroundUploadOptions) {
    const { auth } = require('@/app-store/app-store').default;
    RNBackgroundUpload.startUpload({
      path,
      field,
      url: `${this.urlUpload}${url}`,
      type: 'multipart',
      parameters,
      headers: {
        accept: '*/*',
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${jp.value(auth, '$.data.accessToken')}`,
      },
      method,
    } as MultipartUploadOptions)
      .then((uploadId) => {
        RNBackgroundUpload.addListener(
          'progress',
          uploadId,
          (data: BackgroundUploadProgressData) => {
            // console.log(`Progress: ${data.progress}%`);
            onProgress?.({
              status: 'progress',
              progress: data.progress,
              uploadId,
            });
          },
        );
        RNBackgroundUpload.addListener(
          'error',
          uploadId,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (data: BackgroundUploadErrorData) => {
            // console.log(`Error: ${data.error}%`);
            onProgress?.({
              status: 'error',
              uploadId,
            });
          },
        );
        RNBackgroundUpload.addListener('cancelled', uploadId, () => {
          // console.log(`Cancelled!`);
          onProgress?.({
            status: 'cancelled',
            uploadId,
          });
        });
        RNBackgroundUpload.addListener(
          'completed',
          uploadId,
          (data: BackgroundUploadCompletedData) => {
            onProgress?.({
              status: 'completed',
              uploadId,
              result: data,
            });
          },
        );
      })
      .catch((err) => {
        console.log('Upload error!', err);
      });
  }
}
