type Props = {
  inputs: {
    name: string
    type:
      | "text"
      | "email"
      | "password"
      | "tel"
      | "select"
      | "textarea"
      | "money"
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  }[]
  errors?: { [key: string]: string }
  warning?: { [key: string]: string }
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel?: () => void
  submitText?: string
  cancelText?: string
  className?: string
}

export const Form = ({
  inputs,
  onSubmit = (e) => e.preventDefault(),
  onCancel,
  submitText,
  cancelText,
}: Props) => {
  return (
    <form className="form" onSubmit={onSubmit} style={{ width: "100%" }}>
      {inputs.map((input, index) => (
        <div key={index} className="form-group">
          <label htmlFor={input.name}>{input.name}</label>
          {input.type === "select" ? (
            <select
              id={input.name}
              name={input.name}
              value={input.value}
              //   onChange={input.onChange}
            >
              {/* Options can be passed as a prop or hardcoded */}
              <option value="">Select an option</option>
            </select>
          ) : input.type === "textarea" ? (
            <textarea
              id={input.name}
              name={input.name}
              placeholder={input.placeholder}
              value={input.value}
              //   onChange={input.onChange}
            />
          ) : (
            <input
              type={input.type}
              id={input.name}
              name={input.name}
              placeholder={input.placeholder}
              value={input.value}
              onChange={input.onChange}
            />
          )}
        </div>
      ))}
      <div className="form-actions">
        <button type="submit">{submitText || "Submit"}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            {cancelText || "Cancel"}
          </button>
        )}
      </div>
    </form>
  )
}
