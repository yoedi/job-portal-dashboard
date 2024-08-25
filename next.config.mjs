/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'vadjrwpoflyylgzrgkvd.supabase.co'
        }]
    }
};

export default nextConfig;
