'use client'
import { useForm, UseFormRegister } from "react-hook-form"
import { FormStyled } from "./style"
import { Select } from "@/atom/select"
import { Input } from "@/atom/input"

export type RowInput<T> = {
  name: keyof T
  label: string
  type: string
  placeholder?: string
  value?: string
  options?: { value: string; label: string }[]
  required?: boolean
}
type Props<T> = {
  inputs: RowInput<T>[]
  register: UseFormRegister<Partial<T>>
}
export const FormData = <T,>(props: Props<T>) => {
  const { inputs, register } = props
  const renderRow = (input: RowInput<T>) => {
    if (input.type === "select") {
      return (
        <Select {...register(input.name as never)}>
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
        {...register(input.name as never, { required: input.required })}
      />
    )
  }
  return (
    <div>
      {inputs.map((input) => (
        <FormStyled.Item key={input.name as string}>
          <FormStyled.Label>{input.label}</FormStyled.Label>
          {renderRow(input)}
        </FormStyled.Item>
      ))}
    </div>
  )
}
