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
  tags: String[]; 
  writtenBy: String;
	writtenAt: String;
	likeCnt: String;
	viewCnt: String;
}