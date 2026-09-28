import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.meuapp.proj22',
  appName: 'proj22',
  webDir: 'dist',
  server: { androidScheme: 'https' },
  plugins: {
    SQLiteConnection: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
    },
    Preferences: {
      group: 'NativeStorage',
    },
  },
};
export default config;
