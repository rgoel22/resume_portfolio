const isGithubPages = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    assetPrefix: isGithubPages ? '/resume-portfolio/' : '',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
