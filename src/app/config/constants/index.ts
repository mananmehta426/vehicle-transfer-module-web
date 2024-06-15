const app = {
  baseUrl: process.env.APP_BASE_URL || '',
  backendUrl: process.env.APP_BACKEND_BASE_URL || '',
  title: process.env.APP_TITLE || '',
  description: process.env.APP_DESCRIPTION || '',
};

export default app;
