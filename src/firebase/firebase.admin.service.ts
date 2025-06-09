/* eslint-disable prettier/prettier */
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
@Injectable()
export class FirebaseAdminService implements OnApplicationBootstrap {
  // Initialize Firebase Admin
  // when all module are initialize
  onApplicationBootstrap() {
    const firebaseConfig = {
      type: process.env.TYPE,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.PRIVATE_KEY_ID,
      privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.CLIENT_EMAIL,
      clientId: process.env.CLIENT_ID,
      authUri: process.env.AUTH_URL,
      tokenUri: process.env.TOKEN_URL,
      authProviderX509CertUrl: process.env.AUTH_PROVIDER_CERT_URL,
      clientX509CertUrl: process.env.CLIENT_PROVIDER_CERT_URL,
      universeDomain: process.env.UNIVERSE_DOMAIN,
      storageBucket: `${process.env.STORAGE_BUCKET}.appspot.com`,
    } as admin.ServiceAccount;

    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      storageBucket: `${process.env.STORAGE_BUCKET}.appspot.com`,
    });
  }
  async verifyToken(token: string): Promise<DecodedIdToken> {
    console.log('firebase-id-token', token);
    return await admin.auth().verifyIdToken(token);
  }
}

export default admin;
