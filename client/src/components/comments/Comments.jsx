import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  // const comments = [
  //   {
  //     id: 1,
  //     desc: "ŞAMPİYON",
  //     name: "Yalım Gürbüz",
  //     userId: 1,
  //     profilePicture:
  //       "https://www.cumhuriyet.com.tr/Archive/2022/10/13/080729005-jorge-jesus-fenerbahce.jpg",
  //   },
  //   {
  //     id: 2,
  //     desc: "FENERBAHÇE",
  //     name: "Yalım Gürbüz",
  //     userId: 2,
  //     profilePicture:
  //       "https://i2.milimaj.com/i/milliyet/75/0x0/6362964a86b2495370f580f9.jpg",
  //   },
  // ];
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Yorum Yazınız"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Gönder</button>
      </div>
      {error
        ? "Bazı şeyler ters gitti"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
