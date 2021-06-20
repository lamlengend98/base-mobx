package com.avixo.patientapp;

import android.app.ActivityManager;
import android.content.Context;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.LifecycleState;

import java.util.List;

public class Utils {
    public static boolean isAppInForeground(Context context) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        if (activityManager == null) return false;

        List<ActivityManager.RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();
        if (appProcesses == null) return false;

        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (
                    appProcess.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND
                            && appProcess.processName.equals(packageName)
            ) {
                ReactContext reactContext;

                try {
                    reactContext = (ReactContext) context;
                } catch (ClassCastException exception) {
                    // Not react context so default to true
                    return true;
                }

                return reactContext.getLifecycleState() == LifecycleState.RESUMED;
            }
        }

        return false;
    }
}
