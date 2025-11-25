import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
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
  Drawer,
  Divider,
  Pagination,
  Skeleton,
} from "@mui/material";

import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

export default function ServiceChargeTable({
  applications,
  tabeHeaders,
  actionFunction,
  pagination,
  onPageChange,
  onPerPageChange,
  searchValue,
  loading,
}) {
  const navigate = useNavigate();
  const currentRole = localStorage.getItem("role");
  const [open, setOpen] = useState(false);

  const handleSubmit = (formData) => {
    actionFunction(formData);
  };

  const hasData = applications && applications.length > 0;

  return (
    <div>
      <Box sx={{ minHeight: "100vh" }}>
        <Card style={{ borderRadius: "20px" }}>
          <CardContent>
            {/* Filters and Search - Only show if there is data or still loading */}
            {(loading || hasData) && (
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
                      onChange={(e) => searchValue(e.target.value)}
                    />
                    {currentRole === "counsellor" && (
                      <Button
                        style={{
                          backgroundColor: "#332C6A",
                          color: "white",
                          textTransform: "inherit",
                          marginLeft: "10px",
                        }}
                        onClick={() => setOpen(true)}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                </Box>
              </Box>
            )}

            <TableContainer sx={{ border: "1px solid #ddd", borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: "#f3f8fc" }}>
                  <TableRow>
                    {tabeHeaders?.map((headers) => (
                      <TableCell
                        key={headers}
                        sx={{ bgcolor: "#f3f8fc", fontWeight: 700 }}
                      >
                        {headers}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                      <TableRow key={idx}>
                        {tabeHeaders.map((_, i) => (
                          <TableCell key={i}>
                            <Skeleton variant="text" width="80%" height={24} />
                          </TableCell>
                        ))}
                        <TableCell align="center">
                          <Skeleton variant="circular" width={24} height={24} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : !hasData ? (
                    <TableRow>
                      <TableCell
                        colSpan={tabeHeaders.length + 1}
                        align="center"
                        sx={{ py: 6 }}
                      >
                        <Typography variant="h6" color="text.secondary">
                          No Data Found!
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    applications.map((app, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          bgcolor: idx % 2 === 1 ? "#f8fcff" : "white",
                        }}
                        onClick={() => navigate(`/serviceCharge/${app[0]}`)}
                      >
                        {app.map((cell, i) => (
                          <TableCell key={i}>
                            {i === 0
                              ? (pagination.current_page - 1) *
                                  pagination.per_page +
                                (idx + 1)
                              : cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination - Only show if there is data */}
            {pagination && hasData && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Pagination
                  count={pagination.last_page}
                  page={pagination.current_page}
                  onChange={(e, page) => onPageChange(page)}
                  color="primary"
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography>Showing</Typography>
                  <Select
                    size="small"
                    value={pagination.per_page}
                    onChange={(e) => onPerPageChange(e.target.value)}
                  >
                    {[10, 20, 50].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography>per page</Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
