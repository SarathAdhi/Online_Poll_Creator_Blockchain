import React from "react";

type Props = {
  value: number;
};

const PercentageBar: React.FC<Props> = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 h-2 rounded-md overflow-hidden">
      <div
        className="bg-blue-500 h-2 rounded-md"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default PercentageBar;
