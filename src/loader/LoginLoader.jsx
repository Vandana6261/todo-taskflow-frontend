import React from "react";

function LoginLoader({loaderFor="loading"}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <style>{`
        @keyframes laser-sweep {
          0%, 100% { 
            top: 0%; 
            opacity: 0.4;
            filter: drop-shadow(0 0 2px var(--color-accent));
          }
          50% { 
            top: 100%; 
            opacity: 1; 
            filter: drop-shadow(0 0 12px var(--color-accent)) drop-shadow(0 0 4px var(--color-accent)); 
          }
        }
      `}</style>
      
      <div className="relative w-16 h-20 border-2 border-accent/30 rounded-xl p-3 flex flex-col items-center justify-end overflow-hidden bg-page/60 shadow-inner group">
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] bg-[size:6px_6px]" />
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-accent/10 to-transparent pointer-events-none" />
        <div className="w-5 h-5 rounded-full bg-button/70 mb-1.5 shadow-[0_0_10px_var(--color-button)] relative z-10" />
        <div className="w-11 h-6 rounded-t-full bg-button/60 relative z-10" />
        <div 
          className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent z-20"
          style={{ animation: 'laser-sweep 2s ease-in-out infinite' }}
        />
      </div>

      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-accent text-center select-none animate-pulse">
        {loaderFor}
      </span>
    </div>
  );
}

export default LoginLoader;
