"use client"
import { Styled } from "@/components/style"
import { Table } from "@/components/table"
import { Layout } from "@/containers/wrap"
import useList from "@/hook/list"
import { Lead } from "@prisma/client"

const LeadPage = () => {
  const { list } = useList<Lead>("leads")
  return (
    <Styled.Wrap>
      <Styled.Title>Quản Lý Khách Hàng</Styled.Title>
      <Table<Lead>
        list={list}
        columns={[
          {
            key: "id",
            label: "ID",
            width: "50px",
            align: "left",
            render: (lead) => lead.id,
          },
          {
            key: "name",
            label: "Name",
            width: "200px",
            align: "left",
            render: (lead) => lead.fullName,
          },
          {
            key: "email",
            label: "Email",
            width: "200px",
            align: "left",
            render: (lead) => lead.email,
          },
        ]}
      />
    </Styled.Wrap>
  )
}

export default LeadPage
