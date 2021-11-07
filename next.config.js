module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['links.papareact.com', 'fakestoreapi.com', 'm.media-amazon.com'],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSEGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
};
