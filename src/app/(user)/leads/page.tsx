"use client"
import { Button } from "@/atom/button"
import { Input } from "@/atom/input"
import { Styled } from "@/components/style"
import { Table } from "@/components/table"
import { ListPage, Layout } from "@/containers/wrap"
import useList from "@/hook/list"
import { Lead } from "@prisma/client"
import * as Icon from "lucide-react"
import { useState } from "react"

const LeadPage = () => {
  const { list } = useList<Lead>("leads")

  const [leadDetail, setDetail] = useState<Lead | null>(null)
  const [isCreate, setIsCreate] = useState(false)

  const renderDetail = () => {
    if (isCreate) {
      return <LeadForm />
    }
    if (leadDetail) {
      return <LeadDetail lead={leadDetail} />
    }
    return null
  }
  return (
    <ListPage
      actions={[
        <Button
          key="add-lead"
          type="primary"
          onClick={() => {
            // Handle add new lead action
            setIsCreate(true)
          }}
        >
          <Icon.Plus size={20} />
          Tạo mới
        </Button>,
      ]}
      title="Quản Lý Khách Hàng"
      detail={renderDetail()} // Assuming you want to show details of the first lead
    >
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
    </ListPage>
  )
}

export default LeadPage

const LeadForm = () => {
  const inputs = [
    {
      name: "fullName",
      label: "Họ và tên",
      type: "text",
      placeholder: "Nhập họ và tên",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Nhập email",
    },
  ]

  return (
    <form>
      {inputs.map((input) => (
        <Input
          label={input.label}
          key={input.name}
          placeholder={input.placeholder}
        />
      ))}
      {/* Add form fields for creating or editing a lead */}
      <Button>Lưu</Button>
    </form>
  )
}

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
