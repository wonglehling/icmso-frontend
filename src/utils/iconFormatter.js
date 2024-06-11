import CodeIcon from "assets/icons/file-earmark-code.svg";
import ExcelIcon from "assets/icons/file-earmark-excel.svg";
import ImgIcon from "assets/icons/file-earmark-image.svg";
import PDFIcon from "assets/icons/file-earmark-pdf.svg";
import SlideIcon from "assets/icons/file-earmark-slides.svg";
import WordIcon from "assets/icons/file-earmark-word.svg";
import ZipIcon from "assets/icons/file-earmark-zip.svg";
import FileIcon from "assets/icons/file-earmark.svg";
import FolderIcon from "assets/icons/folder2.svg";
import GroupEditIcon from "assets/icons/group-edit.svg";
import GroupWarningIcon from "assets/icons/group-warning.svg";
import GroupTickIcon from "assets/icons/group-tick.svg";
import ProjectIcon from "assets/icons/project.svg";
import ChatIcon from "assets/icons/chat.svg";

// return correct icon based on file type
export const iconFormatter = (fileName, fileExtension = "") => {
  const fileType = fileExtension === "" ? fileName.split('.').pop() : fileExtension;
  console.log(fileType);
  switch (fileType) {
    case 'pdf':
      return PDFIcon;
    case 'doc': 
    case 'docx':
      return WordIcon;
    case 'ppt': 
    case 'pptx':
      return SlideIcon;
    case 'xls': 
    case 'xlsx':
      return ExcelIcon;
    case 'jpg': 
    case 'jpeg': 
    case 'png':
      return ImgIcon;
    case 'zip': 
    case 'rar':
      return ZipIcon;
    case 'c': 
    case 'cpp': 
    case 'java': 
    case 'py': 
    case 'js': 
    case 'html': 
    case 'css': 
    case 'php': 
    case 'sql': 
    case 'sh': 
    case 'bat': 
    case 'jsx': 
    case 'tsx': 
    case 'ts': 
    case 'rb': 
    case 'go': 
    case 'swift': 
    case 'kt': 
    case 'dart': 
    case 'r': 
    case 'pl': 
    case 'cs': 
    case 'vb': 
    case 'scala': 
    case 'groovy': 
    case 'lua': 
    case 'perl': 
    case 'rust': 
    case 'h': 
    case 'm': 
    case 'mm': 
    case 'swift': 
    case 'kt': 
    case 'dart': 
    case 'r': 
    case 'pl': 
    case 'cs': 
    case 'vb': 
    case 'scala': 
    case 'groovy': 
    case 'lua': 
    case 'perl': 
    case 'rust': 
    case 'h': 
    case 'm': 
    case 'mm':
      return CodeIcon;
    case 'folder':
      return FolderIcon;
    case 'comment-create': 
    case 'comment-update': 
    case 'comment-delete': 
    case 'comment-add': 
    case 'comment-remove': 
      case 'comment':
      return ChatIcon;
    case 'group-update', 'group':
      return GroupEditIcon;
    case 'group-remove', 'group-delete':
      return GroupWarningIcon;
    case 'group-add', 'group-create':
      return GroupTickIcon;
    case 'project', 'project-create', 'project-update', 'project-delete':
      return ProjectIcon;
    default:
      return FileIcon;
  }
};