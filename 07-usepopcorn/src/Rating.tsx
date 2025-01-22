import { useState } from "react";

interface RatingProps {
  handleUserRating: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  color?: string;
  size?: number;
  userRating?: number;
}

const containerStyle = {
  display: "flex",
  gap: "4px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
};

const Rating: React.FC<RatingProps> = ({
  value = 5,
  color = "#fcc419",
  size = 48,
  userRating = 0,
  handleUserRating,
}) => {
  const [rating, setRating] = useState(userRating);
  const [tempRating, setTempRating] = useState(0);

  console.log({ userRating });

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    size: `${size / 1.5}px`,
  };

  function handleRating(rating: number) {
    setRating(rating);
    handleUserRating(rating);
  }

  function handleOnHoverIn(rating: number) {
    setTempRating(rating);
  }

  function handleOnHoverOut() {
    setTempRating(0);
  }

  const numbers = Array.from({ length: value }, (_, i) => i);
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {numbers.map((num: number) => (
          <Star
            key={num}
            onRate={() => handleRating(num + 1)}
            full={tempRating ? num + 1 <= tempRating : num + 1 <= rating}
            onHoverIn={() => handleOnHoverIn(num + 1)}
            onHoverOut={() => handleOnHoverOut}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
};

export default Rating;

const Star = ({
  onRate,
  full,
  onHoverIn,
  onHoverOut,
  color,
  size,
}: {
  onRate: () => void;
  full: boolean;
  onHoverIn: () => void;
  onHoverOut: () => void;
  color: string;
  size: number;
}) => {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "flex",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
};
