/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: [
    {
      source: "/__/auth/:path*",
      destination: `https://${firebaseAuthDomain}/__/auth/:path*`,        
    }
  ]
}

module.exports = nextConfig
