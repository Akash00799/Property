"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import AdvertisementForm from "@/components/admin/AdvertisementForm";
import { useAdminData } from "@/context/AdminDataContext";
import { PromotionItem } from "@/data/promotions";

export default function EditAdvertisementPage() {
  const params = useParams();
  const router = useRouter();
  const { advertisements, updateAdvertisement } = useAdminData();

  const adId = params?.id as string;
  const ad = advertisements.find((a) => a.id === adId);

  if (!ad) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto space-y-4 my-8">
        <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
        <h2 className="font-serif text-xl font-bold text-[#07140F]">
          Advertisement Campaign Not Found
        </h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          The requested campaign ID <code className="bg-stone-100 px-1 py-0.5 rounded font-mono font-bold">{adId}</code> does not exist or may have been deleted.
        </p>
        <Link
          href="/admin/advertisements"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#07140F] text-[#DFBE82] text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campaigns</span>
        </Link>
      </div>
    );
  }

  const handleUpdate = (updatedData: PromotionItem) => {
    updateAdvertisement(adId, updatedData);
  };

  return (
    <AdvertisementForm
      initialData={ad}
      onSubmit={handleUpdate}
      isEditing={true}
    />
  );
}
