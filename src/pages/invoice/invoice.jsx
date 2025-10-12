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
  const [invoiceNo, setInvoiceNo] = useState("INV-005");
  const [invoiceDate, setInvoiceDate] = useState("Jun 22, 2021");
  const [dueDate, setDueDate] = useState("Jun 27, 2021");
  const [payee, setPayee] = useState("John Doe");
  const [paid, setPaid] = useState(232);

  // Dynamic items
  const [items, setItems] = useState([
    { description: "Desktop furniture", qty: 1, rate: 232 },
    { description: "Plumbing and electrical services", qty: 2, rate: 514 },
    { description: "Water tank repair works", qty: 2, rate: 152 },
  ]);

  // Totals
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const balanceDue = subtotal - paid;

  // Handle adding a new row
  const handleAddRow = () => {
    setItems([...items, { description: "", qty: 1, rate: 0 }]);
  };

  // Handle removing a row
  const handleRemoveRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
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
      alignItems: "flex-start",
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
      lineHeight: "1.8",
      minWidth: "220px",
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
      textAlign: "center",
    },
    td: {
      padding: "8px",
      border: "1px solid #ccc",
      textAlign: "center",
    },
    input: {
      border: "none",
      background: "transparent",
      fontSize: "14px",
      fontFamily: "inherit",
    },
    numberInput: {
      width: "60px",
      border: "none",
      background: "transparent",
      fontSize: "14px",
      fontFamily: "inherit",
      textAlign: "right",
    },
    actionBtn: {
      background: "none",
      border: "none",
      color: "#dc2626",
      cursor: "pointer",
      fontSize: "18px",
    },
    addBtn: {
      marginTop: "10px",
      backgroundColor: "#332C6A",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
      borderRadius: "4px",
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

        {/* Header section */}
        <div style={styles.section}>
          <div style={styles.companyInfo}>
            <div>
              <strong>Algate International - Study Abroad Consultant</strong>
            </div>
            <div>Suite No: 1605, 6th Floor</div>
            <div>HiLITE Business Park, Poovangal</div>
            <div>Kozhikode, Pantheeramkavu, Kerala 673014</div>
            <div>Mobile: +91 9895772585</div>
            <div>Email: connect@algateinternational.com</div>
          </div>
          <img src={Logo} alt="Logo" style={styles.logo} />
        </div>

        {/* Bill To & Invoice Details */}
        <div style={styles.section}>
          <div>
            <div style={{ fontWeight: "bold", marginTop: "30px" }}>Bill To</div>
            <textarea
              value={billTo}
              onChange={(e) => setBillTo(e.target.value)}
              rows={4}
              style={{
                ...styles.input,
                ...styles.billTo,
                textAlign: "left",
                width: "250px",
              }}
            />
          </div>

          <div style={styles.invoiceDetails}>
            {[
              ["Invoice No :", invoiceNo, setInvoiceNo],
              ["Invoice Date :", invoiceDate, setInvoiceDate],
              ["Due Date :", dueDate, setDueDate],
            ].map(([label, value, setter], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                }}
              >
                <strong style={{ width: "100%" }}>{label}</strong>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  style={{
                    ...styles.input,
                    textAlign: "right",
                    minWidth: "120px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Editable Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Sl.</th>
              <th style={{ ...styles.th, textAlign: "left" }}>Description</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Rate</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr
                key={i}
                style={i % 2 === 1 ? { backgroundColor: "#f9f9f9" } : {}}
              >
                <td style={styles.td}>{i + 1}</td>
                <td style={{ ...styles.td, textAlign: "left" }}>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[i].description = e.target.value;
                      setItems(updated);
                    }}
                    style={{ ...styles.input, textAlign: "left" }}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[i].qty = +e.target.value;
                      setItems(updated);
                    }}
                    style={styles.numberInput}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[i].rate = +e.target.value;
                      setItems(updated);
                    }}
                    style={styles.numberInput}
                  />
                </td>
                <td style={styles.td}>{(item.qty * item.rate).toFixed(2)}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleRemoveRow(i)}
                    style={styles.actionBtn}
                    title="Remove row"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Row Button */}
        <button style={styles.addBtn} onClick={handleAddRow}>
          + Add Item
        </button>

        {/* Totals Section */}
        <div style={styles.totalSection}>
          <div>
            <strong>Subtotal:</strong> {subtotal.toFixed(2)}
          </div>
          <div>
            <strong>Total:</strong> {subtotal.toFixed(2)}
          </div>
          <div>
            <strong>Paid:</strong>
            <input
              type="number"
              value={paid}
              onChange={(e) => setPaid(+e.target.value)}
              style={styles.numberInput}
            />
          </div>
          <div>
            <strong>Balance Due:</strong> {balanceDue.toFixed(2)}
          </div>
        </div>

        {/* Payment Section */}
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

        {/* Signature */}
        <div style={styles.signature}>
          <img
            src="https://via.placeholder.com/100x40.png?text=Sign"
            alt="Signature"
            style={styles.signatureImg}
          />
          <div>Authorized Signatory</div>
        </div>
      </div>

      {/* Download Button */}
      <button style={styles.downloadBtn} onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
