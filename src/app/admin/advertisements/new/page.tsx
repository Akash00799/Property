"use client";

import React from "react";
import AdvertisementForm from "@/components/admin/AdvertisementForm";
import { useAdminData } from "@/context/AdminDataContext";
import { PromotionItem } from "@/data/promotions";

export default function NewAdvertisementPage() {
  const { addAdvertisement } = useAdminData();

  const handleCreate = (data: PromotionItem) => {
    addAdvertisement(data);
  };

  return <AdvertisementForm onSubmit={handleCreate} isEditing={false} />;
}
