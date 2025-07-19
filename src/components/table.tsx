"use client"
import { colors } from "@/store/theme"
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
  onRowClick?: (item: T) => void
}

export const Table = <T,>({ list, columns, onRowClick }: Props<T>) => {
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
          <tr
            key={idx}
            onClick={() => {
              if (onRowClick) onRowClick(item)
            }}
          >
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
    border: 1px solid ${colors.borderPrimary};
    text-align: left;
  }

  th {
    background-color: ${colors.bgSecondary};
    white-space: nowrap;
  }

  tr:nth-child(even) {
    background-color: ${colors.bgPrimary};
  }

  tr:hover {
  }
`
