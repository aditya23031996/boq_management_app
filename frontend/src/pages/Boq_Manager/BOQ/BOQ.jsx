import React from "react";
import DashboardLayout from "../components3/DashboardLayout";
import BOQTable from "../components3/BOQTable";

export default function BOQ() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 transition-all duration-300" style={{ fontFamily: 'Inter, sans-serif', background: '#f7f8fa', minHeight: '100vh' }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#154078]">Bill of Quantities</h1>
        </div>
        <BOQTable />
      </div>
    </DashboardLayout>
  );
} 