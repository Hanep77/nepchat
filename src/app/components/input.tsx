interface InputType {
  type: string,
  name: string,
  label: string,
  error?: string,
  required?: boolean,
  disabled?: boolean
}

export default function Input({ type, name, label, error, required, disabled }: InputType) {
  return (
    <div className="flex flex-col">
      {error && <p>{error}</p>}
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} disabled={disabled} required={required}
        className="h-8 border border-zinc-300 rounded px-2" />
    </div>
  )
}
