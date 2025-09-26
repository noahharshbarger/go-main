const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
  dataset: "production",
  apiVersion: "2023-06-19",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, 
  useCdn: false,
};

export default config;