// src/pages/UserVerification.jsx
import React, { useState } from 'react';
import { UserCircle, X, Plus, UserCheck, UserMinus, MagnifyingGlass } from '@phosphor-icons/react';
import RoleFilterDropdown from './RoleFilterDropdown.jsx';

function UserVerification({ mockPendingVerifications = [] }) {
  // Pending Verifications State
  const [selectedVerifications, setSelectedVerifications] = useState(new Set());
  const [verifiedIds, setVerifiedIds] = useState(new Set());
  const [expandedVerificationId, setExpandedVerificationId] = useState(null);

  const toggleVerificationSelection = (id) => {
    setSelectedVerifications(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkAction = (action) => {
    if (selectedVerifications.size === 0) return;
    if (!window.confirm(`Confirm bulk ${action} of ${selectedVerifications.size} items?`)) return;
    setVerifiedIds(prev => {
      const updated = new Set(prev);
      selectedVerifications.forEach(id => updated.add(id));
      return updated;
    });
    setSelectedVerifications(new Set());
  };

  const handleSingleAction = (id, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this account?`)) return;
    setVerifiedIds(prev => new Set([...prev, id]));
  };

  const toggleSkillsExpand = (id) => {
    setExpandedVerificationId(prev => prev === id ? null : id);
  };

  const pendingCount = mockPendingVerifications.length - verifiedIds.size;

  return (
    <section className="pt-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-lg py-5 px-6 shadow-sm">
        <h1 className="text-xl font-semibold text-[#000000]">User Verification</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-64 pl-10 pr-4 py-2.5 text-sm border border-[#AAA9A9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB619]/40"
            />
            <MagnifyingGlass size={24} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <RoleFilterDropdown
            value=""
            onChange={() => { }}
            placeholder="All Positions"
          />
          <button className="bg-[#DAB619] hover:bg-[#c4a015] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm">
            CLEAR
          </button>
        </div>
      </div>
      <div className="text-sm text-[#7D7D7D] mb-5 font-bold px-6">
        {pendingCount} Pending {pendingCount === 1 ? 'Verification' : 'Verifications'}
      </div>
      {pendingCount === 0 ? (
        <div className="bg-[#FFFFFF] rounded-lg p-10 text-center text-[#7D7D7D] px-6 font-bold">
          No pending verifications at this time.
        </div>
      ) : (
        <div className='flex items-center justify-center'>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(2,25rem)] gap-6 px-4 md:px-0 justify-content-center items-start">
            {mockPendingVerifications
              .filter(item => !verifiedIds.has(item.id))
              .map(item => {
                const isExpanded = expandedVerificationId === item.id;
                const maxVisibleSkills = 3;
                const visibleSkills = isExpanded ? item.skills : item.skills.slice(0, maxVisibleSkills);
                const hiddenSkills = item.skills.length - maxVisibleSkills;
                return (
                  <div
                    key={item.id}
                    className="bg-[#FFFFFF] border rounded-lg p-5 transition-all hover:shadow-md hover:border-gray-300"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h3 className="text-lg font-bold text-[#000000]">{item.position}</h3>
                        <h3 className="text-sm text-[#4D4D4D]">{item.roles.join(', ')}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSingleAction(item.id, 'reject')}
                          title="Reject"
                          className="text-[#A14141] hover:text-red-800 transition-colors p-1"
                        >
                          <UserMinus size={24} />
                        </button>
                        <button
                          onClick={() => handleSingleAction(item.id, 'approve')}
                          title="Approve"
                          className="text-[#41A154] hover:text-green-800 transition-colors p-1"
                        >
                          <UserCheck size={24} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="flex items-center gap-3">
                        <UserCircle size={60} weight="duotone" className="text-gray-300 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600 mt-[-4px]">{item.department}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      {visibleSkills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium bg-[#EDEDED] text-[#6E6127] rounded-md border border-[#AAA9A9]"
                        >
                          {skill}
                        </span>
                      ))}
                      {!isExpanded && hiddenSkills > 0 && (
                        <button
                          onClick={() => toggleSkillsExpand(item.id)}
                          className="w-6 h-6 text-xs text-[#6E6127] font-medium bg-[#EDEDED] border border-[#7D7D7D] rounded-full flex items-center justify-center hover:bg-[#7D7D7D] hover:text-white"
                        >
                          <Plus size={16} />
                        </button>
                      )}
                      {isExpanded && hiddenSkills > 0 && (
                        <button
                          onClick={() => toggleSkillsExpand(item.id)}
                          className="w-6 h-6 text-xs text-white bg-[#6E6127] border border-[#7D7D7D] rounded-full flex items-center justify-center hover:bg-transparent hover:text-[#7D7D7D] hover:border-[#7D7D7D]"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
}

export default UserVerification;