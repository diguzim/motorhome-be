module.exports = ({ env }) => ({
  upload: {
    config:
      env("NODE_ENV") === "production"
        ? {
            // Cloudinary configuration for production
            provider: "cloudinary",
            providerOptions: {
              cloud_name: env("CLOUDINARY_NAME"),
              api_key: env("CLOUDINARY_KEY"),
              api_secret: env("CLOUDINARY_SECRET"),
            },
            actionOptions: {
              upload: {},
              delete: {},
            },
          }
        : {
            // Default local storage for development
            sizeLimit: 100 * 1024 * 1024, // 100MB
          },
  },
});
