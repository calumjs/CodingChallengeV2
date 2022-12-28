import { StarIcon } from '@fluentui/react-icons-northstar';
import React, { useState } from 'react';
import './Rating.css';

interface RatingProps {
  onChange: (value: number) => void;
}

export function Rating({ onChange }: RatingProps) {
  const [value, setValue] = useState(0);

  const handleMouseEnter = (newValue: number) => {
    //setValue(newValue);
  };

  const handleMouseLeave = () => {
    //setValue(0);
  };

  const handleClick = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map(n => (
        <StarIcon
          key={n}
          outline={n > value}
          className={n <= value ? 'selected' : ''}
          onMouseEnter={() => handleMouseEnter(n)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(n)}
        />
      ))}
    </div>
  );
}
