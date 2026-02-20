import { theme } from "../theme";

export function Button({
  children,
  variant = "primary", // primary, secondary, outline
  size = "md", // sm, md, lg
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const baseClass = `font-semibold rounded-lg transition-all duration-200 ${
    sizeClasses[size]
  } ${fullWidth ? "w-full" : ""} ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;

  const variantClasses = {
    primary: `bg-[${theme.colors.primary}] text-white hover:opacity-90 active:scale-95`,
    secondary: `bg-[${theme.colors.secondary}] text-white hover:opacity-90 active:scale-95`,
    outline: `border-2 border-[${theme.colors.primary}] text-[${theme.colors.primary}] hover:bg-[${theme.colors.primary}] hover:text-white active:scale-95`,
  };

  return (
    <button
      className={baseClass}
      style={
        variant === "primary"
          ? {
              backgroundColor: theme.colors.primary,
              color: "white",
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
            }
          : variant === "secondary"
          ? {
              backgroundColor: theme.colors.secondary,
              color: "white",
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
            }
          : {
              border: `2px solid ${theme.colors.primary}`,
              color: theme.colors.primary,
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
            }
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({
  label,
  error,
  required = false,
  fullWidth = true,
  ...props
}) {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: theme.colors.secondary }}
        >
          {label}
          {required && <span style={{ color: theme.colors.error }}>*</span>}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
          error ? "border-red-500" : "border-[" + theme.colors.border + "]"
        } focus:border-[${theme.colors.primary}]`}
        style={
          error
            ? {
                borderColor: theme.colors.error,
                backgroundColor: theme.colors.background,
              }
            : {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background,
              }
        }
        onFocus={(e) => {
          e.target.style.borderColor = theme.colors.primary;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error
            ? theme.colors.error
            : theme.colors.border;
        }}
      />
      {error && (
        <p className="text-sm mt-1" style={{ color: theme.colors.error }}>
          {error}
        </p>
      )}
    </div>
  );
}
