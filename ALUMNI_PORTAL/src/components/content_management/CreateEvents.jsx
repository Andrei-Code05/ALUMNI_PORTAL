// src/components/content_management/CreateEvents.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDots, Clock } from '@phosphor-icons/react';
import EventCategoryDropdown from './EventCategoryDropdown';
import LocationDropdown from './LocationDropdown';
import CreateEventsModal from './CreateEventsModal';

const CreateEvents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: 'Single Event',
    startDate: '',
    startTime: '',
    location: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleSubmit = () => {
    console.log('Event data:', formData);
    alert('Event created! (demo)');
  };

  return (
    <div className="relative min-h-screen bg-[#EFEFEF] px-5 sm:px-8 lg:px-12 py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header / Breadcrumb */}
        <div className="mb-10">
          <div className="bg-white rounded-xl py-6 px-8 shadow-md">
            <h1 className="text-xl w-11/12 md:text-2xl text-[#696969] tracking-tight">
              <Link to="/alumni-management">Dashboard /{' '}</Link><Link to="/content-management">Content Management /{' '}</Link>
              <span className="text-[#DAB619] font-semibold">Create Events</span>
            </h1>
          </div>
        </div>

        {/* Form Card */}
        <div>
            
          <h2 className="text-2xl font-semibold text-[#DAB619] mb-8 tracking-tight border-b border-[#949494] pb-3">
            Create Events
          </h2>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Event Details */}
            <div>
              <div className="grid grid-cols-[minmax(120px,150px)_1fr] items-center gap-4 mb-4">
              <span className=''></span>
              <h3 className="text-xl font-medium text-gray-900">Event Details</h3>
                <label className="block text-sm font-medium text-[#000000] text-nowrap text-right">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter the name of your event"
                  className="w-7/12 px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none transition shadow-md"
                />
              </div>
              <div className="grid grid-cols-[minmax(120px,150px)_1fr] items-center gap-4 mb-4">
                <label className="block text-sm font-medium text-[#000000] text-nowrap text-right">
                  Event Category <span className="text-red-500">*</span>
                </label>
                <div className='w-7/12'>
                    <EventCategoryDropdown
                      value={formData.category}
                      onChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <div className="grid grid-cols-[minmax(120px,150px)_1fr] items-center gap-4 mb-4">
                    <span className=''></span>
                    <h3 className="text-xl font-medium text-gray-900">Date & Time</h3>

                <label className="block text-sm font-medium text-[#000000] text-nowrap text-right">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                        type="radio"
                        name="eventType"
                        checked={formData.type === 'Single Event'}
                        onChange={() => handleTypeChange('Single Event')}
                        className="custom-radio"
                        />
                        <span className="text-md font-semibold text-[#2E2E3A]">
                        Single Event
                        </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                        type="radio"
                        name="eventType"
                        checked={formData.type === 'Recurring Event'}
                        onChange={() => handleTypeChange('Recurring Event')}
                        className="custom-radio"
                        />
                        <span className="text-md font-semibold text-[#2E2E3A]">
                        Recurring Event
                        </span>
                    </label>
                </div>
              </div>
              <div className="grid grid-cols-[minmax(120px,150px)_1fr] items-start gap-4 mb-4">
                <label className="block text-sm font-medium text-[#000000] text-nowrap text-right pt-6">
                  Session(s) <span className="text-red-500">*</span>
                </label>
                <div className="w-7/12 flex flex-row gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className='aspect-square h-full absolute left-0 top-1/2 transform -translate-y-1/2 text-[#5A5A5A] bg-[#EEEEEE] items-center justify-center flex rounded-l-lg border border-[#AAA9A9]'>
                          <CalendarDots size={24} />
                      </div>                      
                      <input
                        type="text"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        placeholder="DD/MM/YYYY"
                        className="w-full pl-16 px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none transition shadow-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className='aspect-square h-full absolute left-0 top-1/2 transform -translate-y-1/2 text-[#5A5A5A] bg-[#EEEEEE] items-center justify-center flex rounded-l-lg border border-[#AAA9A9]'>
                          <Clock size={24} />
                      </div>
                      <input
                        type="text"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        placeholder="12:00 AM"
                        className="w-full pl-16 px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none transition shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
            
              <div className="grid grid-cols-[minmax(120px,150px)_1fr] items-center gap-4 mb-4">
                <span className=''></span>
                <h3 className="text-xl font-medium text-gray-900">Location</h3>
                <label className="block text-sm font-medium text-[#000000] text-right">
                  Where will event take place? <span className="text-red-500">*</span>
                </label>
                <div className='w-7/12'>
                    <LocationDropdown
                      value={formData.location}
                      onChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                    />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <div className="grid grid-cols-[minmax(120px,150px)_1fr] items-start gap-4 mb-4">
                <span className=''></span>
                <h3 className="text-xl font-medium text-gray-900">Additional Information</h3>
                <label className="block text-sm font-medium text-[#000000] text-nowrap text-right">
                  Event Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  required
                  placeholder="Describe what's special about your event & other important details."
                  className="w-full h-[220px] shadow-md px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none resize-none"
                />
              </div>
            </div>

            {/* Upload Image */}
            <div>
              <div className="grid grid-cols-[minmax(120px,150px)_1fr] items-start gap-4 mb-4">
                <span className=''></span>
                <h3 className="text-xl font-medium text-gray-900">Upload Image</h3>
                <label className="block text-sm font-medium text-[#000000] text-nowrap text-right">
                  Upload Image
                </label>
                <div className='w-7/12'>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept=".jpg,.gif,.png"
                    className="w-full px-4 py-3 border border-[#AAA9A9] rounded-lg focus:ring-2 focus:ring-[#DAB619]/50 focus:border-[#DAB619] outline-none transition shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2 w-10/12">
                    Feature image must be at least 1170 pixels wide by 504 pixels high. Valid file formats: JPG, GIF, PNG.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-200">
              <Link
                to="/content-management/"
                className="px-10 py-3 font-medium text-[#000000] bg-gray-200 rounded-md hover:bg-[#AAA9A9] transition-colors uppercase tracking-wide text-sm"
              >
                CANCEL
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-10 py-3 font-medium text-white bg-[#DAB619] rounded-md hover:bg-[#b89c14] transition-colors uppercase tracking-wide text-sm shadow-sm hover:shadow"
              >
                CREATE
              </button>
            </div>
          </form>
                <CreateEventsModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSubmit={handleSubmit}
                    formData={formData}
                />
        </div>
      </div>
    </div>
  );
};

export default CreateEvents;