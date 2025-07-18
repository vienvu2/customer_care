'use client'
import { Table } from "@/components/table"
import { Layout } from "@/components/wrap"
import { Lead } from "@prisma/client"

const LeadPage = () => {
  return (
    <div>
      <Table<Lead>
        list={[]}
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
    </div>
  )
}

export default LeadPage
