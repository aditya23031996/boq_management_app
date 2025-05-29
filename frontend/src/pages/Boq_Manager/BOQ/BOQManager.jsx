import React from "react";
import { useParams } from "react-router-dom";
import BOQTable from "../components3/BOQTable";
import DashboardLayout from "../components3/DashboardLayout";

export default function BOQManager() {
  const { user_id } = useParams();

  return (
    <DashboardLayout>
      <BOQTable user_id={user_id} />
    </DashboardLayout>
  );
} 