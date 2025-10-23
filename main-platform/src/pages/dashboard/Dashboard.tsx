import { Link } from 'react-router-dom';
import { useAuthStore } from '../../auth/store';
import { modules } from '../../config/modules';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">
          Choose a module below to get started with your Christian learning journey.
        </p>
      </div>

      {/* Modules Grid - 2x2 Matrix Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {modules.map((module, idx) => {
          const colors = [
            {
              from: 'from-amber-400',
              to: 'to-orange-500',
              border: 'border-amber-300',
              text: 'text-amber-700',
              bg: 'bg-amber-50',
              shadow: 'shadow-amber-200/50',
              glow: 'group-hover:shadow-amber-400/50'
            },
            {
              from: 'from-blue-400',
              to: 'to-indigo-500',
              border: 'border-blue-300',
              text: 'text-blue-700',
              bg: 'bg-blue-50',
              shadow: 'shadow-blue-200/50',
              glow: 'group-hover:shadow-blue-400/50'
            },
            {
              from: 'from-green-400',
              to: 'to-emerald-500',
              border: 'border-green-300',
              text: 'text-green-700',
              bg: 'bg-green-50',
              shadow: 'shadow-green-200/50',
              glow: 'group-hover:shadow-green-400/50'
            },
            {
              from: 'from-purple-400',
              to: 'to-pink-500',
              border: 'border-purple-300',
              text: 'text-purple-700',
              bg: 'bg-purple-50',
              shadow: 'shadow-purple-200/50',
              glow: 'group-hover:shadow-purple-400/50'
            },
          ];
          const color = colors[idx];

          return (
            <div
              key={module.id}
              className={`group relative bg-white rounded-3xl border-3 ${color.border} overflow-hidden shadow-xl ${color.shadow} ${color.glow} hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105`}
            >
              {/* Decorative gradient corner */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${color.from} ${color.to} opacity-10 rounded-bl-full transition-all duration-700 group-hover:opacity-25 group-hover:scale-110`}></div>

              {/* Animated background pattern - dotted pattern that appears on hover */}
              <div className={`absolute inset-0 opacity-0 ${color.bg} transition-opacity duration-700 group-hover:opacity-10`}>
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 20px 20px, currentColor 2px, transparent 0)',
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              <div className="p-10 relative z-10">
                {/* Icon container with enhanced styling and 360-degree rotation */}
                <div className="mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${color.from} ${color.to} text-white text-4xl shadow-2xl transform group-hover:scale-125 transition-all duration-700 animate-spin-to-upright`}>
                    <span className="group-hover:scale-110 transition-transform duration-500">
                      {module.icon}
                    </span>
                  </div>
                </div>

                {/* Module title */}
                <h3 className={`text-3xl font-bold ${color.text} mb-4 group-hover:scale-105 transition-transform duration-500 leading-tight`}>
                  {module.displayName}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-600 mb-8 line-clamp-3 leading-relaxed min-h-[4.5rem]">
                  {module.description}
                </p>

                {/* Features list with checkmarks in gradient-filled rounded squares */}
                <div className="space-y-4 mb-8 min-h-[10rem]">
                  {module.features.slice(0, 3).map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start group/item">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br ${color.from} ${color.to} flex items-center justify-center mr-3 transform group-hover/item:scale-110 transition-transform duration-300`}>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 font-medium flex-1">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button - larger and more prominent with white overlay on hover */}
                <Link
                  to={module.path}
                  className={`block w-full text-center py-4 px-6 rounded-2xl bg-gradient-to-r ${color.from} ${color.to} text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 relative overflow-hidden group/btn`}
                >
                  <span className="relative z-10">Launch Module</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500"></div>
                </Link>
              </div>

              {/* Hover glow effect - multiple gradient layers */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${color.from} ${color.to} mix-blend-overlay`}></div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Progress</h3>
          <p className="text-3xl font-bold text-indigo-600">0%</p>
          <p className="text-sm text-gray-600 mt-1">Complete your profile to track progress</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Modules</h3>
          <p className="text-3xl font-bold text-indigo-600">{modules.length}</p>
          <p className="text-sm text-gray-600 mt-1">Specialized learning tools</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Type</h3>
          <p className="text-3xl font-bold text-indigo-600">Free</p>
          <p className="text-sm text-gray-600 mt-1">Full access to all modules</p>
        </div>
      </div>
    </div>
  );
}
