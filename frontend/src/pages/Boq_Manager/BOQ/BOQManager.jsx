import React from "react";
import { useParams } from "react-router-dom";
import BOQTable from "../components3/BOQTable";
import DashboardLayout from "../components3/DashboardLayout";

import { useRef } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function BOQManager() {
  const { user_id } = useParams();
  const { token } = useAuth();
  const fileInputRef = useRef();

  // Handle file upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`/boq/upload_excel/${user_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload BOQ Excel");
      alert("BOQ uploaded and processed successfully!");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <DashboardLayout>
      <BOQTable user_id={user_id} />
      
      <div className="mb-6 flex items-center gap-4">
        <a
          href="/boq_upload_template.xlsx"
          download
          className="bg-white border border-[#003049] text-[#003049] px-5 py-2 rounded font-semibold shadow hover:bg-[#e0e6ed] transition"
        >
          Download BOQ Template (Excel)
        </a>
        
        <a
          href="/boq_upload_template.csv"
          download
          className="bg-white border border-[#003049] text-[#003049] px-5 py-2 rounded font-semibold shadow hover:bg-[#e0e6ed] transition"
        >
          Download BOQ Template (CSV)
        </a>
        
        <button
          className="bg-[#003049] text-white px-5 py-2 rounded font-semibold shadow hover:bg-[#002235] transition"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          Upload BOQ (Excel/CSV)
        </button>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          ref={fileInputRef}
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </div>
      
    </DashboardLayout>
  );
}