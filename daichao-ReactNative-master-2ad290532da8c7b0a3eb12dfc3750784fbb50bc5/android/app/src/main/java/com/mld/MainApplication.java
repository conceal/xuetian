package com.mld;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.mld.module.SharePackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import java.util.Arrays;
import java.util.List;
import com.imagepicker.ImagePickerPackage;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.Config;
import com.umeng.socialize.PlatformConfig;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
          new ImagePickerPackage(),
              new CookieManagerPackage(),
              new SharePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Config.shareType = "react native";
    // 初始化Umeng分享
    UMConfigure.init(this,"友盟Key","umeng", UMConfigure.DEVICE_TYPE_PHONE,"");
  }

  {
    PlatformConfig.setWeixin("wx3005bc7dfef68b27", "13f444a3395a55f66efb1217a044140e");
    PlatformConfig.setQQZone("1107680256", "4hnWkUn5wL4H2VW6");

  }
}
