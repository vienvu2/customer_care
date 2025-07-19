import * as XLSX from 'xlsx'

export interface ExcelColumn {
    key: string
    label: string
    width?: number
}

export const useExcel = <T,> () => {
    // Export data to Excel
    const exportToExcel = (
        data: never[],
        columns: ExcelColumn[],
        filename: string = 'export.xlsx'
    ) => {
        try {
            // Tạo workbook
            const wb = XLSX.utils.book_new()

            // Chuẩn bị data với headers
            const headers = columns.map(col => col.label)
            const rows = data.map(item =>
                columns.map(col => (item)[col.key] || '')
            )

            // Tạo worksheet
            const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])

            // Set column widths
            const colWidths = columns.map(col => ({
                wch: col.width || 20
            }))
            ws['!cols'] = colWidths

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Data')

            // Download file
            XLSX.writeFile(wb, filename)

            return true
        } catch (error) {
            console.error('Export failed:', error)
            return false
        }
    }

    // Import Excel file
    const importFromExcel = async (
        file: File,
        columns: ExcelColumn[]
    ): Promise<T[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer)
                    const workbook = XLSX.read(data, { type: 'array' })

                    // Lấy sheet đầu tiên
                    const firstSheetName = workbook.SheetNames[0]
                    const worksheet = workbook.Sheets[firstSheetName]

                    // Convert to JSON
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1
                    }) as never[][]

                    if (jsonData.length === 0) {
                        resolve([])
                        return
                    }

                    // Lấy headers (row đầu tiên)
                    const headers = jsonData[0]

                    // Map headers với columns
                    const columnMap = new Map<number, string>()
                    headers.forEach((header, index) => {
                        const column = columns.find(col =>
                            col.label.toLowerCase() === (header + '').toLowerCase()
                        )
                        if (column) {
                            columnMap.set(index, column.key)
                        }
                    })

                    // Convert rows to objects
                    const result: T[] = []
                    for (let i = 1; i < jsonData.length; i++) {
                        const row = jsonData[i]
                        const obj: Record<string, string> = {}

                        columnMap.forEach((key, index) => {
                            obj[key] = row[index] || ''
                        })

                        // Chỉ thêm nếu có ít nhất 1 field không rỗng
                        if (Object.values(obj).some(val => val !== '')) {
                            result.push(obj as T)
                        }
                    }

                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            }

            reader.onerror = () => reject(new Error('File reading failed'))
            reader.readAsArrayBuffer(file)
        })
    }

    // Tạo template Excel
    const downloadTemplate = async (
        columns: ExcelColumn[],
        list: [] = [],
        filename: string = 'template.xlsx'
    ) => {
        const wb = XLSX.utils.book_new()

        // Tạo headers
        const headers = columns.map(col => col.label)
        const ws = XLSX.utils.aoa_to_sheet([headers])

        // Set column widths
        const colWidths = columns.map(col => ({
            wch: col.width || 20
        }))
        ws['!cols'] = colWidths

        // Nếu có dữ liệu mẫu, thêm vào worksheet
        if (list.length > 0) {
            const rows = list.map(item =>
                columns.map(col => (item as never)[col.key] || '')
            )
            XLSX.utils.sheet_add_aoa(ws, rows, { origin: -1 })
        }

        XLSX.utils.book_append_sheet(wb, ws, 'Template')
        XLSX.writeFile(wb, filename)
    }

    return {
        exportToExcel,
        importFromExcel,
        downloadTemplate
    }
}