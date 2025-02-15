import React, { useState, useEffect } from "react";
import { Bell, Eye, Shield, Upload, User, Pencil } from "lucide-react";
import supabase from "../utils/client";
import Swal from "sweetalert2";
import SkeletonLoader from "../components/ui/skeleton";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    full_name: "",
    email: "",
    bio: "",
    skills: "",
    education: {
      college_name: "",
      degree: "",
      graduation_year: "",
    },
    experience: {
      experience_years: "",
      current_company: "",
      position: "",
    },
  }); // Adjusted to handle dynamic profile data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Auth Error:", authError.message);
          return;
        }

        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error.message);
          } else {
            setFormData({
              full_name: data.full_name || "",
              email: data.email || user.email,
              bio: data.bio || "",
              skills: data.skills || "",
              education: {
                college_name: data.college_name || "",
                degree: data.degree || "",
                graduation_year: data.graduation_year || "",
              },
              experience: {
                experience_years: data.experience_years || "",
                current_company: data.current_company || "",
                position: data.position || "",
              },
            });
          }
        }
      } catch (err) {
        console.error("Unexpected error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (section: "education" | "experience", field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    if (formData) {
      const { data: user, error } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: formData.full_name,
            bio: formData.bio,
            skills: formData.skills,
            college_name: formData.education.college_name,
            degree: formData.education.degree,
            graduation_year: formData.education.graduation_year,
            experience_years: formData.experience.experience_years,
            current_company: formData.experience.current_company,
            position: formData.experience.position,
          })
          .eq("id", user.user?.id);
        // .single(); // Update profile data based on auth ID

        if (error) {
          Swal.fire({
            title: "Something Went Wrong!",
            text: error.message,
            icon: "error"
          });
          console.error("Error saving profile:", error.message);
        } else {
          Swal.fire({
            title: "Profile updated Successfully!",
            text: "Keep up the good work!",
            icon: "success"
          });
        }
      }
    }
  };

  const ViewField = ({ label, value }: { label: string; value: string }) => (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
        {label}
      </div>
      <div className="text-gray-900 dark:text-gray-100">{value}</div>
    </div>
  );

  if (loading) return <SkeletonLoader/>; // Show a loading indicator while fetching data

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your profile and preferences
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              isEditing
                ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isEditing ? (
              <Eye className="w-4 h-4" />
            ) : (
              <Pencil className="w-4 h-4" />
            )}
            {isEditing ? "View Profile" : "Edit Profile"}
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-300 dark:border-gray-700">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 pb-4 ${
                activeTab === "profile"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Eye className="w-5 h-5" />
              Profile
            </button>
            {/* <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 pb-4 ${
          activeTab === "security"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <Shield className="w-5 h-5" />
          Security
        </button> */}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Resume Upload */}
          {/* {isEditing && (
        <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Resume Upload</h3>
          <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-8">
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Click to upload or drag and drop
            <br />
            PDF files only
            </p>
          </div>
          </div>
        </div>
        )} */}

          {/* Personal Information */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium">Personal Information</h3>
            </div>

            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      handleInputChange("full_name", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled={true}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ViewField label="Full Name" value={formData.full_name} />
                <ViewField label="Email" value={formData.email} />
                <ViewField label="Bio" value={formData.bio} />
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Skills</h3>
            {isEditing ? (
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                placeholder="e.g., JavaScript, React, Node.js"
                className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            ) : (
              <ViewField label="" value={formData.skills} />
            )}
          </div>

          {/* Education */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Education</h3>
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    College Name
                  </label>
                  <input
                    type="text"
                    value={formData.education.college_name}
                    onChange={(e) => handleNestedInputChange("education", "college_name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={formData.education.degree}
                    onChange={(e) => handleNestedInputChange("education", "degree", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    value={formData.education.graduation_year}
                    onChange={(e) => handleNestedInputChange("education", "graduation_year", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ViewField label="College" value={formData.education.college_name} />
                <ViewField label="Degree" value={formData.education.degree} />
                <ViewField
                  label="Graduation Year"
                  value={formData.education.graduation_year}
                />
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Experience</h3>
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience.experience_years}
                    onChange={(e) => handleNestedInputChange("experience", "experience_years", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Current Company
                  </label>
                  <input
                    type="text"
                    value={formData.experience.current_company}
                    onChange={(e) => handleNestedInputChange("experience", "current_company", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={formData.experience.position}
                    onChange={(e) => handleNestedInputChange("experience", "position", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ViewField
                  label="Years of Experience"
                  value={formData.experience.experience_years}
                />
                <ViewField
                  label="Current Company"
                  value={formData.experience.current_company}
                />
                <ViewField label="Position" value={formData.experience.position} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-900 dark:text-gray-300 border border-gray-400 dark:border-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Settings;
