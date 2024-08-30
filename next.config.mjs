/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath : "/deck-map",
    output: "export", 
    experimental : {
        addDir : true
    },
    images : {
        unoptimized : true
    }
};

export default nextConfig;
