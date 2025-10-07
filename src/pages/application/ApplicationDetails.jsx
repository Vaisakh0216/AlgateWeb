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

  // Store which steps are expanded
  const [expandedSteps, setExpandedSteps] = React.useState([]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Toggle individual step
  const handleStepClick = (index) => {
    setExpandedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Expand or collapse all steps
  const handleExpandCollapseAll = () => {
    if (expandedSteps.length === steps.length) {
      setExpandedSteps([]); // Collapse all
    } else {
      setExpandedSteps(steps.map((_, index) => index)); // Expand all
    }
  };

  const allExpanded = expandedSteps.length === steps.length;

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      {/* <Drawer open={open} onClose={toggleDrawer(false)} anchor="right"> */}
      <div style={{ height: "100%" }}>
        {/* Header */}
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
            padding: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#332C6A",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "white", fontSize: "30px" }}>J</h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
            }}
          >
            <span style={{ fontWeight: "600" }}>Jishan</span>
            <span style={{ fontSize: "12px" }}>alexarawles@gmail.com</span>
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
              {steps.map((step, index) => (
                <Step key={step.label} expanded>
                  <StepLabel
                    onClick={() => handleStepClick(index)}
                    sx={{
                      cursor: "pointer",
                      userSelect: "none",
                      fontWeight: 600,
                    }}
                  >
                    {step.label}
                  </StepLabel>

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
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        {/* <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard />
                        <FilePreviewCard /> */}
                      </div>
                      {/* <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <FileUploader />
                      </div>
                      <div>
                        <CommentInputBox />
                      </div> */}
                    </StepContent>
                  )}
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </div>
      {/* </Drawer> */}
    </div>
  );
}
