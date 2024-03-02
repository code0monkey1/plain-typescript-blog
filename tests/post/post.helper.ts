import { Post } from "../../src/main/post/post-types";

 const initialPosts:Omit<Post,'id'|'comments'> []=[
    {
      body:"a",
      subject:"s1",
      userId:"65e2a5941cdeb2b1119a985f"
    },
      {
      body:"b",
      subject:"s2",
      userId:'65e2a5941cdeb2b1119a985f'
    },
      {
      body:"c",
      subject:"s3",
      userId:'65e2a5941cdeb2b1119a985f'
    }
  ]


  export default {
    initialPosts
  }