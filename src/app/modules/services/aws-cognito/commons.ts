// /* tslint:disable:no-unused-variable */

export const mockPoolData = {
  UserPoolId: 'us-east-1_*********',
  ClientId: '*************************'
};

export const mockIdentityPoolId = 'us-east-1:************************************';

export const mockTokens = {
  getIdToken: () => { return { getJwtToken: () => 'mockIdToken' }; },
  getAccessToken: () => { return { getJwtToken: () => 'mockAccessToken' }; },
  getRefreshToken: () => 'mockRefreshToken'
};


