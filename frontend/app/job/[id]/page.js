"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  getJob,
  updateStatus,
  deleteJob,
} from "../../../services/api";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    try {
      setUpdating(true);
      const newStatus = e.target.value;
      const { data } = await updateStatus(params.id, {
        status: newStatus,
      });
      setJob(data);
      alert("Status updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this job? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(params.id);
      alert("Job deleted successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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
  if (!mounted || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-600 to-black"></div>
            <div className="p-8">
              <div className="animate-pulse">
                <div className="flex justify-between mb-6">
                  <div className="h-8 w-32 bg-gray-200 rounded"></div>
                  <div className="h-10 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <svg className="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been deleted.</p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-red-600 to-black text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-gray-900 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
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
            {/* Header with actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">
                  {getCategoryIcon(job.category)}
                </div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {job.title}
                </h1>
              </div>
              
              <div className="flex gap-3">
                <Link
                  href={`/edit-job/${job._id}`}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(job.status)}`}>
                <span className="w-2 h-2 rounded-full mr-2 bg-current"></span>
                {job.status || "Open"}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Description
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Job Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">{getCategoryIcon(job.category)}</span>
                    {job.category}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-gray-800 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </p>
                </div>

                {job.budget && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Budget</p>
                    <p className="font-semibold text-gray-800 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ${job.budget}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Contact Name</p>
                  <p className="font-semibold text-gray-800 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {job.contactName}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Contact Email</p>
                  <p className="font-semibold text-gray-800 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${job.contactEmail}`} className="text-blue-600 hover:underline">
                      {job.contactEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Status Update Section */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Update Status
              </h3>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <select
                  value={job.status}
                  onChange={handleStatusChange}
                  disabled={updating}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white md:w-64"
                  suppressHydrationWarning
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
                {updating && (
                  <span className="text-sm text-gray-500 flex items-center">
                    <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Job ID: {job._id}
              </p>
              {job.createdAt && (
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(job.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}