"use client"
import { Button } from "@/atom/button"
import { FormData, RowInput } from "@/components/form"
import { Flex, FormStyled, DetailPage } from "@/components/style"
import { Table } from "@/components/table"
import { ListPage } from "@/containers/wrap"
import useCreate from "@/hook/create"
import useList from "@/hook/list"
import { colors } from "@/store/theme"
import { Lead } from "@prisma/client"
import * as Icon from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const LeadPage = () => {
  const { list, fetch } = useList<Lead>("leads")

  const [leadDetail, setDetail] = useState<Lead | null>(null)
  const [mode, setMode] = useState<"" | "view" | "create" | "import">("")

  const renderDetail = () => {
    if (mode == "create") {
      return (
        <LeadForm
          data={leadDetail}
          onClose={() => {
            setMode("")
            fetch() // Refresh the list after creating a new lead
          }}
        />
      )
    }
    if (mode == "import") {
      return (
        <LeadImport
          onClose={() => {
            setMode("")
            fetch() // Refresh the list after import
          }}
        />
      )
    }
    if (leadDetail && mode == "view") {
      return (
        <LeadDetail
          lead={leadDetail}
          onClose={() => {
            setDetail(null)
          }}
        />
      )
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
            setMode("create")
          }}
        >
          <Icon.Plus size={20} />
          Tạo mới
        </Button>,

        <Button
          key="import-leads"
          type="secondary"
          onClick={() => {
            // Handle import leads action
            setMode("import")
            console.log("Import leads")
          }}
        >
          <Icon.Upload size={20} />
          Nhập khách hàng
        </Button>,
      ]}
      title="Quản Lý Khách Hàng"
      detail={renderDetail()} // Assuming you want to show details of the first lead
    >
      <Table<Lead>
        list={list}
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
          {
            key: "phoneNumber",
            label: "Số điện thoại",
            width: "150px",
            align: "left",
            render: (lead) => lead.phoneNumber,
          },
          {
            key: "source",
            label: "Nguồn khách hàng",
            width: "150px",
            align: "left",
            render: (lead) => lead.source,
          },
          {
            key: "createdAt",
            label: "Ngày tạo",
            width: "150px",
            align: "left",
            render: (lead) => new Date(lead.createdAt).toLocaleDateString(),
          },
          {
            key: "actions",
            label: "Actions",
            width: "100px",
            align: "left",
            render: (lead) => (
              <Flex>
                <Button
                  type="secondary"
                  size="small"
                  onClick={() => {
                    setDetail(lead)
                  }}
                >
                  <Icon.Edit size={14} />
                </Button>
                <Button
                  type="danger"
                  size="small"
                  onClick={() => {
                    // Handle delete action
                    console.log("Delete lead", lead.id)
                  }}
                >
                  <Icon.Trash size={14} />
                </Button>
              </Flex>
            ),
            // Add actions column for edit/delete if needed
          },
        ]}
      />
    </ListPage>
  )
}

export default LeadPage

const LeadForm = ({ onClose, data }: { onClose?: () => void; data?: Lead }) => {
  const {
    register,
    handleSubmit,
    validate,
    setValue,
    formState: { errors },
  } = useForm<Partial<Lead>>()

  useEffect(() => {
    if (data) {
      console.log("Setting form data:", data)
      // Populate form with existing data if available
      Object.keys(data).forEach((key) => {
        setValue(key as keyof Lead, data[key as keyof Lead] || "")
      })
    }
  }, [data])

  const inputs: RowInput<Lead>[] = [
    {
      name: "fullName",
      label: "Họ và tên",
      type: "text",
      placeholder: "Nhập họ và tên",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Nhập email",
      required: true,
    },
    {
      name: "phoneNumber",
      label: "Số điện thoại",
      type: "text",
      placeholder: "Nhập số điện thoại",
      required: true,
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
      required: true,
    },
    {
      name: "zaloId",
      label: "Zalo ID",
      type: "text",
      placeholder: "Nhập Zalo ID (nếu có)",
    },
    {
      name: "viberId",
      label: "Viber ID",
      type: "text",
      placeholder: "Nhập Viber ID (nếu có)",
    },
    {
      name: "whatsappId",
      label: "WhatsApp ID",
      type: "text",
      placeholder: "Nhập WhatsApp ID (nếu có)",
    },
    {
      name: "notes",
      label: "Ghi chú",
      type: "text",
      placeholder: "Nhập ghi chú",
    },
  ]

  const { create } = useCreate<Lead>("leads")

  const onSubmit = (data: Partial<Lead>) => {
    console.log("Form submitted with data:", data)
    create(
      data,
      () => {
        console.log("Lead created successfully")
        if (onClose) onClose()
      },
      (error) => {
        console.error("Error creating lead:", error)
        toast("Lỗi khi tạo khách hàng", {
          type: "error",
          autoClose: 5000,
        })
      }
    )
  }
  const runSubmit = () => {
    handleSubmit(onSubmit, (errors) => {
      console.error("Validation errors:", errors)
      toast("Vui lòng điền đầy đủ thông tin", {
        type: "warning",
        autoClose: 5000,
      })
    })()
  }

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
      <FormData<Lead> inputs={inputs} register={register} />
      <Button block={true} type="primary" onClick={() => runSubmit()}>
        Lưu thông tin khách hàng
      </Button>
    </FormStyled.Wrap>
  )
}

