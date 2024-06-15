import { config } from 'dotenv';
config();

const nextConfig = {
  reactStrictMode: false,
  env: {
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_BACKEND_BASE_URL: process.env.APP_BACKEND_BASE_URL,
    APP_TITLE: process.env.APP_TITLE,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],

};

export default nextConfig;