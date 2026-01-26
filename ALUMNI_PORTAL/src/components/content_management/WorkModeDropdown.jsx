import React, { useState, useEffect, useRef } from 'react';

function WorkModeDropdown({ value, onChange, placeholder = " " }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: "On Site", value: "on-site" },
    { label: "Work From Home", value: "work-from-home" },
    { label: "Hybrid", value: "hybrid" },
  ];

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

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
    <div className="relative inline-block text-left min-w-[160px] w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`
          
          w-full flex items-center justify-between gap-2
            px-4 py-4
          bg-[#FFFFFF] 
          border border-[#AAA9A9]
          text-[#AAA9A9] font-medium text-sm
          rounded-lg
          shadow-md
          focus:outline-none focus:ring-2 focus:ring-[#DAB619]/40
          transition-all
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 -mt-2 w-full
            bg-white rounded-b-lg shadow-xl
            border border-[#AAA9A9]
            z-50 overflow-hidden
            text-sm font-medium text-[#AAA9A9]
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`
                w-full text-left px-5 py-3
                text-[#AAA9A9]
                active:bg-gray-100 
                transition-colors duration-150
                border-b border-[#AAA9A9] last:border-b
                hover:bg-[#EFEFEF] 
                ${option.value === value ? 'bg-[#949494] font-semibold text-[#000000]' : ''}
              `}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkModeDropdown;