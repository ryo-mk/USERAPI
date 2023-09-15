import React, { useEffect, useState } from 'react';
import "./Post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Users } from "../../dummyData";
import axios from "axios";

export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/users/${post.userId}');
      // console.log(response);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  const handleLike = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={user.profilePicture}
              alt="" className="postProfileImg" />
            <span className="postUserName">
              {user.username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={PUBLIC_FOLDER + post.photo} alt="" className='postImg' />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={PUBLIC_FOLDER + "/heart.png"}
              alt="" className='likeIcon'
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">{like}人がいいねを押しました</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  )
}
