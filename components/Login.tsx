
import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'officialangadandnikita@gmail.com' && password === 'Angad@2026') {
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f2e8d5] p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#8c7456]/20">
        <div className="bg-[#8c7456] p-8 text-center">
          <img 
            src="https://static.wixstatic.com/media/7fa905_98c5b2d2963346ee9df9e310c92b9758~mv2.png" 
            className="w-32 h-32 object-contain mx-auto mb-4 brightness-0 invert" 
            alt="Wedding Emblem" 
          />
          <h1 className="text-2xl font-['Playfair_Display'] text-white tracking-widest uppercase">Admin Login</h1>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#8c7456] uppercase tracking-widest font-['Montserrat']">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#fdfaf3] border border-[#8c7456]/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#8c7456] transition-all outline-none"
              placeholder="official... @gmail.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#8c7456] uppercase tracking-widest font-['Montserrat']">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#fdfaf3] border border-[#8c7456]/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#8c7456] transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#8c7456] text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-[#745e45] transition-all transform active:scale-[0.98] shadow-lg shadow-[#8c7456]/20"
          >
            Enter Dashboard
          </button>
          
          <div className="text-center">
            <button 
              type="button"
              onClick={() => window.location.hash = ''}
              className="text-[#8c7456]/60 text-xs font-bold uppercase tracking-widest hover:text-[#8c7456]"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
