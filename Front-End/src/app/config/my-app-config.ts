export default {
    oidc: {
        //client id given by okta
        clientId: '0oa7fxszif3FkGsQM5d7',
        //okta domain, if not given in application it is in your okta url
        issuer: 'https://dev-84185932.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email', 'address']
    }
}