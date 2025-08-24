import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const MinimalDashboard = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0 0 5px 0",
                fontSize: "24px",
                color: "#333",
              }}
            >
              HealthWise AI Dashboard
            </h1>
            <p
              style={{
                margin: "0",
                color: "#666",
                fontSize: "14px",
              }}
            >
              Welcome back, {user?.name || user?.email || "User"}!
            </p>
          </div>

          <button
            onClick={handleSignOut}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Sign Out
          </button>
        </div>

        {/* Welcome Message */}
        <div
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "30px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0", fontSize: "28px" }}>
            🌟 Welcome to Your Health Dashboard!
          </h2>
          <p style={{ margin: "0", fontSize: "16px", opacity: "0.9" }}>
            Your personalized health companion is ready to help you on your
            wellness journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>❤️</div>
            <div
              style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
            >
              85%
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Health Score</div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>👣</div>
            <div
              style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
            >
              12,458
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Steps Today</div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>😴</div>
            <div
              style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
            >
              7.5h
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              Sleep Last Night
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>💧</div>
            <div
              style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
            >
              6/8
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              Glasses of Water
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <a
            href="/chat"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "block",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#007bff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              >
                💬
              </div>
              <h3 style={{ margin: "0", fontSize: "18px", color: "#333" }}>
                AI Health Chat
              </h3>
            </div>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              Get instant health advice from our AI assistant
            </p>
          </a>

          <a
            href="/symptoms"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "block",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#28a745",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              >
                🔍
              </div>
              <h3 style={{ margin: "0", fontSize: "18px", color: "#333" }}>
                Symptom Checker
              </h3>
            </div>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              Analyze your symptoms and get recommendations
            </p>
          </a>

          <a
            href="/medications"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "block",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#6f42c1",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              >
                💊
              </div>
              <h3 style={{ margin: "0", fontSize: "18px", color: "#333" }}>
                Medications
              </h3>
            </div>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              Manage your medications and prescriptions
            </p>
          </a>

          <a
            href="/tips"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "block",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#fd7e14",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              >
                🌟
              </div>
              <h3 style={{ margin: "0", fontSize: "18px", color: "#333" }}>
                Health Tips
              </h3>
            </div>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              Discover personalized wellness recommendations
            </p>
          </a>

          <a
            href="/emergency"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "block",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#dc3545",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              >
                🚨
              </div>
              <h3 style={{ margin: "0", fontSize: "18px", color: "#333" }}>
                Emergency
              </h3>
            </div>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              Quick access to emergency information
            </p>
          </a>

          <a
            href="/profile"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "block",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#6c757d",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              >
                👤
              </div>
              <h3 style={{ margin: "0", fontSize: "18px", color: "#333" }}>
                Profile
              </h3>
            </div>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              Manage your health profile and settings
            </p>
          </a>
        </div>

        {/* Recent Activity */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#333" }}>
            Recent Activity
          </h3>

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span style={{ marginRight: "10px", fontSize: "16px" }}>💬</span>
              <strong style={{ color: "#333" }}>AI Health Chat Session</strong>
            </div>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              Discussed sleep patterns and stress management - 2 hours ago
            </p>
          </div>

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span style={{ marginRight: "10px", fontSize: "16px" }}>💊</span>
              <strong style={{ color: "#333" }}>Medication Reminder</strong>
            </div>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              Took morning vitamins on schedule - 6 hours ago
            </p>
          </div>

          <div
            style={{
              marginBottom: "0",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span style={{ marginRight: "10px", fontSize: "16px" }}>🔍</span>
              <strong style={{ color: "#333" }}>Symptom Check Complete</strong>
            </div>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              Analyzed headache symptoms, recommended rest - Yesterday
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            padding: "20px",
            color: "#666",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: "0" }}>
            Need help? Visit our{" "}
            <a
              href="/about"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              support center
            </a>{" "}
            or{" "}
            <a
              href="/feedback"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              send feedback
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinimalDashboard;
