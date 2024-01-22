const withPWA = require('next-pwa')({
    dest: 'public',
    // Enable additional route caching when users navigate through pages with next/link.
    cacheOnFrontEndNav: true,
    reloadOnOnline: true,
    disable: false,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

}

module.exports = withPWA(nextConfig);
