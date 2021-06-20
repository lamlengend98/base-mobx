import React, { useEffect } from 'react';
import CodePush from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@/theme';
import {
  AddCardProvider,
  AgoraProvider,
  AlertDialogProvider,
  CometChatProvider,
  ConfirmationProvider,
  DropdownAlertProvider,
  ImagePickerProvider,
  ImageViewProvider,
  LoadingGlobal,
  LocaleProvider,
  MediaTransferProvider,
  MemberCodeProvider,
  NetworkInfo,
  SymptomPickerProvider,
  VideoViewProvider,
} from '@/tools';
import { AppStoreProvider } from './app-store';
import { NavigationService } from './services';
import { RootStack } from './stack/root-stack';

const AppBase = () => {
  useEffect(() => {
    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
    }).finally(() => {
      SplashScreen.hide();
    });
  }, []);

  return (
    <SafeAreaProvider>
      <AppStoreProvider>
        <LocaleProvider>
          <ThemeProvider>
            <DropdownAlertProvider>
              <ImagePickerProvider>
                <ImageViewProvider>
                  <VideoViewProvider>
                    <MemberCodeProvider>
                      <ConfirmationProvider>
                        <AddCardProvider>
                          <AlertDialogProvider>
                            <AgoraProvider>
                              <NetworkInfo>
                                <CometChatProvider>
                                  <SymptomPickerProvider>
                                    <MediaTransferProvider>
                                      <NavigationContainer
                                        ref={
                                          NavigationService.setTopLevelNavigator
                                        }>
                                        <RootStack />
                                      </NavigationContainer>
                                    </MediaTransferProvider>
                                  </SymptomPickerProvider>
                                </CometChatProvider>
                              </NetworkInfo>
                            </AgoraProvider>
                          </AlertDialogProvider>
                        </AddCardProvider>
                      </ConfirmationProvider>
                    </MemberCodeProvider>
                  </VideoViewProvider>
                </ImageViewProvider>
              </ImagePickerProvider>
            </DropdownAlertProvider>
            <LoadingGlobal />
          </ThemeProvider>
        </LocaleProvider>
      </AppStoreProvider>
    </SafeAreaProvider>
  );
};

export const App = CodePush({
  updateDialog: true,
  installMode: CodePush.InstallMode.IMMEDIATE,
})(AppBase);
