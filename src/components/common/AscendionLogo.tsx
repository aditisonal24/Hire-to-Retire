import React from "react";

interface AscendionLogoProps {
  variant?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const AscendionLogo: React.FC<AscendionLogoProps> = ({ 
  variant = "light", 
  className = "",
  size = "md"
}) => {
  const dimensions = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
    xl: "h-12"
  };

  return (
    <div 
      id="ascendion-logo-container"
      className={`inline-flex items-center select-none ${dimensions[size]} ${className}`}
      title="Ascendion"
    >
      <img
        id="ascendion-logo-img"
        src="/AscendionLogo.png"
        alt="Ascendion Logo"
        className="h-full w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
