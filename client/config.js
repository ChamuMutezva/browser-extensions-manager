export const API_ENDPOINT_PATH =
    process.env.NODE_ENV === "production"
        ? "https://markdown-editor-back.onrender.com"
        : "http://localhost:3000/api/extensions";
