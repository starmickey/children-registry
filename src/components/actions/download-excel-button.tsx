"use client";

import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

interface DownloadExcelProps {
  url: string;
  fileName?: string;
  trigger: React.ReactElement<{
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    children?: React.ReactNode;
  }>;
  children?: React.ReactNode;
}

export function DownloadExcel({
  url,
  fileName = "export.xlsx",
  trigger,
}: DownloadExcelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    if (trigger?.props?.onClick) {
      trigger.props.onClick(e);
    }

    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to export Excel file");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return React.cloneElement(trigger, {
    onClick: handleDownload,
    disabled: isLoading || trigger.props.disabled,
    children: isLoading ? (
      <ImSpinner2 className="animate-spin" />
    ) : (
      trigger.props.children
    ),
  });
}
