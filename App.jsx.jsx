import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [activeTab, setActiveTab] = useState('funnel'); // 'funnel' or 'dashboard'
  const [duration, setDuration] = useState('12 Months');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    planSelected: 'LEVEL 1 - Starter',
    duration: '12 Months',
    experienceLevel: 'Fresher',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch leads for Hima Bindu Dashboard
  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leads/hima-bindu');
      if (response.data.success) {
        setLeads(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    try {
      const payload = { ...formData, duration };
      const response = await axios.post('http://localhost:5000/api/leads/submit', payload);
      if (response.data.success) {
        setSuccessMessage(`Enquiry submitted successfully! Lead ID: ${response.data.leadId}`);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          planSelected: 'LEVEL 1 - Starter',
          duration: duration,
          experienceLevel: 'Fresher',
          notes: ''
        });
        fetchLeads();
      }
    } catch (error) {
      alert('Submission failed. Make sure backend server is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleExportExcel = () => {
    window.open('http://localhost:5000/api/leads/export-excel', '_blank');
  };

  const plans = [
    { name: 'LEVEL 1 - Starter', price: duration === '12 Months' ? '₹12,000' : '₹6,500', desc: 'Foundational full-stack web development training and guided mini-projects.' },
    { name: 'LEVEL 2 - Professional', price: duration === '12 Months' ? '₹24,000' : '₹13,000', desc: 'Advanced frontend architectures, React state management, and API integrations.' },
    { name: 'LEVEL 3 - Specialist', price: duration === '12 Months' ? '₹42,000' : '₹22,500', desc: 'Full-stack mastery with Node.js, Express, and MongoDB database structuring.', popular: true },
    { name: 'LEVEL 4 - Elite', price: duration === '12 Months' ? '₹65,000' : '₹35,000', desc: 'Enterprise-grade system design, cloud deployments, and automated CI/CD pipelines.' },
    { name: 'LEVEL 5 - Auron', price: duration === '12 Months' ? '₹95,000' : '₹50,000', desc: 'Executive mentorship, direct Alpha Auron project placement, and career scaling.' }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      
      {/* HEADER SECTION WITH NAVIGATION SWITCHER */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white font-black px-3 py-1.5 rounded-lg text-sm tracking-wider shadow-lg shadow-red-600/30">
              AA
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold block">Alpha Auron</span>
              <span className="text-lg font-black tracking-tight text-white">TALENT FORGE</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('funnel')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'funnel'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Public Funnel
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Hima Bindu Portal</span>
              <span className="bg-black/40 text-red-400 px-2 py-0.5 rounded-full text-[10px]">
                {leads.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* VIEW 1: PUBLIC FUNNEL */}
      {activeTab === 'funnel' && (
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Executive Attribution Banner */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 mb-10 flex items-center justify-center gap-3 text-xs shadow-inner">
            <span className="bg-red-950/80 text-red-400 font-bold px-2.5 py-1 rounded border border-red-800 uppercase tracking-widest text-[10px]">
              Attributed Funnel
            </span>
            <span className="text-zinc-300">Talent Forge Executive Associate: <strong className="text-white">Hima Bindu</strong></span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 font-mono">Associate ID: AA-TF-8842</span>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-red-500 font-extrabold">Membership Levels</span>
            <h1 className="text-5xl font-black mt-3 tracking-tight">Five Levels. One Ladder.</h1>
            <p className="text-zinc-400 text-sm mt-3">
              One-time program fee per membership period. Illustrative monthly project values are ranges — actual assignments and values are governed by project availability and applicable project agreements.
            </p>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={() => setDuration('6 Months')}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  duration === '6 Months' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                6 Months
              </button>
              <button 
                onClick={() => setDuration('12 Months')}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  duration === '12 Months' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                12 Months
              </button>
            </div>
          </div>

          {/* Membership Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`bg-zinc-950 border rounded-2xl p-6 relative flex flex-col justify-between transition-all hover:border-red-600/50 ${
                  plan.popular ? 'border-red-600 shadow-xl shadow-red-600/10' : 'border-zinc-800'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 right-6 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Popular Choice
                  </span>
                )}
                <div>
                  <span className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">Membership Level</span>
                  <h3 className="text-xl font-black mt-1 text-white">{plan.name}</h3>
                  <div className="my-6">
                    <span className="text-4xl font-black tracking-tight text-white">{plan.price}</span>
                    <span className="text-xs text-zinc-500 block mt-1">One-time fee • {duration}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{plan.desc}</p>
                </div>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-8 w-full bg-zinc-900 hover:bg-red-600 text-white font-bold py-3 rounded-xl border border-zinc-800 transition-all cursor-pointer text-sm"
                >
                  Apply via Hima Bindu
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW 2: HIMA BINDU PORTAL & DASHBOARD */}
      {activeTab === 'dashboard' && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Dashboard Header Bar */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-red-500 font-bold bg-red-950/60 px-3 py-1 rounded-full border border-red-800/50">
                ALPHA AURON PRIVATE LIMITED
              </span>
              <h1 className="text-3xl font-black mt-2 tracking-tight">Talent Forge Lead Management</h1>
              <p className="text-zinc-400 text-sm mt-1">
                Executive Lead Assignment: <span className="text-red-500 font-semibold">Hima Bindu (AA-TF-8842)</span>
              </p>
            </div>
            <button
              onClick={handleExportExcel}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer text-sm"
            >
              Export Real-Time Excel (.xlsx)
            </button>
          </div>

          {/* Grid Layout: Enquiry Form + Attributed Leads Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Membership Enquiry Form */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl h-fit">
              <h2 className="text-xl font-bold mb-4 text-red-500 border-b border-zinc-800 pb-3">Membership Enquiry Form</h2>
              {successMessage && (
                <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs rounded-lg font-medium">
                  {successMessage}
                </div>
              )}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleFormChange} required className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none text-sm" placeholder="Enter full name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none text-sm" placeholder="prospect@gmail.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Phone Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} required className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none text-sm" placeholder="9876543210" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Plan Selected</label>
                  <select name="planSelected" value={formData.planSelected} onChange={handleFormChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none text-sm">
                    <option value="LEVEL 1 - Starter">LEVEL 1 - Starter</option>
                    <option value="LEVEL 2 - Professional">LEVEL 2 - Professional</option>
                    <option value="LEVEL 3 - Specialist">LEVEL 3 - Specialist</option>
                    <option value="LEVEL 4 - Elite">LEVEL 4 - Elite</option>
                    <option value="LEVEL 5 - Auron">LEVEL 5 - Auron</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Duration</label>
                  <select name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none text-sm">
                    <option value="12 Months">12 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Experience Level</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleFormChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none text-sm">
                    <option value="Fresher">Fresher</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3+ Years">3+ Years</option>
                  </select>
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-600/30 cursor-pointer mt-2 text-sm">
                  {submitting ? 'Sending Mails & Saving...' : 'Submit Enquiry to Hima Bindu'}
                </button>
              </form>
            </div>

            {/* Attributed Enquiries Table Section */}
            <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-tight">Attributed Enquiries ({leads.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="bg-zinc-900/80 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="py-4 px-6 font-semibold">Lead ID</th>
                      <th className="py-4 px-6 font-semibold">Candidate</th>
                      <th className="py-4 px-6 font-semibold">Contact</th>
                      <th className="py-4 px-6 font-semibold">Plan</th>
                      <th className="py-4 px-6 font-semibold text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {loading ? (
                      <tr><td colSpan="5" className="text-center py-8 text-zinc-500">Loading enquiries...</td></tr>
                    ) : leads.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-8 text-zinc-500">No leads found. Submit an enquiry to test!</td></tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead.leadId} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="py-4 px-6 font-mono font-bold text-red-500">{lead.leadId}</td>
                          <td className="py-4 px-6 font-bold text-white">{lead.fullName}</td>
                          <td className="py-4 px-6">
                            <div className="text-white font-medium">{lead.email}</div>
                            <div className="text-xs text-zinc-500">{lead.phone}</div>
                          </td>
                          <td className="py-4 px-6 font-bold text-zinc-200">{lead.planSelected}</td>
                          <td className="py-4 px-6 text-center">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800 shadow-sm">
                              {lead.status || 'Mail Sent'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      )}

    </div>
  );
}