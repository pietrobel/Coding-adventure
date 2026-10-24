import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  onConfirm,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-bold text-white">
              Azzera Progressi
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="my-5 text-xs text-slate-300 leading-relaxed">
          Sei sicuro di voler azzerare tutti i progressi e le stelle ottenute?
          Questa operazione cancellerà tutti i salvataggi locali di questa postazione.
        </p>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
          <button
            onClick={onCancel}
            className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={onConfirm}
            className="py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
          >
            Sì, azzera tutto
          </button>
        </div>
      </div>
    </div>
  );
};
