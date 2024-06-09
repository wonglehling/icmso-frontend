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
import {formatDate} from "../../utils/stringFormatter"

import testImg from "../../assets/test.jpeg";
import "./index.css";

export default function ProjectCard({ handleClickDoc, doc_info }) {
  return (
    <Card sx={{ width: '100%', cursor: 'pointer' }} className="mb-4">
      <div onClick={handleClickDoc}>
        <div className="user-name">
          <CardHeader
            sx={{ padding: "8px" }}
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], width: 24, height: 24 }}
                aria-label="recipe"
              >
                R
              </Avatar>
            }
            title={<><span>{doc_info.project_created_by_user_id.user_first_name + ' ' + doc_info.project_created_by_user_id.user_last_name +' / '}</span> <span style={{fontSize: '1rem'}}>{doc_info.project_name}</span></>}
            subheader={formatDate(doc_info.createdAt)}
          />
        </div>
        <div
          style={{ height: "48px", display: "flex", padding: "8px" }}
        >
          {doc_info.project_description}
        </div>
      </div>
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect
        </Typography>
      </CardContent> */}
      
    </Card>
  );
}