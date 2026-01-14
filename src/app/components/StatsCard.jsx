"use client";

export default function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl shadow">
      
      {/* Icon */}
      <div
        className={`p-3 rounded-lg ${color} bg-opacity-20`}
      >
        <Icon className={`w-6 h-6 ${color}`} />
      </div>

      {/* Content */}
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h2 className="text-2xl font-bold text-white">
          {value}
        </h2>
      </div>

    </div>
  );
}
