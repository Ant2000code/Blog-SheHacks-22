import axios from "axios";
export const getComments = async () => {
      let comments=[];
    axios.get('http://localhost:8000/showComments/')
        .then((response)=>{
         comments= response.data;
         
        })
        .catch(error=>console.log(error));

        if(comments.length>0)
        return comments;
    
    //   {
    //     id: "1",
    //     body: "First comment",
    //     username: "Jack",
    //     userId: "1",
    //     parentId: null,
    //     createdAt: "2021-08-16T23:00:33.010+02:00",
    //   },
    //   {
    //     id: "2",
    //     body: "Second comment",
    //     username: "John",
    //     userId: "2",
    //     parentId: null,
    //     createdAt: "2021-08-16T23:00:33.010+02:00",
    //   },
    //   {
    //     id: "3",
    //     body: "First comment first child",
    //     username: "John",
    //     userId: "2",
    //     parentId: "1",
    //     createdAt: "2021-08-16T23:00:33.010+02:00",
    //   },
    //   {
    //     id: "4",
    //     body: "Second comment second child",
    //     username: "John",
    //     userId: "2",
    //     parentId: "2",
    //     createdAt: "2021-08-16T23:00:33.010+02:00",
    //   },
    
  };

  export const createComment = async (text, parentId) => {
      if(parentId==null)
      parentId=0;
      console.log("received"+text);
    const comm={
        body:text,
        parentId:parentId,


    }
    let val={};
    axios.post('http://localhost:8000/showComments/',comm)
    .then((res)=>{val=res.data})
    .catch((err)=>console.log(err))
    return val;
  };

  export const updateComment = async (text) => {
    return { text };
  };

  export const deleteComment = async () => {
    return {};
  };