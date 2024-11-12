/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
          "glanse-master-s3.s3.eu-north-1.amazonaws.com",
          "glanse-master-s3.s3.amazonaws.com"
      ]
  }
};

export default nextConfig;
