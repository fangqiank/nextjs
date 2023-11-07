/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		// serverActions: true,
		serverComponentsExternalPackages: ['mongoose']
	},
	webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ],
  },
}

module.exports = nextConfig
