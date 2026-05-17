"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  getJob,
  updateStatus,
} from "../../../services/api";

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const { data } = await getJob(params.id);
      setJob(data);
    } catch (error) {
      console.log(error);
      alert("Job not found");
      router.push("/");
    }
  };

  const handleStatusChange = async (e) => {
    try {
      setUpdating(true);
      const { data } = await updateStatus(params.id, {
        status: e.target.value,
      });
      setJob(data);
      alert("Status updated successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Plumbing":
        return "🔧";
      case "Electrical":
        return "⚡";
      case "Painting":
        return "🎨";
      case "Joinery":
        return "🪑";
      default:
        return "📋";
    }
  };

  // Loading skeleton
  if (!mounted || !job) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-600 to-black"></div>
            <div className="p-8">
              <div className="animate-pulse">
                <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
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
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <Link
          href={`/job/${params.id}`}
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-4 transition-colors"
          suppressHydrationWarning
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Job Details
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header bar */}
          <div className="h-2 bg-gradient-to-r from-red-600 to-black"></div>
          
          <div className="p-8" suppressHydrationWarning>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {getCategoryIcon(job.category)}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Edit Job Status
                </h1>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(job.status)}`}>
                Current: {job.status || "Open"}
              </div>
            </div>

            {/* Job Info Card */}
            <div className="bg-gradient-to-r from-red-50 to-gray-50 rounded-xl p-5 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Job Information
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Title
                  </label>
                  <p className="text-gray-800 font-semibold">{job.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Category
                  </label>
                  <p className="text-gray-800 flex items-center">
                    <span className="mr-2">{getCategoryIcon(job.category)}</span>
                    {job.category}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Location
                  </label>
                  <p className="text-gray-800 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </p>
                </div>

                {job.budget && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Budget
                    </label>
                    <p className="text-gray-800 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ${job.budget}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Contact
                  </label>
                  <p className="text-gray-800">{job.contactName}</p>
                  <p className="text-sm text-gray-500">{job.contactEmail}</p>
                </div>
              </div>
            </div>

            {/* Status Update Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Update Status
                </label>
                
                <div className="space-y-3">
                  <select
                    value={job.status || "Open"}
                    onChange={handleStatusChange}
                    disabled={updating}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    suppressHydrationWarning
                  >
                    <option value="Open">🟢 Open - Accepting proposals</option>
                    <option value="In Progress">🟡 In Progress - Work has started</option>
                    <option value="Closed">🔴 Closed - Job completed</option>
                  </select>
                  
                  {updating && (
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating status...
                    </div>
                  )}
                </div>
              </div>

              {/* Status Description */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Status Information:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• <strong>Open:</strong> Job is available for service providers</li>
                  <li>• <strong>In Progress:</strong> Work has been assigned and is ongoing</li>
                  <li>• <strong>Closed:</strong> Job is completed and no longer accepting updates</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => router.push(`/job/${params.id}`)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
                  suppressHydrationWarning
                >
                  Cancel
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-900 transition-all duration-200"
                  suppressHydrationWarning
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Note */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-sm text-yellow-800">
              <strong>Note:</strong> Changing the status will notify relevant parties. Make sure you have the correct information before updating.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}