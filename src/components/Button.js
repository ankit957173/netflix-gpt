import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
    ghost: 'text-white hover:bg-white hover:text-black'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()
  
  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
