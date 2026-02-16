/** @format */

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Upload } from "lucide-react";

export default function SettingsPage() {
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Admin User",
    email: "admin@colorcost.com",
    contact_number: "+1 234 567 8900",
    image:
      "https://ui-avatars.com/api/?name=Admin+User&background=random&size=72",
  });

  const [activeSection, setActiveSection] = useState<
    "account" | "notifications" | "language"
  >("account");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  // Edit values
  const [editNameValue, setEditNameValue] = useState("");
  const [editPhoneValue, setEditPhoneValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hasChanges, setHasChanges] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHasChanges(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditName = () => {
    setEditNameValue(userData.name);
    setIsEditingName(true);
  };

  const handleCancelName = () => {
    setEditNameValue(userData.name);
    setIsEditingName(false);
  };

  const handleEditPhone = () => {
    setEditPhoneValue(userData.contact_number);
    setIsEditingPhone(true);
  };

  const handleCancelPhone = () => {
    setEditPhoneValue(userData.contact_number);
    setIsEditingPhone(false);
  };

  const handleGlobalSave = () => {
    // Update user data with edited values
    if (editNameValue && editNameValue !== userData.name) {
      setUserData({ ...userData, name: editNameValue });
    }
    if (editPhoneValue && editPhoneValue !== userData.contact_number) {
      setUserData({ ...userData, contact_number: editPhoneValue });
    }
    if (imagePreview) {
      setUserData({ ...userData, image: imagePreview });
    }

    setHasChanges(false);
    setIsEditingName(false);
    setIsEditingPhone(false);
    setImagePreview(null);
  };

  const handleGlobalCancel = () => {
    setIsEditingName(false);
    setIsEditingPhone(false);
    setEditNameValue(userData.name);
    setEditPhoneValue(userData.contact_number);
    setImagePreview(null);
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Welcome {userData.name}!
            </h1>
            <p className="text-sm text-gray-700 mt-1">
              Manage your profile information here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleGlobalCancel}
              className="text-foreground border-gray-300 bg-transparent hover:bg-primary/30 hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGlobalSave}
              disabled={!hasChanges}
              className="bg-foreground text-white hover:bg-foreground"
            >
              Save
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200">
          {/* User Info Header */}
          <div className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-10">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden shrink-0 bg-gray-200 group">
              <Image
                src={imagePreview || userData.image}
                alt="Profile"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    userData.name,
                  )}&background=random&size=72`;
                }}
                unoptimized
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Upload className="w-5 h-5 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {userData.name}
              </h2>
              <p className="text-xs sm:text-sm text-secondary">
                Update your username and manage your account
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12">
            {/* Section Navigation Tabs */}
            <div className="w-full md:w-48 shrink-0 space-y-3">
              <button
                onClick={() => setActiveSection("account")}
                className={`w-full text-left px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-semibold transition-all ${
                  activeSection === "account"
                    ? "bg-green-50 text-primary border-l-4 border-primary"
                    : "text-secondary hover:bg-blue-50"
                }`}
              >
                Account Settings
              </button>
              {/* <button
              onClick={() => setActiveSection("notifications")}
              className={`w-full text-left px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-semibold transition-all ${
                activeSection === "notifications"
                  ? "bg-green-50 text-primary border-l-4 border-primary"
                  : "text-secondary hover:bg-blue-50"
              }`}
            >
              Notifications
            </button> */}
            </div>

            <div className="flex-1 flex flex-col divide-y divide-gray-100">
              {/* Account Settings Section */}
              {activeSection === "account" && (
                <>
                  {/* Name Field */}
                  <div className="py-4 sm:py-6 first:pt-0">
                    <div className="flex justify-between items-start gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Your name
                        </label>

                        {isEditingName ? (
                          <div className="mt-3 max-w-full bg-blue-50 text-foreground p-4 sm:p-6 rounded-lg">
                            <p className="text-sm text-secondary mb-3">
                              Make sure this match the name on your any Govt.
                              ID.
                            </p>

                            <div className="space-y-2">
                              <label className="text-xs font-medium text-secondary">
                                Full name
                              </label>
                              <Input
                                value={editNameValue}
                                onChange={(e) => {
                                  setEditNameValue(e.target.value);
                                  setHasChanges(true);
                                }}
                                className="w-full bg-white border-gray-300 text-foreground"
                                placeholder="Enter your full name"
                                maxLength={32}
                              />
                              <div className="text-right text-xs text-gray-400">
                                text limit {editNameValue.length}/32
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mt-4">
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCancelName}
                                className="bg-gray-100 text-foreground hover:bg-gray-200"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-foreground mt-1">
                            {userData.name}
                          </div>
                        )}
                      </div>

                      {!isEditingName && (
                        <button
                          onClick={handleEditName}
                          className="flex items-center gap-2 text-secondary hover:text-foreground font-semibold text-sm transition-colors mt-1"
                        >
                          <Pencil className="w-4 h-4" /> Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="py-4 sm:py-6 border-b border-gray-100">
                    <div className="flex justify-between items-start gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Phone Number
                        </label>

                        {isEditingPhone ? (
                          <div className="mt-3 max-w-full bg-blue-50 text-foreground p-4 sm:p-6 rounded-lg">
                            <div className="space-y-2">
                              <Input
                                value={editPhoneValue}
                                onChange={(e) => {
                                  setEditPhoneValue(e.target.value);
                                  setHasChanges(true);
                                }}
                                className="w-full bg-white border-gray-300 text-foreground"
                                placeholder="000-0000-000"
                              />
                            </div>
                            <div className="flex items-center gap-3 mt-4">
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCancelPhone}
                                className="bg-gray-100 text-foreground hover:bg-gray-200"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-foreground mt-1">
                            {userData.contact_number}
                          </div>
                        )}
                      </div>

                      {!isEditingPhone && (
                        <button
                          onClick={handleEditPhone}
                          className="flex items-center gap-2 text-secondary hover:text-foreground font-semibold text-sm transition-colors mt-1"
                        >
                          <Pencil className="w-4 h-4" /> Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Email Field (Read-only) */}
                  <div className="py-4 sm:py-6">
                    <div className="flex justify-between items-center gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Email
                        </label>
                        <div className="text-foreground">{userData.email}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
