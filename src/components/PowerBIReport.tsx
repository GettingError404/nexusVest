"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PowerBIEmbed = dynamic(
  () => import("powerbi-client-react").then((m) => m.PowerBIEmbed),
  { ssr: false },
);

export function PowerBIReport() {
  const [reportConfig, setReportConfig] = useState<any>(null);

  useEffect(() => {
    // Dynamically load powerbi-client to access models only on client side
    import("powerbi-client").then((modules) => {
      const { models } = modules;
      const embedUrl = process.env.NEXT_PUBLIC_PBI_EMBED_URL;
      const accessToken = process.env.NEXT_PUBLIC_PBI_ACCESS_TOKEN;
      const reportId = process.env.NEXT_PUBLIC_PBI_REPORT_ID;

      if (embedUrl && accessToken && reportId) {
        setReportConfig({
          type: "report",
          id: reportId,
          embedUrl: embedUrl,
          accessToken: accessToken,
          tokenType: models.TokenType.Aad,
          settings: {
            panes: {
              filters: { visible: false },
              pageNavigation: { visible: false },
            },
            background: models.BackgroundType.Transparent,
          },
        });
      }
    });
  }, []);

  if (!reportConfig) {
    return (
      <div className="w-full h-[400px] rounded-xl border border-white/10 bg-slate-900/50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Portfolio Analytics
        </h3>
        <p className="text-slate-400 max-w-sm">
          Power BI not connected — demo mode
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <PowerBIEmbed
        embedConfig={reportConfig}
        cssClassName="h-full w-full"
        getEmbeddedComponent={(embeddedReport) => {
          (window as any).report = embeddedReport;
        }}
      />
    </div>
  );
}
