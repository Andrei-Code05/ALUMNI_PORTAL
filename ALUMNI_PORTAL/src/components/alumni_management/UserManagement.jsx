// src/pages/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { UserCircle, Gear, TrashSimple, X, Plus, MagnifyingGlass } from '@phosphor-icons/react';
import RoleFilterDropdown from './RoleFilterDropdown.jsx';
import RoleAddingDropdown from './RoleAddingDropdown.jsx';


const ITEMS_PER_PAGE = 10;

function UserManagement({ mockUsers = [] }) {
  // User Management State
  const [users, setUsers] = useState(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");


  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allUserIds = new Set(users.map(user => user.id));
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers(new Set());
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  useEffect(() => {
    setSelectAll(selectedUsers.size === users.length && users.length > 0);
  }, [selectedUsers, users]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const toggleRolesExpand = (userId) => {
    setExpandedUserId(prev => prev === userId ? null : userId);
  };

  const toggleEditRoles = (userId) => {
    setEditingUserId(prev => prev === userId ? null : userId);
  };

  const removeRole = (userId, role) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, roles: u.roles.filter(r => r !== role) } : u));
  };

  const addRole = (userId, newRole) => {
    if (!newRole) return;
    setUsers(prev => prev.map(u => {
      if (u.id === userId && !u.roles.includes(newRole)) {
        return { ...u, roles: [...u.roles, newRole] };
      }
      return u;
    }));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const handleRoleColor = (role) => {
    switch(role) {
      case "Admin": return "#BE5F00";
      case "Manager": return "#720000";
      case "Employee": return "#3B82F6";
      case "Intern": return "#199A08";
      default: return "#6B7280";
    }
  };

  return (
    <section>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-lg py-5 px-6 shadow-sm">
        <h1 className="text-xl font-semibold text-[#000000]">User Management</h1>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-64 sm:w-72 pl-10 pr-4 py-2.5 text-sm border border-[#AAA9A9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB619]/40"
            />
            <MagnifyingGlass size={24} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <RoleFilterDropdown
            value={selectedRole}
            onChange={setSelectedRole}
          />

          <button className="bg-[#DAB619] hover:bg-[#c4a015] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm">
            ADD USER
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 flex items-center text-sm font-semibold text-[#000000] bg-[#FFFFFF] border-[#9E9E9E] border-b">
          <div className='w-24 flex items-center"'>
            <div className="w-5 h-5 border-[#000000] border flex items-center justify-center rounded-md">
              <input
                type="checkbox"
                className="w-5 h-5 rounded text-[#DAB619] focus:ring-[#DAB619] appearance-none bg-transparent checked:bg-transparent checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full text-sm cursor-pointer"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </div>
          </div>
          <div className="w-2/5">Name</div>
          <div className="w-2/5">Roles</div>
          <div className="w-1/5">Actions</div>
        </div>

        <div className="px-6 py-3 text-sm text-[#7D7D7D] bg-[#F6F6F6] border-[#9E9E9E] border-b font-bold">
          Showing {startIndex + 1}–{Math.min(endIndex, users.length)} of {users.length} users
          {selectedUsers.size > 0 && (
            <span className="ml-4 text-[#DAB619]">({selectedUsers.size} selected)</span>
          )}
        </div>

        {currentUsers.map((user) => {
          const isSelected = selectedUsers.has(user.id);
          const isExpanded = expandedUserId === user.id;
          const isEditing = editingUserId === user.id;
          const maxVisibleRoles = 3;
          let visibleRoles = user.roles;
          let hidden = 0;

          if (!isEditing) {
            visibleRoles = isExpanded ? user.roles : user.roles.slice(0, maxVisibleRoles);
            hidden = user.roles.length - maxVisibleRoles;
          }

          return (
            <div
              key={user.id}
              className={`flex items-center px-6 py-4 border-[#9E9E9E] border-b last:border-b-0 transition-colors gap-8 ${
                isSelected ? 'bg-[#E8C32C] hover:bg-[#c4a015]' : 'hover:bg-[#F9F9F9]'
              }`}
            >
              <div className="w-5 h-5 border-[#000000] border flex items-center justify-center rounded-md">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded text-[#DAB619] focus:ring-[#DAB619] appearance-none bg-transparent checked:bg-transparent checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full text-sm cursor-pointer"
                  checked={isSelected}
                  onChange={() => toggleUserSelection(user.id)}
                />
              </div>

              <div className="w-2/5 flex items-center gap-3">
                <UserCircle size={60} weight="duotone" className="text-gray-300 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[#000000]">{user.name}</div>
                  <div className="text-sm text-[#000000] mt-0.5">{user.email}</div>
                </div>
              </div>

              <div className="w-2/5 flex flex-wrap gap-2 items-center">
                {visibleRoles.map(role => {
                  const color = handleRoleColor(role);

                  return (
                    <div key={role} className={`relative ${isEditing ? 'mt-2' : ''}`}>
                      <span
                        className="px-2.5 py-1 text-xs font-medium rounded border"
                        style={{ color, borderColor: color }}
                      >
                        {role}
                      </span>
                      {isEditing && (
                        <button
                          onClick={() => removeRole(user.id, role)}
                          className="absolute -top-2 -left-2 bg-[#FF0000] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  );
                })}

                {!isEditing && !isExpanded && hidden > 0 && (
                  <button
                    onClick={() => toggleRolesExpand(user.id)}
                    className="w-6 h-6 text-xs text-[#7D7D7D] font-medium bg-transparent border border-[#7D7D7D] rounded-full flex items-center justify-center hover:bg-[#7D7D7D] hover:text-white"
                  >
                    <Plus size={16} />
                  </button>
                )}

                {!isEditing && isExpanded && hidden > 0 && (
                  <button
                    onClick={() => toggleRolesExpand(user.id)}
                    className="w-6 h-6 text-xs text-white bg-[#7D7D7D] border border-[#7D7D7D] rounded-full flex items-center justify-center hover:bg-transparent hover:text-[#7D7D7D] hover:border-[#7D7D7D]"
                  >
                    <X size={16} />
                  </button>
                )}

                {isEditing && (
                  <RoleAddingDropdown onAdd={(newRole) => addRole(user.id, newRole)} />
                )}
              </div>

              <div className={`w-1/5 flex gap-2 text-sm flex-wrap`}>
                <button 
                  className="flex items-center gap-1.5 text-[#000000] hover:text-[#7D7D7D] transition-colors"
                  onClick={() => toggleEditRoles(user.id)}
                >
                  <Gear size={16} weight="bold" />
                  {isEditing ? 'Done' : 'Modify Role'}
                </button>
                <button className="flex items-center gap-1.5 text-[#A14141] hover:text-red-600 transition-colors">
                  <TrashSimple size={16} weight="bold" />
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end items-center gap-3 flex-wrap">
        <button
          className="px-5 py-2.5 bg-[#DAB619] text-white hover:bg-[#c4a015] disabled:opacity-50 disabled:cursor-not-allowed rounded-md border border-[#AAA9A9] transition-colors"
          disabled={currentPage === 1}
          onClick={() => goToPage(1)}
        >
          FIRST
        </button>

        <div className="inline-flex items-center rounded-md bg-white shadow-sm overflow-hidden border border-[#AAA9A9]">
          <button
            className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center px-1">
            {getPageNumbers().map((page, idx) =>
              page === '...' ? (
                <span key={`ellipsis-${idx}`} className="px-4 py-2.5 text-[#7B7B7B] font-bold">…</span>
              ) : (
                <button
                  key={page}
                  className={`px-4 py-2.5 min-w-[40px] text-center transition-colors ${
                    page === currentPage
                      ? 'bg-[#D7D7D7] text-[#7B7B7B] font-semibold'
                      : 'text-[#7B7B7B] hover:bg-[#F0F0F0]'
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <button
          className="px-5 py-2.5 bg-[#DAB619] text-white hover:bg-[#c4a015] disabled:opacity-50 disabled:cursor-not-allowed rounded-md border border-[#AAA9A9] transition-colors"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(totalPages)}
        >
          LAST
        </button>
      </div>
    </section>
  );
}

export default UserManagement;