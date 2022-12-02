import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  // const posts = [
  //   {
  //     id: 1,
  //     name: "Gürbüz YALIM",
  //     userId: 1,
  //     profilePic:
  //       "https://cdn.ntvspor.net/2be67bdd74ce415f845af705bf491e66.jpg?mode=crop&w=940&h=626",
  //     desc: "EN BÜYÜK FENERBAHÇE!!",
  //     img: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt5a47d825b4ca2860/62989b269d6766365973ce33/FUPAtDdXwAA45FzJESUS.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Gürbüz YALIN",
  //     userId: 2,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
  //   },
  // ];

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
