/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// import { DatePicker } from 'antd';
import type { RangePickerProps } from "antd/es/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

import { SRangePicker } from "./styles";
import { useDashboardStore } from "@/@core/store";

dayjs.extend(customParseFormat);

// const { RangePicker } = DatePicker;

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current < dayjs().endOf("day");
};

export const DataPicker = () => {
  const { setCreatedOnDataPeriodFilter, createdOnDataPeriodFilter } =
    useDashboardStore((state) => state);

  useEffect(() => {
    console.log(createdOnDataPeriodFilter);
  }, [setCreatedOnDataPeriodFilter, createdOnDataPeriodFilter]);

  const normalizeDate = (date: dayjs.Dayjs[]) => {
    const start = date[0].format("YYYY-MM-DD");
    const end = date[1].format("YYYY-MM-DD");

    setCreatedOnDataPeriodFilter(`${start + " , " + end}`);
  };

  return (
    <SRangePicker
      onChange={(data) => {
        normalizeDate(data as dayjs.Dayjs[]);
      }}
      allowClear
      disabledDate={disabledDate}
    />
  );
};
