'"use client"'

import { colors } from "@/store/theme"
import styled from "styled-components"

const Tooltip = ({
  children,
  content,
}: {
  children: React.ReactNode
  content: string
}) => {
  return (
    <Styled.Wrap>
      {children}
      <span className="content">{content}</span>
    </Styled.Wrap>
  )
}
export default Tooltip

const Styled = {
  Wrap: styled.div`
    display: content;
    position: relative;
    display: inline-block;
    cursor: pointer;
    &:hover .content {
      visibility: visible;
      opacity: 1;
    }
    .content {
      poitnt-events: none;
      visibility: hidden;
      width: 120px;
      background-color: ${colors.bgSecondary};
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 125%; /* Position above the tooltip */
      left: 50%;
      margin-left: -60px; /* Center the tooltip */
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 12px;
    }

    .content::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: ${colors.bgSecondary} transparent transparent transparent;
    }
  `,
}
