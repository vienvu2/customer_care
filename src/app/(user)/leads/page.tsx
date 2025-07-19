"use client"
import { Button } from "@/atom/button"
import { Input } from "@/atom/input"
import { FormStyled, Styled } from "@/components/style"
import { Table } from "@/components/table"
import { ListPage, Layout } from "@/containers/wrap"
import useCreate from "@/hook/create"
import useList from "@/hook/list"
import { LeadCreateDTO } from "@/lib/services/leadService"
import { colors } from "@/store/theme"
import { Lead } from "@prisma/client"
import * as Icon from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

const LeadPage = () => {
  const { list } = useList<Lead>("leads")

  const [leadDetail, setDetail] = useState<Lead | null>(null)
  const [isCreate, setIsCreate] = useState(false)

  const renderDetail = () => {
    if (isCreate) {
      return (
        <LeadForm
          onClose={() => {
            setIsCreate(false)
            setDetail(null)
          }}
        />
      )
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

type LeadInput = {
  name: keyof Lead
  label: string
  type: string
  placeholder: string
  value: string
  options?: { value: string; label: string }[]
}

const LeadForm = ({ onClose }: { onClose?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Lead>>()

  const inputs: LeadInput[] = [
    {
      name: "fullName",
      label: "Họ và tên",
      type: "text",
      placeholder: "Nhập họ và tên",
      value: "",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Nhập email",
      value: "",
    },
    {
      name: "phoneNumber",
      label: "Số điện thoại",
      type: "text",
      placeholder: "Nhập số điện thoại",
      value: "",
    },
    {
      name: "source",
      label: "Nguồn khách hàng",
      type: "select",
      placeholder: "Chọn nguồn khách hàng",
      options: [
        { value: "website", label: "Website" },
        { value: "social_media", label: "Mạng xã hội" },
        { value: "referral", label: "Giới thiệu" },
      ],
      value: "website", // Default value, can be changed
    },
    {
      name: "zaloId",
      label: "Zalo ID",
      type: "text",
      placeholder: "Nhập Zalo ID (nếu có)",
      value: "",
    },
    {
      name: "viberId",
      label: "Viber ID",
      type: "text",
      placeholder: "Nhập Viber ID (nếu có)",
      value: "",
    },
    {
      name: "whatsappId",
      label: "WhatsApp ID",
      type: "text",
      placeholder: "Nhập WhatsApp ID (nếu có)",
      value: "",
    },
    {
      name: "notes",
      label: "Ghi chú",
      type: "text",
      placeholder: "Nhập ghi chú",
      value: "",
    },
  ]

  const { create } = useCreate<Lead>("leads")

  const onSubmit = (data: unknown) => {
    console.log("Form submitted with data:", data)
    // create(data)
    console.log("Creating lead with data:", data)
  }

  console.log(errors)
  return (
    <FormStyled.Wrap>
      <FormStyled.Title>
        <Icon.User2 size={24} />
        Thông tin khách hàng
        <div style={{ flex: 1 }} />
        <Button
          type="light"
          onClick={() => {
            if (onClose) onClose()
          }}
        >
          <Icon.X size={20} color={colors.textPrimary} />
        </Button>
      </FormStyled.Title>
      {inputs.map((input) => (
        <FormStyled.Item key={input.name}>
          <FormStyled.Label>{input.label}</FormStyled.Label>
          <Input
            placeholder={input.placeholder}
            {...register(input.name, {
              required: `${input.label} là bắt buộc`,
            })}
          />
        </FormStyled.Item>
      ))}
      {/* Add form fields for creating or editing a lead */}
      <Button onClick={() => handleSubmit(onSubmit)}>Lưu</Button>
    </FormStyled.Wrap>
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
