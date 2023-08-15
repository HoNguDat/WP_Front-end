export interface Comment {
  commentId: number;
  content: number;
  userId: number | any;
  postId: number;
  fullName?: string;
}
export interface PostComment {
  commentId?: number;
  content: string;
  userId: number | any;
  postId: number;
}
