import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../assets/logo.png";

const Invoice = () => {
  const invoiceRef = useRef();

  // Editable fields
  const [billTo, setBillTo] = useState(
    `Green1 Materials LLC\n#34, Car street\nCity park\nHonk Kong`
  );
  const [descriptions, setDescriptions] = useState([
    "Desktop furniture",
    "Plumbing and electrical services",
    "Water tank repair works",
  ]);
  const [payee, setPayee] = useState("John Doe");

  const items = [
    { qty: 1, rate: 232 },
    { qty: 2, rate: 514 },
    { qty: 2, rate: 152 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const paid = 232;
  const balanceDue = subtotal - paid;

  const downloadPDF = async () => {
    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 10; // mm
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = (canvas.height * contentWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", margin, margin, contentWidth, contentHeight);
    pdf.save("invoice.pdf");
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #ccc",
      background: "#fff",
    },
    header: {
      textAlign: "center",
      color: "#332C6A",
      fontSize: "28px",
      fontWeight: "bold",
    },
    section: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    companyInfo: {
      lineHeight: "1.6",
    },
    billTo: {
      marginTop: "10px",
      lineHeight: "1.6",
      whiteSpace: "pre-line",
    },
    invoiceDetails: {
      textAlign: "right",
      lineHeight: "1.6",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "30px",
    },
    th: {
      backgroundColor: "#332C6A",
      color: "white",
      padding: "10px",
      border: "1px solid #ccc",
    },
    td: {
      padding: "10px",
      border: "1px solid #ccc",
      textAlign: "right",
    },
    tdLeft: {
      textAlign: "left",
    },
    input: {
      width: "100%",
      border: "none",
      background: "transparent",
      fontSize: "14px",
      fontFamily: "inherit",
      resize: "none",
    },
    totalSection: {
      marginTop: "20px",
      textAlign: "right",
      lineHeight: "1.8",
    },
    paymentInstructions: {
      marginTop: "30px",
      fontWeight: "bold",
    },
    signature: {
      marginTop: "40px",
      textAlign: "right",
    },
    signatureImg: {
      width: "100px",
      height: "40px",
      objectFit: "contain",
    },
    logo: {
      width: "150px",
      height: "75px",
      objectFit: "contain",
      display: "block",
      marginLeft: "auto",
    },
    downloadBtn: {
      marginTop: "30px",
      padding: "10px 20px",
      backgroundColor: "#332C6A",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <div ref={invoiceRef}>
        <div style={styles.header}>INVOICE</div>

        <div style={styles.section}>
          <div style={styles.companyInfo}>
            <div>
              <strong>Ad4tech Material LLC</strong>
            </div>
            <div>67h, Martin street</div>
            <div>Alexander road</div>
            <div>576832</div>
            <div>Mobile: +123456789</div>
            <div>Email: ad4example@gmail.com</div>
          </div>
          <img src={Logo} alt="Logo" style={styles.logo} />
        </div>

        <div style={styles.section}>
          <div>
            <div style={{ fontWeight: "bold", marginTop: "30px" }}>Bill To</div>
            <textarea
              value={billTo}
              onChange={(e) => setBillTo(e.target.value)}
              rows={4}
              style={{ ...styles.input, ...styles.billTo }}
            />
          </div>

          <div style={styles.invoiceDetails}>
            <div>
              <strong>Invoice No :</strong> INV-005
            </div>
            <div>
              <strong>Invoice Date :</strong> Jun 22, 2021
            </div>
            <div>
              <strong>Due Date :</strong> Jun 27, 2021
            </div>
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Sl.</th>
              <th style={{ ...styles.th, textAlign: "left" }}>Description</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Rate</th>
              <th style={styles.th}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr
                key={i}
                style={i % 2 === 1 ? { backgroundColor: "#f2f2f2" } : {}}
              >
                <td style={styles.td}>{i + 1}</td>
                <td style={{ ...styles.td, ...styles.tdLeft }}>
                  <input
                    type="text"
                    value={descriptions[i]}
                    onChange={(e) => {
                      const updated = [...descriptions];
                      updated[i] = e.target.value;
                      setDescriptions(updated);
                    }}
                    style={styles.input}
                  />
                </td>
                <td style={styles.td}>{item.qty}</td>
                <td style={styles.td}>${item.rate.toFixed(2)}</td>
                <td style={styles.td}>${(item.qty * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.totalSection}>
          <div>
            <strong>Subtotal</strong>: ${subtotal.toFixed(2)}
          </div>
          <div>
            <strong>Total</strong>: ${subtotal.toFixed(2)}
          </div>
          <div>Paid (Jun 22, 2021): ${paid.toFixed(2)}</div>
          <div>
            <strong>Balance Due</strong>: ${balanceDue.toFixed(2)}
          </div>
        </div>

        <div style={styles.paymentInstructions}>
          Payment Instructions
          <br />
          <div style={{ fontWeight: "normal" }}>
            Pay Cheque to
            <br />
            <input
              type="text"
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.signature}>
          <img
            src="https://via.placeholder.com/100x40.png?text=Sign"
            alt="Signature"
            style={styles.signatureImg}
          />
          <div>Authorized Signatory</div>
        </div>
      </div>

      <button style={styles.downloadBtn} onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
