"use client"
import { styled } from "styled-components"

type Column<T> = {
  key: string
  label: string
  width?: string
  align?: "left" | "center" | "right"
  render: (rơ: T) => React.ReactNode
}

type Props<T> = {
  list: T[]
  columns: Column<T>[]
}

export const Table = <T,>({ list, columns }: Props<T>) => {
  return (
    <Styled>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{ width: col.width, textAlign: col.align }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((item, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.key} style={{ textAlign: col.align }}>
                {col.render(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Styled>
  )
}

const Styled = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`
