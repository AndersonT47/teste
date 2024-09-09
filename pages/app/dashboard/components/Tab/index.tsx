import React, { useEffect, useRef, useState } from "react";
import Badge from "@/@core/components/Badge";
import { Table } from "@/@core/components/Table";
import Animation from "@/@core/components/Animation";
import TitleTable from "@/@core/components/TitleTable";
import AdvancedSearch from "@/pages/app/dashboard/components/AdvancedSearch";
import {
  STab,
  STabs,
  STabList,
  STabPanel,
  DivAnimation,
  DivTable,
  ContainerText,
  Text,
} from "./styles";
import {
  useDashboardStore,
  IDashboardStore,
  useCustomerSearchStore,
  useAuthStore,
  DashboardRecord,
} from "@/@core/store/";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import animationData from "../../../../../assets/animation/bank-search.json";
import renewIcon from "../../../../../assets/svg/renew.svg";
import Image from "next/image";
import { DashboardProvider } from "@/services/dashboardProvider";
import { FeeManagenmetProvider } from "@/services/feeManagementProvider";
import { useNavigate } from "react-router-dom";
import { setTimeout } from "timers";
import MultipleSelect from "@/@core/components/MultipleSelect";
import { useLoadingStore } from "@/@core/store/loadingStore";
import scrollToTop from "@/@core/utils/scroolToTop";
import { tabNavigation } from "@/@core/utils/tabNavigation";

interface ITabs {
  AdvancedSearchTable?: boolean;
}

