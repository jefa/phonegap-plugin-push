package com.iwh.rxminder;

import android.app.Application;
import android.util.Log;

import com.adobe.phonegap.push.PushHandlerActivity;
import com.parse.Parse;
import com.parse.ParseAnalytics;
import com.parse.ParseException;
import com.parse.ParseInstallation;
import com.parse.PushService;
import com.parse.SaveCallback;

/**
 * Created by javierfradiletti on 11/5/15.
 */
public class MainApplication extends Application {

    public static final String LOG_TAG = "PushPlugin";

    public MainApplication() {
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Parse.initialize(this, "Vojc9p5XRaZs8A2ewVgjvGzTdmACCvqNNCXZ8ZGt", "uhntLY5GD2bfBfC5dVfm9INhAkLOodRMWWs5Anjb");
        //PushService.setDefaultPushCallback(this, PushHandlerActivity.class);
        ParseInstallation.getCurrentInstallation().saveInBackground(new SaveCallback() {
            @Override
            public void done(ParseException e) {
                if (e == null) {
                    Log.v(LOG_TAG, "Parse Initialized.");
                } else {
                    Log.v(LOG_TAG, "Parse NOT Initialized.", e);
                }
            }
        });

    }
}
