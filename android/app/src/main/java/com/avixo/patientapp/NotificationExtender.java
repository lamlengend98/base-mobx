package com.avixo.patientapp;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.KeyguardManager;
import android.content.ComponentName;
import android.content.Intent;
import android.os.Parcelable;
import android.os.PowerManager;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.onesignal.OSNotificationDisplayedResult;
import com.onesignal.OSNotificationPayload;
import com.onesignal.NotificationExtenderService;
import com.onesignal.OSNotificationReceivedResult;
import androidx.core.app.NotificationCompat;

import java.math.BigInteger;

import io.wazo.callkeep.RNCallKeepBackgroundMessagingService;

public class NotificationExtender extends NotificationExtenderService {
   private static final String TAG = "RNFMessagingService";

   @Override
   protected boolean onNotificationProcessing(OSNotificationReceivedResult receivedResult) {
      // Read properties from result.
      OverrideSettings overrideSettings = new OverrideSettings();
      overrideSettings.extender = new NotificationCompat.Extender() {
         @Override
         public NotificationCompat.Builder extend(NotificationCompat.Builder builder) {
            //Force remove push from Notification Center after 30 seconds
            builder.setTimeoutAfter(30000);
            // Sets the icon accent color notification color to Green on Android 5.0+ devices.
            builder.setColor(new BigInteger("FF00FF00", 16).intValue());
            builder.setContentTitle("New Message");
            builder.setContentText("New Encrypted Message");
            return builder;
         }
      };
      Log.d("OneSignalExample", "Notification displayed with id: " + " " +  receivedResult.payload.toJSONObject());
      KeyguardManager keyguardManager = (KeyguardManager)getSystemService(Activity.KEYGUARD_SERVICE);
      KeyguardManager.KeyguardLock lock = keyguardManager.newKeyguardLock(KEYGUARD_SERVICE);
      lock.disableKeyguard();
      PowerManager pm = (PowerManager) getSystemService(Activity.POWER_SERVICE);
      @SuppressLint("InvalidWakeLockTag") PowerManager.WakeLock wakeLock = pm.newWakeLock(PowerManager.FULL_WAKE_LOCK
              | PowerManager.ACQUIRE_CAUSES_WAKEUP
              | PowerManager.ON_AFTER_RELEASE, "MyWakeLock");
      wakeLock.acquire();

      if (!Utils.isAppInForeground(this.getApplicationContext())) {
         try {
            // If the app is in the background we send it to the Headless JS Service
            Intent headlessIntent = new Intent(
                 this.getApplicationContext(),
                 RNCallKeepBackgroundMessagingService.class
            );
            headlessIntent.putExtra("message", receivedResult.payload.rawPayload);
            ComponentName name = this.getApplicationContext().startService(headlessIntent);
            if (name != null) {
               HeadlessJsTaskService.acquireWakeLockNow(this.getApplicationContext());
            }
         } catch (IllegalStateException ex) {
            Log.e(
                 TAG,
                 "Background messages will only work if the message priority is set to 'high'",
                 ex
            );
         }
      }

      // Return true to stop the notification from displaying.
      return false;
   }
}