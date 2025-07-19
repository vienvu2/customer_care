"use client"
import { Styled, Row, Col } from "@/components/style"

const DashboardPage = () => {
  return (
    <Styled.Wrap>
      <Styled.Title>Theo Dõi Khách Hàng </Styled.Title>

      <Row>
        <Col span={6}>
          <Styled.Box>
            <h3>Tổng số khách đã chat trong tháng</h3>
            <div className="value">1.250</div>{" "}
            <div className="description">(Zalo, Viber, WhatsApp)</div>
          </Styled.Box>
        </Col>
        <Col span={6}>
          <Styled.Box>
            <h3>Tổng số tương tác khách cũ</h3>
            <div className="value">875</div>{" "}
            <div className="description">(Zalo, Viber, WhatsApp)</div>
          </Styled.Box>
        </Col>

        <Col span={6}>
          <Styled.Box>
            <h3>Tổng số người đã Follow Zalo OA</h3>
            <div className="value">3.400</div>{" "}
            <div className="description">Tính đến hiện tại</div>
          </Styled.Box>
        </Col>
        <Col span={6}>
          <Styled.Box>
            <h3>Tổng số chuyển đổi từ Lead sang Customer</h3>
            <div className="value">180</div>{" "}
            <div className="description">Trong tháng này</div>
          </Styled.Box>
        </Col>
        <Col span={6}>
          <Styled.Box>
            <h3>Tổng số khách đã tự Add Zalo</h3>
            <div className="value">520</div>{" "}
            <div className="description">Thông qua mã QR/Tìm kiếm</div>
          </Styled.Box>
        </Col>
        <Col span={6}>
          <Styled.Box>
            <h3>Tổng số khách đã chat Zalo qua UTM Source</h3>
            <div className="value">730</div>{" "}
            <div className="description">
              (Web, Facebook, Campaign tracking)
            </div>
          </Styled.Box>
        </Col>
      </Row>

      <div className="note">
        <strong>Lưu ý:</strong> Các số liệu trên Dashboard được tự động cập nhật
        và phân tích từ hệ thống. Bạn có thể xuất báo cáo chi tiết dưới dạng
        file PDF bất cứ lúc nào.
      </div>
    </Styled.Wrap>
  )
}

export default DashboardPage
