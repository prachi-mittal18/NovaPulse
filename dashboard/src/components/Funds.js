import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import api from "../api/api";

const Funds = () => {
  const { username, email, balance, marginUsed, openingBalance, refreshUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [amountInput, setAmountInput] = useState(500);
  const [transactions, setTransactions] = useState([]);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await api.get("/api/payments/history");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transaction history", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAddFunds = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/payments/create-order", { amount: amountInput });

      // 2. Configure Razorpay options
      const options = {
        key: "rzp_test_T12dFXceTUK10G", // Enter your Key ID here
        amount: data.amount,
        currency: data.currency,
        name: "NovaPulse",
        description: "Add Funds to Wallet",
        order_id: data.id,
        handler: async function (response) {
          // 3. Verify payment on backend
          try {
            await api.post("/api/payments/verify", response);
            await refreshUserData(); // Modern way to update UI balance
            fetchHistory(); // Refresh the ledger
            alert("Payment Successful! Wallet updated.");
          } catch (err) {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: username,
          email: email,
        },
        theme: {
          color: "#06b6d4", // Nova's teal brand color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Could not initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="funds">
        <div className="add-funds-container" style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          <div className="input-group" style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>Amount (INR)</label>
            <input 
              type="number" 
              value={amountInput} 
              onChange={(e) => setAmountInput(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", width: "120px" }}
            />
          </div>
          {showPinInput && (
            <div className="input-group" style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "12px", color: "#d32f2f", marginBottom: "4px", fontWeight: "bold" }}>Enter Trading PIN</label>
              <input 
                type="password" 
                maxLength="6"
                value={pin} 
                onChange={(e) => setPin(e.target.value)}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #d32f2f", width: "120px", letterSpacing: "4px" }}
              />
            </div>
          )}
          <div style={{ marginTop: "20px" }}>
            <button 
              className="btn btn-green" 
              onClick={handleAddFunds}
              disabled={loading || amountInput <= 0}
            >
              {loading ? "Processing..." : "Add funds"}
            </button>
            <button 
              className="btn btn-blue" 
              style={{ marginLeft: "10px" }}
              onClick={async () => {
                if (amountInput <= 0) return alert("Please enter a valid amount");
                if (amountInput > balance) return alert("Insufficient balance");
                
                if (!showPinInput) {
                  setShowPinInput(true);
                  return;
                }

                if (pin.length < 4) return alert("Please enter your 6-digit PIN");

                setLoading(true);
                try {
                  await api.post("/api/payments/withdraw", { amount: amountInput, pin: pin });
                  await refreshUserData();
                  fetchHistory();
                  setShowPinInput(false);
                  setPin("");
                  alert(`Successfully withdrew ₹${amountInput}`);
                } catch (err) {
                  alert(err.response?.data?.message || "Withdrawal failed");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || amountInput <= 0}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹{marginUsed.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹{openingBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>

      <div className="transaction-history" style={{ marginTop: "40px" }}>
        <h3 className="title">Recent Deposits</h3>
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#888" }}>No deposits found</td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx._id}>
                    <td>{new Date(tx.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                    <td style={{ fontSize: "12px", fontFamily: "monospace" }}>{tx.razorpay_payment_id}</td>
                    <td className={tx.amount >= 0 ? "profit" : "loss"}>₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td>
                      <span className={tx.status === "SUCCESS" ? "profit" : "loss"} style={{ fontSize: "11px", fontWeight: "bold" }}>{tx.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Funds;
