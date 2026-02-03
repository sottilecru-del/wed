
import React, { useState, useEffect } from 'react';

interface RsvpEntry {
  id: number;
  name: string;
  email: string;
  attending: string;
  guestsCount: string;
  events: string[];
  date: string;
}

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<RsvpEntry>>({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    setRsvps(data);
  }, []);

  const saveToStorage = (data: RsvpEntry[]) => {
    localStorage.setItem('wedding_rsvps', JSON.stringify(data));
    setRsvps(data);
  };

  const handleEditClick = (rsvp: RsvpEntry) => {
    setEditingId(rsvp.id);
    setEditForm(rsvp);
  };

  const handleSaveEdit = () => {
    const updated = rsvps.map(r => r.id === editingId ? { ...r, ...editForm } as RsvpEntry : r);
    saveToStorage(updated);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this RSVP?')) {
      const updated = rsvps.filter(r => r.id !== id);
      saveToStorage(updated);
    }
  };

  const exportToCsv = () => {
    const headers = ['Date', 'Name', 'Email', 'Attending', 'Guests', 'Events'];
    const rows = rsvps.map(r => [
      r.date,
      r.name,
      r.email,
      r.attending,
      r.guestsCount || '0',
      r.events.join(', ')
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wedding_rsvps_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] p-4 md:p-8 font-['Montserrat']">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-[#8c7456]/10">
          <div className="flex items-center gap-4">
            <img 
              src="https://static.wixstatic.com/media/7fa905_98c5b2d2963346ee9df9e310c92b9758~mv2.png" 
              className="w-12 h-12 object-contain" 
              alt="Logo" 
            />
            <div>
              <h1 className="text-xl font-['Playfair_Display'] text-[#8c7456] font-bold">RSVP Management</h1>
              <p className="text-xs text-[#8c7456]/60 font-semibold uppercase tracking-widest">Angad & Nikita Wedding</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={exportToCsv}
              className="bg-[#005a32] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#004d2b] transition-all"
            >
              Export Excel
            </button>
            <button 
              onClick={() => {
                onLogout();
                window.location.hash = '';
              }}
              className="bg-red-50 text-red-600 border border-red-100 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-100 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#8c7456]/10">
            <p className="text-[#8c7456]/60 text-xs font-bold uppercase tracking-widest mb-1">Total Responses</p>
            <p className="text-3xl font-['Playfair_Display'] text-[#8c7456] font-bold">{rsvps.length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#8c7456]/10">
            <p className="text-[#8c7456]/60 text-xs font-bold uppercase tracking-widest mb-1">Total Attending Guests</p>
            <p className="text-3xl font-['Playfair_Display'] text-[#005a32] font-bold">
              {rsvps.filter(r => r.attending === 'yes').reduce((acc, r) => acc + parseInt(r.guestsCount || '0'), 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#8c7456]/10">
            <p className="text-[#8c7456]/60 text-xs font-bold uppercase tracking-widest mb-1">Not Attending</p>
            <p className="text-3xl font-['Playfair_Display'] text-red-600 font-bold">{rsvps.filter(r => r.attending === 'no').length}</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#8c7456]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fdfaf3] border-b border-[#8c7456]/10">
                  <th className="px-6 py-4 text-xs font-bold text-[#8c7456] uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#8c7456] uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#8c7456] uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#8c7456] uppercase tracking-widest">Attending</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#8c7456] uppercase tracking-widest">Guests</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#8c7456] uppercase tracking-widest">Events</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#8c7456] uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8c7456]/5">
                {rsvps.length > 0 ? rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-[#fdfaf3]/50 transition-colors">
                    <td className="px-6 py-4 text-xs text-[#8c7456]/70">{rsvp.date}</td>
                    <td className="px-6 py-4 font-bold text-[#8c7456]">
                      {editingId === rsvp.id ? (
                        <input 
                          type="text" 
                          className="bg-[#fdfaf3] border border-[#8c7456]/20 rounded px-2 py-1 w-full" 
                          value={editForm.name} 
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        />
                      ) : rsvp.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#8c7456]">
                      {editingId === rsvp.id ? (
                        <input 
                          type="email" 
                          className="bg-[#fdfaf3] border border-[#8c7456]/20 rounded px-2 py-1 w-full" 
                          value={editForm.email} 
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        />
                      ) : rsvp.email}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === rsvp.id ? (
                        <select 
                          className="bg-[#fdfaf3] border border-[#8c7456]/20 rounded px-2 py-1"
                          value={editForm.attending}
                          onChange={(e) => setEditForm({...editForm, attending: e.target.value})}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${rsvp.attending === 'yes' ? 'bg-[#e8f3de] text-[#005a32]' : 'bg-red-50 text-red-600'}`}>
                          {rsvp.attending === 'yes' ? 'Yes' : 'No'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#8c7456]">
                      {editingId === rsvp.id ? (
                        <input 
                          type="number" 
                          className="bg-[#fdfaf3] border border-[#8c7456]/20 rounded px-2 py-1 w-20" 
                          value={editForm.guestsCount} 
                          onChange={(e) => setEditForm({...editForm, guestsCount: e.target.value})}
                        />
                      ) : rsvp.guestsCount || '0'}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#8c7456]/70 italic">{rsvp.events.join(', ') || 'None'}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      {editingId === rsvp.id ? (
                        <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-800 font-bold text-[10px] uppercase tracking-widest">Save</button>
                      ) : (
                        <button onClick={() => handleEditClick(rsvp)} className="text-[#8c7456] hover:text-[#745e45] font-bold text-[10px] uppercase tracking-widest">Edit</button>
                      )}
                      <button onClick={() => handleDelete(rsvp.id)} className="text-red-600 hover:text-red-800 font-bold text-[10px] uppercase tracking-widest">Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#8c7456]/40 text-sm font-medium">
                      No RSVP submissions found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
