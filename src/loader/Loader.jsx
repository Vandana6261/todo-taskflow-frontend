import React from 'react';

// ==========================================
// 1. CLASSIC SPINNER COMPONENT
// ==========================================
export function ClassicSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-opacity-20 transition-colors bg-card border-gray text-text">
      <div className="w-10 h-10 border-4 border-gray/30 border-t-button rounded-full animate-spin"></div>
      <span className="mt-4 text-xs font-semibold tracking-wider uppercase text-muted">Classic Spinner</span>
    </div>
  );
}

// ==========================================
// 2. BOUNCING DOTS COMPONENT
// ==========================================
export function BouncingDots() {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-opacity-20 transition-colors bg-card border-gray text-text">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-button animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 rounded-full bg-button animate-bounce"></div>
      </div>
      <span className="mt-4 text-xs font-semibold tracking-wider uppercase text-muted">Bouncing Dots</span>
    </div>
  );
}

// ==========================================
// 3. RADAR PULSE COMPONENT
// ==========================================
export function RadarPulse() {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-opacity-20 transition-colors bg-card border-gray text-text">
      <div className="relative flex items-center justify-center w-10 h-10">
        <div className="absolute w-full h-full rounded-full bg-accent/30 animate-ping"></div>
        <div className="relative w-4 h-4 rounded-full bg-accent"></div>
      </div>
      <span className="mt-4 text-xs font-semibold tracking-wider uppercase text-muted">Radar Pulse</span>
    </div>
  );
}


// ==========================================
// 4. CYBERPUNK INFINITY RIBBON COMPONENT
// ==========================================
export function InfinityCore() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer Tracker Line */}
        <div className="absolute inset-0 border-4 border-transparent border-t-button border-b-accent rounded-full animate-spin"></div>
        {/* Counter-rotating Inner Line */}
        <div className="absolute w-10 h-10 border-4 border-transparent border-l-accent border-r-button rounded-full animate-[spin_0.8s_infinite_linear_reverse]"></div>
        {/* Core Glow Particle */}
        <div className="w-2 h-2 rounded-full bg-text shadow-[0_0_15px_var(--color-button)] animate-ping"></div>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Infinity Core
      </span>
    </div>
  );
}

// ==========================================
// 5. THE ECLIPSE PULSE
// ==========================================
export function EclipsePulse() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Core stationary node */}
        <div className="w-3 h-3 rounded-full bg-accent z-10"></div>
        {/* Ring 1 */}
        <div className="absolute inset-0 rounded-full border border-button/40 animate-[ping_2s_infinite_cubic-bezier(0.16,1,0.3,1)]"></div>
        {/* Ring 2 with step-delay */}
        <div className="absolute inset-0 rounded-full border border-accent/30 animate-[ping_2s_infinite_cubic-bezier(0.16,1,0.3,1)_0.6s]"></div>
        {/* Ring 3 with step-delay */}
        <div className="absolute inset-0 rounded-full border border-button/20 animate-[ping_2s_infinite_cubic-bezier(0.16,1,0.3,1)_1.2s]"></div>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Eclipse Pulse
      </span>
    </div>
  );
}


// ==========================================
// 6. THE GEOMETRIC ORBIT
// ==========================================
export function GeometricOrbit() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Faint tracking path ring */}
        <div className="absolute inset-0 rounded-full border border-gray/10"></div>
        
        {/* Main Orbiting Dot */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-button shadow-[0_0_10px_var(--color-button)]"></div>
        </div>
        
        {/* Counter-Rotating Secondary Dot */}
        <div className="absolute w-10 h-10 animate-[spin_2s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent opacity-80"></div>
        </div>

        {/* Center Breathing Core */}
        <div className="w-4 h-4 rounded-full bg-page border border-gray/20 animate-pulse"></div>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Geometric Orbit
      </span>
    </div>
  );
}

