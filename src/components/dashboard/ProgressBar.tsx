
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
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${getProgressColor(progress)}`} 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
