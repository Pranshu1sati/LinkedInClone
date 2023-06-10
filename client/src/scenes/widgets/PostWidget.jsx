import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme,Button } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/index.js";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const main = palette.neutral.main;
  const primary = palette.primary.main;
const handelCommnet =(e)=> {
  setComment(e.target.value);
}

const handleSubmit = (e) => {
  e.preventDefault();
  patchComment(comment);
  setComment("");
  
}
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
const patchComment = async( commentText )=>{
  console.log("Here");
  const response =await fetch(`http://localhost:3001/posts/${postId}/com`,{
    method : "PATCH",
    headers :{
      Authorization : `Bearer ${token}`,
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({ conmentText:commentText }),
  });
  const updatedPost = await response.json();
  dispatch(setPost({ post: updatedPost }));
}
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          
            <FlexBetween gap = "0.25rem">
            <Box flexBasis={"60%"}>
            <form onSubmit={handleSubmit} style={{ display: "inline-flex" }}>
              <input type="text" placeholder="Add a comment " value = {comment} onChange={handelCommnet} style={{ fontSize: "13px" , borderRadius : "3rem", marginRight: "3px" }}></input>
{             !isMobile && <Button
              disabled={!comment}
              onClick={handleSubmit}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
                fontSize: isMobile ? '0.8px' : 'default', // Adjust the font size for mobile screens
                // padding: isMobile ? '0.05rem' : '0.75rem 1.5rem', // Adjust the padding for mobile screens
              }}
            >
              Add
            </Button>}
            </form>
            </Box>
            </FlexBetween>
          
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
