export function Input({ 
  id, 
  type = "text", 
  placeholder = "", 
  ref, 
  label, 
  onChange, 
  value, 
  className = "", 
  children 
}) {
  return (
    <div className={`field ${className}`}>
      {label && <label className="label" htmlFor={id}>{label}</label>}
      <div className="control">
        <input
          id={id}
          placeholder={placeholder}
          className="input"
          type={type}
          ref={ref}
          onChange={onChange}
          value={value} 
        />
      </div>
      {children}
    </div>
  )
}