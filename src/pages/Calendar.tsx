// import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, Users } from 'lucide-react';

export default function Calendar() {
  const events = [
    {
      id: 1,
      title: 'Technical Interview Practice',
      type: 'Mock Interview',
      time: '10:00 AM',
      duration: '1 hour',
      participants: 2,
    },
    {
      id: 2,
      title: 'System Design Discussion',
      type: 'Group Session',
      time: '2:00 PM',
      duration: '1.5 hours',
      participants: 4,
    },
    {
      id: 3,
      title: 'Behavioral Interview',
      type: 'One-on-One',
      time: '4:30 PM',
      duration: '45 minutes',
      participants: 2,
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Interview Calendar</h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Schedule and manage your interview practice sessions</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Calendar Widget */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold">March 2024</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <CalendarIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {/* Calendar Header */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {Array.from({ length: 31 }, (_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs md:text-sm
                  ${i === 19 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                  ${[6, 13, 20, 27].includes(i) ? 'border-2 border-blue-600 dark:border-blue-500' : ''}
                `}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Today's Sessions</h2>
          <div className="space-y-3 md:space-y-4">
            {events.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                className="p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm md:text-base font-semibold">{event.title}</h3>
                    <span className="text-xs md:text-sm text-blue-600 dark:text-blue-400">{event.type}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 md:h-4 md:w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-3 w-3 md:h-4 md:w-4" />
                      {event.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 md:h-4 md:w-4" />
                      {event.participants}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs md:text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40"
                  >
                    Join Session
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-4 md:mt-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm md:text-base font-medium hover:from-blue-700 hover:to-purple-700"
          >
            Schedule New Session
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}