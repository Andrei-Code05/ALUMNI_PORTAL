// src/components/content_management/CreateEventsModal.jsx
import React from 'react';
import { CalendarDots, Clock, MapPin, Mountains  } from '@phosphor-icons/react';

const CreateEventsModal = ({ isOpen, onClose, onSubmit, formData }) => {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-55 flex justify-center z-50 h-full">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl shadow-xl w-10/12 mx-4 my-10 relative h-fit">

        {/* Banner */}
        <div className="bg-[#B9B9B9] h-[400px] rounded-md p-10 mx-5 mt-10">
          <div className="rounded-2xl flex items-center justify-center overflow-hidden h-full">
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Event"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-[#FFFFFF]">
                <Mountains  size={300} weight="fill" />
              </div>
            )}
          </div>
        </div>

        {/* Event Name */}
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {formData.title || 'Event Name'}
          </h2>
        </div>

        {/* Date and Time */}
        <div className="px-6 flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">Date and Time</h3>

          <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-2 mt-2">
            <CalendarDots size={20} className="text-gray-500" />
            <span className="text-sm text-gray-900">
              {formData.startDate || 'dd/mm/yyyy'}
            </span>

            <Clock size={20} className="text-gray-500" />
            <span className="text-sm text-gray-900">
              {formData.startTime || 'time'}
            </span>
          </div>

          <a href="#" className="text-yellow-500 text-sm mt-1">
            + Add to Calendar
          </a>
        </div>

        {/* Location */}
        <div className="px-6 mt-6">
          <h3 className="text-sm font-medium text-gray-700">Location</h3>
          <p className="text-sm text-gray-900 mt-2">
            {formData.location || 'Address'}
          </p>

          {formData.location ? (
            <iframe
              title="Event Location"
              className="mt-2 w-7/12 h-60 rounded-lg"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                formData.location
              )}&output=embed`}
            />
          ) : (
            <div className="mt-2 h-60 w-7/12 bg-gray-200 rounded-lg flex items-center justify-center">
              <MapPin size={32} weight="fill" className="text-red-500" />
            </div>
          )}
        </div>

        {/* Event Description */}
        <div className="px-6 mt-6">
          <h3 className="text-sm font-medium text-gray-700">
            Event Description
          </h3>
          <p className="text-sm text-gray-900 mt-2">
            {formData.description || ''}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-200 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
          >
            CREATE
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateEventsModal;
