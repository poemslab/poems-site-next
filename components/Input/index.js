import styles from './input.module.scss'

export default function Input({ placeholder, onChange, value, name, type, min, label, className, textarea, select, data }) {
  if (select) {
    return (
      <div className={`${styles.input} ${className || ''}`}>
        <label htmlFor={name}>{label}</label>
        <select
          onChange={onChange}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
        >
          {
            data.length > 0 ?
              data.map(r => (
                <option value={r.name}>{r.name}</option>
              ))
            : null
          }
        </select>
      </div>
    )
  }
  if (textarea) {
    return (
      <div className={`${styles.input} ${className || ''}`}>
        <label htmlFor={name}>{label}</label>
        <textarea
          onChange={onChange}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          type={type}
          min={min || 0}
        />
      </div>
    )
  }
  return (
    <div className={`${styles.input} ${className || ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        type={type}
        min={min || 0}
      />
    </div>
  )
}