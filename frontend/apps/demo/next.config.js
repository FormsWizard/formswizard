module.exports = (phase, { defaultConfig }) => {
  const githubDeployment = process.env.GITHUB_ACTIONS;

  const nextConfig = {
    ...defaultConfig,

    reactStrictMode: true,
    transpilePackages: [],
    output: 'export',
    basePath: githubDeployment ? '/formswizard' : undefined
  }
  return nextConfig
}
