import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, Mail, ArrowRight, ShieldCheck, 
  UserPlus, HelpCircle 
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Decoration Section */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-20 pointer-events-none blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex items-center gap-4 relative z-10">
           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-500/20">E</div>
           <span className="text-2xl font-black tracking-tight">EMS PLATFORM</span>
        </div>

        <div className="relative z-10 space-y-8">
           <div className="space-y-4">
              <h2 className="text-7xl font-black leading-none uppercase tracking-tighter">Your Future <br/> Managed.</h2>
              <p className="text-slate-400 text-xl font-medium max-w-sm leading-relaxed">
                 The only enterprise resource platform you'll ever need to manage your workforce, efficiency, and growth.
              </p>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="p-1 h-20 w-px bg-white/10"></div>
              <div className="space-y-1">
                 <p className="text-4xl font-black font-mono">2.4k+</p>
                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Seats</p>
              </div>
              <div className="p-1 h-20 w-px bg-white/10 ml-8"></div>
              <div className="space-y-1">
                 <p className="text-4xl font-black font-mono">99.9%</p>
                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Uptime Record</p>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-10 relative z-10 text-xs font-black text-slate-500 uppercase tracking-widest font-mono">
           <span>Terms of Use</span>
           <span>Privacy Policy</span>
           <span>Support Center</span>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col items-center justify-center p-8 md:p-20 lg:p-32">
        <div className="w-full max-w-sm space-y-12">
          <div className="space-y-4 text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-8">
               <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20 italic">E</div>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Access Dashboard</h1>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Enterprise Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
               <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="email" 
                    required
                    placeholder="Corporate Email"
                    className="w-full bg-slate-50 border-none pl-14 pr-6 py-5 rounded-2xl focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700 placeholder:text-slate-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               
               <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="password" 
                    required
                    placeholder="Secure Password"
                    className="w-full bg-slate-50 border-none pl-14 pr-6 py-5 rounded-2xl focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700 placeholder:text-slate-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 text-rose-500 text-sm font-bold rounded-2xl border border-rose-100 flex items-center gap-3 animate-shake">
                <HelpCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 flex items-center group active:scale-95"
            >
              <span>{loading ? 'Verifying Credentials...' : 'Sign In Now'}</span>
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
             <button className="flex flex-col items-center gap-3 p-4 bg-slate-50 rounded-3xl group border border-transparent hover:border-slate-200 transition-all">
                <UserPlus size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600">Request Access</span>
             </button>
             <button className="flex flex-col items-center gap-3 p-4 bg-slate-50 rounded-3xl group border border-transparent hover:border-slate-200 transition-all">
                <ShieldCheck size={20} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600">Company Security</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
