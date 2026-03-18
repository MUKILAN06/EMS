import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Plus, Send, Radio, MessageSquare, ShieldCheck } from 'lucide-react';

const IssueTracker = () => {
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedToUserId: ''
  });
  const [users, setUsers] = useState([]); // List of possible assignees
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssues();
    // For now, in a real app, we'd fetch HR/Manager/Admin list
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await api.get('/issues/my-reported');
      setIssues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolve = async (id) => {
    await api.post(`/issues/resolve/${id}`);
    fetchIssues();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/issues/create', formData);
      setFormData({ title: '', description: '', assignedToUserId: '' });
      fetchIssues();
    } catch (err) {
      alert('Error creating issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Issue Tracker</h1>
          <p className="text-slate-500">Report problems directly to HR, Admin, or Managers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <Plus className="text-blue-500" />
               <span>New Entry</span>
           </h3>
           <form onSubmit={handleSubmit} className="space-y-5">
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700">Subject</label>
               <input
                 type="text"
                 required
                 className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20"
                 value={formData.title}
                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700">Assign To (User ID)</label>
               <input
                 type="number"
                 required
                 placeholder="ID of Admin/HR/Manager"
                 className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20"
                 value={formData.assignedToUserId}
                 onChange={(e) => setFormData({ ...formData, assignedToUserId: e.target.value })}
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700">Description</label>
               <textarea
                 required
                 rows={4}
                 className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20"
                 value={formData.description}
                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
               />
             </div>
             <button
               type="submit"
               className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
               disabled={loading}
             >
               <Send size={18} />
               <span>Report Issue</span>
             </button>
           </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 px-2 flex items-center gap-2">
              <MessageSquare size={20} className="text-blue-500" />
              <span>Resolved/Active Feedback</span>
          </h3>
          {issues.map(issue => (
            <div key={issue.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex items-start gap-6">
               <div className={`p-4 rounded-2xl ${issue.resolved ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500 animate-pulse'}`}>
                  <AlertCircle size={24} />
               </div>
               <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold text-lg ${issue.resolved ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{issue.title}</h4>
                    {issue.resolved ? (
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">RESOLVED</span>
                    ) : (
                        <button onClick={() => handleResolve(issue.id)} className="text-xs font-bold text-blue-600 hover:underline">MARK AS RESOLVED</button>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{issue.description}</p>
                  <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck size={12} />
                      Assignee ID: {issue.assignedTo.id}
                  </p>
               </div>
            </div>
          ))}
          {issues.length === 0 && (
            <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem]">
               <p className="text-slate-400 font-medium">No recorded issues.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueTracker;
