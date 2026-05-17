"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { createJob } from "../../services/api";

export default function NewJobPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budget: "",
    contactName: "",
    contactEmail: "",
  });

  const [loading, setLoading] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enhanced validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.location ||
      !formData.contactName ||
      !formData.contactEmail
    ) {
      alert("Please fill all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    // Title length validation
    if (formData.title.length < 5) {
      alert("Title must be at least 5 characters long");
      return;
    }

    // Description length validation
    if (formData.description.length < 20) {
      alert("Description must be at least 20 characters long");
      return;
    }

    try {
      setLoading(true);
      await createJob(formData);
      alert("Job created successfully!");
      router.push("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Don't render form during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-600 to-black"></div>
            <div className="p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-4 transition-colors"
          suppressHydrationWarning
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header bar */}
          <div className="h-2 bg-gradient-to-r from-red-600 to-black"></div>
          
          <div className="p-8" suppressHydrationWarning>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Post a New Job
              </h1>
              <p className="text-gray-500">
                Fill in the details below to create a service request
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
              {/* TITLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Need an emergency plumber"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    suppressHydrationWarning
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 5 characters. Be specific about what you need.
                </p>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <textarea
                    name="description"
                    placeholder="Describe the issue in detail including any specific requirements..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    suppressHydrationWarning
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 20 characters. Include important details about the job.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* CATEGORY */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                      suppressHydrationWarning
                    >
                      <option value="">Select Category</option>
                      <option value="Plumbing">🔧 Plumbing</option>
                      <option value="Electrical">⚡ Electrical</option>
                      <option value="Painting">🎨 Painting</option>
                      <option value="Joinery">🪑 Joinery</option>
                    </select>
                  </div>
                </div>

                {/* LOCATION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g.,Colombo, Sri Lanka"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      suppressHydrationWarning
                    />
                  </div>
                </div>
              </div>

              {/* BUDGET (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    name="budget"
                    placeholder="e.g., 2000rs"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    suppressHydrationWarning
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Optional: Set an estimated budget for the job
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Contact Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-5">
                  {/* CONTACT NAME */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="contactName"
                        placeholder="John Doe"
                        value={formData.contactName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  {/* CONTACT EMAIL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="contactEmail"
                        placeholder="john@example.com"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
                  suppressHydrationWarning
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-red-600 to-black text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-gray-900 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                  suppressHydrationWarning
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Job...
                    </span>
                  ) : (
                    "Post Job"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6" suppressHydrationWarning>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Tips for a great job post</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Be specific about what you need done</li>
                <li>• Include any deadlines or time constraints</li>
                <li>• Provide clear contact information</li>
                <li>• Set a realistic budget if possible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}