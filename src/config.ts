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
    url: "https://github.com/alec-c4/alec-c4.com/edit/master/src/data/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
  dynamicOgImage: true,
} as const;
