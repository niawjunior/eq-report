"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Image from "next/image";
import dynamic from "next/dynamic";
const MapDisplay = dynamic(() => import("../components/MapDisplay"), {
  ssr: false,
});

type Report = {
  id: string;
  description: string;
  location: string;
  severity: string;
  image_url?: string;
  created_at: string;
  latitude: number;
  longitude: number;
  status: "pending" | "helped" | "in-progress"; // extendable
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("damage_reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReports(data as Report[]);

        // default select first report
        setSelectedReport(data[0] as Report);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex h-[calc(100vh-150px)]">
      {showMobileDetail && selectedReport && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md mx-auto rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowMobileDetail(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-4xl font-bold"
            >
              &times;
            </button>

            <div className="flex space-x-2 items-center">
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  selectedReport.severity === "high"
                    ? "bg-red-100 text-red-700"
                    : selectedReport.severity === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Severity: {selectedReport.severity}
              </span>

              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  selectedReport.status === "helped"
                    ? "bg-green-100 text-green-700"
                    : selectedReport.status === "in-progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {selectedReport.status}
              </span>
            </div>
            {selectedReport.image_url && (
              <Image
                src={selectedReport.image_url}
                alt="Damage"
                width={300}
                height={300}
                className="rounded-lg w-full max-h-[300px] object-cover"
              />
            )}

            <p className="text-gray-700 mt-3 whitespace-pre-wrap">
              {selectedReport.description}
            </p>

            <p className="text-sm text-gray-400">
              Location: {selectedReport.location}
            </p>
            {selectedReport.latitude && selectedReport.longitude && (
              <MapDisplay
                latitude={selectedReport.latitude}
                longitude={selectedReport.longitude}
              />
            )}
            <p className="text-sm text-gray-400 mt-2">
              Reported on:{" "}
              {new Date(selectedReport.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
      {/* Left Panel - Scrollable Cards */}
      <div className="w-full md:w-1/2 lg:w-1/3 overflow-y-auto bg-gray-100 p-4 space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => {
              setSelectedReport(report);
              if (window.innerWidth < 768) {
                setShowMobileDetail(true);
              }
            }}
            className={`cursor-pointer p-4 rounded-lg shadow transition hover:bg-white ${
              selectedReport?.id === report.id
                ? "bg-white ring-2 ring-red-400"
                : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-800">{report.location}</p>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  report.severity === "high"
                    ? "bg-red-500 text-white"
                    : report.severity === "medium"
                    ? "bg-yellow-400 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {report.severity}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {report.description}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(report.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Right Panel - Report Details */}
      <div className="hidden md:block w-2/3 bg-white p-6 overflow-y-auto">
        {selectedReport ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-600">
              {selectedReport.location}
            </h2>
            <div className="flex space-x-2">
              <span
                className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${
                  selectedReport.severity === "high"
                    ? "bg-red-100 text-red-700"
                    : selectedReport.severity === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Severity: {selectedReport.severity}
              </span>

              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  selectedReport.status === "helped"
                    ? "bg-green-100 text-green-700"
                    : selectedReport.status === "in-progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {selectedReport.status}
              </span>
            </div>
            {selectedReport.image_url && (
              <Image
                src={selectedReport.image_url}
                alt="Damage"
                width={300}
                height={300}
                className="rounded-lg w-full max-h-[300px] object-cover"
              />
            )}

            <p className="text-gray-700 whitespace-pre-wrap">
              {selectedReport.description}
            </p>
            <p className="text-sm text-gray-400">
              Reported on:{" "}
              {new Date(selectedReport.created_at).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              Location: {selectedReport.location}
            </p>

            {selectedReport.latitude && selectedReport.longitude && (
              <MapDisplay
                latitude={selectedReport.latitude}
                longitude={selectedReport.longitude}
              />
            )}
          </div>
        ) : (
          <p className="text-gray-500">Select a report to see details.</p>
        )}
      </div>
    </div>
  );
}
