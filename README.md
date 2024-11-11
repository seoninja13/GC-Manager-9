# GC App

## Environment Setup

1. Copy the environment example file:
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

2. Update `src/environments/environment.ts` with your Firebase and SendGrid credentials:
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  },
  sendgrid: {
    apiKey: 'YOUR_SENDGRID_API_KEY'
  }
};
```

3. For production, create `src/environments/environment.prod.ts` with your production credentials.

Note: Environment files are excluded from version control to protect sensitive credentials.