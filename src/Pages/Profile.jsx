// src/pages/Profile.jsx
import React, { useState } from "react";
import { useAuth } from "../context/useAuth";
import {
  Loader2,
  User,
  Mail,
  Camera,
  LogOut,
  Edit2,
  Check,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleSave = async () => {
    if (!formData.displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName.trim(),
        photoURL: formData.photoURL || null,
      });

      // Force reload user
      await auth.currentUser.reload();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile. Try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 py-12 px-4">
      <title>Profile </title>
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          My Profile
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Avatar Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="relative inline-block">
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/300"}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-green-500 shadow-lg mx-auto"
                />
                <div className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full">
                  <Camera className="h-5 w-5" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-6">
                {user?.displayName || "User"}
              </h2>
              <p className="text-gray-500 mt-2">{user?.email}</p>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Member since:{" "}
                  <span className="font-medium">
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                          }
                        )
                      : "Recently"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Info & Edit Card */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">
                  Account Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          displayName: user?.displayName || "",
                          photoURL: user?.photoURL || "",
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          displayName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="text-lg text-gray-800 font-medium">
                      {user?.displayName || "Not set"}
                    </p>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="h-5 w-5" />
                    <span className="text-lg">{user?.email}</span>
                  </div>
                </div>

                {/* Photo URL Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo URL
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.photoURL}
                      onChange={(e) =>
                        setFormData({ ...formData, photoURL: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                      placeholder="https://example.com/photo.jpg"
                    />
                  ) : (
                    <p className="text-sm text-gray-500 break-all">
                      {user?.photoURL || "No photo URL set"}
                    </p>
                  )}
                </div>

                {/* Account Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <p className="text-lg font-medium text-green-600">
                    {user?.providerData[0]?.providerId === "google.com"
                      ? "Google Account"
                      : "Email/Password"}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full md:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-3 mx-auto"
                >
                  <LogOut className="h-5 w-5" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards (Optional Bonus) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600">12</div>
            <p className="text-gray-600 mt-2">Bills Paid</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">8</div>
            <p className="text-gray-600 mt-2">Pending Bills</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">৳24,500</div>
            <p className="text-gray-600 mt-2">Total Spent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
