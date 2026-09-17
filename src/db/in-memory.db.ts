import { Blog } from "../blogs/types/blog";
import { Post } from "../posts/types/post";

export const inMemoryDB = {
  blogs: <Blog[]>[
    {
      id: "1",
      name: "My blog",
      description: "My blog description",
      websiteUrl: "https://myblog.com",
    },
    {
      id: "2",
      name: "My blog 2",
      description: "My blog 2 description",
      websiteUrl: "https://myblog2.com",
    },
    {
      id: "3",
      name: "My blog 3",
      description: "My blog 3 description",
      websiteUrl: "https://myblog3.com",
    },
  ],
  posts: <Post[]>[],
};
