import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Stack,
  Divider,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { data, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import { format, parseISO } from "date-fns";
import { useToast } from "../../components/Toast";

const ServiceChargeOverview = () => {
  // Initial charge data
  const param = useParams();
  const [applicationOverview, setApplicationOverview] = useState();
  const [charges, setCharges] = useState([
    {
      stage: "Upon Registration",
      expected: 0,
      payments: [],
    },
    {
      stage: "Conditional Offer",
      expected: 0,
      payments: [],
    },
    {
      stage: "Final Acceptance",
      expected: 0,
      payments: [],
    },
    {
      stage: "Visa Line Up",
      expected: 0,
      payments: [],
    },
    {
      stage: "Upon Visa",
      expected: 0,
      payments: [],
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [newPayment, setNewPayment] = useState({
    amount: "",
    date: "",
    mode: "",
    note: "",
  });
  const { showToast } = useToast();

  const handleOpenModal = (stage) => {
    setSelectedStage(stage);
    setOpenModal(true);
  };

  const selectedPayments = selectedStage?.transactions || [];

  const getApplicationOverview = () => {
    axiosInstance.get(`applications/${param?.id}`).then((res) => {
      setApplicationOverview(res?.data);
    });
  };

  React.useEffect(() => {
    getApplicationOverview();
  }, []);

  const updateExpectedAmount = (index, value) => {
    console.log(
      "the index",
      index,
      applicationOverview?.service_charges[index]?.expected_amount,
      value,
      applicationOverview?.service_charges[index]
    );
    const updated = [...charges];
    updated[index].expected = Number(value);
    setCharges(updated);

    axiosInstance
      .post(`updateServiceCharge`, {
        ...applicationOverview?.service_charges[index],
        expected_amount: value,
      })
      .then((res) => {
        showToast({
          message: "Expected amount updated successfully!",
          severity: "success",
        });
        getApplicationOverview();
      });
  };

  const handleAddPayment = () => {
    axiosInstance
      .post(`updateServiceChargeTransaction`, {
        ...newPayment,
        service_charge_id: selectedStage.id,
      })
      .then((res) => {
        // 2️⃣ Update modal transactions immediately (so it appears without closing)
        const updatedPayment = {
          ...newPayment,
          amount: Number(newPayment.amount),
          id: res?.data?.id || Date.now(), // fallback ID for new entry
          date: newPayment.date,
        };

        // Update selectedStage with new transaction
        setSelectedStage((prev) => ({
          ...prev,
          transactions: [...(prev?.transactions || []), updatedPayment],
        }));
        showToast({
          message: "Transaction added successfully!",
          severity: "success",
        });
        getApplicationOverview();
      });
    // setCharges(updated);
    setNewPayment({ amount: "", date: "", mode: "", note: "" });
  };

  const totalPaidAmount = applicationOverview?.service_charges?.reduce(
    (sum, charge) =>
      sum +
      (charge?.transactions?.reduce(
        (tranSum, trans) => tranSum + Number(trans?.amount || 0),
        0
      ) || 0),
    0
  );

  const totalFeeInc = applicationOverview?.service_charges?.reduce(
    (sum, charge) => sum + Number(charge?.expected_amount || 0),
    0
  );
  // * 1.2;

  const totalFeeExc = applicationOverview?.service_charges?.reduce(
    (sum, charge) => sum + Number(charge?.expected_amount || 0),
    0
  );

  return (
    <div>
      <h3
        style={{
          color: "#332C6A",
          fontSize: "16px",
          fontWeight: "600",
          marginTop: "50px",
        }}
      >
        Overview
      </h3>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
          padding: "20px",
        }}
      >
        {/* Student Info */}
        <Typography
          variant="h5"
          fontWeight={700}
          style={{ textTransform: "capitalize" }}
        >
          {applicationOverview?.applicant_name}
        </Typography>
        <Typography color="text.secondary">
          {applicationOverview?.course}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {applicationOverview?.university}
        </Typography>

        {/* Summary */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={8}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography color="text.secondary">Total Fee (Excl GST)</Typography>
            <Typography variant="h6" fontWeight={700}>
              ₹{totalFeeExc}
            </Typography>
          </Box>
          <Box>
            <Typography color="text.secondary">Total Fee (Incl GST)</Typography>
            <Typography variant="h6" fontWeight={700}>
              ₹{totalFeeInc}
            </Typography>
          </Box>
          <Box>
            <Typography color="text.secondary">Total Paid</Typography>
            <Typography variant="h6" fontWeight={700}>
              ₹{totalPaidAmount}
            </Typography>
          </Box>
          <Box>
            <Typography color="text.secondary">Total Pending</Typography>
            <Typography variant="h6" fontWeight={700}>
              ₹{totalFeeInc - totalPaidAmount}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Table */}
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ boxShadow: "none" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Service Charge</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Expected (₹)</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Paid (₹)</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Pending</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationOverview?.service_charges?.map((c, index) => {
                const paid = c?.transactions?.reduce(
                  (sum, item) => sum + Number(item?.amount || 0),
                  0
                );
                const pending = c.expected_amount - paid;

                return (
                  <TableRow key={index}>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        defaultValue={c.expected_amount}
                        onBlur={(e) =>
                          updateExpectedAmount(index, e.target.value)
                        } // 👈 triggers only on blur
                        sx={{
                          width: 100,
                          "& .MuiInputBase-input": { textAlign: "right" },
                        }}
                      />
                    </TableCell>
                    <TableCell>₹{paid.toLocaleString()}</TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                      >
                        <Typography>₹{pending.toLocaleString()}</Typography>
                        <Button
                          variant="text"
                          size="small"
                          sx={{
                            textTransform: "none",
                            color: "#0052cc",
                            fontWeight: 500,
                          }}
                          onClick={() => handleOpenModal(c)}
                        >
                          View / Add Payment
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              maxWidth: "700px",
              mx: "auto",
              mt: 10,
              p: 3,
              boxShadow: 24,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight={600}>
                Payment History - {selectedStage?.stage}
              </Typography>
              <IconButton onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>

            {/* Payment History */}
            {selectedPayments.length > 0 ? (
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ boxShadow: "none" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount (₹)</TableCell>
                      <TableCell>Mode</TableCell>
                      <TableCell>Note</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedPayments.map((p, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          {format(parseISO(p?.date), "MM-dd-yyyy")}
                        </TableCell>
                        <TableCell>{p.amount.toLocaleString()}</TableCell>
                        <TableCell>{p.mode}</TableCell>
                        <TableCell>{p.note || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                No payments recorded yet.
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Add New Payment */}
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Add New Payment
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Amount (₹)"
                type="number"
                value={newPayment.amount}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, amount: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Date"
                type="date"
                value={newPayment.date}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, date: e.target.value })
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Payment Mode"
                value={newPayment.mode}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, mode: e.target.value })
                }
                fullWidth
                placeholder="UPI, Bank Transfer, Card, etc."
              />
              <TextField
                label="Note"
                value={newPayment.note}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, note: e.target.value })
                }
                fullWidth
                multiline
                minRows={2}
                placeholder="Optional remarks"
              />
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: "#0052cc",
                  textTransform: "none",
                  fontWeight: 500,
                }}
                onClick={handleAddPayment}
              >
                Save Payment
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default ServiceChargeOverview;
