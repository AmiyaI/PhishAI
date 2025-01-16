import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AuthForm = ({ theme, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // TODO: Add actual authentication logic here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className={`w-full max-w-md ${
        theme === 'dark' ? 'bg-gray-900 border-purple-500' : 'bg-white border-purple-200'
      }`}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
            {isLogin ? 'Login to PhishAI' : 'Create Account'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className={theme === 'dark' ? 'bg-red-900/50' : 'bg-red-50'}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-md border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md border ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-md border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md border ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 
                transition-colors"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className={`w-full text-sm ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              } hover:underline`}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;