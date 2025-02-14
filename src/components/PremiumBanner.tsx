// import React from 'react';
// import { motion } from 'framer-motion';
// import { Crown, X } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// export function PremiumBanner() {
//   // const { user, upgradeToPremium } = useAuth();
//   const [isVisible, setIsVisible] = React.useState(true);

//   if (!user || user.isPremium || !isVisible) return null;

//   const daysLeft = Math.ceil(
//     (new Date(user.trialEndsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4 mb-4 relative"
//     >
//       <button
//         onClick={() => setIsVisible(false)}
//         className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
//       >
//         <X className="h-4 w-4 text-yellow-600" />
//       </button>
      
//       <div className="flex items-start gap-3">
//         <div className="p-2 bg-yellow-500/20 rounded-lg">
//           <Crown className="h-5 w-5 text-yellow-600" />
//         </div>
//         <div>
//           <h3 className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">
//             {daysLeft} Days Left in Your Free Trial
//           </h3>
//           <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 mb-3">
//             Upgrade to Premium to unlock unlimited practice interviews, personalized feedback, and advanced analytics.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => upgradeToPremium()}
//             className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-medium rounded-lg hover:from-yellow-600 hover:to-yellow-700"
//           >
//             Upgrade to Premium
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }