import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewsCount?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  showNumber = true,
  reviewsCount,
  className,
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {showNumber && (
        <span className="font-bold text-amber-500 text-sm">
          {rating.toFixed(1)}
        </span>
      )}
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${maxStars} stars`}>
        {Array.from({ length: maxStars }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const half = !filled && index < rating;

          return (
            <Star
              key={index}
              className={cn(
                iconSizes[size],
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : half
                  ? 'fill-amber-200 text-amber-400'
                  : 'text-slate-300'
              )}
            />
          );
        })}
      </div>
      {reviewsCount !== undefined && (
        <span className="text-xs text-slate-500 font-normal">
          ({new Intl.NumberFormat('en-US').format(reviewsCount)})
        </span>
      )}
    </div>
  );
};
