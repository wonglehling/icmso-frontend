import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { iconFormatter } from '../../utils/iconFormatter';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

export default function DirectoryViewTable({ data = {}, handleOnClickContent }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data.resource)
    console.log("data", data);
    if (data.resource.length == 0) {
      setTableData([])

    }
  }, [data])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "50%" }}>File Name</TableCell>
              <TableCell>Uploaded by</TableCell>
              <TableCell>Uploaded Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length != 0 && tableData.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" onClick={() => handleOnClickContent(row)} sx={{ display: 'flex', cursor: "pointer" }}>
                  <div style={{ filter: "invert(10%) sepia(50%) saturate(5621%) hue-rotate(233deg) brightness(92%) contrast(92%)" }}>
                    <img src={iconFormatter(row.resource_file_info.resource_file_name, row.resource_type === "folder" ? "folder" : "")} alt="" style={{ marginRight: '8px' }} />
                  </div>
                  {row.resource_title}
                </TableCell>
                <TableCell>{row.resource_uploaded_by_user.user_first_name + " " + row.resource_uploaded_by_user.user_last_name}</TableCell>
                <TableCell>
                  <>
                    {row.createdAt}
                      
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
