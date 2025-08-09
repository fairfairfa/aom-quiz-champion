import { defineConfig } from '@capacitor/cli';

const config: defineConfig = {
  appId: 'app.lovable.460c5318496b403baffb2f9f162b287d',
  appName: 'aom-quiz-champion',
  webDir: 'dist',
  server: {
    url: 'https://460c5318-496b-403b-affb-2f9f162b287d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;