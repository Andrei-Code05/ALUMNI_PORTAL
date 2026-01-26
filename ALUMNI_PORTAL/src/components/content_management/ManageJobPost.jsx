import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Gear,
  Trash,
  Briefcase,
  Code,
  Calculator,
  BracketsCurly,
  CheckCircle,
  CodeSimple,
  Users,
} from '@phosphor-icons/react';
import SortFilterDropdown from './SortFilterDropdown';
import DeparmentDropdown from './DepartmentDropdown';
import StatusDropdown from './StatusDropdown';
import EmploymentDropdown from './EmploymentDropdown';
import TagsDropdown from './TagsDropdown';



const ManageJobPost = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedJobs, setSelectedJobs] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Mock job data based on the image, added department
  const jobs = [
    {
      id: 1,
      title: 'Events Manager',
      company: 'Highly Succeeded Inc.',
      department: 'Events',
      tags: ['URGENT'],
      status: 'OPEN',
      employmentType: 'FULL TIME',
      icon: Briefcase,
    },
    {
      id: 2,
      title: 'Web Developer - Intern',
      company: 'Highly Succeeded Inc.',
      department: 'Development',
      tags: ['INTERN'],
      status: 'OPEN',
      employmentType: '',
      icon: Code,
    },
    {
      id: 3,
      title: 'Accounting',
      company: 'Highly Succeeded Inc.',
      department: 'Accounting',
      tags: [],
      status: 'FILLED',
      employmentType: 'FULL TIME',
      icon: Calculator,
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      company: 'Highly Succeeded Inc.',
      department: 'Development',
      tags: ['URGENT'],
      status: 'OPEN',
      employmentType: 'FULL TIME',
      icon: BracketsCurly,
    },
    {
      id: 5,
      title: 'QA Engineer',
      company: 'Highly Succeeded Inc.',
      department: 'Quality Assurance',
      tags: [],
      status: 'FILLED',
      employmentType: 'FULL TIME',
      icon: CheckCircle,
    },
    {
      id: 6,
      title: 'Jr. Back End Developer',
      company: 'Highly Succeeded Inc.',
      department: 'Development',
      tags: ['URGENT'],
      status: 'OPEN',
      employmentType: 'FULL TIME',
      icon: CodeSimple,
    },
    {
      id: 7,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 8,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 9,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 10,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 11,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 12,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 13,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 14,
      title: 'Full Stack Developer',
      company: 'Highly Succeeded Inc.',
      department: 'Development',
      tags: ['URGENT'],
      status: 'OPEN',
      employmentType: 'FULL TIME',
      icon: BracketsCurly,
    },
    {
      id: 15,
      title: 'QA Engineer',
      company: 'Highly Succeeded Inc.',
      department: 'Quality Assurance',
      tags: [],
      status: 'FILLED',
      employmentType: 'FULL TIME',
      icon: CheckCircle,
    },
    {
      id: 16,
      title: 'Jr. Back End Developer',
      company: 'Highly Succeeded Inc.',
      department: 'Development',
      tags: ['URGENT'],
      status: 'OPEN',
      employmentType: 'FULL TIME',
      icon: CodeSimple,
    },
    {
      id: 17,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 18,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
      {
      id: 19,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 20,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },
    {
      id: 21,
      title: 'Human Resources - Contract',
      company: 'Highly Succeeded Inc.',
      department: 'Human Resources',
      tags: ['REFERRAL'],
      status: 'FILLED',
      employmentType: 'LIMITED',
      icon: Users,
    },

  ];

  // Filtering logic (simplified for demo)
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = !departmentFilter || job.department === departmentFilter;
    const matchesStatus = !statusFilter || job.status === statusFilter;
    const matchesEmployment = !employmentTypeFilter || job.employmentType === employmentTypeFilter;
    const matchesTags = !tagsFilter || job.tags.includes(tagsFilter);
    return matchesSearch && matchesDepartment && matchesStatus && matchesEmployment && matchesTags;
  });

  // Sorting logic (simplified, assuming Newest is default)
  // For real implementation, add dates to jobs and sort accordingly

  const handleClear = () => {
    setSearchQuery('');
    setDepartmentFilter('');
    setStatusFilter('');
    setEmploymentTypeFilter('');
    setTagsFilter('');
    setSortBy('newest');
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allJobIds = new Set(filteredJobs.map(job => job.id));
      setSelectedJobs(allJobIds);
    } else {
      setSelectedJobs(new Set());
    }
  };

  const toggleJobSelection = (jobId) => {
    setSelectedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  };

  useEffect(() => {
    setSelectAll(selectedJobs.size === filteredJobs.length && filteredJobs.length > 0);
  }, [selectedJobs, filteredJobs]);

  return (
    <div className="min-h-screen bg-[#EFEFEF] px-5 sm:px-8 lg:px-12 py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <div className="bg-white rounded-xl py-6 px-8 shadow-md">
            <h1 className="text-xl w-11/12 md:text-xl  text-[#696969] tracking-tight">
              <Link to="/alumni-management">Dashboard /{' '}</Link><Link to="/content-management">Content Management /{' '}</Link>
              <span className="text-[#DAB619] font-semibold">Manage a Job Post</span>
            </h1>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#DAB619] mb-8 tracking-tight border-b border-[#949494] pb-3">
            Manage a Job Post
          </h2>
        </div>

        {/* Filters and Search */}
        <div className='px-10'>
            <div className="bg-white rounded-xl shadow-md p-4 mb-10">
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-3/4 flex-1 px-4 py-2 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none transition"
                />
                <div>
                <SortFilterDropdown
                    value={sortBy}
                    onChange={setSortBy}
                />
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-4 px-10">
                <DeparmentDropdown
                  value={departmentFilter}
                  onChange={setDepartmentFilter}
                />

                <StatusDropdown
                  value={statusFilter}
                  onChange={setStatusFilter}
                />

                <EmploymentDropdown
                  value={employmentTypeFilter}
                  onChange={setEmploymentTypeFilter}
                />

                <TagsDropdown
                  value={tagsFilter}
                  onChange={setTagsFilter}
                />

                <button
                  onClick={handleClear}
                  className="px-6 py-2 bg-[#DAB619] text-white rounded-lg font-medium hover:bg-[#b89c14] transition"
                >
                  CLEAR
                </button>
              </div>
            </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-[48px_1fr_1fr_1fr] px-6 py-4 text-sm font-semibold text-black border-b">
            <div className="w-5 h-5 border-[#000000] border flex items-center justify-center rounded-md">
              <input
                type="checkbox"
                className="w-5 h-5 rounded text-[#DAB619] focus:ring-[#DAB619] appearance-none bg-transparent checked:bg-transparent checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full text-sm cursor-pointer"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </div>
            <div>Job Title</div>
            <div>Tags / Status</div>
            <div>Action</div>
          </div>

          <div className="text-sm font-bold bg-[#F6F6F6] text-[#7D7D7D] border-y border-[#AAA9A9] px-6 py-4">
            Showing {filteredJobs.length} of {jobs.length} Total Postings
            {selectedJobs.size > 0 && (
              <span className="ml-4 text-[#DAB619]">({selectedJobs.size} selected)</span>
            )}
          </div>
          {filteredJobs.map((job) => {
          const isSelected = selectedJobs.has(job.id);
          return (
          <div
            key={job.id}
            className={`grid grid-cols-[48px_1fr_1fr_1fr] px-6 py-4 border-b border-[#AAA9A9] last:border-none items-center ${
              isSelected ? 'bg-[#E8C32C] hover:bg-[#c4a015]' : 'hover:bg-[#F9F9F9]'
            }`}
          >
              <div className="w-[20px] h-[20px] flex justify-center items-center">
                <div className="w-5 h-5 border-[#000000] border flex items-center justify-center rounded-md">
                  <input
                    className="w-5 h-5 rounded text-[#DAB619] focus:ring-[#DAB619] appearance-none bg-transparent checked:bg-transparent checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full text-sm cursor-pointer"
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleJobSelection(job.id)}
                  />
                </div>
              </div>
              <div className='flex flex-row items-center gap-4'>
                <div className=' border-[#474747] border rounded-full flex items-center justify-center h-[50px] w-[50px]'>
                  <job.icon size={32} className="text-[#DAB619] " />
                  </div>
                <div>
                  <div className="font-sm text-[#000000]">{job.title}</div>
                  <div className="text-xs text-[#000000]">{job.company}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-transparent border border-[#7B7B7B] text-[#7B7B7B] rounded-md text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                <span className="px-3 py-1 bg-transparent border border-[#7B7B7B] text-[#7B7B7B] rounded-md text-xs font-medium">
                  {job.status}
                </span>
                {job.employmentType && (
                  <span className="px-3 py-1 bg-transparent border border-[#7B7B7B] text-[#7B7B7B] rounded-md text-xs font-medium">
                    {job.employmentType}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Link to="../content-management/edit-job-post">                
                <button className="flex items-center text-[#000000] hover:text-[#DAB619]">
                  <Gear className="mr-1" /> Modify Posting
                </button></Link>

                <button className="flex items-center text-[#A14141] hover:text-red-600">
                  <Trash className="mr-1" /> Remove Posting
                </button>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default ManageJobPost;