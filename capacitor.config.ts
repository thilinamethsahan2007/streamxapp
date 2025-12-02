import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.streamx.app',
    appName: 'streamx_app',
    webDir: 'out',
    server: {
        // Android Emulator uses 10.0.2.2 to access host localhost
        url: 'http://10.0.2.2:3000',
        cleartext: true,
    },
    android: {
        allowMixedContent: true
    }
};

export default config;
