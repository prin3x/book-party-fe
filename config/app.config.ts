// eslint-disable-next-line import/no-anonymous-default-export
export default {
  production: "production",
  development: "development",
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
};

