"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getJobs } from "../services/api";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await getJobs();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (value) => {
    setCategory(value);
    applyFilters(value, searchTerm);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(category, term);
  };

  const applyFilters = (categoryValue, searchValue) => {
    let filtered = jobs;

    // Apply category filter
    if (categoryValue !== "") {
      filtered = filtered.filter((job) => job.category === categoryValue);
    }

    // Apply search filter
    if (searchValue !== "") {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          job.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          job.location.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Plumbing":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case "Electrical":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "Painting":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER with gradient */}
        <div className="bg-gradient-to-r from-red-600 to-black rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Service Request Board
              </h1>
              <p className="text-red-100">
                Find and manage service requests in your area
              </p>
            </div>
            <Link
              href="/new-job"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-md text-center"
            >
              + Post New Job
            </Link>
          </div>
        </div>

        {/* FILTERS SECTION */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search jobs by title, description, or location..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={category}
                onChange={(e) => handleFilter(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="">All Categories</option>
                <option value="Plumbing">🔧 Plumbing</option>
                <option value="Electrical">⚡ Electrical</option>
                <option value="Painting">🎨 Painting</option>
                <option value="Joinery">🪑 Joinery</option>
              </select>
            </div>
          </div>
          
          {/* Active filters display */}
          {(category || searchTerm) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {category && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-red-100 text-red-800">
                  {category}
                  <button
                    onClick={() => handleFilter("")}
                    className="ml-2 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-gray-100 text-gray-800">
                  Search: {searchTerm}
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      applyFilters(category, "");
                    }}
                    className="ml-2 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
          {!loading && filteredJobs.length === 0 && (
            <button
              onClick={() => {
                setCategory("");
                setSearchTerm("");
                setFilteredJobs(jobs);
              }}
              className="text-red-600 hover:text-red-700 text-sm font-semibold"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* JOB LIST */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new job posting</p>
            <Link
              href="/new-job"
              className="inline-block mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Post a Job
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Colored top bar based on category */}
                <div className="h-1 bg-gradient-to-r from-red-600 to-black"></div>
                
                <div className="p-5">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-red-600">
                      {getCategoryIcon(job.category)}
                      <span className="text-sm font-medium">{job.category}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                      {job.status || "Open"}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-red-600 transition">
                    {job.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-700 border-t border-gray-100 pt-3">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{job.location}</span>
                    </div>
                    
                    {job.budget && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Budget: ${job.budget}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/job/${job._id}`}
                    className="inline-flex items-center justify-center w-full mt-5 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 font-medium"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}