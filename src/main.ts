import { bootstrapApplication } from '@angular/platform-browser';
import { Amplify } from 'aws-amplify';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_UEx6VbyVG', // Ej: us-east-1_AbCdEf
      userPoolClientId: 'vdovdhoe739uu60e53u6n3fbv',
      loginWith: {
        email: true, // Opciones de login
      }
    }
  }
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
