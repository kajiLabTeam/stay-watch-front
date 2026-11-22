// Firebase Auth のリダイレクト用ハンドラ (/__/auth/*) は Firebase Hosting が提供するパス。
// authDomain をこのサイトのドメインにするため、firebaseapp.com へプロキシする。
const FIREBASE_HOST = 'stay-watch-a616f.firebaseapp.com';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    url.hostname = FIREBASE_HOST;
    url.port = '';
    return fetch(new Request(url, request));
  },
};