const LeadDetail = ({ lead, onClose }: { lead: Lead; onClose: () => void }) => {
  return (
    <DetailPage.Wrap>
      <DetailPage.Title>
        <Icon.User2 size={24} />
        Chi tiết khách hàng
        <div style={{ flex: 1 }} />
        <Button
          type="light"
          onClick={() => {
            onClose && onClose()
            console.log("Close detail view")
          }}
        >
          <Icon.X size={20} color={colors.textPrimary} />
        </Button>
      </DetailPage.Title>
      <DetailPage.Content>
        <DetailPage.Row>
          <DetailPage.Label>Họ và tên:</DetailPage.Label>
          <DetailPage.Value>{lead.fullName}</DetailPage.Value>
        </DetailPage.Row>
        <DetailPage.Row>
          <DetailPage.Label>Email:</DetailPage.Label>
          <DetailPage.Value>{lead.email}</DetailPage.Value>
        </DetailPage.Row>
        <DetailPage.Row>
          <DetailPage.Label>Số điện thoại:</DetailPage.Label>
          <DetailPage.Value>{lead.phoneNumber}</DetailPage.Value>
        </DetailPage.Row>
        <DetailPage.Row>
          <DetailPage.Label>Nguồn khách hàng:</DetailPage.Label>
          <DetailPage.Value>{lead.source}</DetailPage.Value>
        </DetailPage.Row>
        <DetailPage.Row>
          <DetailPage.Label>Zalo ID:</DetailPage.Label>
          <DetailPage.Value>{lead.zaloId || "Không có"}</DetailPage.Value>
        </DetailPage.Row>
        <DetailPage.Row>
          <DetailPage.Label>Viber ID:</DetailPage.Label>
          <DetailPage.Value>{lead.viberId || "Không có"}</DetailPage.Value>
        </DetailPage.Row>
        <DetailPage.Row>
          <DetailPage.Label>WhatsApp ID:</DetailPage.Label>
          <DetailPage.Value>{lead.whatsappId || "Không có"}</DetailPage.Value>
        </DetailPage.Row>
        <DetailPage.Row>
          <DetailPage.Label>Ghi chú:</DetailPage.Label>
          <DetailPage.Value>{lead.notes || "Không có"}</DetailPage.Value>
        </DetailPage.Row>
      </DetailPage.Content>
      <DetailPage.Actions>
        <Button
          type="secondary"
          onClick={() => {
            // Handle edit action
            console.log("Edit lead", lead.id)
          }}
        >
          <Icon.Edit size={20} />
          Chỉnh sửa
        </Button>
        <Button
          type="danger"
          onClick={() => {
            // Handle delete action
            console.log("Delete lead", lead.id)
          }}
        >
          <Icon.Trash size={20} />
          Xóa
        </Button>
      </DetailPage.Actions>
    </DetailPage.Wrap>
  )
}

const LeadImport = ({ onClose }: { onClose?: () => void }) => {
  // Implement the import functionality here
  return (
    <FormStyled.Wrap>
      <FormStyled.Title>
        <Icon.Upload size={24} />
        Nhập khách hàng
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
      {/* Add your import form or file upload component here */}
      <p>Chức năng nhập khách hàng sẽ được triển khai sau.</p>
    </FormStyled.Wrap>
  )
}
