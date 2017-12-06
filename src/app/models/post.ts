export class Comment {
  comment: string;
  username: string;
}

export class Post {
  title: String;
  content: String;
  base64: any;
  tags: {};
  comments: {};
}

export class Tag {
  tag: String;
}
export class Post2{
  title: String;
  content: String;
  picUrl: String;
  tags: {};
  writtenBy: any;
	writtenAt: String;
	likeCnt: number;
  viewCnt: number;
  comments: {};
}

export class Posts {
  posts: Post2[];
}