// ==========================================
// 7. THE ECLIPSE SYNCHRONIZER
// ==========================================
export function EclipseSynchronizer() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer Orbit Path & Node */}
        <div className="absolute inset-0 border border-gray/10 rounded-full animate-[spin_4s_linear_infinite]">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-button shadow-[0_0_8px_var(--color-button)]"></div>
        </div>

        {/* Inner Interlocking Orbit Path & Node */}
        <div className="absolute w-10 h-10 border border-accent/20 rounded-full animate-[spin_2.5s_linear_infinite_reverse]">
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent"></div>
        </div>

        {/* Central Pulse Core */}
        <div className="w-3 h-3 rounded-full bg-text opacity-90 animate-[ping_1.5s_infinite_cubic-bezier(0.16,1,0.3,1)]"></div>
        <div className="absolute w-2 h-2 rounded-full bg-text z-10"></div>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Eclipse Synchronizer
      </span>
    </div>
  );
}

// ==========================================
// 8. THE CASCADING WAVE MATRIX
// ==========================================
export function CascadingWaveMatrix() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <style>{`
        @keyframes matrix-pulse {
          0%, 100% { transform: scaleY(0.3); opacity: 0.2; filter: brightness(0.8); }
          50% { transform: scaleY(2); opacity: 1; filter: brightness(1.2); }
        }
      `}</style>

      <div className="flex items-center space-x-1 h-10">
        {[0.4, 0.2, 0.1, 0, 0.1, 0.2, 0.4].map((delay, index) => {
          const isCenter = index === 3;
          const bgClass = isCenter 
            ? "bg-text shadow-[0_0_12px_var(--color-text)]" 
            : index % 2 === 0 ? "bg-button" : "bg-accent";

          return (
            <div
              key={index}
              className={`w-1 h-5 rounded-full ${bgClass}`}
              style={{
                animation: 'matrix-pulse 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                animationDelay: `-${delay}s`,
              }}
            />
          );
        })}
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Wave Matrix
      </span>
    </div>
  );
}

// ==========================================
// 9. THE KINETIC TRACER
// ==========================================
export function KineticTracer() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <style>{`
        @keyframes trace-draw {
          0% { stroke-dashoffset: 260; transform: rotate(0deg); }
          50% { stroke-dashoffset: 70; transform: rotate(180deg); }
          100% { stroke-dashoffset: 260; transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="relative w-14 h-14">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            className="stroke-gray/10" 
            strokeWidth="3" 
            fill="transparent" 
          />
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            className="stroke-button" 
            strokeWidth="4" 
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray="250"
            style={{
              transformOrigin: '50px 50px',
              animation: 'trace-draw 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
        </div>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Kinetic Tracer
      </span>
    </div>
  );
}

// ==========================================
// THE PROGRESS LINE
// ==========================================
export function ProgressLine() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <style>{`
        @keyframes shimmer-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
      <div className="w-full max-w-[150px] bg-gray/30 h-1.5 rounded-full overflow-hidden relative">
        <div 
          className="absolute inset-0 h-full w-1/2 rounded-full bg-gradient-to-r from-button to-accent"
          style={{ animation: 'shimmer-line 1.5s infinite ease-in-out' }}
        ></div>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Progress Line
      </span>
    </div>
  );
}

// ==========================================
// THE LIQUID FUSION
// ==========================================
export function LiquidFusion() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <div className="flex items-center justify-center space-x-3 filter blur-[2px] contrast-[5]">
        <div className="w-5 h-5 rounded-full bg-button animate-[ping_1.2s_infinite_ease-in-out]"></div>
        <div className="w-6 h-6 rounded-full bg-accent animate-[pulse_1s_infinite_ease-in-out] scale-110"></div>
        <div className="w-5 h-5 rounded-full bg-button animate-[ping_1.2s_infinite_ease-in-out_0.6s]"></div>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Liquid Fusion
      </span>
    </div>
  );
}


