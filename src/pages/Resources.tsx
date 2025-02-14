
import { motion } from 'framer-motion';
import { Book, Video, FileText, Download, Star, Clock, Users } from 'lucide-react';

export default function Resources() {
  const resources = [
    {
      id: 1,
      title: 'System Design Interview Guide',
      type: 'PDF Guide',
      icon: FileText,
      rating: 4.8,
      students: 1234,
      duration: '2 hours',
    },
    {
      id: 2,
      title: 'Behavioral Interview Masterclass',
      type: 'Video Course',
      icon: Video,
      rating: 4.9,
      students: 2156,
      duration: '3.5 hours',
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      type: 'Interactive Course',
      icon: Book,
      rating: 4.7,
      students: 3789,
      duration: '8 hours',
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Learning Resources</h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Enhance your interview skills with our curated resources</p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 md:mb-8"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <resource.icon className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                <span className="text-xs md:text-sm font-medium">{resource.rating}</span>
              </div>
            </div>
            
            <h3 className="text-base md:text-lg font-semibold mb-2">{resource.title}</h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4">{resource.type}</p>
            
            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 md:h-4 md:w-4" />
                {resource.students} students
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                {resource.duration}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-xs md:text-sm font-medium hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-1 md:gap-2"
            >
              <Download className="h-3 w-3 md:h-4 md:w-4" />
              Access Resource
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Featured Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 md:mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl md:rounded-2xl p-4 md:p-8 text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-center md:text-left">Premium Interview Preparation Bundle</h2>
            <p className="text-sm md:text-base text-blue-100 mb-4 md:mb-6 text-center md:text-left">Get access to all our premium resources and mock interviews</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-white text-blue-600 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-50"
            >
              Get Started
            </motion.button>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold">50+</div>
              <div className="text-xs md:text-sm text-blue-100">Video Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold">100+</div>
              <div className="text-xs md:text-sm text-blue-100">Practice Problems</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold">24/7</div>
              <div className="text-xs md:text-sm text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}