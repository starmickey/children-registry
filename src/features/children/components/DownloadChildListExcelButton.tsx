"use client";

import { DownloadExcel } from "@/components/actions/download-excel-button";

export function DownloadChildListExcelButton({
  children,
}: {
  children: React.ReactElement<{
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    children?: React.ReactNode;
  }>;
}) {
  return (
    <DownloadExcel
      url="/api/children/export-excel"
      fileName="infancia-misionera.xlsx"
      trigger={children}
    />
  );
}
