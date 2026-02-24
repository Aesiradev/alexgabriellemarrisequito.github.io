import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_lquhvw3";
const TEMPLATE_ID = "template_d1t23eq";
const PUBLIC_KEY  = "fVq3XS0DRhIyEJHzP";

export default function Contact() {
  const [msg, setMsg]         = useState("");
  const [email, setEmail]     = useState("");
  const [emailError, setEmailError] = useState(false);
  const [status, setStatus]   = useState(null);

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSend = async () => {
    if (!isValidEmail(email)) { setEmailError(true); return; }
    if (!msg.trim()) return;
    setEmailError(false);
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_email: email, message: msg },
        PUBLIC_KEY
      );
      setStatus("success");
      setMsg("");
      setEmail("");
      setTimeout(() => setStatus(null), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <footer id="contact" className="contact-footer">
      <div className="contact-top-divider" />

      <div className="container">
        <div className="contact-grid">

          {/* ── LEFT: brand ── */}
          <div className="contact-brand">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/loho-removebg-preview.png`}
              alt="Aesthetic Code Logo"
              className="contact-logo-img"
            />
            <p className="contact-brand-name">AESTHETIC CODE</p>
            <p className="contact-brand-sub">CODE WITH STYLE</p>
            <p className="contact-tagline">LET'S MAKE YOUR<br /><strong>DREAM WORK.</strong></p>
          </div>

          {/* ── CENTER: contact info ── */}
          <div className="contact-info">
            <h4 className="contact-heading">Contact</h4>
            <ul className="contact-list">
              <li>
                <a href="mailto:gabriellemarriacala@gmail.com" className="contact-link">
                  <span className="contact-icon">✉</span>
                  gabriellemarriacala@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+639515826846" className="contact-link">
                  <span className="contact-icon">☏</span>
                  +63 951 582 6846
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/alex-gabrielle-marri-sequito-6ba7a9276"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <span className="contact-icon">in</span>
                  alex-gabrielle-marri-sequito
                </a>
              </li>
            </ul>
          </div>

          {/* ── RIGHT: quick message ── */}
          <div className="contact-message">
            <h4 className="contact-heading">Send a Message</h4>
            <div className="contact-input-row">
              <input
                className="contact-textarea"
                style={{
                  borderRadius: "12px",
                  padding: "10px 14px",
                  marginBottom: "4px",
                  fontSize: "0.78rem",
                  borderColor: emailError ? "rgba(255,100,100,0.6)" : undefined,
                  boxShadow: emailError ? "0 0 10px rgba(255,80,80,0.2)" : undefined,
                }}
                placeholder="Your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
              />
              {emailError && (
                <p style={{ color: "#ff8a8a", fontSize: "0.72rem", letterSpacing: "0.5px", marginBottom: "4px", marginTop: "-2px" }}>
                  ✗ Please enter a valid email address.
                </p>
              )}
              <textarea
                className="contact-textarea"
                placeholder="Say something..."
                rows={3}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />

              {status === "success" && (
                <p style={{ color: "#7ee8a2", fontSize: "0.75rem", letterSpacing: "1px" }}>
                  ✓ Message sent!
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "#ff8a8a", fontSize: "0.75rem", letterSpacing: "1px" }}>
                  ✗ Something went wrong. Try again.
                </p>
              )}

              <button
                className="contact-send-btn"
                onClick={handleSend}
                disabled={status === "sending"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                {status === "sending" ? "Sending..." : "Send"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}