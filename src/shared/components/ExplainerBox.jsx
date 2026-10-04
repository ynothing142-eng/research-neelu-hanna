import React from 'react';
import { Info } from 'lucide-react';

export function ExplainerBox({ title = 'What just happened?', explanation }) {
  if (!explanation) return null;
  return (
    <div className="bg-slate-900/90 border border-teal-800/40 rounded-lg p-3 text-sm my-3 shadow-inner">
      <div className="flex items-center gap-2 text-teal-400 font-semibold mb-1 text-xs uppercase tracking-wider">
        <Info size={14} />
        <span>{title}</span>
      </div>
      <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
        {explanation}
      </p>
    </div>
  );
}
