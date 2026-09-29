import { WithId } from "mongodb";
import { Blog } from "../../../blogs/types/blog";
import { PostInputDto } from "../../dto/post.input.dto";
import { Post } from "../../types/post";

export function mapPostInputDtoToPost(
  postInputDto: PostInputDto,
  blog: WithId<Blog>,
): Omit<Post, "createdAt"> {
  return {
    title: postInputDto.title,
    shortDescription: postInputDto.shortDescription,
    content: postInputDto.content,
    blogId: postInputDto.blogId,
    blogName: blog.name,
  };
}
