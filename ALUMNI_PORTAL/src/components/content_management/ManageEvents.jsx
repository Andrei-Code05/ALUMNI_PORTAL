import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PencilSimple,
  Trash,
  Archive,
  MicrophoneStage,
  Gift,
  PresentationChart,
  BugBeetle,
  UsersThree,
  CalendarCheck,
  Palette,
  CalendarDots,
  Clock,
} from '@phosphor-icons/react';
import SortFilterDropdown from './SortFilterDropdown';
import CategoryDropdown from './CategoryDropdown';
import EventTypeDropdown from './EventTypeDropdown';
import SetupDropdown from './SetupDropdown';

const ManageEvents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [setupFilter, setSetupFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedEvents, setSelectedEvents] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Mock event data based on the image
  const events = [
    {
      id: 1,
      title: 'Tech Career Talk 2028',
      company: '',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: MicrophoneStage,
      category: 'Career',
      eventType: 'Talk',
      setup: 'Virtual',
    },
    {
      id: 2,
      title: 'Christmas Party',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '8:00 AM - 12:00 PM',
      icon: Gift,
      category: 'Social',
      eventType: 'Party',
      setup: 'In-Person',
    },
    {
      id: 3,
      title: 'Marketing Strategy Seminar',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: PresentationChart,
      category: 'Professional',
      eventType: 'Seminar',
      setup: 'Hybrid',
    },
    {
      id: 4,
      title: 'QA Training',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: BugBeetle,
      category: 'Training',
      eventType: 'Workshop',
      setup: 'Virtual',
    },
    {
      id: 5,
      title: 'Tuesday Huddle',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: UsersThree,
      category: 'Team',
      eventType: 'Meeting',
      setup: 'In-Person',
    },
    {
      id: 6,
      title: 'Thursday Huddle',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: CalendarCheck,
      category: 'Team',
      eventType: 'Meeting',
      setup: 'Virtual',
    },
    {
      id: 7,
      title: 'Graphics Design Training',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: Palette,
      category: 'Training',
      eventType: 'Workshop',
      setup: 'Hybrid',
    },
    // Add more to reach 20 as in image
    {
      id: 8,
      title: 'Tech Career Talk 2028',
      company: '',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: MicrophoneStage,
      category: 'Career',
      eventType: 'Talk',
      setup: 'Virtual',
    },
    {
      id: 9,
      title: 'Christmas Party',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '8:00 AM - 12:00 PM',
      icon: Gift,
      category: 'Social',
      eventType: 'Party',
      setup: 'In-Person',
    },
    {
      id: 10,
      title: 'Marketing Strategy Seminar',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: PresentationChart,
      category: 'Professional',
      eventType: 'Seminar',
      setup: 'Hybrid',
    },
    {
      id: 11,
      title: 'QA Training',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: BugBeetle,
      category: 'Training',
      eventType: 'Workshop',
      setup: 'Virtual',
    },
    {
      id: 12,
      title: 'Tuesday Huddle',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: UsersThree,
      category: 'Team',
      eventType: 'Meeting',
      setup: 'In-Person',
    },
    {
      id: 13,
      title: 'Thursday Huddle',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: CalendarCheck,
      category: 'Team',
      eventType: 'Meeting',
      setup: 'Virtual',
    },
    {
      id: 14,
      title: 'Graphics Design Training',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: Palette,
      category: 'Training',
      eventType: 'Workshop',
      setup: 'Hybrid',
    },
    {
      id: 15,
      title: 'Tech Career Talk 2028',
      company: '',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: MicrophoneStage,
      category: 'Career',
      eventType: 'Talk',
      setup: 'Virtual',
    },
    {
      id: 16,
      title: 'Christmas Party',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '8:00 AM - 12:00 PM',
      icon: Gift,
      category: 'Social',
      eventType: 'Party',
      setup: 'In-Person',
    },
    {
      id: 17,
      title: 'Marketing Strategy Seminar',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: PresentationChart,
      category: 'Professional',
      eventType: 'Seminar',
      setup: 'Hybrid',
    },
    {
      id: 18,
      title: 'QA Training',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: BugBeetle,
      category: 'Training',
      eventType: 'Workshop',
      setup: 'Virtual',
    },
    {
      id: 19,
      title: 'Tuesday Huddle',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: UsersThree,
      category: 'Team',
      eventType: 'Meeting',
      setup: 'In-Person',
    },
    {
      id: 20,
      title: 'Thursday Huddle',
      company: 'Highly Succeeded Inc.',
      schedule: 'Jan 24, 2028',
      time: '9:00 AM - 12:00 PM',
      icon: CalendarCheck,
      category: 'Team',
      eventType: 'Meeting',
      setup: 'Virtual',
    },
  ];

  // Filtering logic
  const filteredEvents = events.filter((event) => {
    const fullTitle = `${event.title} ${event.company}`.toLowerCase();
    const matchesSearch = fullTitle.includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || event.category === categoryFilter;
    const matchesEventType = !eventTypeFilter || event.eventType === eventTypeFilter;
    const matchesSetup = !setupFilter || event.setup === setupFilter;
    return matchesSearch && matchesCategory && matchesEventType && matchesSetup;
  });

  // Sorting logic (simplified, add dates if needed for real sorting)

  const handleClear = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setEventTypeFilter('');
    setSetupFilter('');
    setSortBy('newest');
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allEventIds = new Set(filteredEvents.map((event) => event.id));
      setSelectedEvents(allEventIds);
    } else {
      setSelectedEvents(new Set());
    }
  };

  const toggleEventSelection = (eventId) => {
    setSelectedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  };

  useEffect(() => {
    setSelectAll(selectedEvents.size === filteredEvents.length && filteredEvents.length > 0);
  }, [selectedEvents, filteredEvents]);

  return (
    <div className="min-h-screen bg-[#EFEFEF] px-5 sm:px-8 lg:px-12 py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <div className="bg-white rounded-xl py-6 px-8 shadow-md">
            <h1 className="text-xl w-11/12 md:text-xl text-[#696969] tracking-tight">
              <Link to="/alumni-management">Dashboard /{' '}</Link><Link to="/content-management">Content Management /{' '}</Link>
              <span className="text-[#DAB619] font-semibold">Manage Events</span>
            </h1>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#DAB619] mb-8 tracking-tight border-b border-[#949494] pb-3">
            Manage a Event Post
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
              <CategoryDropdown
                value={categoryFilter}
                onChange={setCategoryFilter}
              />
              <EventTypeDropdown
                value={eventTypeFilter}
                onChange={setEventTypeFilter}
              />
              <SetupDropdown
                value={setupFilter}
                onChange={setSetupFilter}
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
          <div className="grid grid-cols-[48px_1fr_300px_350px] px-6 py-4 text-sm font-semibold text-black border-b">
            <div className="w-5 h-5 border-[#000000] border flex items-center justify-center rounded-md">
              <input
                type="checkbox"
                className="w-5 h-5 rounded text-[#DAB619] focus:ring-[#DAB619] appearance-none bg-transparent checked:bg-transparent checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full text-sm cursor-pointer"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </div>
            <div>Event Title</div>
            <div>Event Schedule</div>
            <div>Action</div>
          </div>

          <div className="text-sm font-bold bg-[#F6F6F6] text-[#7D7D7D] border-y border-[#AAA9A9] px-6 py-4">
            Showing {filteredEvents.length} of {events.length} Total Postings
            {selectedEvents.size > 0 && (
              <span className="ml-4 text-[#DAB619]">({selectedEvents.size} selected)</span>
            )}
          </div>
          {filteredEvents.map((event) => {
            const isSelected = selectedEvents.has(event.id);
            const fullTitle = event.company ? `${event.title} ${event.company}` : event.title;
            return (
              <div
                key={event.id}
                className={`grid grid-cols-[48px_1fr_300px_350px] px-6 py-4 border-b border-[#AAA9A9] last:border-none items-center ${
                  isSelected ? 'bg-[#E8C32C] hover:bg-[#c4a015]' : 'hover:bg-[#F9F9F9]'
                }`}
              >
                <div className="w-[20px] h-[20px] flex justify-center items-center">
                  <div className="w-5 h-5 border-[#000000] border flex items-center justify-center rounded-md">
                    <input
                      className="w-5 h-5 rounded text-[#DAB619] focus:ring-[#DAB619] appearance-none bg-transparent checked:bg-transparent checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full text-sm cursor-pointer"
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleEventSelection(event.id)}
                    />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-4'>
                  <div className='border-[#474747] border rounded-full flex items-center justify-center h-[50px] w-[50px]'>
                    <event.icon size={32} className="text-[#DAB619]" />
                  </div>
                  <div className='flex flex-col'>
                        <div className="text-sm text-[#000000] mr-[10px]">{event.title}</div>
                      <div className="text-xs text-[#000000]  mr-[10px]">{event.company}</div>
                  </div>

                </div>
                <div className="flex items-center gap-2 mr-2 whitespace-nowrap">
                <div className='flex flex-row items-center px-2 py-1 border-[#7B7B7B] border text-[#7B7B7B] rounded-md text-xs font-medium gap-1'>
                    <CalendarDots size={15}/>
                    <div>
                        {event.schedule}
                    </div>
                </div>
                <div className='flex flex-row items-center px-2 py-1 border-[#7B7B7B] border text-[#7B7B7B] rounded-md text-xs font-medium gap-1'>
                    <Clock size={15}/>
                    <div>
                        {event.time}
                    </div>
                </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Link to="../content-management/edit-events">
                    <button className="flex items-center text-[#000000] hover:text-[#DAB619] text-nowrap">
                      <PencilSimple className="mr-1" /> Edit Event
                    </button>
                  </Link>
                  <button className="flex items-center text-[#A14141] hover:text-red-600 text-nowrap">
                    <Trash className="mr-1" /> Remove Event
                  </button>
                  <button className="flex items-center text-[#000000] hover:text-[#DAB619] text-nowrap">
                    <Archive className="mr-1" /> Archive Event
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;