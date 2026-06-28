import React, { useState, useRef } from 'react';
import { useBoardStore } from '../../store/useBoardStore';
import { X, Trash2, Check, ImagePlus, Calendar } from 'lucide-react';
import { LABELS, PRIORITIES } from '../../utils/constants';
import { ChecklistSection } from './ChecklistSection';
import { AttachmentSection } from './AttachmentSection';
import { AssigneeSection } from './AssigneeSection';

export const TaskModal = ({ isOpen, columnName, task, onClose }) => {
  const { addTask, updateTask, deleteTask, columns } = useBoardStore();

  const [title,       setTitle]       = useState(task?.title || '');
  const [description, setDesc]        = useState(task?.description || '');
  const [label,       setLabel]       = useState(task?.label || '');
  const [priority,    setPriority]    = useState(task?.priority || '');
  const [dueDate,     setDueDate]     = useState(task?.dueDate || '');
  const [coverImage,  setCoverImage]  = useState(task?.coverImage || '');
  const [assignee,    setAssignee]    = useState(task?.assignee || []);
  const [targetCol,   setTargetCol]   = useState(columnName);
  const [newSub,      setNewSub]      = useState('');
  const [checklist,   setChecklist]   = useState(
    (task?.checklist || []).map((c, i) => ({
      id: c.id || 'sub_' + i,
      title: c.title || c.text || '',
      isCompleted: c.isCompleted || false,
    }))
  );
  const [attachments, setAttachments] = useState(task?.attachments || []);
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted || false);

  const coverFileRef  = useRef(null);
  const attachFileRef = useRef(null);
  const dateInputRef  = useRef(null);

  if (!isOpen) return null;

  const doneCount = checklist.filter(c => c.isCompleted).length;
  const progress  = checklist.length > 0 ? Math.round((doneCount / checklist.length) * 100) : 0;

  const handleCoverFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImage(URL.createObjectURL(file));
  };

  const handleAttachFiles = (e) => {
    const names = Array.from(e.target.files).map(f => f.name);
    setAttachments(prev => [...prev, ...names]);
    e.target.value = '';
  };

  const handleSave = () => {
    if (!title.trim()) { alert('Judul task wajib diisi!'); return; }
    const data = { title, description, label, priority, dueDate, coverImage, checklist, assignee, attachments, isCompleted };
    if (task) updateTask(targetCol, { ...data, id: task.id });
    else      addTask(targetCol, data);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Hapus task ini?')) { deleteTask(columnName, task.id); onClose(); }
  };

  const fmtDisplay = (d) => {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return d; }
  };

  const input = {
    width: '100%', padding: '8px 12px',
    border: '1px solid #e2e8f0', borderRadius: '8px',
    fontSize: '13px', color: '#1e293b',
    background: '#ffffff', outline: 'none',
    boxSizing: 'border-box',
  };

  const lbl = {
    fontSize: '11px', fontWeight: '600', color: '#94a3b8',
    display: 'block', marginBottom: '5px',
    textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  const row = { display: 'flex', flexDirection: 'column', gap: '4px' };
  const divider = { borderTop: '1px solid #f1f5f9', marginTop: '4px', paddingTop: '16px' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
      <div className="modal-container" style={{
        background: '#fff', borderRadius: '16px',
        width: '600px', maxWidth: '98vw', maxHeight: '92vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)', overflow: 'hidden',
      }}>

        {/* ── Top bar ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsCompleted(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: isCompleted ? '#dcfce7' : '#f1f5f9', color: isCompleted ? '#16a34a' : '#64748b', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              <Check size={13} /> {isCompleted ? 'Completed ✓' : 'Mark Complete'}
            </button>
            {task && (
              <button onClick={handleDelete} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                <Trash2 size={13} /> Hapus
              </button>
            )}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        {/* ── Cover Image ── */}
        {coverImage ? (
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img src={coverImage} alt="cover" style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
            <button onClick={() => setCoverImage('')} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={14} />
            </button>
          </div>
        ) : (
          <div onClick={() => coverFileRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', gap: '4px', flexShrink: 0 }}>
            <ImagePlus size={22} color="#94a3b8" />
            <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '600' }}>Add Cover Image</span>
          </div>
        )}
        <input ref={coverFileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverFile} />

        {/* ── Body: 1 kolom, scrollable ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Judul */}
          <div style={row}>
            <textarea value={title} onChange={e => setTitle(e.target.value)} placeholder="Judul task..." rows={2}
              style={{ ...input, fontSize: '18px', fontWeight: '700', resize: 'none', lineHeight: '1.4', padding: '8px 0', border: 'none', borderBottom: '2px solid #e2e8f0', borderRadius: 0, background: 'transparent' }}
            />
          </div>

          {/* Assignee */}
          <AssigneeSection selectedAssignees={assignee} setSelectedAssignees={setAssignee} />

          {/* Due Date + Kolom */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={row}>
              <label style={lbl}>Due Date</label>
              <div style={{ position: 'relative' }}>
                <button type="button" onClick={() => dateInputRef.current?.showPicker?.() || dateInputRef.current?.click()}
                  style={{ ...input, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: dueDate ? '#1e293b' : '#94a3b8' }}>{dueDate ? fmtDisplay(dueDate) : 'Pilih tanggal...'}</span>
                  <Calendar size={14} color="#94a3b8" />
                </button>
                <input ref={dateInputRef} type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
                  style={{ position: 'absolute', opacity: 0, top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer', zIndex: 1 }} />
              </div>
            </div>
            <div style={row}>
              <label style={lbl}>Kolom</label>
              <select value={targetCol} onChange={e => setTargetCol(e.target.value)} style={input}>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Label + Priority */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={row}>
              <label style={lbl}>Label</label>
              <select value={label} onChange={e => setLabel(e.target.value)} style={input}>
                <option value="">— Pilih Label —</option>
                {LABELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div style={row}>
              <label style={lbl}>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={input}>
                <option value="">— Pilih Priority —</option>
                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div style={row}>
            <label style={lbl}>Description</label>
            <textarea value={description} onChange={e => setDesc(e.target.value)}
              placeholder="Tambahkan deskripsi..." rows={4}
              style={{ ...input, resize: 'vertical', lineHeight: '1.5' }} />
          </div>

          {/* ── Attachments ── */}
          <div style={divider}>
            <AttachmentSection
              attachments={attachments}
              setAttachments={setAttachments}
              onBrowse={() => attachFileRef.current?.click()}
            />
            <input ref={attachFileRef} type="file" multiple style={{ display: 'none' }} onChange={handleAttachFiles} />
          </div>

          {/* ── Checklist ── */}
          <div style={divider}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Check List</span>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{doneCount}/{checklist.length}</span>
            </div>
            <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '12px' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: progress >= 100 ? '#10b981' : '#3b82f6', borderRadius: '4px', transition: 'width 0.3s ease' }} />
            </div>
            <ChecklistSection checklist={checklist} setChecklist={setChecklist} newSub={newSub} setNewSub={setNewSub} />
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '14px 20px', borderTop: '1px solid #f1f5f9', flexShrink: 0 }}>
          <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', padding: '9px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#64748b', cursor: 'pointer' }}>Discard</button>
          <button onClick={handleSave} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '9px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Save</button>
        </div>
      </div>
    </div>
  );
};
