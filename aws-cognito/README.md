# AWS Cognito
AWS Cognito is an identity provider fully managed on AWS.

## Features

- SignUp/SingIn.
- MFA.
- Social sign in with Facebook, Google, AWS Login and Apple.
- Implements most common specifications like OIDC and oAuth.
- Supports SAML protocol.
- Flows customization like MFA, token generation and others can be done with lambda functions.

## Components

### User pool
Is the user database. Provides SingIn/SignUp features by a hosted UI or a custom application UI using the RestApi.
User pools can be created/managed by the AWS Console, AWS CLI or by an Admin Rest API.

### Identity pool
Is used for authorization. Identity pools provide AWS credentials to grant your users access to other AWS services.
Identity pools can be created/managed by the AWS Console, AWS CLI or by an Admin Rest API.

## Using Cognito
Follow these steps to create and configure an User pool (based on the new console version on AWS).

1. Login in you AWS account and search for Cognito.
2. On left panel, choose **User pools**.
3. Choose **Create User Pool**.
>This tutorial will show how to create a standard **Cognito user pool**.

### Configuring user sign-in experience
1. Configure the attributes required in for the users in this pool to sign in (User name, Email and/or Phone number) .
2. Choose **Next**.

### Configuring security requirements
1. Read default features for password policy. If you want to change choose **Custom** option to make changes.
2. This tutorial will not cover MFA configurations.
3. Configure the user recover options.
4. Choose **Next**.

### Configuring self sign-up experience
1. Enable self-registration.
2. Configure options to account verification and confirmation.
3. Select the required attributes to create an user.
4. Configure custom attributes.
5. Choose **Next**.

### Message delivery
Configure how the messages are delivery depending on how you choose to confirm and recover accounts.

### Application integration
1. Type your user pool name.
2. Enable **Use the Cognito Hosted UI** option.
3. Use a Cognito domain or select your domain if you have one.
4. Choose public client for to allow to use in browsers.
5. Generate a client secret if you want to interact direct with the Cognito REST API.
6. On advanced client settings select **Implicit grant** if you want access the token in the UI.
7. Select OIDC scopes.
8. Choose **Next**
 
Now, review the configurations and choose **Create**.

The url to access you login page should follow the pattern bellow:
```sh
https://{domainconfigured}.auth.sa-east-1.amazoncognito.com/login?response_type={response type}&client_id={app client id}4&redirect_uri={URL configured for redirect afetr login}
```

>>Soon this readme will be updated to teach how to protect endpoints using API Gateway and user groups.
