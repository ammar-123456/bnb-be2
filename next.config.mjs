

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "utfs.io", // Tillåt 'utfs.io'
          port: "",
          pathname: "/**", // Tillåt alla paths från denna domän
        },
        {
          protocol: "http",
          hostname: "localhost", // Om du också använder localhost
          port: "3000", // Specifik port om nödvändigt
          pathname: "/**", // Tillåt alla paths
        },
      ],
    },
  };
  
  export default nextConfig;
  