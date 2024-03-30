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

import testImg from "../../assets/test.jpeg";
import "./index.css";

export default function DocumentCard({handleClickDoc}) {
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
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ width: 16, height: 16 }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ width: 16, height: 16 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
