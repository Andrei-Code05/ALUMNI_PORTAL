// src/pages/RoleAddingDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Plus } from '@phosphor-icons/react';

function RoleAddingDropdown({ onAdd, currentRoles = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const allOptions = [
    { label: "Admin", value: "Admin" },
    { label: "Manager", value: "Manager" },
    { label: "Employee", value: "Employee" },
    { label: "Intern", value: "Intern" },
  ];

  const options = allOptions.filter(opt => !currentRoles.includes(opt.value));

  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleSelect = (value) => {
    if (value && onAdd) onAdd(value);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block ml-2" ref={dropdownRef}>
      <button
        onClick={toggleOpen}
        className={`w-6 h-6 text-xs font-medium rounded-full flex items-center justify-center transition-colors ${
          isOpen 
            ? 'text-white bg-[#7D7D7D] border border-[#7D7D7D] hover:bg-transparent hover:text-[#7D7D7D] hover:border-[#7D7D7D]'
            : 'text-[#FFFFFF] bg-[#199A08] border border-[#199A08] hover:bg-[#] hover:text-white mt-2'
        }`}
      >
        {isOpen ? <X size={16} /> : <Plus size={16} />}
      </button>

      {isOpen && (
        <div
          className="
            absolute top-0 left-3 -translate-x-1/2 w-auto
            bg-white rounded-lg shadow-xl
            border border-[#AAA9A9]
            z-50 overflow-hidden
            text-sm font-medium text-gray-900
          "
        >
          <div className="flex justify-center px-2 py-1 bg-[#797979] border border-[#797979]">
            <button
              onClick={handleClose}
              className="text-[#FFFFFF]"
            >
              <X size={16} />
            </button>
          </div>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className=" 
                w-full text-center px-10 py-1
                active:bg-gray-100 
                transition-colors duration-150
                border-b border-[#AAA9A9] last:border-b-0
                hover:bg-[#AAA9A9] 
              "
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoleAddingDropdown;