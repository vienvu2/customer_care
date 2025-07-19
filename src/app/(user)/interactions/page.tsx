"use client"
import { Table } from "@/components/table"
import { Layout, ListPage } from "@/containers/wrap"
import { Interaction, Lead } from "@prisma/client"

const InteractionPage = () => {
  return (
    <ListPage>
      <Table<Interaction>
        list={[]}
        columns={[
          {
            key: "interactionType",
            label: "Loại tương tác",
            width: "150px",
            align: "left",
            render: (c) => c.interactionType,
          },

          {
            key: "leadName",
            label: "Tên Khách hàng",
            width: "200px",
            align: "left",
            render: (c) => {
              // Assuming you have a way to fetch lead details by ID
              return "Không xác định"
            },
          },
          {
            key: "channel",
            label: "Kênh",
            width: "200px",
            align: "left",
            render: (c) => c.channel,
          },
          {
            key: "content",
            label: "Nội dung",
            width: "300px",
            align: "left",
            render: (c) => c.content,
          },
          {
            key: "createdAt",
            label: "Ngày tạo",
            width: "200px",
            align: "left",
            render: (c) => new Date(c.createdAt).toLocaleString(),
          },
        ]}
      />
    </ListPage>
  )
}

export default InteractionPage
