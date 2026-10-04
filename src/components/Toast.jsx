import React, { useEffect } from 'react';
import { CheckCircle2, RotateCcw, Info, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-container">
      {toast.type === 'undo' ? (
        <RotateCcw size={16} color="#e5a93c" />
      ) : (
        <CheckCircle2 size={16} color="#2dd4bf" />
      )}
      <div>
        <b style={{ display: 'block', fontSize: '13px' }}>{toast.title}</b>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{toast.message}</span>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#64748b',
          cursor: 'pointer',
          marginLeft: '8px'
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
