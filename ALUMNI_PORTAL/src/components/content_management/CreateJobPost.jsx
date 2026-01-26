//src/components/content_management/CreateJobPost.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Money,
  Clock,
  Tag,
  ListChecks,
  TextAa,
  ArrowLeft,
} from '@phosphor-icons/react';
import WorkModeDropdown from './WorkModeDropdown';

const CreateJobPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    minExperience: '',
    maxExperience: '',
    workMode: '',
    minSalary: '',
    maxSalary: '',
    openings: '',
    tags: [],
    skills: '',
    description: '',
    responsibilities: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tag) => {
    setFormData((prev) => {
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter((t) => t !== tag) };
      }
      return { ...prev, tags: [...prev.tags, tag] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send to backend / validate
    console.log('Job post data:', formData);
    alert('Job post submitted! (demo)');
  };

  const tagOptions = ['URGENT', 'REFERRAL', 'OPEN', 'LIMITED', 'FILLED'];

  return (
    <div className="min-h-screen bg-[#EFEFEF] px-5 sm:px-8 lg:px-12 py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header / Breadcrumb */}
        <div className="mb-10">

          <div className="bg-white rounded-xl py-6 px-8 shadow-md">
            <h1 className="text-xl w-11/12 md:text-2xl text-[#696969] tracking-tight">
              <Link to="/alumni-management">Dashboard /{' '}</Link><Link to="/content-management">Content Management /{' '}</Link>
              <span className="text-[#DAB619] font-semibold">Create a Job Post</span>
            </h1>
          </div>
        </div>

        {/* Form Card */}
        <div>
          <h2 className="text-2xl font-semibold text-[#DAB619] mb-8 tracking-tight border-b border-[#949494] pb-3">
            Create a Job Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1: Title + Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Job title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none transition shadow-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Required experience <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    name="minExperience"
                    value={formData.minExperience}
                    onChange={handleChange}
                    required
                    min="0"
                    className="shadow-md w-32 px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none"
                    placeholder="min"
                  />
                  <span className="text-[#AAA9A9]">to</span>
                  <input
                    type="number"
                    name="maxExperience"
                    value={formData.maxExperience}
                    onChange={handleChange}
                    required
                    min="0"
                    className="shadow-md w-32 px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none"
                    placeholder="max"
                  />
                  <span className="text-sm text-[#AAA9A9]">(years)</span>
                </div>
              </div>
            </div>

            {/* Row 2: Work mode + Salary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Work mode <span className="text-red-500">*</span>
                </label>
                <WorkModeDropdown
                  value={formData.workMode}
                  onChange={(value) => setFormData((prev) => ({ ...prev, workMode: value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Salary <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleChange}
                    required
                    className="shadow-md w-32 px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none"
                    placeholder="min"
                  />
                  <span className="text-[#AAA9A9]">to</span>
                  <input
                    type="number"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    required
                    className="shadow-md w-32 px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none"
                    placeholder="max"
                  />
                  <span className="text-sm text-[#AAA9A9]">(php)</span>
                </div>
              </div>
            </div>

            {/* Openings */}
            <div className="max-w-xs">
              <label className="block text-sm font-medium text-[#000000] mb-2 w-full">
                No. of openings <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="openings"
                value={formData.openings}
                onChange={handleChange}
                min="1"
                required
                className="shadow-md w-full px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-3">
                Tags
              </label>
              <div className='px-10 flex flex-col gap-8 '>
                <div>
                  <div className="flex flex-wrap gap-3">
                    {tagOptions.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-5 py-1 rounded-lg text-sm font-medium transition-colors border border-[#6E6127] ${
                          formData.tags.includes(tag)
                            ? 'bg-[#DAB619] text-[#6E6127]'
                            : 'bg-[#EFEFEF] text-[#6E6127] hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    Skills required
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows={3}
                    className="shadow-md w-full px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none resize-none"
                  />
                </div>
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    Description about job
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="shadow-md w-full px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none resize-none"
                  />
                </div>
                {/* Responsibilities */}
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    Responsibilities
                  </label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    rows={6}
                    className="shadow-md w-full px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-200">
              <Link
                to="/content-management"
                className="px-10 py-3 font-medium text-[#000000] bg-gray-200 rounded-md hover:bg-[#AAA9A9] transition-colors uppercase tracking-wide text-sm"
              >
                CANCEL
              </Link>
              <button
                type="submit"
                className="px-10 py-3 font-medium text-white bg-[#DAB619] rounded-md hover:bg-[#b89c14] transition-colors uppercase tracking-wide text-sm shadow-sm hover:shadow"
              >
                POST
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPost;