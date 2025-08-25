import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://academiax.in",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://academiax.in/Landing/BigScreen.png"],
    },
    {
      url: "https://academiax.in/auth/login",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://academiax.in/Landing/BigScreenLogin.png"],
    },
  ];
}
