import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Firebase 웹 설정은 공개되어도 되는 값이다 (서버 키 아님).
// public/firebase-messaging-sw.js 의 설정과 동일하게 유지할 것.
const firebaseApp = initializeApp({
    apiKey: 'AIzaSyDIeKgdotnu9zvRvYNKnVry8Nuw6r7s7_8',
    authDomain: 'pillgood-138b1.firebaseapp.com',
    projectId: 'pillgood-138b1',
    storageBucket: 'pillgood-138b1.appspot.com',
    messagingSenderId: '63398292257',
    appId: '1:63398292257:web:bdf80d64a9a75d249d6c60',
    measurementId: 'G-6KFN50FF08',
});

export const messaging = getMessaging(firebaseApp);

// VAPID 공개 키 (공개 가능)
export const VAPID_KEY = 'BOUH7VnfqJhHUd9CXxw1_QwjB_lScFbFAgPb9P-JOcNE8VavuYuOgSw5s9dLiTZfS0yYGv5RI1dCkYSeLxxvmmI';
