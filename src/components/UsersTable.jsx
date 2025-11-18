// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   InputAdornment,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Pagination,
//   Skeleton,
//   Drawer,
//   Divider,
//   Menu,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   FilterList as FilterListIcon,
//   Sort as SortIcon,
//   DeleteOutline as DeleteOutlineIcon,
// } from "@mui/icons-material";
// import axiosInstance from "../config/axiosConfig";
// import { useToast } from "./Toast";

// export default function UsersTable({
//   applications,
//   tabeHeaders,
//   pagination,
//   onPageChange,
//   onPerPageChange,
//   searchValue,
//   setSortBy,
//   sortBy,
//   filterAnchorEl,
//   filters,
//   setFilters,
//   setFilterAnchorEl,
//   loading,
//   refreshData,
// }) {
//   const currentRole = localStorage.getItem("role");
//   const [open, setOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const { showToast } = useToast();

//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   const roleOptions = [
//     { id: "2", name: "Admin" },
//     { id: "4", name: "Process" },
//     { id: "3", name: "Counsellor" },
//   ];

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: { id: "", name: "" },
//   });

//   const hasData = applications && applications.length > 0;

//   const handleOpenDrawer = (user = null) => {
//     if (user) {
//       setEditingUser(user);
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         role: {
//           id: user?.role?.id?.toString() || "",
//           name: user?.role?.name || "",
//         },
//       });
//     } else {
//       setEditingUser(null);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: { id: "", name: "" },
//       });
//     }
//     setOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       if (editingUser) {
//         await axiosInstance
//           .put(`/user/${editingUser.id}`, {
//             ...formData,
//           })
//           .then(() => {
//             showToast({
//               message: "User updated successfully!",
//               severity: "success",
//             });
//           });
//       } else {
//         await axiosInstance
//           .post("/register", {
//             ...formData,
//             sys_customer_id: 2,
//             sys_role_id: formData.role.id,
//             password_confirmation: formData.password,
//           })
//           .then(() => {
//             showToast({
//               message: "User created successfully!",
//               severity: "success",
//             });
//           });
//       }

//       setOpen(false);
//       refreshData();
//     } catch (err) {
//       console.error(err);
//       showToast({
//         message: "Something went wrong!",
//         severity: "error",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ✅ Delete handlers
//   const handleDeleteClick = (user) => {
//     setUserToDelete(user);
//     setDeleteDialogOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!userToDelete) return;
//     setDeleting(true);
//     try {
//       await axiosInstance.delete(`/user/${userToDelete.id}`);
//       showToast({
//         message: "User deleted successfully!",
//         severity: "success",
//       });
//       refreshData();
//     } catch (err) {
//       console.error(err);
//       showToast({
//         message: "Failed to delete user!",
//         severity: "error",
//       });
//     } finally {
//       setDeleting(false);
//       setDeleteDialogOpen(false);
//       setUserToDelete(null);
//     }
//   };

//   return (
//     <Box sx={{ minHeight: "100vh" }}>
//       <Card sx={{ borderRadius: "20px" }}>
//         <CardContent>
//           {/* Header Controls */}
//           {(loading || hasData) && (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 mb: 2,
//                 flexWrap: "wrap",
//                 gap: 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   width: "100%",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div>
//                   <Button
//                     variant="outlined"
//                     startIcon={
//                       <SortIcon
//                         style={{
//                           transform:
//                             sortBy === "asc"
//                               ? "rotate(180deg)"
//                               : "rotate(0deg)",
//                           transition: "transform 0.3s ease",
//                         }}
//                       />
//                     }
//                     style={{ borderRadius: "20px", textTransform: "inherit" }}
//                     onClick={() => {
//                       setSortBy((prev) => (prev === "asc" ? "desc" : "asc"));
//                     }}
//                   >
//                     Sort
//                   </Button>
//                   <>
//                     <Button
//                       variant="outlined"
//                       startIcon={<FilterListIcon />}
//                       sx={{
//                         borderRadius: "20px",
//                         textTransform: "inherit",
//                         ml: 1,
//                       }}
//                       onClick={(e) => setFilterAnchorEl(e.currentTarget)}
//                     >
//                       Filter
//                     </Button>
//                     <Menu
//                       anchorEl={filterAnchorEl}
//                       open={Boolean(filterAnchorEl)}
//                       onClose={() => setFilterAnchorEl(null)}
//                       PaperProps={{
//                         sx: { p: 2, borderRadius: 2, minWidth: 260 },
//                       }}
//                     >
//                       <Typography
//                         variant="subtitle1"
//                         fontWeight={600}
//                         sx={{ mb: 1 }}
//                       >
//                         Filter Applications
//                       </Typography>

//                       <TextField
//                         select
//                         label="Role"
//                         size="small"
//                         fullWidth
//                         variant="outlined"
//                         value={filters?.role_id}
//                         onChange={(e) =>
//                           setFilters((prev) => ({
//                             ...prev,
//                             role_id: e.target.value,
//                           }))
//                         }
//                         sx={{ mb: 2 }}
//                       >
//                         <MenuItem value="">All</MenuItem>
//                         <MenuItem value="2">Admin</MenuItem>
//                         <MenuItem value="4">Processor</MenuItem>
//                         <MenuItem value="3">Counselor</MenuItem>
//                       </TextField>

//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           gap: 1.5,
//                           mt: 2,
//                         }}
//                       >
//                         <Button
//                           fullWidth
//                           variant="outlined"
//                           color="inherit"
//                           sx={{ textTransform: "inherit" }}
//                           onClick={() => {
//                             setFilters({
//                               country_id: "",
//                               status: "",
//                               application_processor: "",
//                               application_counselor: "",
//                             });
//                             setFilterAnchorEl(false);
//                           }}
//                         >
//                           Clear
//                         </Button>
//                       </Box>
//                     </Menu>
//                   </>
//                 </div>

//                 <div>
//                   <TextField
//                     size="small"
//                     placeholder="Search"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <SearchIcon />
//                         </InputAdornment>
//                       ),
//                     }}
//                     onChange={(e) => searchValue && searchValue(e.target.value)}
//                   />
//                   {currentRole === "admin" && (
//                     <Button
//                       sx={{
//                         backgroundColor: "#332C6A",
//                         color: "white",
//                         textTransform: "inherit",
//                         ml: 1,
//                       }}
//                       onClick={() => handleOpenDrawer()}
//                     >
//                       Add
//                     </Button>
//                   )}
//                 </div>
//               </Box>
//             </Box>
//           )}

//           {/* Table */}
//           <TableContainer sx={{ border: "1px solid #ddd", borderRadius: 2 }}>
//             <Table>
//               <TableHead sx={{ bgcolor: "#f3f8fc" }}>
//                 <TableRow>
//                   {tabeHeaders?.map((header) => (
//                     <TableCell key={header} sx={{ fontWeight: 700 }}>
//                       {header}
//                     </TableCell>
//                   ))}
//                   <TableCell align="center" sx={{ fontWeight: 700 }}>
//                     Action
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   Array.from({ length: 5 }).map((_, idx) => (
//                     <TableRow key={idx}>
//                       {tabeHeaders.map((_, i) => (
//                         <TableCell key={i}>
//                           <Skeleton variant="text" width="80%" height={24} />
//                         </TableCell>
//                       ))}
//                       <TableCell align="center">
//                         <Skeleton variant="circular" width={24} height={24} />
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : !hasData ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={tabeHeaders.length + 1}
//                       align="center"
//                       sx={{ py: 6 }}
//                     >
//                       <Typography variant="h6" color="text.secondary">
//                         No Data Found!
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   applications.map((app, idx) => (
//                     <TableRow
//                       key={idx}
//                       hover
//                       sx={{
//                         bgcolor: idx % 2 === 1 ? "#f8fcff" : "white",
//                         cursor: currentRole === "admin" ? "pointer" : "default",
//                       }}
//                       onClick={() =>
//                         currentRole === "admin"
//                           ? handleOpenDrawer(app.original)
//                           : null
//                       }
//                     >
//                       {app.display.map((cell, i) => (
//                         <TableCell key={i}>{cell}</TableCell>
//                       ))}
//                       <TableCell align="center">
//                         <IconButton
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteClick(app.original);
//                           }}
//                         >
//                           <DeleteOutlineIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//           {pagination && hasData && (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mt: 2,
//               }}
//             >
//               <Pagination
//                 count={pagination.last_page}
//                 page={pagination.current_page}
//                 onChange={(e, page) => onPageChange(page)}
//                 color="primary"
//               />
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Typography>Showing</Typography>
//                 <Select
//                   size="small"
//                   value={pagination.per_page}
//                   onChange={(e) => onPerPageChange(e.target.value)}
//                 >
//                   {[10, 20, 50].map((num) => (
//                     <MenuItem key={num} value={num}>
//                       {num}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 <Typography>per page</Typography>
//               </Box>
//             </Box>
//           )}
//         </CardContent>
//       </Card>

//       {/* Drawer for Add/Edit */}
//       <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ width: 400, p: 3 }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             {editingUser ? "Update User" : "Add New User"}
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Name"
//               fullWidth
//               margin="normal"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               required
//             />
//             <TextField
//               label="Email"
//               fullWidth
//               margin="normal"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               required
//             />
//             <TextField
//               label="Phone"
//               fullWidth
//               margin="normal"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//             />

//             <Select
//               fullWidth
//               displayEmpty
//               value={formData.role?.id || ""}
//               onChange={(e) => {
//                 const selected = roleOptions.find(
//                   (r) => r.id === e.target.value
//                 );
//                 setFormData({
//                   ...formData,
//                   role: selected || { id: "", name: "" },
//                 });
//               }}
//               renderValue={(selected) => {
//                 if (!selected) {
//                   return <span style={{ color: "#aaa" }}>Select Role</span>;
//                 }
//                 const role = roleOptions.find((r) => r.id === selected);
//                 return role ? role.name : "Select Role";
//               }}
//               sx={{ mt: 2 }}
//             >
//               {roleOptions.map((r) => (
//                 <MenuItem key={r.id} value={r.id}>
//                   {r.name}
//                 </MenuItem>
//               ))}
//             </Select>

//             {!editingUser && (
//               <TextField
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 margin="normal"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 required
//               />
//             )}

//             <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
//               <Button
//                 onClick={() => setOpen(false)}
//                 sx={{ mr: 1, textTransform: "inherit" }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={submitting}
//                 sx={{ bgcolor: "#332C6A", textTransform: "inherit" }}
//               >
//                 {submitting ? "Saving..." : "Save"}
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       </Drawer>

//       {/* ✅ Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete{" "}
//             <strong>{userToDelete?.name}</strong>? .
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setDeleteDialogOpen(false)}
//             sx={{ textTransform: "inherit" }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleConfirmDelete}
//             color="error"
//             variant="contained"
//             disabled={deleting}
//             sx={{ textTransform: "inherit", backgroundColor: "#332C6A" }}
//           >
//             {deleting ? "Deleting..." : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

import React, { useState } from "react";
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
  Pagination,
  Skeleton,
  Drawer,
  Divider,
  Menu,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  DeleteOutline as DeleteOutlineIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import axiosInstance from "../config/axiosConfig";
import { useToast } from "./Toast";

export default function UsersTable({
  applications,
  tabeHeaders,
  pagination,
  onPageChange,
  onPerPageChange,
  searchValue,
  setSortBy,
  sortBy,
  filterAnchorEl,
  filters,
  setFilters,
  setFilterAnchorEl,
  loading,
  refreshData,
}) {
  const currentRole = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const roleOptions = [
    { id: "2", name: "Admin" },
    { id: "4", name: "Process" },
    { id: "3", name: "Counsellor" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: { id: "", name: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  const hasData = applications && applications.length > 0;

  const handleOpenDrawer = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: {
          id: user?.role?.id?.toString() || "",
          name: user?.role?.name || "",
        },
        password: "",
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: { id: "", name: "" },
      });
    }
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingUser) {
        // Build payload: keep previous behavior but only include password when provided
        const payload = { ...formData };
        if (!formData.password) {
          // remove password fields so backend won't try to reset it
          delete payload.password;
          delete payload.password_confirmation;
        } else {
          // include confirmation if password provided
          payload.password_confirmation = formData.password;
        }

        await axiosInstance.put(`/user/${editingUser.id}`, payload).then(() => {
          showToast({
            message: "User updated successfully!",
            severity: "success",
          });
        });
      } else {
        await axiosInstance
          .post("/register", {
            ...formData,
            sys_customer_id: 2,
            sys_role_id: formData.role.id,
            password_confirmation: formData.password,
          })
          .then(() => {
            showToast({
              message: "User created successfully!",
              severity: "success",
            });
          });
      }

      setOpen(false);
      refreshData();
    } catch (err) {
      console.error(err);
      showToast({
        message: err?.response?.data?.message,
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Delete handlers
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setDeleting(true);
    try {
      await axiosInstance.delete(`/user/${userToDelete.id}`);
      showToast({
        message: "User deleted successfully!",
        severity: "success",
      });
      refreshData();
    } catch (err) {
      console.error(err);
      showToast({
        message: "Failed to delete user!",
        severity: "error",
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Card sx={{ borderRadius: "20px" }}>
        <CardContent>
          {/* Header Controls */}
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
                    startIcon={
                      <SortIcon
                        style={{
                          transform:
                            sortBy === "asc"
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    }
                    style={{ borderRadius: "20px", textTransform: "inherit" }}
                    onClick={() => {
                      setSortBy((prev) => (prev === "asc" ? "desc" : "asc"));
                    }}
                  >
                    Sort
                  </Button>
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<FilterListIcon />}
                      sx={{
                        borderRadius: "20px",
                        textTransform: "inherit",
                        ml: 1,
                      }}
                      onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                    >
                      Filter
                    </Button>
                    <Menu
                      anchorEl={filterAnchorEl}
                      open={Boolean(filterAnchorEl)}
                      onClose={() => setFilterAnchorEl(null)}
                      PaperProps={{
                        sx: { p: 2, borderRadius: 2, minWidth: 260 },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{ mb: 1 }}
                      >
                        Filter Applications
                      </Typography>

                      <TextField
                        select
                        label="Role"
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={filters?.role_id}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            role_id: e.target.value,
                          }))
                        }
                        sx={{ mb: 2 }}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="2">Admin</MenuItem>
                        <MenuItem value="4">Processor</MenuItem>
                        <MenuItem value="3">Counselor</MenuItem>
                      </TextField>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 1.5,
                          mt: 2,
                        }}
                      >
                        <Button
                          fullWidth
                          variant="outlined"
                          color="inherit"
                          sx={{ textTransform: "inherit" }}
                          onClick={() => {
                            setFilters({
                              country_id: "",
                              status: "",
                              application_processor: "",
                              application_counselor: "",
                            });
                            setFilterAnchorEl(false);
                          }}
                        >
                          Clear
                        </Button>
                      </Box>
                    </Menu>
                  </>
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
                    onChange={(e) => searchValue && searchValue(e.target.value)}
                  />
                  {currentRole === "admin" && (
                    <Button
                      sx={{
                        backgroundColor: "#332C6A",
                        color: "white",
                        textTransform: "inherit",
                        ml: 1,
                      }}
                      onClick={() => handleOpenDrawer()}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </Box>
            </Box>
          )}

          {/* Table */}
          <TableContainer sx={{ border: "1px solid #ddd", borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#f3f8fc" }}>
                <TableRow>
                  {tabeHeaders?.map((header) => (
                    <TableCell key={header} sx={{ fontWeight: 700 }}>
                      {header}
                    </TableCell>
                  ))}
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Action
                  </TableCell>
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
                      hover
                      sx={{
                        bgcolor: idx % 2 === 1 ? "#f8fcff" : "white",
                        cursor: currentRole === "admin" ? "pointer" : "default",
                      }}
                      onClick={() =>
                        currentRole === "admin"
                          ? handleOpenDrawer(app.original)
                          : null
                      }
                    >
                      {app.display.map((cell, i) => (
                        <TableCell key={i}>
                          {i === 0 ? idx + 1 : cell}
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(app.original);
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
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

      {/* Drawer for Add/Edit */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingUser ? "Update User" : "Add New User"}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <Select
              fullWidth
              displayEmpty
              value={formData.role?.id || ""}
              onChange={(e) => {
                const selected = roleOptions.find(
                  (r) => r.id === e.target.value
                );
                setFormData({
                  ...formData,
                  role: selected || { id: "", name: "" },
                });
              }}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#aaa" }}>Select Role</span>;
                }
                const role = roleOptions.find((r) => r.id === selected);
                return role ? role.name : "Select Role";
              }}
              sx={{ mt: 2 }}
            >
              {roleOptions.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>

            {/* Password field: always visible, required only when creating */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!editingUser}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                onClick={() => setOpen(false)}
                sx={{ mr: 1, textTransform: "inherit" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{ bgcolor: "#332C6A", textTransform: "inherit" }}
              >
                {submitting ? "Saving..." : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{userToDelete?.name}</strong>? .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ textTransform: "inherit" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleting}
            sx={{ textTransform: "inherit", backgroundColor: "#332C6A" }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
