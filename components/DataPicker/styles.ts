import styled from "styled-components";
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface IRangePickerParams { }

export const SRangePicker = styled(RangePicker)`
  width: 100%;
  height: 40px;
  border: 1px solid #8A8C98;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  //barra que mostra qual caixa esta selecionada
  .ant-picker-active-bar{
    background-color: transparent;
  }
  // icone do datapicker
  .ant-picker-suffix{
    color: #8A8C98;
  }
  :hover{
    border: 1px solid #1C77CF;
  }
`;
