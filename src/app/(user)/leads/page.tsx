"use client"
import { Button } from "@/atom/button"
import { Styled } from "@/components/style"
import { Table } from "@/components/table"
import { Content, Layout } from "@/containers/wrap"
import useList from "@/hook/list"
import { Lead } from "@prisma/client"
import * as Icon from "lucide-react"
import { useState } from "react"

const LeadPage = () => {
  const { list } = useList<Lead>("leads")

  const [leadDetail, setDetail] = useState<Lead | null>(null)

  const renderDetail = (lead: Lead) => {
    return <LeadDetail lead={lead} />
  }
  return (
    <Content
      detail={leadDetail ? renderDetail(leadDetail) : null} // Assuming you want to show details of the first lead
    >
      <Styled.Wrap>
        <Styled.Header>
          <Styled.Title>Quản Lý Khách Hàng</Styled.Title>
          <Styled.HeaderActions>
            <Button
              type="primary"
              onClick={() => {
                // Handle add new lead action
              }}
            >
              <Icon.Plus size={20} />
              Tạo mới
            </Button>
          </Styled.HeaderActions>
        </Styled.Header>
        <Table<Lead>
          list={list}
          onRowClick={(lead) => setDetail(lead)}
          columns={[
            {
              key: "id",
              label: "ID",
              width: "20px",
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
    </Content>
  )
}

export default LeadPage

const LeadDetail = ({ lead }: { lead: Lead }) => {
  return (
    <div>
      <h2>Chi tiết khách hàng</h2>
      <p>
        <strong>ID:</strong> {lead.id}
      </p>
      <p>
        <strong>Tên:</strong> {lead.fullName}
      </p>
      <p>
        <strong>Email:</strong> {lead.email}
      </p>
      {/* Add more fields as necessary */}
    </div>
  )
}
