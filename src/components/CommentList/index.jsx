import * as React from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDateTime } from "../../utils/stringFormatter"


import testImg from "../../assets/test.jpeg";
import "./index.css";
import { Divider } from "@mui/material";

export default function CommentList({ handleClickDoc = undefined, doc_info }) {
  return (
    <>
      <div sx={{ width: '100%', cursor: 'pointer' }} className="mb-1 mt-1">
        <div onClick={handleClickDoc}>
          <div className="user-name">
            <CardHeader
              sx={{ padding: "8px" }}
              avatar={
                <Avatar
                  sx={{ bgcolor: '#1c277e', width: 24, height: 24 }}
                  aria-label="recipe"
                >
                {doc_info && doc_info.comment_created_by_user_id && doc_info.comment_created_by_user_id.user_first_name && doc_info.comment_created_by_user_id.user_first_name[0]}
                </Avatar>
              }
              title={<><span>{doc_info.comment_created_by_user_id.user_first_name + ' ' + doc_info.comment_created_by_user_id.user_last_name}</span></>}
              subheader={formatDateTime(doc_info.createdAt)}
            />
          </div>
          <div
            style={{ height: "48px", display: "flex", padding: "8px" }}
          >
            {doc_info.comment_message}
          </div>
        </div>
        {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect
        </Typography>
      </CardContent> */}

      </div>
      <Divider />
    </>
  );
}
