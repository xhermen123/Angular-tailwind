// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiBaseUrl: 'https://virtserver.swaggerhub.com/twohat/inbox/2.1.1',
  apiBaseUrl: '/api/v1',
  sentry: {
    dsn: 'https://1f168fd1b0fa4b6999f1a901c0804a91@sentry.io/1788710',
    environment: 'development',
    ignoreErrors: ['Non-Error exception captured'],
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
