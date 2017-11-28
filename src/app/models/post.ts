export class Post {
    title: String;
    content: String;
    tags: {};
    base64: any;
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
}

export class Posts {
  posts: Post2[];
}
