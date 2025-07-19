import { useForm, UseFormRegister } from "react-hook-form"
import { FormStyled } from "./style"
import { Select } from "@/atom/select"
import { Input } from "@/atom/input"

export type RowInput = {
  name: string
  label: string
  type: string
  placeholder?: string
  value?: string
  options?: { value: string; label: string }[]
  required?: boolean
}
type Props<T> = {
  inputs: RowInput[]
  register: UseFormRegister<T>
}
export const FormData = <T,>(props: Props<T>) => {
  const { inputs, register } = props
  const renderRow = (input: RowInput) => {
    if (input.type === "select") {
      return (
        <Select {...register(input.name)}>
          {input.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )
    }
    return (
      <Input
        placeholder={input.placeholder}
        {...register(input.name, { required: input.required })}
      />
    )
  }
  return (
    <div>
      {inputs.map((input) => (
        <FormStyled.Item key={input.name}>
          <FormStyled.Label>{input.label}</FormStyled.Label>
          {renderRow(input)}
        </FormStyled.Item>
      ))}
    </div>
  )
}
