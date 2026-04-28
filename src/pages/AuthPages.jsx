import { useState } from "react";
import { useApp } from "../context/AppContext";

const API_URL = "https://workstudy-backend-tbrq.onrender.com";

export default function AuthPages() {
  const { login } = useApp();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
        return;
      }
      setSuccess(`Account created for ${data.name}! Please log in.`);
      setForm({ name: "", email: form.email, password: "", role: "student" });
      setMode("login");
    } catch {
      setError("Could not reach the server. Is Spring Boot running?");
    }
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      // Save to context + localStorage, then redirect to dashboard
      const userObj = { id: data.id, name: data.name, email: data.email, role: data.role };
      localStorage.setItem("user", JSON.stringify(userObj));
      login(userObj);
    } catch {
      setError("Could not reach the server. Is Spring Boot running?");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Brand */}
        <div style={styles.brand}>
          <div style={styles.brandIcon}>WS</div>
          <h1 style={styles.brandName}>WorkStudy</h1>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={mode === "login" ? styles.tabActive : styles.tab}
            onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
          >
            Login
          </button>
          <button
            style={mode === "register" ? styles.tabActive : styles.tab}
            onClick={() => { setMode("register"); setError(""); setSuccess(""); }}
          >
            Register
          </button>
        </div>

        {success && <div style={styles.successMsg}>{success}</div>}

        {mode === "register" && (
          <div style={styles.field}>
            <label style={styles.fieldLabel}>Full Name</label>
            <input
              style={styles.input}
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div style={styles.field}>
          <label style={styles.fieldLabel}>Email</label>
          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.fieldLabel}>Password</label>
          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {mode === "register" && (
          <div style={styles.field}>
            <label style={styles.fieldLabel}>Role</label>
            <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        {error && <div style={styles.errorMsg}>{error}</div>}

        <button style={styles.btn} onClick={mode === "login" ? handleLogin : handleRegister}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <p style={styles.switchText}>
          {mode === "login" ? (
            <>New user?{" "}
              <span style={styles.link} onClick={() => { setMode("register"); setError(""); }}>
                Register here
              </span>
            </>
          ) : (
            <>Already have an account?{" "}
              <span style={styles.link} onClick={() => { setMode("login"); setError(""); }}>
                Sign in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "28px",
    justifyContent: "center",
  },
  brandIcon: {
    background: "linear-gradient(135deg, #6c63ff, #48c9b0)",
    color: "#fff",
    fontWeight: "800",
    fontSize: "14px",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "0.5px",
  },
  tabs: {
    display: "flex",
    background: "rgba(255,255,255,0.07)",
    borderRadius: "10px",
    padding: "4px",
    marginBottom: "24px",
  },
  tab: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "transparent",
    color: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
  tabActive: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #6c63ff, #48c9b0)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(108,99,255,0.4)",
  },
  field: { marginBottom: "16px" },
  fieldLabel: {
    display: "block",
    color: "rgba(255,255,255,0.6)",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: "13px",
    marginTop: "8px",
    background: "linear-gradient(135deg, #6c63ff, #48c9b0)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(108,99,255,0.35)",
  },
  errorMsg: {
    background: "rgba(255,80,80,0.15)",
    border: "1px solid rgba(255,80,80,0.3)",
    color: "#ff8080",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    marginBottom: "12px",
  },
  successMsg: {
    background: "rgba(72,201,176,0.15)",
    border: "1px solid rgba(72,201,176,0.3)",
    color: "#48c9b0",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    marginBottom: "12px",
  },
  switchText: {
    textAlign: "center",
    color: "rgba(255,255,255,0.45)",
    fontSize: "13px",
    marginTop: "16px",
  },
  link: {
    color: "#6c63ff",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "underline",
  },
};
