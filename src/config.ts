export const SITE = {
  website: "https://alec-c4.com/", // replace this with your deployed domain
  author: "Alexey Poimtsev",
  profile: "https://alec-c4.com/",
  desc: "Alexey Poimtsev, geek, digital punk, entrepreneur.",
  title: "I'm Mary Poppins, y'all!",
  ogImage: "alec-c4.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/alec-c4/alec-c4.com/edit/master/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Moscow", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
