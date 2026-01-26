import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/HSI_logo.png';
import HSI from '../assets/img/HSI.png';

import {
  ArrowFatLinesLeft,
  CaretDown,
  CaretUp,
  House,
  AddressBook,
  Briefcase,
  BookOpen,
  Medal,
  CalendarBlank,
  Megaphone,
  Handshake,
  Folder,
  User,
} from '@phosphor-icons/react';

const navItems = [
  {
    name: 'Dashboard',
    icon: House,
    subItems: [
      { name: 'Alumni Management', path: '/alumni-management' },
      { name: 'Content Management', path: '/content-management' },
      { name: 'Analytics & Report', path: '/analytics-and-report' },
    ],
  },
  { name: 'Directory & Networking', icon: AddressBook, path: '/directory' },
  { name: 'Career & Job Opportunities', icon: Briefcase, path: '/career' },
  { name: 'Training & Learning', icon: BookOpen, path: '/training' },
  { name: 'Achievements & Recognition', icon: Medal, path: '/achievements' },
  { name: 'Events & Community Engagement', icon: CalendarBlank, path: '/events' },
  { name: 'Announcements', icon: Megaphone, path: '/announcements' },
  { name: 'Mentorship & Volunteer Programs', icon: Handshake, path: '/mentorship' },
  { name: 'Documents & Records', icon: Folder, path: '/documents' },
];

function Sidebar({ isOpen, toggle }) {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const expanded = isOpen || isHovered;

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      onMouseEnter={() => !isOpen && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-[#585858] text-white h-screen overflow-y-auto transition-all duration-300 flex flex-col
        ${expanded ? 'w-80' : 'w-24'}
      `}
    >
      {/* HEADER */}
      <div
        className={`flex items-center h-20 cursor-pointer border-b border-[#D9D9D9]
          ${expanded ? 'justify-between' : 'justify-center'}
        `}
        onClick={toggle}
      >
        {expanded ? (
          <img src={logo} className="h-20 w-auto px-4" alt="HSI_logo" />
        ) : (
          <img src={HSI} className="h-20 w-20" alt="HSI_logo" />
        )}
        {expanded && <ArrowFatLinesLeft size={24} className="mr-4" />}
      </div>

      {/* MAIN */}
      <div className="relative">
        {expanded && (
          <div className="absolute top-8 left-6 text-xs">MAIN</div>
        )}

        <nav className="flex-1 p-4 mt-9">
          {navItems.map((item, index) => {
            const isSubOpen = openSubmenus[index];

            return (
              <div key={index}>
                {/* MAIN ITEM */}
                {item.subItems ? (
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className={`w-full flex items-center py-3 px-4 mb-2 rounded-md transition-all
                      hover:bg-[#7D7D7D]
                      ${expanded ? 'justify-start' : 'justify-center'}
                    `}
                  >
                    <item.icon size={20} />
                    {expanded && <span className="ml-4 text-sm">{item.name}</span>}
                    {expanded && (
                      <span className="ml-auto">
                        {isSubOpen ? <CaretUp size={20} /> : <CaretDown size={20} />}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`w-full flex items-center py-3 px-4 mb-2 rounded-md transition-all
                      hover:bg-[#7D7D7D]
                      ${expanded ? 'justify-start' : 'justify-center'}
                    `}
                  >
                    <item.icon size={20} />
                    {expanded && <span className="ml-4 text-sm">{item.name}</span>}
                  </Link>
                )}

                {/* SUBMENU */}
                {item.subItems && isSubOpen && expanded && (
                  <div className="ml-8 border-l-2 border-[#D9D9D9] pl-2">
                    {item.subItems.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={sub.path}
                        className={`block py-2 px-4 text-xs rounded-md m-1 transition-colors
                          ${
                            location.pathname === sub.path
                              ? 'bg-white text-black'
                              : 'hover:bg-[#7D7D7D]'
                          }
                        `}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* OTHERS */}
      <div className="border-t border-[#D9D9D9] relative">
        {expanded && (
          <div className="absolute top-5 left-8 text-xs">OTHERS</div>
        )}

        <div className="p-4 mt-4">
          <Link
            to="/profile"
            className={`flex items-center py-3 px-4 rounded-md transition-all hover:bg-[#7D7D7D]
              ${expanded ? 'justify-start' : 'justify-center'}
            `}
          >
            <User size={20} />
            {expanded && <span className="ml-4">Profile</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
