import React, { useState } from "react";

const SettingsButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  // Change Password Submit
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/users/set_password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          current_password: oldPassword,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        alert("Password updated successfully. Please log in again.");
        setShowModal(false);
        handleLogout();
      } else {
        const data = await response.json();
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="settings-buttons">
      {/* Buttons */}
      <button className="btn change-password" onClick={() => setShowModal(true)}>
        Change Password
      </button>
      <button className="btn logout" onClick={handleLogout}>
        Logout
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <div className="modal-actions">
                <button type="submit" className="btn save">Update</button>
                <button type="button" className="btn cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .settings-buttons {
          display: flex;
          gap: 1rem;
        }
        .btn {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }
        .change-password {
          background: #007bff;
          color: white;
        }
        .logout {
          background: #dc3545;
          color: white;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          width: 350px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .modal h2 {
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        .modal input {
          display: block;
          width: 100%;
          margin-bottom: 1rem;
          padding: 0.6rem;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .modal-actions {
          display: flex;
          justify-content: space-between;
        }
        .save {
          background: #28a745;
          color: white;
        }
        .cancel {
          background: #6c757d;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default SettingsButtons;
