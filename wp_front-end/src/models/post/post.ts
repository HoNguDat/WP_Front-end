import { Comment } from "../comment/comment";

export interface Post {
  postId?: number;
  content: string;
  fullName: string;
  groupName: string;
  userId: number | any;
  groupId: number;
  loading?: boolean;
  postImage?: string;
  createdDateTime: any;
  like?: number | any;
  comments?:Comment[];
}
export interface AddPost {
  postId?: number;
  content: string;
  userId: number | any;
  groupId: number;
  imageFile: File | undefined;
}
