export class Post {
  constructor(
    title: string,
    content: string,
    picUrl: string,
    tags: string[],
    writtenBy: string,
    writtenAt: Date,
    likeCnt: number = 0,
    viewCnt: number = 0
  ) { }
}
