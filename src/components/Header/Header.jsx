import React, { useState, useRef, useEffect } from 'react';
import { useBoardStore } from '../../store/useBoardStore';
import { useFilterStore } from '../../store/useFilterStore';
import { LABELS, PRIORITIES, MEMBERS } from '../../utils/constants';
import { Lock, ChevronDown, UserPlus, SlidersHorizontal, DownloadCloud, Search, X } from 'lucide-react';
import { InviteModal } from './InviteModal';
import toast from 'react-hot-toast';

export const Header = () => {
  const { members, tasks, columns, setBoardData, searchQuery, setSearchQuery } = useBoardStore();
  const {
    selectedLabel,    setSelectedLabel,
    selectedAssignee, setSelectedAssignee,
    selectedPriority, setSelectedPriority,
    dueDateFilter,    setDueDateFilter,
    resetFilters,
  } = useFilterStore();

  const [showInvite, setShowInvite]         = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [localSearch, setLocalSearch]         = useState(searchQuery || '');
  const filterRef  = useRef(null);
  const fileInputRef = useRef(null);

  // Debounce search → store
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(localSearch), 200);
    return () => clearTimeout(t);
  }, [localSearch]);

  // Close filter panel on outside click
  useEffect(() => {
    const h = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilterPanel(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const hasFilter = selectedLabel || selectedAssignee || selectedPriority || dueDateFilter;
  const visibleMembers = members.slice(0, 4);
  const extraCount = members.length - 4;

  /* ---------- Export / Import ---------- */
  const handleExport = () => {
    try {
      const blob = new Blob([JSON.stringify({ tasks, columns }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'adhivasindo_kanban.json';
      a.click(); URL.revokeObjectURL(url);
      toast.success('Board berhasil diekspor!');
    } catch { toast.error('Gagal mengekspor.'); }
  };

  const handleImport = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.tasks && parsed.columns) { setBoardData(parsed.tasks, parsed.columns); toast.success('Board berhasil diimport!'); }
        else toast.error('Format JSON tidak valid.');
      } catch { toast.error('Gagal membaca file.'); }
    };
    reader.readAsText(file); e.target.value = '';
  };

  const DUE_OPTIONS = [
    { value: '',          label: 'Semua Tanggal' },
    { value: 'today',     label: 'Hari Ini' },
    { value: 'this_week', label: 'Minggu Ini' },
    { value: 'overdue',   label: 'Overdue' },
  ];

  const LABEL_COLOR = {
    Bug:       { bg: '#fee2e2', tx: '#ef4444' },
    Feature:   { bg: '#dbeafe', tx: '#3b82f6' },
    Issue:     { bg: '#fef3c7', tx: '#d97706' },
    Undefined: { bg: '#f1f5f9', tx: '#64748b' },
  };

  return (
    <>
      <div className="header-wrapper" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 24px', background: '#ffffff', borderBottom: '1px solid #e2e8f0',
        flexShrink: 0, gap: '12px', flexWrap: 'wrap'
      }}>

        {/* ───── LEFT: Logo + Avatars + Invite ───── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <Lock size={13} color="#64748b" />
            <span style={{ fontWeight: '600', fontSize: '13px', color: '#1e293b' }}>Adhivasindo</span>
            <ChevronDown size={13} color="#64748b" />
          </div>

          {/* Member Avatars */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {visibleMembers.map((m, i) => (
              <img key={m.id} src={m.avatarUrl} alt={m.name} title={m.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #fff', marginLeft: i === 0 ? 0 : '-8px', objectFit: 'cover' }} />
            ))}
            {extraCount > 0 && (
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3b82f6', border: '2px solid #fff', marginLeft: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: '700' }}>
                +{extraCount}
              </div>
            )}
          </div>

          {/* Invite */}
          <button onClick={() => setShowInvite(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>
            <UserPlus size={13} /> Invite
          </button>
        </div>

        {/* ───── RIGHT: Filter + Export/Import + Search ───── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

          {/* Filter Button + Dropdown */}
          <div style={{ position: 'relative' }} ref={filterRef}>
            <button onClick={() => setShowFilterPanel(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: hasFilter ? '#eff6ff' : '#fff',
                border: `1px solid ${hasFilter ? '#3b82f6' : '#e2e8f0'}`,
                color: hasFilter ? '#1d4ed8' : '#475569',
                padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer'
              }}>
              <SlidersHorizontal size={14} />
              Filter
              {hasFilter && (
                <span style={{ background: '#3b82f6', color: '#fff', borderRadius: '10px', fontSize: '10px', fontWeight: '700', padding: '1px 6px' }}>
                  {[selectedLabel, selectedAssignee, selectedPriority, dueDateFilter].filter(Boolean).length}
                </span>
              )}
            </button>

            {/* ── Filter Dropdown Panel ── */}
            {showFilterPanel && (
              <div style={{
                position: 'absolute', top: '40px', right: 0,
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '16px',
                zIndex: 300, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '14px'
              }}>
                {/* Panel header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700', fontSize: '13px', color: '#1e293b' }}>Filter Tasks</span>
                  {hasFilter && (
                    <button onClick={() => { resetFilters(); setLocalSearch(''); setSearchQuery(''); }}
                      style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <X size={12} /> Reset Semua
                    </button>
                  )}
                </div>

                {/* Label */}
                <div>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Label</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    <Pill active={!selectedLabel} onClick={() => setSelectedLabel('')} bg="#1e293b" tx="#fff" label="Semua" />
                    {LABELS.map(l => {
                      const c = LABEL_COLOR[l] || { bg: '#f1f5f9', tx: '#64748b' };
                      return <Pill key={l} active={selectedLabel === l} onClick={() => setSelectedLabel(l)} bg={c.bg} tx={c.tx} label={l} />;
                    })}
                  </div>
                </div>

                {/* Assignee */}
                <div>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assignee</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    <Pill active={!selectedAssignee} onClick={() => setSelectedAssignee('')} bg="#1e293b" tx="#fff" label="Semua" />
                    {MEMBERS.map(m => (
                      <button key={m.id} onClick={() => setSelectedAssignee(m.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', border: `1px solid ${selectedAssignee === m.id ? '#3b82f6' : '#e2e8f0'}`, background: selectedAssignee === m.id ? '#eff6ff' : '#f8fafc', color: selectedAssignee === m.id ? '#1d4ed8' : '#64748b', fontWeight: selectedAssignee === m.id ? '700' : '400' }}>
                        <img src={m.avatarUrl} alt="" style={{ width: '16px', height: '16px', borderRadius: '50%' }} />
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Due Date</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {DUE_OPTIONS.map(o => <Pill key={o.value} active={dueDateFilter === o.value} onClick={() => setDueDateFilter(o.value)} bg="#1e293b" tx="#fff" label={o.label} />)}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Priority</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    <Pill active={!selectedPriority} onClick={() => setSelectedPriority('')} bg="#1e293b" tx="#fff" label="Semua" />
                    {PRIORITIES.map(p => {
                      const c = p === 'High' ? '#ef4444' : p === 'Medium' ? '#f59e0b' : '#10b981';
                      return <Pill key={p} active={selectedPriority === p} onClick={() => setSelectedPriority(p)} bg={c} tx="#fff" label={p} />;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Export / Import */}
          <input type="file" ref={fileInputRef} accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          <button
            onClick={() => {
              const act = window.confirm('OK = Export ke JSON\nCancel = Import dari file');
              if (act) handleExport(); else fileInputRef.current?.click();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #e2e8f0', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', color: '#475569', cursor: 'pointer', fontWeight: '500' }}>
            <DownloadCloud size={14} /> Export / Import
          </button>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0', pointerEvents: 'none' }} />
            <input type="text" value={localSearch} onChange={e => setLocalSearch(e.target.value)}
              placeholder="Search Tasks"
              style={{ width: '200px', padding: '6px 30px 6px 32px', fontSize: '13px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f7fafc', outline: 'none' }} />
            {localSearch && (
              <button onClick={() => { setLocalSearch(''); setSearchQuery(''); }}
                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#a0aec0', display: 'flex', padding: 0 }}>
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      <InviteModal isOpen={showInvite} onClose={() => setShowInvite(false)} />
    </>
  );
};

/* ── Reusable Pill Button ── */
const Pill = ({ active, onClick, bg, tx, label }) => (
  <button onClick={onClick} style={{
    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', border: 'none',
    background: active ? bg : '#f1f5f9',
    color: active ? tx : '#64748b',
    fontWeight: active ? '700' : '400',
    transition: 'all 0.15s'
  }}>
    {label}
  </button>
);
