// Header.jsx
import React from 'react';
import {
  MagnifyingGlass,
} from '@phosphor-icons/react';
function Header() {
  return (
    <header className="bg-[#6E6127]">
      <div className='mx-10 flex items-center justify-end px-4 py-4 w-auto gap-20 h-20'>
        <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-64 sm:w-72 pl-10 pr-4 py-2.5 text-sm border border-[#AAA9A9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB619]/40"
            />
            <MagnifyingGlass size={24} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

        </div>
        <div className='flex items-center justify-end'>
          <div className="flex items-center gap-6">
            <img
              src="https://via.placeholder.com/40?text=MZ"
              alt="Mark Zuckerberg"
              className="h-10 w-10 rounded-full"
            />
            <div className="w-max h-auto">
              <span className="font-semibold text-[#FFFFFF]">Mark Zuckerberg</span>
              <span className="block text-sm font-italic text-[#D8D8D8]">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;