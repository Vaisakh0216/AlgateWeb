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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import CreateIcon from "@mui/icons-material/Create";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MoveUpIcon from "@mui/icons-material/MoveUp";
// -----------------------------
// Drawer Component
// -----------------------------
function ApplicationFormDrawer({ open, onClose, onSubmit, editData }) {
  const isEditMode = Boolean(editData);
  const currentRole = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    applicant_name: "",
    email: "",
    phone: "",
    age: "",
    university: "",
    country_id: "",
    plustwo_perc: "",
    degree_perc: "",
    year_of_pass_out: "",
    year_intake: "",
    offered_fee: "",
    amount_paid: "",
    course: "",
    vendor: "",
    fee_proof: null,
    visa_type: "",
    status: "open",
    receipt_url: "",
    service_charges: [
      {
        title: "Upon Registration",
        expected_amount: 0,
        paid_amount: 0,
        pending_amount: 0,
        transactions: [],
      },
      {
        title: "Conditional Offer",
        expected_amount: 0,
        paid_amount: 0,
        pending_amount: 0,
        transactions: [],
      },
      {
        title: "Final Acceptance",
        expected_amount: 0,
        paid_amount: 0,
        pending_amount: 0,
        transactions: [],
      },
      {
        title: "Visa Line Up",
        expected_amount: 0,
        paid_amount: 0,
        pending_amount: 0,
        transactions: [],
      },
      {
        title: "Upon Visa",
        expected_amount: 0,
        paid_amount: 0,
        pending_amount: 0,
        transactions: [],
      },
    ],
  });

  const [countryList, setCountryList] = useState([]);
  const [loadingDefaults, setLoadingDefaults] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/countries")
      .then((res) => setCountryList(res?.data || []))
      .catch(() => setCountryList([]));
  }, []);

  // Populate when editing
  useEffect(() => {
    if (!isEditMode) return;

    const id =
      editData?.id ||
      editData?._id ||
      editData?.application_id ||
      editData?.[0];
    if (!id) return;

    setLoadingDefaults(true);
    axiosInstance
      .get(`/applications/${id}`)
      .then((res) => {
        const d = res?.data?.data ?? res?.data;
        if (d) {
          setFormData((prev) => ({
            ...prev,
            applicant_name: d.applicant_name ?? "",
            email: d.email ?? "",
            phone: d.phone ?? "",
            age: d.age ?? "",
            university: d.university ?? "",
            country_id: d.country_id ?? "",
            plustwo_perc: d.plustwo_perc ?? "",
            degree_perc: d.degree_perc ?? "",
            year_of_pass_out: d.year_of_pass_out ?? "",
            year_intake: d.year_intake ?? "",
            offered_fee: d.offered_fee ?? "",
            amount_paid: d.amount_paid ?? "",
            course: d.course ?? "",
            vendor: d.vendor ?? "",
            visa_type: d.visa_type ?? "",
            status: d.status ?? "open",
            receipt_url:
              d?.service_charges?.[0]?.transactions?.[0]?.receipt_url || "",
          }));
        }
      })
      .finally(() => setLoadingDefaults(false));
  }, [isEditMode, editData]);

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (
        key !== "receipt_url" &&
        key !== "vendor" &&
        key !== "status" &&
        key !== "service_charges"
      ) {
        if (!formData[key]) newErrors[key] = "This field is required";
      }
    });

    if (!isEditMode && !formData.fee_proof)
      newErrors.fee_proof = "Payment proof is required";

    setErrors(newErrors);
    if (isEditMode) {
      delete newErrors.offered_fee;
      delete newErrors.amount_paid;
      delete newErrors.fee_proof;
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fee_proof") {
      setFormData((prev) => ({ ...prev, fee_proof: files[0] }));
      setErrors((prev) => ({ ...prev, fee_proof: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const updatedFormData = { ...formData };
    const registrationCharge = updatedFormData.service_charges?.find(
      (s) => s.title === "Upon Registration"
    );

    if (registrationCharge) {
      registrationCharge.expected_amount = Number(formData.offered_fee) || 0;
      registrationCharge.paid_amount = Number(formData.amount_paid) || 0;
      registrationCharge.pending_amount =
        registrationCharge.expected_amount - registrationCharge.paid_amount;

      if (registrationCharge.paid_amount > 0) {
        registrationCharge.transactions = [
          {
            date: new Date().toISOString(),
            amount: registrationCharge.paid_amount,
            mode: "Bank Transfer",
            note: "Initial registration payment",
            receipt: formData.fee_proof || null,
          },
        ];
      }
    }

    updatedFormData.service_charges = updatedFormData.service_charges.map(
      (sc) => (sc.title === "Upon Registration" ? registrationCharge : sc)
    );

    onSubmit?.(updatedFormData, isEditMode);
    onClose();
  };

  useEffect(() => {
    if (open && !isEditMode) {
      setFormData({
        applicant_name: "",
        email: "",
        phone: "",
        age: "",
        university: "",
        country_id: "",
        plustwo_perc: "",
        degree_perc: "",
        year_of_pass_out: "",
        year_intake: "",
        offered_fee: "",
        amount_paid: "",
        course: "",
        vendor: "",
        fee_proof: null,
        visa_type: "",
        status: "open",
        receipt_url: "",
        service_charges: [
          {
            title: "Upon Registration",
            expected_amount: 0,
            paid_amount: 0,
            pending_amount: 0,
            transactions: [],
          },
          {
            title: "Conditional Offer",
            expected_amount: 0,
            paid_amount: 0,
            pending_amount: 0,
            transactions: [],
          },
          {
            title: "Final Acceptance",
            expected_amount: 0,
            paid_amount: 0,
            pending_amount: 0,
            transactions: [],
          },
          {
            title: "Visa Line Up",
            expected_amount: 0,
            paid_amount: 0,
            pending_amount: 0,
            transactions: [],
          },
          {
            title: "Upon Visa",
            expected_amount: 0,
            paid_amount: 0,
            pending_amount: 0,
            transactions: [],
          },
        ],
      });
      setErrors({});
    }
  }, [open, isEditMode]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 600,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {isEditMode ? "Update Application" : "Add New Application"}
        </Typography>
        <Divider />

        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
        >
          <TextField
            label="Full Name"
            name="applicant_name"
            fullWidth
            variant="outlined"
            value={formData.applicant_name}
            onChange={handleChange}
            error={!!errors.applicant_name}
            helperText={errors.applicant_name}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
        >
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
          />
        </div>

        {!isEditMode && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TextField
                label="Select Visa Type"
                name="visa_type"
                select
                fullWidth
                variant="outlined"
                value={formData.visa_type}
                onChange={handleChange}
                error={!!errors.visa_type}
                helperText={errors.visa_type}
              >
                <MenuItem value="student">Student Visa</MenuItem>
                <MenuItem value="job">Job Visa</MenuItem>
              </TextField>
              <TextField
                label="Country"
                name="country_id"
                select
                fullWidth
                variant="outlined"
                value={formData.country_id}
                onChange={handleChange}
                error={!!errors.country_id}
                helperText={errors.country_id}
              >
                {countryList?.map((country) => (
                  <MenuItem key={country?.id} value={country?.id}>
                    {country?.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TextField
                label="University / College / Institute"
                name="university"
                fullWidth
                variant="outlined"
                value={formData.university}
                onChange={handleChange}
                error={!!errors.university}
                helperText={errors.university}
              />
              <TextField
                label="Course"
                name="course"
                fullWidth
                variant="outlined"
                value={formData.course}
                onChange={handleChange}
                error={!!errors.course}
                helperText={errors.course}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TextField
                label="12th Mark (%)"
                name="plustwo_perc"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.plustwo_perc}
                onChange={handleChange}
                error={!!errors.plustwo_perc}
                helperText={errors.plustwo_perc}
              />
              <TextField
                label="Degree Mark (%)"
                name="degree_perc"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.degree_perc}
                onChange={handleChange}
                error={!!errors.degree_perc}
                helperText={errors.degree_perc}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TextField
                label="Intake"
                name="year_intake"
                fullWidth
                variant="outlined"
                value={formData.year_intake}
                onChange={handleChange}
                error={!!errors.year_intake}
                helperText={errors.year_intake}
              />
              <TextField
                label="Year of Passout"
                name="year_of_pass_out"
                fullWidth
                variant="outlined"
                value={formData.year_of_pass_out}
                onChange={handleChange}
                error={!!errors.year_of_pass_out}
                helperText={errors.year_of_pass_out}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TextField
                label="Offered Registration Fee"
                name="offered_fee"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.offered_fee}
                onChange={handleChange}
                error={!!errors.offered_fee}
                helperText={errors.offered_fee}
              />
              <TextField
                label="Amount Student Paying Now"
                name="amount_paid"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.amount_paid}
                onChange={handleChange}
                error={!!errors.amount_paid}
                helperText={errors.amount_paid}
              />
            </div>

            <div>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Upload Fee Payment Proof
              </Typography>
              <input
                type="file"
                name="fee_proof"
                accept="image/*,application/pdf"
                onChange={handleChange}
              />
              {errors.fee_proof && (
                <Typography variant="caption" color="error">
                  {errors.fee_proof}
                </Typography>
              )}
            </div>
          </>
        )}

        {isEditMode && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TextField
                label="12th Mark (%)"
                name="plustwo_perc"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.plustwo_perc}
                onChange={handleChange}
                error={!!errors.plustwo_perc}
                helperText={errors.plustwo_perc}
              />
              <TextField
                label="Degree Mark (%)"
                name="degree_perc"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.degree_perc}
                onChange={handleChange}
                error={!!errors.degree_perc}
                helperText={errors.degree_perc}
              />
            </div>

            <TextField
              label="Year of Passout"
              name="year_of_pass_out"
              fullWidth
              variant="outlined"
              value={formData.year_of_pass_out}
              onChange={handleChange}
              error={!!errors.year_of_pass_out}
              helperText={errors.year_of_pass_out}
            />

            {currentRole != "counsellor" && (
              <TextField
                label="Vendor"
                name="vendor"
                fullWidth
                variant="outlined"
                value={formData.vendor}
                onChange={handleChange}
              />
            )}

            {formData.receipt_url && (
              <Box sx={{ mt: 2 }}>
                <div
                  style={{
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
                    Transaction Receipt
                  </Typography>
                  <a
                    href={formData?.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#332C6A" }}
                  >
                    <OpenInNewIcon fontSize="small" sx={{ fontSize: "18px" }} />
                  </a>
                </div>

                {formData.receipt_url.endsWith(".pdf") ? (
                  <iframe
                    src={formData.receipt_url}
                    title="Receipt"
                    width="100%"
                    height="400px"
                    style={{ border: "1px solid #ddd", borderRadius: "8px" }}
                  />
                ) : (
                  <img
                    src={formData.receipt_url}
                    alt="Receipt"
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                    }}
                  />
                )}
              </Box>
            )}
          </>
        )}

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "inherit" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: "#332C6A", textTransform: "inherit" }}
            disabled={loadingDefaults}
          >
            {isEditMode ? (loadingDefaults ? "Loading..." : "Update") : "Add"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

// -----------------------------
// Main Table Component
// -----------------------------
export default function ApplicationTable({
  applications,
  tabeHeaders,
  actionFunction,
  deleteFunction,
  pagination,
  onPageChange,
  onPerPageChange,
  searchValue,
  setSortBy,
  sortBy,
  loading,
  filterAnchorEl,
  filters,
  setFilters,
  setFilterAnchorEl,
}) {
  const navigate = useNavigate();
  const currentRole = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const countries = localStorage.getItem("countries");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedApplicationForTransfer, setSelectedApplicationForTransfer] =
    useState(null);
  const [confirmTransferDialog, setConfirmTransferDialog] = useState({
    open: false,
    user: null,
  });

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    selectedId: null,
  });

  const handleSubmit = (formData, isEditMode) => {
    if (isEditMode) {
      const id =
        editData && typeof editData === "object" && !Array.isArray(editData)
          ? editData.id
          : Array.isArray(editData)
          ? editData[0]
          : undefined;
      actionFunction({ ...formData, id }, "update");
    } else {
      actionFunction(formData, "create");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteDialog({ open: true, selectedId: id });
  };

  const handleDeleteConfirm = async () => {
    if (deleteFunction && deleteDialog.selectedId) {
      await deleteFunction(deleteDialog.selectedId);
    }
    setDeleteDialog({ open: false, selectedId: null });
  };

  const hasData = applications && applications.length > 0;

  // NEW: fetch users (once, when transfer dialog first opens)
  const fetchUsers = async () => {
    if (allUsers.length) return;
    try {
      setLoadingUsers(true);
      const res = await axiosInstance.get("/users", {
        params: {
          role_id: 4,
        },
      }); // adjust endpoint if needed
      // expect array of { id, name, email, ... }
      setAllUsers(res?.data?.data || []);
    } catch (err) {
      setAllUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  // NEW: open transfer dialog for transdering application
  const handleOpenTransferDialog = async (app, event) => {
    event.stopPropagation();
    setSelectedApplicationForTransfer(app);
    setUserDialogOpen(true);
    await fetchUsers();
  };

  // NEW: filtered users based on search
  const filteredUsers = allUsers.filter((u) => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return true;
    const name = (u.name || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    return name.includes(q) || email.includes(q);
  });

  // NEW: confirm transfer handler
  const handleConfirmTransfer = () => {
    if (!selectedApplicationForTransfer || !confirmTransferDialog.user) return;

    const app = selectedApplicationForTransfer;

    const applicationId =
      app && typeof app === "object" && !Array.isArray(app)
        ? app.id
        : Array.isArray(app)
        ? app[0]
        : undefined;

    const userId = confirmTransferDialog.user.id;

    // You can handle "transfer" in parent via actionFunction
    actionFunction(
      { application_id: applicationId, user_id: userId },
      "transfer"
    );

    setConfirmTransferDialog({ open: false, user: null });
    setSelectedApplicationForTransfer(null);
  };

  return (
    <div>
      <Box sx={{ minHeight: "100vh" }}>
        <Card style={{ borderRadius: "20px" }}>
          <CardContent>
            {/* Header Section */}
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
                      style={{
                        borderRadius: "20px",
                        textTransform: "inherit",
                        marginLeft: "10px",
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
                        label="Country"
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={filters?.country_id}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            country_id: e.target.value,
                          }))
                        }
                        sx={{ mb: 2 }}
                      >
                        <MenuItem value="">All</MenuItem>
                        {JSON.parse(countries)?.map((c) => (
                          <MenuItem key={c.id} value={c.id}>
                            {c.name}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        select
                        label="Status"
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={filters?.status}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        sx={{ mb: 2 }}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
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
                      onClick={() => {
                        setEditData(null);
                        setOpen(true);
                      }}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </Box>
            </Box>

            {/* Table Section */}
            <TableContainer sx={{ border: "1px solid #ddd", borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: "#f3f8fc" }}>
                  <TableRow>
                    {tabeHeaders?.map((headers) => (
                      <TableCell key={headers} sx={{ fontWeight: 700 }}>
                        {headers}
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
                        sx={{ bgcolor: idx % 2 === 1 ? "#f8fcff" : "white" }}
                        onClick={() =>
                          navigate(`/application/${app[0]}/${app[1]}}`)
                        }
                      >
                        {tabeHeaders.map((header, i) => (
                          <TableCell key={i}>
                            {(() => {
                              const value =
                                typeof app === "object" && !Array.isArray(app)
                                  ? app[header]
                                  : Array.isArray(app)
                                  ? app[i] ?? ""
                                  : "";

                              if (header.toLowerCase() === "status") {
                                let bgColor = "#e0e0e0";
                                if (value?.toLowerCase() === "open")
                                  bgColor = "#fff3cd";
                                else bgColor = "#d4edda";

                                return (
                                  <Box
                                    sx={{
                                      backgroundColor: bgColor,
                                      color: "#000",
                                      padding: "4px 10px",
                                      display: "inline-block",
                                      fontWeight: 600,
                                      textTransform: "capitalize",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {value || "-"}
                                  </Box>
                                );
                              }

                              return i === 0
                                ? (pagination.current_page - 1) *
                                    pagination.per_page +
                                    (idx + 1)
                                : value;
                            })()}
                          </TableCell>
                        ))}
                        <TableCell align="center">
                          {currentRole != "counsellor" && (
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                const id =
                                  app &&
                                  typeof app === "object" &&
                                  !Array.isArray(app)
                                    ? app.id
                                    : Array.isArray(app)
                                    ? app[0]
                                    : undefined;
                                handleDeleteClick(id);
                              }}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          )}
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditData(app);
                              setOpen(true);
                            }}
                          >
                            <CreateIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={(e) => handleOpenTransferDialog(app, e)}
                          >
                            <MoveUpIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

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

      <ApplicationFormDrawer
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        editData={editData}
      />

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, selectedId: null })}
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontSize: "16px", fontWeight: "700" }}>
          Delete Application
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "15px" }}>
            Are you sure you want to delete this application?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, selectedId: null })}
            color="inherit"
            sx={{ textTransform: "inherit" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            sx={{ backgroundColor: "#332C6A", textTransform: "inherit" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* NEW: user selection dialog for transfer */}
      <Dialog
        open={userDialogOpen}
        onClose={() => {
          setUserDialogOpen(false);
          setUserSearch("");
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontSize: "16px", fontWeight: 700 }}>
          Transfer Application
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            size="small"
            placeholder="Search user by name or email"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {loadingUsers ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 3,
              }}
            >
              <CircularProgress size={28} />
            </Box>
          ) : filteredUsers.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No users found.
            </Typography>
          ) : (
            <List dense>
              {filteredUsers.map((user) => (
                <ListItem
                  key={user.id}
                  button
                  onClick={() => {
                    setUserDialogOpen(false);
                    setConfirmTransferDialog({ open: true, user });
                  }}
                >
                  <ListItemText
                    primary={user.name}
                    secondary={user.email}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                    secondaryTypographyProps={{ fontSize: 12 }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setUserDialogOpen(false);
              setUserSearch("");
            }}
            sx={{ textTransform: "inherit" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* NEW: confirmation dialog for transfer */}
      <Dialog
        open={confirmTransferDialog.open}
        onClose={() => setConfirmTransferDialog({ open: false, user: null })}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: "16px", fontWeight: "700" }}>
          Confirm Transfer
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "15px" }}>
            {`Would you like to transfer this application to ${
              confirmTransferDialog.user?.name || "this user"
            }?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setConfirmTransferDialog({ open: false, user: null })
            }
            color="inherit"
            sx={{ textTransform: "inherit" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmTransfer}
            variant="contained"
            sx={{ backgroundColor: "#332C6A", textTransform: "inherit" }}
          >
            Yes, Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
