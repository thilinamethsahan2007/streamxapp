package com.streamx.app;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onResume() {
        super.onResume();
        // Get the WebView and set a custom WebChromeClient to block popups
        try {
            WebView webView = this.getBridge().getWebView();
            if (webView != null) {
                webView.setWebChromeClient(new WebChromeClient() {
                    @Override
                    public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, android.os.Message resultMsg) {
                        // BLOCK ALL POPUPS (Ad Blocker Logic)
                        // Returning false prevents the popup from opening
                        return false; 
                    }
                });
            }
        } catch (Exception e) {
            // Ignore if bridge is not ready
        }
    }
}
