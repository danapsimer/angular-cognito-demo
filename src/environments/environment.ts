// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  POOL_DATA: {
    UserPoolId: 'us-east-1_FaBmSyYWw',
    ClientId: '46h8fdnr8u3vtfftc6c6nv1u1s',
  },
  IDENTITY_POOL_ID: 'us-east-1:d9adb880-ea91-47d9-a3c5-e62c59865350'
};
