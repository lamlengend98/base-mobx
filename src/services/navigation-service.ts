import { NavigationActions } from '@react-navigation/compat';
import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

let _navigator: NavigationContainerRef;

function setTopLevelNavigator(navigatorRef: NavigationContainerRef) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params: { [key: string]: any }) {
  _navigator?.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

export function back() {
  const action = StackActions.pop(1);
  _navigator && _navigator?.dispatch(action);
}

function reset(routeName: string, params: { [key: string]: any }) {
  _navigator?.dispatch((state) => {
    if (state.type === 'tab') {
      const index = state.routeNames.indexOf(routeName);
      //@ts-ignore
      return CommonActions.reset({
        ...state,
        index,
      });
    }
    return NavigationActions.navigate({
      routeName,
      params,
    });
  });
}

function replace(routeName: string, params: { [key: string]: any }) {
  _navigator?.dispatch(StackActions.replace(routeName, params));
}

// add other navigation functions that you need and export them

export const NavigationService = {
  navigate,
  replace,
  setTopLevelNavigator,
  reset,
  back,
};
