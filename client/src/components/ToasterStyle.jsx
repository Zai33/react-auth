import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterStyle = () => {
  return (
    <div>
      
      <Toaster
        toastOptions={{
          className: "custom-toast",
          duration: 2000, // Adjusted for longer display time
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            fontSize: "14px",
            padding: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          success: {
            style: {
              background: "#28a745", // Green for success
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#dc3545", // Red for error
              color: "#fff",
            },
          },
          loading: {
            style: {
              background: "#007bff", // Blue for loading
              color: "#fff",
            },
          },
        }}
      />
    </div>
  );
};

export default ToasterStyle;
