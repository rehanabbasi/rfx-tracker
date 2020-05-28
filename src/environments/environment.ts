// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // firebase: {
  //   apiKey: "AIzaSyBrYQbmm-A9DswBupcl6q8IWlMjrW85oNw",
  //   authDomain: "rfx-tracker.firebaseapp.com",
  //   databaseURL: "https://rfx-tracker.firebaseio.com",
  //   projectId: "rfx-tracker",
  //   storageBucket: "rfx-tracker.appspot.com",
  //   messagingSenderId: "832933326424",
  //   appId: "1:832933326424:web:8aeb417d40deafcc02e42d",
  //   measurementId: "G-K8E173XKKW"
  // }
  firebase: {
    apiKey: "AIzaSyAy51jvXzE0s5QAgfTDiB_oENFjzsDFnXk",
      authDomain: "rfx-tracker-prod.firebaseapp.com",
      databaseURL: "https://rfx-tracker-prod.firebaseio.com",
      projectId: "rfx-tracker-prod",
      storageBucket: "rfx-tracker-prod.appspot.com",
      messagingSenderId: "202562852113",
      appId: "1:202562852113:web:60adae4bb457f0a9c8e8b0",
      measurementId: "G-6G6RNX1C65"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
