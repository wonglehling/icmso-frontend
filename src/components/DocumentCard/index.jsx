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
import { formatDate } from "../../utils/stringFormatter"

import CodeIcon from "../../assets/icons/file-earmark-code.svg";
import ExcelIcon from "../../assets/icons/file-earmark-excel.svg";
import ImgIcon from "../../assets/icons/file-earmark-image.svg";
import PDFIcon from "../../assets/icons/file-earmark-pdf.svg";
import SlideIcon from "../../assets/icons/file-earmark-slides.svg";
import WordIcon from "../../assets/icons/file-earmark-word.svg";
import ZipIcon from "../../assets/icons/file-earmark-zip.svg";
import FileIcon from "../../assets/icons/file-earmark.svg";
import "./index.css";

export default function DocumentCard({ handleClickDoc, doc_info, setSelectedDocId, setClickFavAction }) {
  const handleClickFavIcon = (docId, isFav) => {
    doc_info.is_favourite = !doc_info.is_favourite
    setSelectedDocId(docId)
    setClickFavAction(isFav ? "remove" : "add")
  }
  function getResourceTypeImg(fileName) {
    //split string by '.' and get the last element
    const fileType = fileName.split('.').pop();
    switch (fileType) {
      case 'pdf':
        return PDFIcon;
      case 'doc', 'docx':
        return WordIcon;
      case 'ppt', 'pptx':
        return SlideIcon;
      case 'xls', 'xlsx':
        return ExcelIcon;
      case 'jpg', 'jpeg', 'png':
        return ImgIcon;
      case 'zip', 'rar':
        return ZipIcon;
      case 'c', 'cpp', 'java', 'py', 'js', 'html', 'css', 'php', 'sql', 'sh', 'bat', 'jsx', 'tsx', 'ts', 'rb', 'go', 'swift', 'kt', 'dart', 'r', 'pl', 'cs', 'vb', 'scala', 'groovy', 'lua', 'perl', 'rust', 'h', 'm', 'mm', 'swift', 'kt', 'dart', 'r', 'pl', 'cs', 'vb', 'scala', 'groovy', 'lua', 'perl', 'rust', 'h', 'm', 'mm':
        return CodeIcon;
      default:
        return FileIcon;
    }
  }
  return (
    <Card sx={{ width: 200 }} className="mb-4">
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
            image={getResourceTypeImg(doc_info.resource_file_info?.resource_file_name)}
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
        <IconButton onClick={() => handleClickFavIcon(doc_info._id, doc_info.is_favourite)} aria-label="add to favorites" sx={doc_info.is_favourite ? { backgroundColor: 'rgba(0, 0, 0, 0.04)', color: 'red', } : {}}>
          <FavoriteIcon sx={{ width: 16, height: 16 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
