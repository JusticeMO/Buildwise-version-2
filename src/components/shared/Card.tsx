
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  withHover?: boolean;
  withAnimation?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className, 
    variant = 'default', 
    padding = 'md', 
    withHover = false, 
    withAnimation = false,
    ...props 
  }, ref) => {
    
    const variantStyles = {
      default: 'bg-card text-card-foreground shadow',
      glass: 'glass',
      outline: 'border bg-transparent',
    };
    
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    
    return (
      <div
        className={cn(
          'rounded-lg',
          variantStyles[variant],
          paddingStyles[padding],
          withHover && 'hover:shadow-lg smooth-transition',
          withAnimation && 'animate-zoom-in',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
