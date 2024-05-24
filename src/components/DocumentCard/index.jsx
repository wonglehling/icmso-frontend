import * as React from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {formatDate} from "../../utils/stringFormatter"

import testImg from "../../assets/test.jpeg";
import "./index.css";

export default function DocumentCard({ handleClickDoc, doc_info, setSelectedDocId, setClickFavAction }) {
  const handleClickFavIcon = (docId, isFav) => {
    doc_info.is_favourite=!doc_info.is_favourite
    setSelectedDocId(docId)
    setClickFavAction(isFav? "remove": "add")
  }
  return (
    <Card sx={{ maxWidth: 345 }} className="mb-4">
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
            title={doc_info.resource_file_info.resource_file_name}
            subheader={formatDate(doc_info.resource_file_info.resource_uploaded_at)}
          />
        </div>
        <div
          style={{ height: "160px", justifyContent: "center", display: "flex" }}
        >
          <CardMedia
            sx={{
              display: "block",
              maxWidth: "194px",
              maxHeight: "160px",
              width: "auto",
              height: "auto",
              margin: "auto",
              marginRight: "auto",
            }}
            component="img"
            height="194"
            image={testImg}
            alt="Paella dish"
          />
        </div>
      </div>
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing sx={{ paddingTop: 0 }}>
        <IconButton onClick={()=> handleClickFavIcon(doc_info._id, doc_info.is_favourite)} aria-label="add to favorites" sx={doc_info.is_favourite ? {backgroundColor: 'rgba(0, 0, 0, 0.04)', color: 'red', }: {}}>
          <FavoriteIcon sx={{ width: 16, height: 16 }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ width: 16, height: 16 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