// ==========================================
// THE QUANTUM STEPPER
// ==========================================
export function QuantumStepper() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <style>{`
        @keyframes step-slide {
          0% { left: -40%; width: 30%; }
          50% { width: 60%; }
          100% { left: 110%; width: 20%; }
        }
      `}</style>
      <div className="w-full max-w-[160px] flex flex-col space-y-2">
        <div className="relative w-full h-1 bg-gray/10 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-button to-accent rounded-full"
            style={{ animation: 'step-slide 1.6s cubic-bezier(0.65, 0, 0.35, 1) infinite' }}
          />
        </div>
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] text-accent font-mono animate-pulse">CONNECTING</span>
          <span className="text-[10px] text-muted font-mono tracking-normal">SYS_V2.0</span>
        </div>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Quantum Stepper
      </span>
    </div>
  );
}


// ==========================================
// THE DYNAMIC COLOR SHIFTER
// ==========================================
export function ColorShifter() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <style>{`
        @keyframes dynamic-shift {
          0%, 100% { background-color: var(--color-button); transform: translateX(-100%) scaleX(0.6); }
          50% { background-color: var(--color-accent); transform: translateX(100%) scaleX(1.4); }
        }
      `}</style>
      <div className="w-full max-w-[150px] bg-gray/10 h-1.5 rounded-full overflow-hidden relative">
        <div 
          className="absolute inset-y-0 w-1/2 rounded-full"
          style={{ animation: 'dynamic-shift 2s cubic-bezier(0.45, 0, 0.55, 1) infinite' }}
        />
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Color Shifter
      </span>
    </div>
  );
}

// ==========================================
// THE BIOMETRIC SCAN
// ==========================================
// export function AuthScanner() {
//   return (
//     <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
//       <style>{`
//         @keyframes laser-sweep {
//           0%, 100% { top: 0%; opacity: 0.3; }
//           50% { top: 100%; opacity: 1; filter: drop-shadow(0 0 8px var(--color-accent)); }
//         }
//       `}</style>
//       <div className="relative w-12 h-14 border border-gray/20 rounded-xl p-2 flex flex-col items-center justify-end overflow-hidden bg-page/30">
//         <div className="w-3 h-3 rounded-full bg-muted/40 mb-1" />
//         <div className="w-8 h-4 rounded-t-full bg-muted/40" />
//         <div 
//           className="absolute left-0 w-full h-[2px] bg-accent"
//           style={{ animation: 'laser-sweep 2s ease-in-out infinite' }}
//         />
//       </div>
//       <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
//         Auth Scanner
//       </span>
//     </div>
//   );
// }


// ==========================================
// ENHANCED BIOMETRIC AUTH SCANNER
// ==========================================
export function AuthScanner() {
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
      
      {/* Scanner Window Box */}
      <div className="relative w-16 h-20 border-2 border-accent/30 rounded-xl p-3 flex flex-col items-center justify-end overflow-hidden bg-page/60 shadow-inner group">
        
        {/* Subtle Cybernetic Grid Overlay for Texture */}
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] bg-[size:6px_6px]" />
        
        {/* Ambient Bottom Glow */}
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-accent/10 to-transparent pointer-events-none" />

        {/* High-Visibility Biometric Avatar Icon Elements */}
        <div className="w-5 h-5 rounded-full bg-button/70 mb-1.5 shadow-[0_0_10px_var(--color-button)] relative z-10" />
        <div className="w-11 h-6 rounded-t-full bg-button/60 relative z-10" />
        
        {/* High-Intensity Laser Beam Line */}
        <div 
          className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent z-20"
          style={{ animation: 'laser-sweep 2s ease-in-out infinite' }}
        />
      </div>

      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-accent text-center select-none animate-pulse">
        Secure Scanning
      </span>
    </div>
  );
}


// ==========================================
// THE FOCAL RADAR
// ==========================================
export function SearchingRadar() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 border border-button/20 rounded-full animate-ping [animation-duration:1.8s]"></div>
        <div className="absolute inset-3 border border-accent/20 rounded-full animate-ping [animation-duration:1.8s] [animation-delay:0.6s]"></div>
        <div className="absolute inset-0 border border-transparent border-t-button/60 rounded-full animate-spin [animation-duration:1.5s]"></div>
        <svg className="w-5 h-5 text-text opacity-70 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Searching Radar
      </span>
    </div>
  );
}

