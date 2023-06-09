import React from 'react'
import Navbar from '../navbar/Navbar'
import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import UserWidget from '../widgets/UserWidgets';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from '../widgets/Advert';
import FriendListWidget from '../widgets/FriendListWidget';
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const {_id, picturePath } = useSelector((state)=>state.user)

  return (

    <div>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        {/* post stuff widget  */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
           <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
          {isNonMobileScreens && <Box flexBasis={"26%"}>
            <Box sx={{ mb: '2rem' }}><AdvertWidget></AdvertWidget></Box>
            <FriendListWidget userId={_id}/>
            </Box>}
        </Box>
    </div>
  )
}

export default HomePage