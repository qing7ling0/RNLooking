package com.rnlooking;

import android.os.AsyncTask;

import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.cxxbridge.CatalystInstanceImpl;
import com.facebook.react.cxxbridge.JSBundleLoader;

/**
 * Created by wuqingqing on 2016/12/22.
 */
public class RNLookingModule extends ReactContextBaseJavaModule {
    public RNLookingModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNLookingModule";
    }


    @ReactMethod
    public void LoadBundle(String path, Promise promise) {
        final Promise _promise = promise;
        final ReactContext context = this.getReactApplicationContext();
        final String _path = path;
        AsyncTask task = new AsyncTask() {
            @Override
            protected Boolean doInBackground(Object[] params) {
                CatalystInstanceImpl impl = (CatalystInstanceImpl) context.getCatalystInstance();
                JSBundleLoader loader = JSBundleLoader.createAssetLoader(context, "assets://index.android.bundle.app");
                loader.loadScript(impl);
                return true;
            }

            @Override
            protected void onPostExecute(Object result) {
                _promise.resolve(true);
            }

            @Override
            protected void onCancelled() {
                _promise.reject("error","cancelled");
            }
        };
        task.execute();
    }
}