// ==========================================
// THE SYMMETRICAL EXPANSION
// ==========================================
export function CreationMatrix() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <style>{`
        @keyframes construct-grow {
          0%, 100% { transform: scale(0.4); opacity: 0.3; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div className="flex items-center space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded bg-button"
            style={{
              animation: 'construct-grow 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Creating Node
      </span>
    </div>
  );
}

// ==========================================
// THE CYCLIC TRANSFORMER
// ==========================================
export function UpdateTransformer() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 border-2 border-transparent border-l-accent border-r-accent rounded-full animate-[spin_1.2s_linear_infinite_reverse]"></div>
        <div className="absolute inset-2 border-2 border-transparent border-t-button border-b-button rounded-full animate-[spin_0.8s_linear_infinite]"></div>
        <div className="w-2 h-2 rounded-full bg-text opacity-80 animate-pulse"></div>
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Updating State
      </span>
    </div>
  );
}


// ==========================================
// THE FRAGMENTATION FIELD
// ==========================================
export function DestructionField() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <style>{`
        @keyframes implode-fracture {
          0% { transform: scale(1) translateY(0); opacity: 1; }
          45% { transform: scale(1.2) translateY(-4px); opacity: 0.9; }
          80%, 100% { transform: scale(0) translateY(12px); opacity: 0; }
        }
      `}</style>
      <div className="flex space-x-2 h-4 items-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-danger shadow-[0_0_8px_rgba(220,38,38,0.4)]"
            style={{
              animation: 'implode-fracture 1.5s cubic-bezier(0.76, 0, 0.24, 1) infinite',
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Deleting Field
      </span>
    </div>
  );
}


// ==========================================
// THE KINETIC BOUNCER
// ==========================================
export function KineticBouncer() {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray/10 bg-card text-text shadow-xl relative overflow-hidden min-h-[220px]">
      <style>{`
        @keyframes kinetic-drop {
          0%, 100% { transform: translateY(-24px) scaleX(0.85) scaleY(1.15); animation-timing-function: cubic-bezier(0.6, 0, 1, 0.6); }
          45% { transform: translateY(0) scaleX(1) scaleY(1); animation-timing-function: cubic-bezier(0, 0, 0.4, 1); }
          50% { transform: translateY(2px) scaleX(1.3) scaleY(0.75); }
          55% { transform: translateY(0) scaleX(1) scaleY(1); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
      `}</style>
      <div className="relative w-16 h-12 flex flex-col justify-end items-center">
        <div 
          className="w-4 h-4 rounded-full bg-gradient-to-br from-button to-accent absolute"
          style={{ animation: 'kinetic-drop 1.1s infinite' }}
        />
        <div className="w-12 h-1 bg-gray/20 rounded-full" />
      </div>
      <span className="mt-8 text-xs font-bold tracking-widest uppercase text-muted/80 text-center select-none">
        Kinetic Bouncer
      </span>
    </div>
  );
}

// ==========================================
// FUTURE ANIMATIONS WORKSPACE
// ==========================================
// Feel free to append new, decoupled loader functions right here...


// ==========================================
// MAIN SHOWCASE LAYOUT
// ==========================================
export default function Loader() {
  return (
    <div className="min-h-screen p-8 bg-page text-text">
      <header className="mb-8 border-b pb-4 border-gray/20">
        <h1 className="text-2xl font-bold">Custom Loader Components</h1>
        <p className="text-muted text-sm">Powered by your custom Tailwind theme variables</p>
      </header>

      {/* Grid Layout for showcasing all loader types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ClassicSpinner />
        <BouncingDots />
        <RadarPulse />
        <InfinityCore />
        <EclipsePulse />
        <GeometricOrbit />
        <EclipseSynchronizer />
        <CascadingWaveMatrix />
        <KineticTracer />
        <ProgressLine />
        <LiquidFusion />
        <QuantumStepper />

        <ColorShifter />
        <AuthScanner />
        <SearchingRadar />
        <CreationMatrix />
        <UpdateTransformer />
        <DestructionField />
        <KineticBouncer />
        
      </div>
    </div>
  );
}