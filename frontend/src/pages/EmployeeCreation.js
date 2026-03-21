import React, { useState } from 'react';

const EmployeeCreation = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        department: '',
        joiningDate: '',
        phoneNumber: '',
        address: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Processing registration...' });
        
        // Mocking an API call
        setTimeout(() => {
            setStatus({ type: 'success', message: 'Employee added successfully!' });
            setFormData({
                firstName: '', lastName: '', email: '', role: '',
                department: '', joiningDate: '', phoneNumber: '', address: ''
            });
        }, 1200);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 animate-in slide-in-from-bottom duration-700">
            {/* Page Title Section */}
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-800">
                    Add <span className="text-indigo-600">New Employee</span>
                </h1>
                <p className="text-slate-500 mt-2 font-medium">Create a new member profile in your organization</p>
            </div>

            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white relative overflow-hidden">
                {/* Visual Accent Decoration */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
                
                <form onSubmit={handleSubmit} className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* First Name & Last Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            placeholder="John"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 placeholder:text-slate-300 font-medium"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            placeholder="Doe"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 placeholder:text-slate-300 font-medium"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="johndoe@company.com"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 placeholder:text-slate-300 font-medium"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Role & Department */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Functional Role</label>
                        <input
                            type="text"
                            name="role"
                            required
                            placeholder="UI Designer"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 placeholder:text-slate-300 font-medium"
                            value={formData.role}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Department</label>
                        <select
                            name="department"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 font-medium"
                            value={formData.department}
                            onChange={handleChange}
                        >
                            <option value="">Select Department</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Design">Design</option>
                            <option value="Product">Product</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>

                    {/* Joining Date & Phone */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Joining Date</label>
                        <input
                            type="date"
                            name="joiningDate"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 font-medium"
                            value={formData.joiningDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            required
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 placeholder:text-slate-300 font-medium"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="md:col-span-2 pt-6">
                        <button
                            type="submit"
                            className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg tracking-wider hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-200"
                        >
                            {status.type === 'loading' ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registering...
                                </span>
                            ) : 'CREATE EMPLOYEE PROFILE'}
                        </button>
                    </div>

                    {status.message && (
                        <div className={`md:col-span-2 mt-4 p-4 rounded-xl text-center font-bold text-sm ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                            {status.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EmployeeCreation;
