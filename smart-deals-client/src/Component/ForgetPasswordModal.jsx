import React, { useState, useEffect, use } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const ForgotPasswordModal = ({ open, onClose, defaultEmail }) => {
    const [email, setEmail] = useState("");
    const {forgetPassword} = use(AuthContext)

    useEffect(() => {
        if (defaultEmail) {
            setEmail(defaultEmail);
        }
    }, [defaultEmail]);

    if (!open) return null;

    const handleReset = (e) => {
        e.preventDefault();

        forgetPassword(email)
        .then(() => {
            toast.success("Password reset email sent!");
            setTimeout(() => {
        onClose();
        window.open("https://mail.google.com", "_blank");
      }, 2000);
        })
        .catch((error) => toast.error(error.message))
    };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box bg-white/20 backdrop-blur-lg border border-white/30">
        <h3 className="font-bold text-lg text-white">Reset Password</h3>

        <form onSubmit={handleReset} className="space-y-4 mt-4">
          <input type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="input w-full bg-white/80 text-[#001931]"/>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-outline border-white text-white">
              Cancel
            </button>

            <button type="submit" className="btn bg-[#0D9488] text-white" >Reset Password</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ForgotPasswordModal;