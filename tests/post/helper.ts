import { Post } from "../../src/main/post/post-types";


 export const initialPosts:Omit<Post,'id'|'comments'> []=[
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



  const someUserInfo={
     user : {
          name:"some_name",
          username:"some_username",
          email:"some_email@gmail.com",
          password:"some_password"
        },

      userId:"65e587aa491c70c47fae49d1",

       token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1ODdhYTQ5MWM3MGM0N2ZhZTQ5ZDEiLCJ1c2VybmFtZSI6InNvbWVfdXNlcm5hbWUiLCJpYXQiOjE3MDk1NDEzODl9.geaEYzY-jtEg5y7zU5pvz9InlZOSDgxYymzVVr269GY"
  }

  const otherUserInfo={

       user:{
            username: "some_other_username",
            name: "some_other_name",
            email: "some_other_email@gmail.com",
            id : "65e58956491c70c47fae49d8"
        }, 
        
        userId: "65e58956491c70c47fae49d8",
        
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1ODk1NjQ5MWM3MGM0N2ZhZTQ5ZDgiLCJ1c2VybmFtZSI6InNvbWVfb3RoZXJfdXNlcm5hbWUiLCJpYXQiOjE3MDk1NDE4MTd9.a-Rn-QjAcPecVn2zrgxlr5Mj2-zRBOAp6geVxicwa9Q"
    
  }




  export const getInvalidToken=()=>"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1ODAyMTEwNmM5OTM0ZWE2MjUwMjMiLCJ1c2VybmFtZSI6InNrZCIsImlhdCI6MTcwOTUzOTM2N30.sdsXf_CgGzozF1VrwNXWXjE96mEFIkN_UmdC3ApKfk"


  export default {
    initialPosts,
    getInvalidToken,
    someUserInfo,
    otherUserInfo
  }