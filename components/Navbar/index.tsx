import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppBar } from "@mui/material";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import HeaderOptions from "@/@core/components/HeaderOptions";
import SafraLogo from "@/assets/logo/safra-logo-navbar.svg";
import IconNotification from "@/assets/svg/notifications-unread.svg";
import IconUser from "@/assets/svg/user.svg";
import TouchableOpacity from "../TouchableOpacity";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/@core/store";
import { clear } from "@/@core/utils/storege";
import {
  LiItem,
  LiText,
  MenuItem,
  SelectMenuItem,
  IconItemMenu,
  DropDownLi,
  DropDownContent,
  SubMenuItem,
  DropDownImg,
  ImgDiv,
  DropDownImgContent,
} from "./styles";
import {
  FeeManagementData,
  useFeeManagementStore,
} from "@/@core/store/feeManagementStore";
import scrollToTop from "@/@core/utils/scroolToTop";
import { useWithout } from "@/@core/store/withoutStore";
import WantToExitModal from "@/pages/app/feemanagement/components/Tab/components/newRequest/components/WantToExitModal";
import { useDocumentStore } from "@/@core/store/documents";

export const NavBar = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, setIsAuth } = useAuthStore((state) => state);
  const { withoutGlobal, setWithoutGlobal } = useWithout((state) => state);
  const [modal, setModal] = useState(false);
  const [url, setURL] = useState("");
  const { setDocumentList } = useDocumentStore((state) => state);
  const [isDropDownOpen, setIsDropDownOpen] = useState({
    maintanence: false,
    userSettings: false,
  });
  const dropDownContentRef = useRef(null);
  const dropDownImgContentRef = useRef(null);
  const {
    setFeeData,
    setNewFeeRequestId,
    setFeeApprovedData,
    setNewFeeRequest,
    setIsAprovalFlowDone,
    setIsNewRequestFlow,
  } = useFeeManagementStore((state) => state);

  const title =
    location.pathname === "/app/dashboard"
      ? "Dashboard"
      : location.pathname.includes("/app/feemanagement")
      ? "Fee Management"
      : location.pathname === "/app/impersonate"
      ? "Impersonate"
      : "";

  const handleResetNavigation = () => {
    setFeeData({} as FeeManagementData);
    setFeeApprovedData({} as FeeManagementData);
    setNewFeeRequest({} as FeeManagementData);
    setNewFeeRequestId("");
    setIsAprovalFlowDone(false);
    setIsNewRequestFlow(false);
    setWithoutGlobal(false);
    setDocumentList([]);
    scrollToTop();
  };

  const handleNotificationModal = (url: string) => {
    if (withoutGlobal) {
      setModal(true);
    } else if (url === "/login") {
      handleResetNavigation();
      clear("@conductor:token");
      setIsAuth(false);
    } else {
      navigate(url);
      handleResetNavigation();
    }
    setURL(url);
  };

  const handleApproveModal = () => {
    if (url === "/login") {
      handleResetNavigation();
      clear("@conductor:token");
      setIsAuth(false);
      setModal(false);
    } else {
      navigate(url);
      setModal(false);
      handleResetNavigation();
    }
  };

  const toggleDropDown = (dropDown: string) => {
    switch (dropDown) {
      case "maintanance":
        setIsDropDownOpen((prevParams) => ({
          ...prevParams,
          maintanence: prevParams.maintanence ? false : true,
        }));
        break;
      case "userSettings":
        setIsDropDownOpen((prevParams) => ({
          ...prevParams,
          userSettings: prevParams.userSettings ? false : true,
        }));
      default:
        break;
    }
  };

  const handelBlur = (event: any) => {
    if (
      dropDownContentRef &&
      dropDownContentRef.current &&
      !(dropDownContentRef.current as HTMLElement).contains(event.relatedTarget)
    ) {
      setIsDropDownOpen((prevParams) => ({
        ...prevParams,
        maintanence: false,
      }));
    }
    if (
      dropDownImgContentRef &&
      dropDownImgContentRef.current &&
      !(dropDownImgContentRef.current as HTMLElement).contains(
        event.relatedTarget
      )
    ) {
      setIsDropDownOpen((prevParams) => ({
        ...prevParams,
        userSettings: false,
      }));
    }
  };

  return (
    <div className="content-container">
      <AppBar
        style={{
          backgroundColor: "#1E2347",
          height: 60,
        }}
        elevation={0}
      >
        <Container style={{ display: "flex", paddingLeft: 11, maxWidth: 1860 }}>
          <Toolbar disableGutters>
            <TouchableOpacity onClick={() => navigate("/app/dashboard")}>
              <Image src={SafraLogo} width={40} height={40} alt="logo" />
            </TouchableOpacity>
          </Toolbar>
          {location.pathname !== "/login" ? (
            <MenuItem>
              <SelectMenuItem>
                <LiItem
                  onClick={() => {
                    handleNotificationModal("/app/dashboard");
                  }}
                  active={location.pathname === "/app/dashboard" ? true : false}
                >
                  <LiText>Dashboard</LiText>
                </LiItem>

                <DropDownLi aria-expanded={isDropDownOpen.maintanence}>
                  <LiItem
                    active={
                      location.pathname === "/app/feemanagement" ? true : false
                    }
                    onClick={() => toggleDropDown("maintanance")}
                    onBlur={handelBlur}
                  >
                    <LiText>Maintenance</LiText>
                  </LiItem>
                  <DropDownContent ref={dropDownContentRef} onBlur={handelBlur}>
                    <SubMenuItem
                      onClick={() => {
                        handleNotificationModal("/app/feemanagement");
                      }}
                    >
                      Fee Management
                    </SubMenuItem>
                  </DropDownContent>
                </DropDownLi>
              </SelectMenuItem>

              <IconItemMenu>
                {process.env.NEXT_PUBLIC_NODE_ENV !== "production" && (
                  <LiItem
                    style={{ marginRight: 40 }}
                    onClick={() => {
                      handleNotificationModal("/app/impersonate");
                    }}
                    active={location.pathname === "/app/impersonate"}
                  >
                    <LiText>Impersonate</LiText>
                  </LiItem>
                )}
                {/* 
                <TouchableOpacity style={{ marginRight: 35 }}>
                  <Image
                    src={IconNotification}
                    width={24}
                    height={24}
                    alt="Notification"
                  />
                </TouchableOpacity> */}
                <DropDownImg aria-expanded={isDropDownOpen.userSettings}>
                  <ImgDiv
                    onClick={() => toggleDropDown("userSettings")}
                    onBlur={handelBlur}
                  >
                    <Image src={IconUser} width={24} height={24} alt="User" />
                  </ImgDiv>
                  <DropDownImgContent
                    ref={dropDownImgContentRef}
                    onBlur={handelBlur}
                  >
                    <SubMenuItem>
                      {userData.userName ?? "User not found"}
                    </SubMenuItem>
                    <SubMenuItem
                      onClick={() => {
                        handleNotificationModal("/login");
                      }}
                    >
                      Log Out
                    </SubMenuItem>
                  </DropDownImgContent>
                </DropDownImg>
              </IconItemMenu>
            </MenuItem>
          ) : null}
          <WantToExitModal
            open={modal}
            onClose={() => setModal(false)}
            onNavigate={() => {
              handleApproveModal();
            }}
          />
        </Container>
      </AppBar>
      {location.pathname !== "/login" ? (
        <HeaderOptions routeTitle={title} />
      ) : null}
    </div>
  );
};
