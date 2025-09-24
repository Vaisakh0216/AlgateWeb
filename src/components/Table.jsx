import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  MoreHoriz as MoreHorizIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const applications = [
  {
    name: "Parviz Aslanov",
    avatar: "https://i.pravatar.cc/40?img=1",
    university: "Buckinghamshire New University",
    course: "Msc International Business Management",
    remarks: "Academic document is yet to upload.",
    status: "Open",
  },
  {
    name: "Seving Aslanova",
    avatar: "https://i.pravatar.cc/40?img=2",
    university: "Buckinghamshire New University",
    course: "Biomedical Science",
    remarks: "Passport copy shared.",
    status: "Open",
  },
  {
    name: "Ceyhun Aslanov",
    avatar: "https://i.pravatar.cc/40?img=3",
    university: "University of Chester",
    course: "Bachelor of Science with Honours",
    remarks: "Passport copy requested.",
    status: "Open",
  },
  {
    name: "Ayla Məmmədova",
    avatar: "https://i.pravatar.cc/40?img=4",
    university: "University of Chester",
    course: "Bachelor of Science with Honours",
    remarks: "Interview is pending",
    status: "In Progress",
  },
  {
    name: "Parviz Aslanov",
    avatar: "https://i.pravatar.cc/40?img=1",
    university: "Buckinghamshire New University",
    course: "Msc International Business Management",
    remarks: "Academic document is yet to upload.",
    status: "Open",
  },
  {
    name: "Seving Aslanova",
    avatar: "https://i.pravatar.cc/40?img=2",
    university: "Buckinghamshire New University",
    course: "Biomedical Science",
    remarks: "Passport copy shared.",
    status: "Open",
  },
  {
    name: "Ceyhun Aslanov",
    avatar: "https://i.pravatar.cc/40?img=3",
    university: "University of Chester",
    course: "Bachelor of Science with Honours",
    remarks: "Passport copy requested.",
    status: "Open",
  },
  {
    name: "Ayla Məmmədova",
    avatar: "https://i.pravatar.cc/40?img=4",
    university: "University of Chester",
    course: "Bachelor of Science with Honours",
    remarks: "Interview is pending",
    status: "In Progress",
  },
];

const statusColors = {
  Open: { bg: "#e8f0fe", color: "#1a73e8" },
  "In Progress": { bg: "#e6f4ea", color: "#137333" },
};

export default function ApplicationTable() {
  const navigate = useNavigate();
  const base = location.pathname;
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Card style={{ borderRadius: "20px" }}>
        <CardContent>
          {/* Top Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Button
                  variant="outlined"
                  startIcon={<SortIcon />}
                  style={{ borderRadius: "20px", textTransform: "inherit" }}
                >
                  Sort
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  style={{
                    borderRadius: "20px",
                    textTransform: "inherit",
                    marginLeft: "10px",
                  }}
                >
                  Filter
                </Button>
              </div>
              <div>
                <TextField
                  size="small"
                  placeholder="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  style={{
                    backgroundColor: "#332C6A",
                    color: "white",
                    textTransform: "inherit",
                    marginLeft: "10px",
                  }}
                >
                  Add
                </Button>
              </div>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer sx={{ border: "1px solid #ddd", borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#f3f8fc" }}>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>University</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      bgcolor: idx % 2 === 1 ? "#f8fcff" : "white",
                    }}
                    onClick={() => navigate(`${base}/asas`)}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar src={app.avatar} />
                        <Typography>{app.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{app.university}</TableCell>
                    <TableCell>{app.course}</TableCell>
                    <TableCell>{app.remarks}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          bgcolor: statusColors[app.status].bg,
                          color: statusColors[app.status].color,
                          px: 2,
                          py: 0.5,
                          borderRadius: "20px",
                          display: "inline-block",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        {app.status}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {app.status === "Open" ? (
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        <IconButton>
                          <MoreHorizIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button size="small">‹</Button>
              <Button
                size="small"
                variant="contained"
                sx={{ bgcolor: "#1a73e8" }}
              >
                1
              </Button>
              <Button size="small">2</Button>
              <Button size="small">3</Button>
              <Typography sx={{ alignSelf: "center" }}>…</Typography>
              <Button size="small">10</Button>
              <Button size="small">›</Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Showing</Typography>
              <Select size="small" defaultValue={10}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
