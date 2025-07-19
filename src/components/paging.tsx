"use client"
import { Button } from "@/atom/button"
import styled from "styled-components"
import * as Icon from "lucide-react"

type Props = {
  total: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}
export const Paging = (props: Props) => {
  const { total, pageSize, currentPage, onPageChange } = props

  const totalPages = Math.ceil(total / pageSize)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <Styled.Wrap>
      <Styled.Item>
        <Button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <Icon.ChevronsLeft />
        </Button>
      </Styled.Item>
      <Styled.Item>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon.ChevronLeft />
        </Button>
      </Styled.Item>
      {[...Array(totalPages).keys()]
        .filter(
          (page) => page + 1 >= currentPage - 2 && page + 1 <= currentPage + 2
        )
        .map((page) => (
          <Styled.Item key={page + 1}>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={currentPage === page + 1}
            >
              {page + 1}
            </Button>
          </Styled.Item>
        ))}
      <Styled.Item>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Icon.ChevronRight />
        </Button>
      </Styled.Item>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
  `,
  Item: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    span {
      font-size: 14px;
    }
  `,
}
