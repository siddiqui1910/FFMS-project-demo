'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/Navbar';

export default function CrudPage({ title, singular, endpoint, columns, fields, titleKey = 'id' }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Protect route
  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [authLoading, user, router]);

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${endpoint}`);
      const data = Array.isArray(res.data) ? res.data : (res.data.results || []);
      setItems(data);
      setError('');
    } catch (e) {
      setError('Could not load data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchItems();
  }, [user, endpoint]);

  // Open modal for new
  const openNewModal = () => {
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = f.default ?? '';
    });
    setFormData(initial);
    setEditingItem(null);
    setModalOpen(true);
  };

  // Open modal for edit
  const openEditModal = (item) => {
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = item[f.name] ?? '';
    });
    setFormData(initial);
    setEditingItem(item);
    setModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingItem) {
        await api.put(`${endpoint}${editingItem.id}/`, formData);
        toast.success(`${singular} updated`);
      } else {
        await api.post(`${endpoint}`, formData);
        toast.success(`${singular} created`);
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      const msg = err.response?.data
        ? Object.entries(err.response.data).map(([k, v]) => `${k}: ${v}`).join(', ')
        : 'Something went wrong';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await api.delete(`${endpoint}${deleteConfirm.id}/`);
      toast.success(`${singular} deleted`);
      setDeleteConfirm(null);
      fetchItems();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  // Filter items by search
  const filteredItems = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  // Auth guards
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-amber-500 tracking-wide">{title}</h1> 
              <p className="text-slate-400 text-sm tracking-widest uppercase mt-2">
                {items.length} {items.length === 1 ? 'record' : 'records'}
              </p>
            </div>
            <button onClick={openNewModal} className="btn-primary">
              + Add {singular}
            </button>
          </div>

          {/* Search + Back */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              className="input flex-1"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link href="/dashboard" className="btn-secondary whitespace-nowrap">
              ← Dashboard
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded mb-4">
              {error}
            </div>
          )}

          {/* Table */}
          <div className="card p-0 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-slate-500">Loading...</div>
            ) : filteredItems.length === 0 ? (
              <div className="p-12 text-center text-slate-500 italic">
                {items.length === 0 ? `No ${title.toLowerCase()} found in the ledger. Click "Add ${singular}" to begin.` : 'No matching records found.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      {columns.map((c) => (
                        <th key={c.key}>{c.label}</th>
                      ))}
                      <th className="w-32 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id}>
                        {columns.map((c) => (
                          <td key={c.key}>
                            {c.render ? c.render(item[c.key], item) : formatValue(item[c.key])}
                          </td>
                        ))}
                        <td className="text-right whitespace-nowrap">
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-amber-500/70 hover:text-amber-400 text-xs font-semibold tracking-wider uppercase mr-4 transition-colors"  
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item)}
                            className="text-red-500/70 hover:text-red-400 text-xs font-semibold tracking-wider uppercase transition-colors"
                          >
                            Delete
                          </button> 
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-playfair font-bold text-amber-500 mb-6">
                {editingItem ? `Edit ${singular}` : `Add ${singular}`}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((f) => (
                  <div key={f.name}>
                    <label className="label" htmlFor={f.name}>
                      {f.label} {f.required && <span className="text-red-500">*</span>}
                    </label>
                    {f.type === 'select' ? (
                      <select
                        id={f.name}
                        className="input"
                        value={formData[f.name] ?? ''}
                        onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                        required={f.required}
                      >
                        <option value="">— Select —</option>
                        {f.options.map((opt) => (
                          <option key={opt.value ?? opt} value={opt.value ?? opt}>
                            {opt.label ?? opt}
                          </option>
                        ))}
                      </select>
                    ) : f.type === 'textarea' ? (
                      <textarea
                        id={f.name}
                        className="input"
                        rows={3}
                        value={formData[f.name] ?? ''}
                        onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                        required={f.required}
                      />
                    ) : (
                      <input
                        id={f.name}
                        type={f.type || 'text'}
                        step={f.step}
                        className="input"
                        value={formData[f.name] ?? ''}
                        onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                        required={f.required}
                      />
                    )}
                  </div>
                ))}

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn-secondary"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={submitting}>
                    {submitting ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold mb-2">Delete {singular}?</h3>
            <p className="text-slate-600 mb-6 text-sm">
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Renders dates nicely; returns "—" for null
function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}