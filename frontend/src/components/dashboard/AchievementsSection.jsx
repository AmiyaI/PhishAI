import React from 'react';
import { Shield, Trophy, Star, Target, Award, Crown, Zap, Coffee } from 'lucide-react';

const AchievementsSection = ({ theme }) => {
  const achievements = [
    {
      id: 'quick_learner',
      name: 'Quick Learner',
      icon: <Zap className="w-8 h-8" />,
      description: 'Complete your first training module',
      progress: 100,
      achieved: true,
      date: '2024-01-15'
    },
    {
      id: 'master_detective',
      name: 'Master Detective',
      icon: <Shield className="w-8 h-8" />,
      description: 'Identify 50 phishing attempts correctly',
      progress: 80,
      achieved: false,
      total: 50,
      current: 40
    },
    {
      id: 'perfect_score',
      name: 'Perfect Score',
      icon: <Star className="w-8 h-8" />,
      description: 'Achieve 100% in any module',
      progress: 100,
      achieved: true,
      date: '2024-01-18'
    },
    {
      id: 'consistent_learner',
      name: 'Consistent Learner',
      icon: <Trophy className="w-8 h-8" />,
      description: 'Complete training sessions 5 days in a row',
      progress: 60,
      achieved: false,
      total: 5,
      current: 3
    },
    {
      id: 'voice_expert',
      name: 'Voice Security Expert',
      icon: <Crown className="w-8 h-8" />,
      description: 'Complete all voice training modules',
      progress: 70,
      achieved: false,
      total: 10,
      current: 7
    },
    {
      id: 'web_master',
      name: 'Web Security Master',
      icon: <Award className="w-8 h-8" />,
      description: 'Complete all web security modules',
      progress: 50,
      achieved: false,
      total: 10,
      current: 5
    }
  ];

   return (
    <div className="space-y-8">
      {/* Achievement Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg border ${
          theme === 'dark'
            ? 'bg-gray-900 border-purple-500'
            : 'bg-white border-purple-200'
        }`}>
          <div className="flex items-center mb-2">
            <Trophy className="w-6 h-6 text-purple-400 mr-2" />
            <h3 className={`text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Total Achievements
            </h3>
          </div>
          <div className="text-3xl font-bold text-purple-400">
            {achievements.filter(a => a.achieved).length}/{achievements.length}
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${
          theme === 'dark'
            ? 'bg-gray-900 border-purple-500'
            : 'bg-white border-purple-200'
        }`}>
          <div className="flex items-center mb-2">
            <Star className="w-6 h-6 text-purple-400 mr-2" />
            <h3 className={`text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Achievement Score
            </h3>
          </div>
          <div className="text-3xl font-bold text-purple-400">
            {Math.round(achievements.reduce((acc, curr) => acc + curr.progress, 0) / achievements.length)}%
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${
          theme === 'dark'
            ? 'bg-gray-900 border-purple-500'
            : 'bg-white border-purple-200'
        }`}>
          <div className="flex items-center mb-2">
            <Target className="w-6 h-6 text-purple-400 mr-2" />
            <h3 className={`text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Next Achievement
            </h3>
          </div>
          <div className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {achievements.find(a => !a.achieved)?.name}
          </div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-6 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-900 border-purple-500'
                : 'bg-white border-purple-200'
            } ${achievement.achieved ? 'border-2' : ''}`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${
                achievement.achieved
                  ? 'bg-purple-500/20 text-purple-400'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-gray-100 text-gray-500'
              }`}>
                {achievement.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {achievement.name}
                  </h3>
                  {achievement.achieved && (
                    <span className="text-sm text-purple-400">
                      Achieved {achievement.date}
                    </span>
                  )}
                </div>
                
                <p className={`mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {achievement.description}
                </p>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Progress
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {achievement.progress}%
                      {!achievement.achieved && achievement.current && ` (${achievement.current}/${achievement.total})`}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className={`h-full rounded-full transition-all ${
                        achievement.achieved ? 'bg-purple-500' : 'bg-purple-500/50'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;