const Tabs: React.FC<ITabs> = ({ AdvancedSearchTable }: ITabs) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { myGroupTasksData, allRequestsData, tasksWithRequestData } =
    useDashboardStore((state: IDashboardStore) => state);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [currentTable, setCurrentTable] = useState<HTMLDivElement | null>(null);
  const firstTable = useRef<HTMLDivElement | null>(null);
  const secondTable = useRef<HTMLDivElement | null>(null);
  const thirdTable = useRef<HTMLDivElement | null>(null);
  const scrollbar = useRef<HTMLDivElement | null>(null);
  const { createdOnDataPeriodFilter } = useDashboardStore((state) => state);
  const { accountOfficers } = useCustomerSearchStore((state) => state);
  const [executed, setExecuted] = useState(false);
  const { getGroupTaskByUser, findGroupByUser, getAllRequestTab } =
    DashboardProvider();

  const { userData } = useAuthStore((state) => state);
  const [selectedItems, setSelectedItems] = useState(accountOfficers);
  const [filter, setFilter] = useState({
    UserOwner: userData.userName?.toLowerCase() ?? "",
    TypeRequest: "1",
    Status: "1",
    GroupTaskUsers: "", //accountOfficers.map((item) => item.userId).join(',')""
  });
  const navigate = useNavigate();

  const positionRef = useRef<number>(0);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const x = e.currentTarget.scrollLeft;
    if (x !== positionRef.current) {
      positionRef.current = x;
      if (currentTable) {
        currentTable.scrollLeft = x;
      }
    }
  };

  const filterByOffice = (event: Array<string>) => {
    localStorage.setItem("accountOfficeSelected", JSON.stringify(event));
    const users = accountOfficers.filter((item) =>
      event.includes(item.userName ?? "")
    );
    setFilter((prevParams) => ({
      ...prevParams,
      GroupTaskUsers: users.map((item: any) => item.userId).join(","),
    }));
  };

  useEffect(() => {
    if (executed) {
      const queryParams = new URLSearchParams(filter).toString();
      getGroupTaskByUser(queryParams);
    }
  }, [executed, filter]);

  useEffect(() => {
    if (
      activeTab === 0 ||
      (firstTable.current && firstTable.current.firstElementChild !== null)
    ) {
      getAllRequestTab();
      Promise.all([findGroupByUser()]).then((item: any) => {
        const userGroup = item[0].data.data.userGroup;
        let getAccountOfficeSelected = localStorage.getItem(
          "accountOfficeSelected"
        );
        if (!getAccountOfficeSelected) {
          localStorage.setItem(
            "accountOfficeSelected",
            JSON.stringify(
              userGroup
                .filter((item: any) =>
                  item.isPartOfGroup ? item.isPartOfGroup > 0 : false
                )
                .map((item: any) => item.userName)
            )
          );
          getAccountOfficeSelected = localStorage.getItem(
            "accountOfficeSelected"
          );
        }
        const users = userGroup.filter((item: any) =>
          getAccountOfficeSelected?.includes(item.userName ?? "")
        );
        setFilter((prevParams) => ({
          ...prevParams,
          GroupTaskUsers: users.map((item: any) => item.userId).join(","),
        }));
        setCurrentTable(
          firstTable.current?.firstElementChild!.firstElementChild!
            .firstElementChild!.firstElementChild!.firstElementChild!
            .firstElementChild as HTMLDivElement
        );
        setExecuted(true);
      });
    } else if (
      activeTab === 1 &&
      secondTable.current &&
      secondTable.current.firstElementChild !== null
    ) {
      setCurrentTable(
        secondTable.current!.firstElementChild!.firstElementChild!
          .firstElementChild!.firstElementChild!.firstElementChild!
          .firstElementChild as HTMLDivElement
      );

      getAllRequestTab();
    } else if (
      activeTab === 2 &&
      thirdTable.current &&
      thirdTable.current.firstElementChild !== null
    ) {
      setCurrentTable(
        thirdTable.current!.firstElementChild!.firstElementChild!
          .firstElementChild!.firstElementChild!.firstElementChild!
          .firstElementChild as HTMLDivElement
      );
    } else {
      setCurrentTable(null);
    }
    if (scrollbar.current !== null) {
      scrollbar.current.scrollLeft = 0;
    }
  }, [activeTab]);

  const handleRowPress = (
    event: React.MouseEvent,
    handleRowPressed: string
  ) => {
    if (handleRowPressed) {
      const route = "/app/feemanagement/" + handleRowPressed;
      if (event.ctrlKey) {
        window.open(route);
      } else {
        navigate(route);
        scrollToTop();
      }
    }
  };

  return (
    <>
      {currentTable !== null ? (
        <div
          onScroll={handleScroll}
          ref={scrollbar}
          style={{
            overflowX: "auto",
            top: "98.29%",
            position: "fixed",
            zIndex: 3,
            width: "100%",
            marginLeft: "-16px",
          }}
        >
          <div
            style={{
              width: currentTable?.firstElementChild!.clientWidth + 81,
              height: "1px",
            }}
          />
        </div>
      ) : (
        <div />
      )}
      <STabs
        selectedTabClassName="is-selected"
        selectedTabPanelClassName="is-selected"
        selectedIndex={activeTab}
        onSelect={(index) => setActiveTab(index)}
      >
        <STabList>
          <STab onClick={() => setActiveTab(0)} data-index={0}>
            My Pending Approvals
            {myGroupTasksData.data && (
              <Badge
                label={String(myGroupTasksData.data?.record?.length)}
                color="#CA303D"
              />
            )}
          </STab>
          <STab onClick={() => setActiveTab(1)} data-index={1}>
            All Requests
            {allRequestsData.data && (
              <Badge
                label={String(allRequestsData.data?.record?.length)}
                color="#CA303D"
              />
            )}
          </STab>
          <STab onClick={() => setActiveTab(2)} data-index={2}>
            Advanced Search
          </STab>
        </STabList>
        <STabPanel>
          <TitleTable
            label="My Pending Approvals"
            queryParams={new URLSearchParams(filter).toString()}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "16px 0px 30px 0px",
            }}
          >
            <Text>Account Officer(s)</Text>
            <div
              style={{
                zIndex: 3,
                width: 300,
                marginLeft: 8,
              }}
            >
              {executed && (
                <MultipleSelect
                  label=""
                  // value={AccountOfficers}
                  options={accountOfficers}
                  onChange={(e) => filterByOffice(e)}
                />
              )}
            </div>
          </div>
          {myGroupTasksData.data?.record?.length !== 0 &&
          accountOfficers?.length !== 0 ? (
            <div ref={firstTable}>
              <Table
                tableReference="MyGroupTasks"
                dataSource={myGroupTasksData?.data?.record}
                handleRowPress={(e: React.MouseEvent, rowItemPressed: string) =>
                  handleRowPress(e, rowItemPressed)
                }
              />
            </div>
          ) : (
            <ContainerText>
              <Text>There are no pending tasks at this moment.</Text>
            </ContainerText>
          )}
        </STabPanel>
        <STabPanel border name="AllRequests">
          <TitleTable label="All Requests" />
          {allRequestsData.data?.record?.length !== 0 ? (
            <div ref={secondTable}>
              <Table
                tableReference={"AllRequests"}
                dataSource={allRequestsData?.data?.record}
                handleRowPress={(e, rowItemPressed: string) =>
                  handleRowPress(e, rowItemPressed)
                }
              />
            </div>
          ) : (
            <ContainerText>
              <Text>There are no pending tasks at this moment.</Text>
            </ContainerText>
          )}
        </STabPanel>
        <STabPanel border name="AdvancedSearch">
          <AdvancedSearch />
        </STabPanel>
        {activeTab === 2 && (
          <div>
            {createdOnDataPeriodFilter === "" &&
            tasksWithRequestData.data?.record?.length == 0 ? (
              <DivAnimation>
                <Animation options={defaultOptions} width={250} height={200} />
                <Text style={{ marginTop: 24 }}>No Records found.</Text>
              </DivAnimation>
            ) : (
              <>
                <DivTable>
                  <Text>
                    We have found{" "}
                    <b>{tasksWithRequestData.data?.record?.length} items.</b>
                  </Text>
                  <TouchableOpacity>
                    <Image src={renewIcon} width={24} height={24} alt="logo" />
                  </TouchableOpacity>
                </DivTable>
                <div ref={thirdTable}>
                  <Table
                    tableReference={"AdvancedSearch"}
                    dataSource={tasksWithRequestData?.data?.record}
                    handleRowPress={(e, rowItemPressed: string) =>
                      handleRowPress(e, rowItemPressed)
                    }
                  />
                </div>
              </>
            )}
          </div>
        )}
      </STabs>
    </>
  );
};

export default Tabs;
