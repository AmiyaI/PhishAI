import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Shield, Brain, Target, Clock, Mail, Phone, Globe } from 'lucide-react';

const ProgressSection = ({ theme }) => {
  // Sample data - this would come from your backend in production
  const performanceData = [
    { week: 'Week 1', email: 85, voice: 70, web: 60 },
    { week: 'Week 2', email: 88, voice: 75, web: 72 },
    { week: 'Week 3', email: 92, voice: 82, web: 78 },
    { week: 'Week 4', email: 95, voice: 88, web: 85 }
  ];

  const moduleCompletion = [
    { module: 'Email', completed: 8, total: 10 },
    { module: 'Voice', completed: 6, total: 10 },
    { module: 'Web', completed: 5, total: 10 }
  ];

  return (
    <div className="space-y-8">
      {/* Overall Progress Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            title: 'Overall Score',
            value: '87%',
            icon: <Shield className="w-6 h-6 text-purple-400" />,
            description: 'Average performance across all modules'
          },
          {
            title: 'Modules Completed',
            value: '19/30',
            icon: <Target className="w-6 h-6 text-purple-400" />,
            description: 'Total levels completed'
          },
          {
            title: 'Success Rate',
            value: '92%',
            icon: <Brain className="w-6 h-6 text-purple-400" />,
            description: 'Correct identification rate'
          },
          {
            title: 'Time Spent',
            value: '4.5h',
            icon: <Clock className="w-6 h-6 text-purple-400" />,
            description: 'Total training time'
          }
        ].map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-900 border-purple-500'
                : 'bg-white border-purple-200'
            }`}
          >
            <div className="flex items-center mb-4">
              {stat.icon}
              <h3 className={`ml-3 text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {stat.title}
              </h3>
            </div>
            <div className={`text-3xl font-bold mb-2 ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}>
              {stat.value}
            </div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className={`p-6 rounded-lg border ${
        theme === 'dark'
          ? 'bg-gray-900 border-purple-500'
          : 'bg-white border-purple-200'
      }`}>
        <h3 className={`text-xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Performance Trends
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="week" stroke={theme === 'dark' ? '#9CA3AF' : '#4B5563'} />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#4B5563'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: '1px solid #6B21A8'
                }}
                labelStyle={{ color: theme === 'dark' ? '#E5E7EB' : '#1F2937' }}
              />
              <Line type="monotone" dataKey="email" stroke="#A855F7" strokeWidth={2} name="Email" />
              <Line type="monotone" dataKey="voice" stroke="#38BDF8" strokeWidth={2} name="Voice" />
              <Line type="monotone" dataKey="web" stroke="#34D399" strokeWidth={2} name="Web" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Module Progress */}
      <div className={`p-6 rounded-lg border ${
        theme === 'dark'
          ? 'bg-gray-900 border-purple-500'
          : 'bg-white border-purple-200'
      }`}>
        <h3 className={`text-xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Module Progress
        </h3>
        <div className="space-y-6">
          {moduleCompletion.map((module, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {module.module === 'Email' && <Mail className="w-5 h-5 text-purple-400 mr-2" />}
                  {module.module === 'Voice' && <Phone className="w-5 h-5 text-purple-400 mr-2" />}
                  {module.module === 'Web' && <Globe className="w-5 h-5 text-purple-400 mr-2" />}
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
                    {module.module} Training
                  </span>
                </div>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {module.completed}/{module.total} Completed
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${(module.completed / module.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;