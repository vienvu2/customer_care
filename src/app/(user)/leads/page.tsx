"use client"
import { Button } from "@/atom/button"
import { Input } from "@/atom/input"
import Tooltip from "@/atom/tooltip"
import { FormData, RowInput } from "@/components/form"
import { Modal } from "@/components/modal"
import { Paging } from "@/components/paging"
import { Flex, FormStyled, DetailPage } from "@/components/style"
import { Table } from "@/components/table"
import { ListPage } from "@/containers/wrap"
import useCreate from "@/hook/create"
import { useExcel } from "@/hook/exel"
import useList from "@/hook/list"
import { colors } from "@/store/theme"
import { Interaction, Lead } from "@prisma/client"
import * as Icon from "lucide-react"
import { Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const LeadPage = () => {
  const {
    list,
    fetch,
    page,
    total,
    limit,
    setPage,
    setLimit,
    setSearch,
    search,
  } = useList<Lead>("leads")

  const [leadDetail, setDetail] = useState<Lead | undefined>()
  const [mode, setMode] = useState<
    "" | "view" | "create" | "import" | "activity"
  >("")

  const [s, setS] = useState("")

  const [idDelete, setIdDelete] = useState<number | null>(null)

  const renderDetail = () => {
    if (mode == "activity") {
      return (
        <ActivityForm
          lead={leadDetail}
          onClose={() => {
            setMode("")
            fetch() // Refresh the list after creating a new activity
          }}
        />
      )
    }
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
            setDetail(undefined)
            setMode("")
          }}
          onDelete={(id) => {
            setIdDelete(id)
          }}
          onEdit={(lead) => {
            setDetail(lead)
            setMode("create")
          }}
        />
      )
    }
    return null
  }
  return (
    <ListPage
      actions={[
        <Input
          key="search"
          placeholder="Tìm kiếm khách hàng, hoạt động, trạng thái ..."
          onChange={(e) => {
            setS(e.target.value)
          }}
          autoFocus={true}
          value={s}
          onEnter={() => {
            console.log("Search on enter:", s)
            setSearch(s.trim()) // Trim whitespace
          }}
        />,
        <Button
          key="add-lead"
          type="primary"
          onClick={() => {
            setMode("create")
            setDetail(undefined) // Clear detail when creating new lead
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
                <Tooltip content="Xem chi tiết khách hàng">
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      setMode("view")
                      setDetail(lead)
                    }}
                  >
                    <Icon.Eye size={14} />
                  </Button>
                </Tooltip>
                <Tooltip content="Thêm hành động">
                  <Button
                    type="success"
                    size="small"
                    onClick={() => {
                      setMode("activity")
                      setDetail(lead)
                    }}
                  >
                    <Icon.Plus size={14} />
                  </Button>
                </Tooltip>

                <Button
                  type="danger"
                  size="small"
                  onClick={() => {
                    setIdDelete(lead.id)
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
      <Paging
        total={total}
        pageSize={limit} // Adjust as needed
        currentPage={page} // Implement pagination logic if needed
        onPageChange={(page) => {
          setPage(page)
        }}
      />
      <Modal
        isOpen={!!idDelete}
        onClose={() => {
          setIdDelete(null)
        }}
        width={200}
        title={"Xác nhận xóa khách hàng"}
        actions={[
          <Button
            key="confirm-delete"
            type="danger"
            onClick={() => {
              if (idDelete) {
                // Call delete user service
                console.log("Delete user with ID:", idDelete)
              }
              setIdDelete(null)
            }}
          >
            Xóa
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
      </Modal>
    </ListPage>
  )
}

export default LeadPage

const ActivityForm = ({
  onClose,
  data,
  lead,
}: {
  onClose?: () => void
  data?: Interaction
  lead?: Lead
}) => {
  const { register, handleSubmit, setValue, reset } =
    useForm<Partial<Interaction>>()

  const inputs: RowInput<Interaction>[] = [
    {
      name: "interactionType",
      label: "Loại hoạt động",
      type: "select",
      placeholder: "Chọn loại hoạt động",
      options: [
        { value: "call", label: "Cuộc gọi" },
        { value: "email", label: "Email" },
        { value: "meeting", label: "Cuộc họp" },
        { value: "note", label: "Ghi chú" },
      ],
      required: true,
    },
    {
      name: "createdAt",
      label: "Ngày hoạt động",
      type: "date",
      placeholder: "Chọn ngày hoạt động",
      required: true,
    },
    {
      name: "content",
      label: "Chi tiết hoạt động",
      type: "textarea",
      placeholder: "Nhập chi tiết hoạt động",
      required: true,
    },
  ]

  const { create } = useCreate<Interaction>("interactions")

  const onSubmit = (data: Partial<Interaction>) => {
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
        <Icon.Activity size={24} />
        Thông tin hoạt động cho khách hàng {lead?.fullName || "mới"}
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
      <FormData<Interaction> inputs={inputs} register={register} />
      <Button block={true} type="primary" onClick={() => runSubmit()}>
        Lưu thông tin hoạt động
      </Button>
    </FormStyled.Wrap>
  )
}

const LeadForm = ({ onClose, data }: { onClose?: () => void; data?: Lead }) => {
  const { register, handleSubmit, setValue, reset } = useForm<Partial<Lead>>()

  useEffect(() => {
    if (data) {
      console.log("Setting form data:", data)
      Object.keys(data).forEach((key) => {
        setValue(key as keyof Lead, data[key as keyof Lead] || "")
      })
    } else {
      console.log("No data provided for form")
      reset() // Reset form if no data is provided
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

const LeadDetail = ({
  lead,
  onClose,
  onDelete,
  onEdit,
}: {
  lead: Lead
  onClose: () => void
  onDelete?: (leadId: number) => void
  onEdit?: (lead: Lead) => void
}) => {
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
            onEdit && onEdit(lead)
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
            onDelete && onDelete(lead.id)
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
  const { downloadTemplate, importFromExcel } = useExcel<Partial<Lead>>()
  const { createMany } = useCreate<Partial<Lead>>("leads")
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
      <Button
        block={true}
        type="secondary"
        onClick={() => {
          const sampleData: Partial<Lead>[] = []
          for (let i = 1000; i < 3000; i++) {
            sampleData.push({
              fullName: `Nguyễn Văn A ${i + 1}`,
              email: `nguyenvana-${i + 1}` + "@example.com",
              phoneNumber: `012345678${i}`,
              source: "website",
              zaloId: `zalo-id-${i + 1}`,
              viberId: `viber-id-${i + 1}`,
              whatsappId: `whatsapp-id-${i + 1}`,
              notes: `Ghi chú mẫu ${i + 1}`,
            })
          }
          downloadTemplate(
            [
              { key: "fullName", label: "Họ và tên", width: 30 },
              { key: "email", label: "Email", width: 30 },
              { key: "phoneNumber", label: "Số điện thoại", width: 20 },
              { key: "source", label: "Nguồn khách hàng", width: 20 },
              { key: "zaloId", label: "Zalo ID (nếu có)", width: 20 },
              { key: "viberId", label: "Viber ID (nếu có)", width: 20 },
              { key: "whatsappId", label: "WhatsApp ID (nếu có)", width: 20 },
              { key: "notes", label: "Ghi chú", width: 50 },
            ],
            sampleData as [],
            "leads_template.xlsx"
          )
          console.log("Download template")
        }}
      >
        <Icon.Download size={20} />
        Tải mẫu nhập
      </Button>
      <div style={{ padding: 120 }}>
        <input type="file" accept=".csv, .xlsx" />
      </div>

      <Button
        block={true}
        type="primary"
        onClick={() => {
          // Handle import logic here
          const fileInput = document.querySelector(
            'input[type="file"]'
          ) as HTMLInputElement
          if (!fileInput.files || fileInput.files.length === 0) {
            toast("Vui lòng chọn tệp để nhập", {
              type: "warning",
              autoClose: 5000,
            })
            return
          }
          const file = fileInput.files[0]
          importFromExcel(file, [
            { key: "fullName", label: "Họ và tên", width: 30 },
            { key: "email", label: "Email", width: 30 },
            { key: "phoneNumber", label: "Số điện thoại", width: 20 },
            { key: "source", label: "Nguồn khách hàng", width: 20 },
            { key: "zaloId", label: "Zalo ID (nếu có)", width: 20 },
            { key: "viberId", label: "Viber ID (nếu có)", width: 20 },
            { key: "whatsappId", label: "WhatsApp ID (nếu có)", width: 20 },
            { key: "notes", label: "Ghi chú", width: 50 },
          ]).then(
            (data) => {
              console.log("Imported data:", data)
              createMany(data, () => {
                toast("Nhập dữ liệu thành công", {
                  type: "success",
                  autoClose: 5000,
                })
                if (onClose) onClose()

                console.log("Leads imported successfully")
              })
            },
            (error) => {
              console.error("Error importing data:", error)
              toast("Lỗi khi nhập dữ liệu", {
                type: "error",
                autoClose: 5000,
              })
            }
          )
        }}
      >
        Nhập dữ liệu
      </Button>
    </FormStyled.Wrap>
  )
}
