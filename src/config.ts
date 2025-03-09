export const SITE = {
  website: "https://alec-c4.com/", // replace this with your deployed domain
  author: "Alexey Poimtsev",
  profile: "https://alec-c4.com/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "I'm Mary Poppins, y'all!",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    url: "https://github.com/alec-c4/alec-c4.com/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
} as const;
