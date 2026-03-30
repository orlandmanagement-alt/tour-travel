'use client';

import { useState } from 'react';
import Can from '@/components/Can';

const mockStaff = [
  { id: 1, name: 'Budi Santoso', email: 'budi@nusantaratrip.com', role: 'SUPER_ADMIN', last_login: '2 mins ago' },
  { id: 2, name: 'Siti Rahma', email: 'siti@nusantaratrip.com', role: 'FINANCE', last_login: '1 hour ago' },
  { id: 3, name: 'Agus Guide', email: 'agus.guide@nusantaratrip.com', role: 'GUIDE', last_login: 'Yesterday' },
  { id: 4, name: 'Diana Content', email: 'diana@nusantaratrip.com', role: 'CONTENT_EDITOR', last_login: '3 days ago' },
];

export default function UsersRoleManager() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'FINANCE': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'GUIDE': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'CONTENT_EDITOR': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Staff & RBAC Management</h1>
          <p className="text-slate-500 text-sm mt-1">Control who has access to your Enterprise SaaS Modules.</p>
        </div>
        
        {/* Protected by Can component */}
        <Can I="users.create">
          <button 
            onClick={() => setIsInviteOpen(true)}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-light shadow-sm text-sm font-semibold transition"
          >
            + Invite Staff
          </button>
        </Can>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">System Role</th>
              <th className="px-6 py-4">Last Activity</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {mockStaff.map(staff => (
              <tr key={staff.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{staff.name}</td>
                <td className="px-6 py-4 text-slate-500">{staff.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getRoleBadge(staff.role)}`}>
                    {staff.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-mono">{staff.last_login}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Can I="users.edit">
                    <button className="text-brand-primary hover:underline font-semibold">Edit Role</button>
                  </Can>
                  {staff.role !== 'SUPER_ADMIN' && (
                    <Can I="users.delete">
                      <button className="text-red-500 hover:underline font-semibold">Revoke Access</button>
                    </Can>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white">Invite New Staff</h3>
                 <button onClick={() => setIsInviteOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Staff Email</label>
                   <input type="email" placeholder="name@nusantaratrip.com" className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg dark:bg-slate-700 outline-none focus:border-brand-primary" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Assign Role</label>
                   <select className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg dark:bg-slate-700 outline-none focus:border-brand-primary">
                     <option value="CONTENT_EDITOR">Content Editor (Manage Tours)</option>
                     <option value="FINANCE">Finance (View & Approve Payments)</option>
                     <option value="GUIDE">Tour Guide (View Assigments & Scan Tickets)</option>
                     <option value="SUPER_ADMIN">Super Admin (Full Access)</option>
                   </select>
                 </div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-700">
                 <button onClick={() => setIsInviteOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200">Cancel</button>
                 <button onClick={() => setIsInviteOpen(false)} className="px-4 py-2 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary-light">Send Invite Link</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
