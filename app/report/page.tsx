"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
const MapPicker = dynamic(() => import("../components/MapPicker"), {
  ssr: false,
});

export default function ReportPage() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("low");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!selectedCoords) {
      if (typeof window !== "undefined" && navigator.geolocation) {
        console.log("hello");
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setSelectedCoords({ lat: latitude, lng: longitude });
          },
          () => {
            // fallback to Bangkok
            setSelectedCoords({ lat: 13.7563, lng: 100.5018 });
          },
          {
            timeout: 5000,
            maximumAge: 0,
            enableHighAccuracy: true,
          }
        );
      } else {
        setSelectedCoords({ lat: 13.7563, lng: 100.5018 });
      }
    }
  }, [selectedCoords]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let image_url = null;

    // Upload image to Supabase Storage if selected
    if (imageFile) {
      const filename = `${uuidv4()}-${imageFile.name}`;
      const { data, error } = await supabase.storage
        .from("damage-images")
        .upload(filename, imageFile);

      console.log(data);
      if (error) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("damage-images")
        .getPublicUrl(filename);

      image_url = publicUrlData.publicUrl;
    }

    // Save report to Supabase
    const { error: insertError } = await supabase
      .from("damage_reports")
      .insert([
        {
          description,
          location,
          severity,
          image_url,
          latitude: selectedCoords?.lat,
          longitude: selectedCoords?.lng,
        },
      ]);

    if (insertError) {
      alert("Error submitting report");
    } else {
      setShowPopup(true);
      setTimeout(() => {
        router.push("/");
      }, 2500); // 2.5 seconds delay
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-white px-4 py-8">
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999999] px">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-[90%]"
            >
              <h2 className="text-xl font-bold text-green-600 mb-2">
                Report Submitted ✅
              </h2>
              <p className="text-gray-700">
                Thank you for helping the community. Redirecting...
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-50 rounded-xl shadow p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Report Earthquake Damage
        </h2>

        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="Describe the damage..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Location on Map
          </label>
          <div className="h-60 rounded-lg overflow-hidden border">
            <MapPicker
              selectedCoords={selectedCoords}
              onSelect={setSelectedCoords}
            />
          </div>
          {selectedCoords && (
            <p className="text-sm text-gray-600">
              Selected: {selectedCoords.lat.toFixed(5)},{" "}
              {selectedCoords.lng.toFixed(5)}
            </p>
          )}
        </div>

        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <select
          className="w-full border rounded p-2"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="low">Low severity</option>
          <option value="medium">Medium severity</option>
          <option value="high">High severity</option>
        </select>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Upload Image (optional)
          </label>

          <div className="relative flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
                if (file) {
                  const previewURL = URL.createObjectURL(file);
                  setImagePreview(previewURL);
                } else {
                  setImagePreview(null);
                }
              }}
              className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded file:border-0
        file:text-sm file:font-semibold
        file:bg-red-50 file:text-red-700
        hover:file:bg-red-100
      "
            />
          </div>

          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={300}
                className="w-full max-h-64 object-cover rounded-lg shadow"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
