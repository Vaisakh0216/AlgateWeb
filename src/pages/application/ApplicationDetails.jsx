import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import FileUploader from "../../FileUploader";
import FilePreviewCard from "../../uploadedFile";
import CommentInputBox from "../../commentBox";
import axiosInstance from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import PendingUploadCard from "../../components/PendingUpload";
import MessageIcon from "@mui/icons-material/Message";

const steps = [
  {
    label: "Documents Collection",
    description: `- Proof of Sponsorship - In case you are sponsored by a family/relative, a notarized declaration of sponsorship to be submitted. Proof of professional status of the sponsor – contract of employment, pay slips for the last 3 months; self-employed – certificate of registration of the Company, company’s bank statements for the last three months dully signed and stamped by the bank and Current years ITR`,
  },
  {
    label: "University Interview",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "English Test (150 mins / 2 weeks)",
    description: `Try out different ad text to see what brings in the most customers.`,
  },
  {
    label: "Start Financials & AIC Coordination",
    description: `Try out different ad text to see what brings in the most customers.`,
  },
  {
    label: "Letter of Acceptance & Invoices",
    description: `Learn how to enhance your ads using features like ad extensions.`,
  },
  {
    label: "Pay Tuition Fees",
    description: `Learn how to enhance your ads using features like ad extensions.`,
  },
  {
    label: "Prepare Study & Dorm Agreements",
    description: `Learn how to enhance your ads using features like ad extensions.`,
  },
  {
    label: "Sign & Send Back Agreements",
    description: `Learn how to enhance your ads using features like ad extensions.`,
  },
  {
    label: "Receive Visa Letters & AIC Confirmation",
    description: `Learn how to enhance your ads using features like ad extensions.`,
  },
  {
    label: "Hello Verification (₹14,000)",
    description: `Learn how to enhance your ads using features like ad extensions.`,
  },
  ,
  {
    label: "Prepare Documents from Checklist",
    description: `Learn how to enhance your ads using features like ad extensions.`,
  },
  {
    label: "Visa Submission",
    description: `Learn how to enhance your ads using features like ad extensions.`,
  },
];

export default function ApplicationDetail() {
  const [open, setOpen] = React.useState(false);
  const [applicationSteps, setApplicationSteps] = React.useState();
  const [expandedSteps, setExpandedSteps] = React.useState([]);
  const para = useParams();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleStepClick = (index) => {
    setExpandedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleExpandCollapseAll = () => {
    if (expandedSteps.length === steps.length) {
      setExpandedSteps([]);
    } else {
      setExpandedSteps(steps.map((_, index) => index));
    }
  };

  const allExpanded = expandedSteps.length === steps.length;

  const getApplicationSteps = () => {
    axiosInstance
      .get(`applications/${para?.id}/full-with-responses`)
      .then((res) => {
        setApplicationSteps(res?.data?.application);
      });

    // axiosInstance.get(`countries/${para?.id}/full-steps`).then((res) => {
    //   setApplicationSteps(res?.data?.steps);
    // });
  };

  React.useEffect(() => {
    getApplicationSteps();
  }, []);

  // console.log("this is details", applicationSteps);
  // const match = data.description.match(/\[(.*?)\]/);
  // const documents = match ? match[1].split(/\s*,\s*/) : [];

  return (
    <div>
      <div style={{ height: "100%" }}>
        <div
          style={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ color: "#332C6A" }}>Application</h3>
        </div>

        {/* User Info */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "24px 28px",
            margin: "20px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            border: "1px solid #f0f0f0",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Profile Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  backgroundColor: "#332C6A",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "28px",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                {applicationSteps?.applicant_name?.charAt(0)?.toUpperCase() ||
                  "U"}
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1a1a1a",
                  }}
                >
                  {applicationSteps?.applicant_name || "--"}
                </h3>
                <p
                  style={{
                    margin: "4px 0 2px",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  {applicationSteps?.email || "--"}
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#332C6A",
                marginBottom: "16px",
              }}
            >
              Personal Information
            </h4>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px 24px",
                fontSize: "14px",
              }}
            >
              <div>
                <span style={{ color: "#888" }}>Age</span>
                <p
                  style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
                >
                  {applicationSteps?.age || "--"}
                </p>
              </div>

              <div>
                <span style={{ color: "#888" }}>Phone</span>
                <p
                  style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
                >
                  {applicationSteps?.phone || "--"}
                </p>
              </div>

              <div>
                <span style={{ color: "#888" }}>Degree %</span>
                <p
                  style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
                >
                  {applicationSteps?.degree_perc
                    ? `${applicationSteps.degree_perc}%`
                    : "--"}
                </p>
              </div>

              <div>
                <span style={{ color: "#888" }}>Plus Two %</span>
                <p
                  style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
                >
                  {applicationSteps?.plustwo_perc
                    ? `${applicationSteps.plustwo_perc}%`
                    : "--"}
                </p>
              </div>

              <div>
                <span style={{ color: "#888" }}>Intake Year</span>
                <p
                  style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
                >
                  {applicationSteps?.year_intake || "--"}
                </p>
              </div>

              <div>
                <span style={{ color: "#888" }}>Passout Year</span>
                <p
                  style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
                >
                  {applicationSteps?.year_of_pass_out || "--"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
              Process Steps
            </h4>

            {/* Expand/Collapse All Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "center",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleExpandCollapseAll}
                sx={{
                  mb: 2,
                  textTransform: "inherit",
                  height: "30px",
                  backgroundColor: "#332C6A",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {allExpanded ? "Collapse" : "Expand"}
              </Button>
            </div>
          </div>

          <Box>
            <Stepper orientation="vertical" nonLinear>
              {applicationSteps?.steps?.map((step, index) => (
                <Step key={step.title} expanded>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between", // ✅ keeps icon at far right
                      width: "100%",
                    }}
                  >
                    <StepLabel
                      onClick={() => handleStepClick(index)}
                      sx={{
                        cursor: "pointer",
                        userSelect: "none",
                        fontWeight: 600,
                      }}
                    >
                      {step.title}
                    </StepLabel>

                    <MessageIcon
                      style={{
                        color: "green",
                        padding: "3px",
                        borderRadius: "50%",
                        border: "1px solid green",
                        fontSize: "15px",
                        backgroundColor: "white",
                      }}
                    />
                  </div>

                  {expandedSteps.includes(index) && (
                    <StepContent>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "16px",
                          justifyContent: "flex-start",
                        }}
                      >
                        {step?.description
                          ?.match(/\[(.*?)\]/)?.[1]
                          ?.split(/\s*,\s*/)
                          ?.map((item, index) => (
                            <PendingUploadCard
                              key={index}
                              name={item.trim()}
                              id={step?.id}
                              attachmentName={step?.attachments?.map(
                                (file) => file
                              )}
                            />
                          ))}
                      </div>
                    </StepContent>
                  )}
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </div>
    </div>
  );
}
