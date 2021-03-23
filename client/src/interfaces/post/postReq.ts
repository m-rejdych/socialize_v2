export interface CreatePostReq {
  title: string;
  content: string;
}

export interface UpdatePostReq {
  id: number;
  title?: string;
  content?: string;
}
