import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://alec-c4.com",
  author: "Alexey Poimtsev",
  desc: "Blog of Alexey Poimtsev",
  title: "I'm Mary Poppins, y'all!",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/alec-c4",
    linkTitle: ` ${SITE.author} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/aleksei.poimtsev",
    linkTitle: `${SITE.author} on Facebook`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/alec_c4",
    linkTitle: `${SITE.author} on Instagram`,
    active: false,
  },
  {
    name: "Mail",
    href: "mailto:alexey.poimtsev@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/alec_c4",
    linkTitle: `${SITE.author} on Twitter`,
    active: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/79268891632",
    linkTitle: `${SITE.author} on WhatsApp`,
    active: true,
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/user/alec-c4",
    linkTitle: `${SITE.author} on Reddit`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://t.me/alec_c4",
    linkTitle: `${SITE.author} on Telegram`,
    active: true,
  },
];
