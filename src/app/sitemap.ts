import type { MetadataRoute } from "next";

export const runtime = "edge";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://academiax.in",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://academiax.in/Landing/BigScreen.png"],
    },
    {
      url: "https://academiax.in/auth/login",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://academiax.in/Landing/BigScreenLogin.png"],
    },
    {
      url: "https://academiax.in/about",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://academiax.in/privacy",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://academiax.in/contact",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
