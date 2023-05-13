/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: [
    {
      source: "/__/auth/:path*",
      destination: `https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}/__/auth/:path*`,        
    }
  ]
}

module.exports = nextConfig
