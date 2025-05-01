
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const getProgressColor = (value: number) => {
    if (value < 30) return 'bg-blue-500';
    if (value < 70) return 'bg-amber-500';
    return 'bg-green-500';
  };
  
  // Ensure the progress is within 0-100 range
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${getProgressColor(safeProgress)}`} 
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
