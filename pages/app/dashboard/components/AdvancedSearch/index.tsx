import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import Select from "@/@core/components/Select";
import TextField from "@/@core/components/TextField";
import { DatePicker } from "@/@core/components/DatePicker";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import Info from "@/assets/svg/info.svg";
import { SText, ButtonText, Wrapper, Flex, Container } from "./styles";
import { useAuthStore, useDashboardStore } from "@/@core/store";
import { SelectStatus } from "@/@core/mock/statusOptions";
import { SelectTasks } from "@/@core/mock/tasksOptions";
import { DashboardProvider } from "@/services/dashboardProvider";
import dayjs from "dayjs";

export default function AdvancedSearch() {
  const {
    setTaskDropdown,
    taskDropdown,
    setStatusAdvantageSearch,
    statusAdvantageSearch,
  } = useDashboardStore((state) => state);

  const { getDashboardWithParams } = DashboardProvider();
  const { userData } = useAuthStore((state) => state);
  const filterCleared = {
    UserOwner: userData.userName?.toLowerCase() ?? "",
    AccountOfficer: "",
    CreatedBy: "",
    ReferenceNumber: "",
    CIF: "",
    ClientName: "",
    Application: "",
    Status: "",
    StartDate: dayjs().subtract(15, "day").format("YYYY-MM-DD").toString(),
    FinishDate: dayjs().format("YYYY-MM-DD").toString(),
    TypeRequest: "3",
  };
  const [filter, setFilter] = useState(filterCleared);

  useEffect(() => {
    const queryParams = new URLSearchParams(filter).toString();
    getDashboardWithParams(queryParams);
  }, [
    setTaskDropdown,
    taskDropdown,
    setStatusAdvantageSearch,
    statusAdvantageSearch,
    filter,
    setFilter,
    getDashboardWithParams,
  ]);

  return (
    <Wrapper>
      <Container>
        <Flex>
          <Flex>
            <SText>Reference #</SText>
            <TextField
              value={filter.ReferenceNumber}
              onChange={(e) =>
                setFilter((prevParams) => ({
                  ...prevParams,
                  ReferenceNumber: e,
                }))
              }
            />
          </Flex>
          <Flex ml={10}>
            <SText>CIF</SText>
            <TextField
              value={filter.CIF}
              onChange={(e) =>
                setFilter((prevParams) => ({ ...prevParams, CIF: e }))
              }
            />
          </Flex>
        </Flex>
        <Flex>
          <Flex mr={10} ml={10}>
            <SText>Client Name</SText>
            <TextField
              value={filter.ClientName}
              onChange={(e) =>
                setFilter((prevParams) => ({ ...prevParams, ClientName: e }))
              }
            />
          </Flex>
        </Flex>
        <Flex>
          <Flex mr={10} ml={10}>
            <SText>Task</SText>
            <Select
              index={0}
              value={
                SelectTasks.find((task) => task._id === filter.Application)
                  ?.value
              }
              options={SelectTasks}
              onChange={(e) =>
                setFilter((prevParams) => ({
                  ...prevParams,
                  Application: e._id,
                }))
              }
            />
          </Flex>
        </Flex>
        <Flex>
          <Flex>
            <SText>Status</SText>
            <Select
              index={0}
              value={
                SelectStatus.find((task) => task._id === filter.Status)?.value
              }
              options={SelectStatus}
              onChange={(e) =>
                setFilter((prevParams) => ({ ...prevParams, Status: e._id }))
              }
            />
          </Flex>
        </Flex>
      </Container>
      <Container>
        <Flex>
          <Flex>
            <SText>Created By</SText>
            <TextField
              value={filter.CreatedBy}
              onChange={(e) =>
                setFilter((prevParams) => ({ ...prevParams, CreatedBy: e }))
              }
            />
          </Flex>
        </Flex>
        <Flex>
          <Flex mr={10} ml={10}>
            <SText>
              Account Officer
              <Tooltip arrow title="Enter Name or ID" placement="top">
                <Image
                  src={Info}
                  width={20}
                  height={20}
                  alt="info"
                  style={{ marginLeft: 5 }}
                />
              </Tooltip>
            </SText>
            <TextField
              value={filter.AccountOfficer}
              onChange={(e) =>
                setFilter((prevParams) => ({
                  ...prevParams,
                  AccountOfficer: e,
                }))
              }
            />
          </Flex>
        </Flex>
        <Flex>
          <Flex mr={10} ml={10}>
            <SText>Created On</SText>
            <DatePicker
              value={
                filter.StartDate && filter.FinishDate
                  ? [dayjs(filter.StartDate), dayjs(filter.FinishDate)]
                  : [dayjs(), dayjs()]
              }
              onChange={(date) =>
                setFilter((prevParams) => ({
                  ...prevParams,
                  StartDate:
                    date && date.length ? date[0]?.format("YYYY-MM-DD") : "",
                  FinishDate:
                    date && date.length ? date[1]?.format("YYYY-MM-DD") : "",
                }))
              }
            />
          </Flex>
        </Flex>
        <Flex>
          <Flex>
            <TouchableOpacity
              onClick={() => {
                setFilter(filterCleared);
              }}
            >
              <ButtonText>Clear All</ButtonText>
            </TouchableOpacity>
          </Flex>
        </Flex>
      </Container>
    </Wrapper>
  );
}
