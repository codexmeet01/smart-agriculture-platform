import React, { useState } from "react";
import {
  UserCheck,
  MapPin,
  Layers,
  Phone,
  Droplets,
  Sprout,
  Save,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Edit3,
  Mail,
} from "lucide-react";
import { useFarm } from "../context/FarmContext";

export const ProfilePage = () => {
  const { profile, updateProfile, plots } = useFarm();
  const [formData, setFormData] = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <UserCheck className="h-3.5 w-3.5" />
            Farmer Identity & Landholding
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
            Farmer Profile & Field Configuration
          </h1>
          <p className="text-xs sm:text-sm text-agri-muted mt-1">
            Registered smallholder credentials, IoT sensor node allocations, and soil topology.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-soft ${
            isEditing
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-emerald-700 text-white hover:bg-emerald-800"
          }`}
        >
          <Edit3 className="h-3.5 w-3.5" />
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </button>
      </div>

      {/* Top Identity Card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-800 to-agri-dark text-white p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white text-3xl font-extrabold font-display border border-white/20 shadow-md">
            {profile.name ? profile.name[0] : "R"}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-bold">{profile.name}</h2>
              <span className="rounded-full bg-emerald-500/30 border border-emerald-400/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-200 uppercase tracking-wide">
                Verified Farmer
              </span>
            </div>
            <p className="text-xs text-emerald-200 font-medium">{profile.farmName}</p>
            <p className="text-xs text-emerald-100/80 flex items-center gap-1.5 pt-1">
              <MapPin className="h-3.5 w-3.5 text-emerald-300" />
              {profile.location}
            </p>
          </div>
        </div>

        {/* Quick Summary Strip */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-emerald-200 block uppercase">Farm ID</span>
            <span className="font-mono font-bold text-white text-sm">{profile.farmId}</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block uppercase">Total Land Area</span>
            <span className="font-bold text-white text-sm">{profile.farmSize}</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block uppercase">Active Plots</span>
            <span className="font-bold text-white text-sm">{plots.length} Plots Connected</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block uppercase">IoT Nodes</span>
            <span className="font-bold text-white text-sm">6 Sensor Nodes Active</span>
          </div>
        </div>
      </div>

      {/* Profile Form (Edit Mode / View Mode) */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-emerald-900/5 shadow-soft">
        <h3 className="font-display text-lg font-bold text-agri-dark mb-4">
          Field & Agronomic Specifications
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Farmer Name */}
            <div>
              <label className="block font-semibold text-agri-dark mb-1">Farmer Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-3 font-medium text-agri-dark disabled:bg-gray-50 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Farm Location */}
            <div>
              <label className="block font-semibold text-agri-dark mb-1">Farm Location & District</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-3 font-medium text-agri-dark disabled:bg-gray-50 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Farm Size */}
            <div>
              <label className="block font-semibold text-agri-dark mb-1">Farm Size</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-3 font-medium text-agri-dark disabled:bg-gray-50 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Primary Crop */}
            <div>
              <label className="block font-semibold text-agri-dark mb-1">Primary Crop Rotation</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.primaryCrop}
                onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-3 font-medium text-agri-dark disabled:bg-gray-50 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Irrigation Type */}
            <div>
              <label className="block font-semibold text-agri-dark mb-1">Irrigation System</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.irrigationType}
                onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-3 font-medium text-agri-dark disabled:bg-gray-50 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Soil Type */}
            <div>
              <label className="block font-semibold text-agri-dark mb-1">Soil Classification</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-3 font-medium text-agri-dark disabled:bg-gray-50 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold text-agri-dark mb-1">Registered Mobile Number</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-3 font-medium text-agri-dark disabled:bg-gray-50 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Farm ID (Read-only) */}
            <div>
              <label className="block font-semibold text-agri-dark mb-1">Unique Farm Mesh ID</label>
              <input
                type="text"
                disabled={true}
                value={formData.farmId}
                className="w-full rounded-xl border border-gray-200 p-3 font-mono font-medium text-gray-500 bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...profile });
                  setIsEditing(false);
                }}
                className="rounded-xl border border-gray-200 px-4 py-2.5 font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 font-bold shadow-md shadow-emerald-950/10"
              >
                <Save className="h-4 w-4" />
                Save Profile Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Connected Plots Grid */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-emerald-900/5 shadow-soft">
        <h3 className="font-display text-lg font-bold text-agri-dark mb-3">
          Configured Farm Plots ({plots.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plots.map((plot) => (
            <div key={plot.id} className="p-4 rounded-2xl bg-[#f7faf8] border border-gray-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold text-agri-dark">
                <span>{plot.name}</span>
                <span className="text-gray-400 font-mono text-[11px]">{plot.area}</span>
              </div>
              <p className="text-emerald-800 font-medium">{plot.crop}</p>
              <div className="text-[11px] text-gray-500 pt-1 border-t border-gray-200/60">
                Moisture Sensor: <strong>{plot.sensorId}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
