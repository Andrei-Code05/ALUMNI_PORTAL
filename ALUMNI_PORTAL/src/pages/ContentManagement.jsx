import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArticleNyTimes,
  CalendarCheck,
  Megaphone,
  Article,
  FileDashed,
  Alarm,
  Archive,
  PencilSimpleLine,
} from '@phosphor-icons/react';

const ContentManagement = () => {
  const cardClasses = `
    bg-white border border-gray-200 rounded-xl shadow-md 
    hover:shadow-xl transition-all duration-200
    overflow-hidden flex flex-col h-full relative
  `;

  const btnWrapClasses = `
    w-full flex items-center justify-center p-4 
  `;

  const btnClasses = `
    py-3 px-10 font-medium text-white rounded-md
    bg-[#DAB619] hover:bg-[#b89c14] 
    transition-colors duration-200 text-sm uppercase tracking-wide
    shadow-sm hover:shadow
  `;

  const bgIconClasses = `
    absolute bottom-16 right-5 text-[#DAB619] w-16 h-16 blur-sm
    pointer-events-none z-0
  `;
    const IconClasses = `
    absolute bottom-16 right-5 text-[#DAB619] w-16 h-16
    pointer-events-none drop-shadow-[2px_2px_2px_#969696]
    
  `;

  const editIconClasses = `
    absolute bottom-16 right-4 text-[#DAB619] w-10 h-10 z-10
    drop-shadow-md
  `;

  return (
    <div className="min-h-screen bg-[#EFEFEF] px-5 sm:px-8 lg:px-12 py-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex justify-center">
          <div className="w-11/12 bg-white rounded-xl py-6 px-8 shadow-md flex">
            <h1 className="text-left text-xl md:text-2xl  text-[#696969] tracking-tight">
              <Link to="/alumni-management">Dashboard /{' '}</Link><span className='text-[#C3A41E] font-semibold'>Content Management</span>
            </h1>
          </div>
        </div>

        {/* CREATE */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[#DAB619] mb-6 tracking-tight text-center md:text-left border-b border-[#949494]">
            Create
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            <div className={cardClasses}>
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Create a job post
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Publish new job listings for employees, alumni, and interns.
                </p>
              </div>
              <Article size={40} className={`rotate-12 ${IconClasses}`} weight="light" />
              <Link to="./create-job-post">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>CREATE</button>
                </div>
              </Link>
            </div>

            <div className={cardClasses}>
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Create Events
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Plan and publish events for employees, alumni, and interns.
                </p>
              </div>
              <CalendarCheck size={40} className={IconClasses} weight="light" />

              <Link to="./create-events">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>CREATE</button>
                </div>
              </Link>
            </div>

            <div className={cardClasses}>
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Create an Announcement
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Share important updates, reminders, and notices with employees, alumni, and interns.
                </p>
              </div>
              <Megaphone size={40} className={IconClasses} weight="light" />
              <Link to="./create-announcement">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>CREATE</button>
                </div>
              </Link>
            </div>

            <div className={cardClasses}>
              <ArticleNyTimes size={40} className={IconClasses} weight="light" />
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Create Article / Post
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Publish insights, updates, and meaningful content for the HSI community.
                </p>
              </div>
              <Link to="./create-article">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>CREATE</button>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* MANAGE - now with pencil on top + blurred background icon */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[#DAB619] mb-6 tracking-tight text-center md:text-left border-b border-[#949494]">
            Manage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            <div className={cardClasses}>
              <Article size={40} className={`rotate-12 ${bgIconClasses}`} weight="light" />
              <PencilSimpleLine size={32} className={editIconClasses} weight="duotone" />
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Manage job posts
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Publish new listings for employees, alumni, and interns.
                </p>
              </div>
              <Link to="./manage-job-post">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>MANAGE</button>
                </div>
              </Link>
            </div>

            <div className={cardClasses}>
              <CalendarCheck size={40} className={bgIconClasses} weight="light" />
              <PencilSimpleLine size={32} className={editIconClasses} weight="duotone" />
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Manage Events
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Plan and publish events for employees, alumni, and interns.
                </p>
              </div>
              <Link to="./manage-events">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>MANAGE</button>
                </div>
              </Link>
            </div>

            <div className={cardClasses}>
              <Megaphone size={40} className={bgIconClasses} weight="light" />
              <PencilSimpleLine size={32} className={editIconClasses} weight="duotone" />
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Manage Announcements
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Share important updates, reminders, and notices...
                </p>
              </div>
              <Link to="./manage-announcements">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>MANAGE</button>
                </div>
              </Link>
            </div>

            <div className={cardClasses}>
              <ArticleNyTimes size={40} className={bgIconClasses} weight="light" />
              <PencilSimpleLine size={32} className={editIconClasses} weight="duotone" />
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Manage Articles / Posts
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Publish insights, updates, and meaningful content...
                </p>
              </div>
              <Link to="./manage-articles">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>MANAGE</button>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* VIEW */}
        <section>
          <h2 className="text-2xl font-semibold text-[#DAB619] mb-6 tracking-tight text-center md:text-left border-b border-[#949494]">
            View
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            <div className={cardClasses}>
              <FileDashed size={40} className={IconClasses} weight="light" />
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  View Drafts
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Unpublished content saved for later.
                </p>
              </div>
              <Link to="./view-drafts">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>MANAGE</button>
                </div>
              </Link>
            </div>

            <div className={cardClasses}>
              <Alarm size={40} className={IconClasses} weight="light" />
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  View Scheduled
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Content set to publish at a later time.
                </p>
              </div>
              <Link to="./view-scheduled">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>MANAGE</button>
                </div>
              </Link>
            </div>

            <div className={cardClasses}>
              <Archive size={40} className={IconClasses} weight="light" />
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  View Archived
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed">
                  Previously published content stored for reference.
                </p>
              </div>
              <Link to="./view-archived">
                <div className={btnWrapClasses}>
                  <button className={btnClasses}>MANAGE</button>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContentManagement;