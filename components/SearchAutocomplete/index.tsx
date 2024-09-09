import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import SearchIcon from "@/assets/svg/search-icon.svg";
import CloseCircleIcon from "@/assets/svg/close-circle-dark.svg";
import {
  SearchWrapper,
  SearchInput,
  SearchIconView,
  Button,
  DropdownStyle,
  DropdownItem,
  DropdownItemNoHover,
} from "./style";
import { useCustomerSearchStore } from "@/@core/store";
import { useOutsideClick } from "@/@core/hooks/useOutsideClick";
import { CIFCustomersList, CIFProvider } from "@/services/cifProvider";
import {
  FeeManagementData,
  useFeeManagementStore,
} from "@/@core/store/feeManagementStore";
import { useNavigate } from "react-router-dom";
import WantToExitModal from "@/pages/app/feemanagement/components/Tab/components/newRequest/components/WantToExitModal";
import { useWithout } from "@/@core/store/withoutStore";
import { useDocumentStore } from "@/@core/store/documents";

interface ISearch {
  placeholder?: string;
  onChange?: () => void;
  value?: string;
}

const SearchAutocomplete = ({ placeholder, value }: ISearch) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [modal, setModal] = useState(false);
  const { setDocumentList } = useDocumentStore((state) => state);
  const {
    feeData,
    setFeeData,
    setNewFeeRequestId,
    setIsAprovalFlowDone,
    setIsNewRequestFlow,
    setFeeApprovedData,
    setNewFeeRequest,
  } = useFeeManagementStore((state) => state);

  const { search, setSearch, cifList } = useCustomerSearchStore(
    (state) => state
  );

  const { withoutGlobal, setWithoutGlobal } = useWithout((state) => state);

  const { cifListSearch } = CIFProvider();

  const handleClickOutside = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleOnCIFSelected = (customer: CIFCustomersList) => {
    setTerm("");
    navigate("/app/feemanagement/" + customer.cif);
    setSearch(customer.value);
    setOpen(false);
  };

  const clearSearch = () => {
    setTerm("");
    setSearch("");
    setFeeData({} as FeeManagementData);
    setFeeApprovedData({} as FeeManagementData);
    setNewFeeRequest({} as FeeManagementData);
    setNewFeeRequestId("");
    setIsAprovalFlowDone(false);
    setIsNewRequestFlow(false);
    setWithoutGlobal(false);
    setModal(false);
    setDocumentList([])
  };

  const resetSearchPage = () => {
    if (withoutGlobal) {
      setModal(true);
      setType("Close");
    } else {
      clearSearch();
      navigate("/app/feemanagement");
      setType("");
    }
  };

  const onModalNavigate = () => {
    setModal(false);
    setWithoutGlobal(false);
    if (type === "Close") {
      clearSearch();
      navigate("/app/feemanagement");
    } else {
      cifListSearch(search).then(() => {
        if (cifList.length > 0) {
          handleOnCIFSelected(cifList[selectedPosition]);
        }
      });
    }
  };

  useEffect(() => {
    if (search === "") {
      setSearch(feeData?.data?.cif);
    }
  }, [feeData]);

  useEffect(() => {
    return () => {
      clearSearch();
    };
  }, []);

  useOutsideClick(ref, handleClickOutside);

  const handleKeyDownOnInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (event.key) {
      case "Enter":
        if (withoutGlobal) {
          setModal(true);
          setType("Enter");
        } else {
          cifListSearch(search).then(() => {
            if (cifList.length > 0) {
              handleOnCIFSelected(cifList[selectedPosition]);
            }
          });
        }

        break;
      case "ArrowUp":
        if (selectedPosition > 0) {
          event.preventDefault();
          setSelectedPosition(selectedPosition - 1);
        }
        break;
      case "ArrowDown":
        if (selectedPosition < cifList.length - 1) {
          setSelectedPosition(selectedPosition + 1);
        }
        break;
    }
  };

  useEffect(() => {
    if (search && search.length >= 3) {
      cifListSearch(search);
      setOpen(term !== "");
      setSelectedPosition(0);
    } else {
      setOpen(false);
    }
  }, [search, term]);

  return (
    <>
      <SearchWrapper>
        <SearchIconView>
          <Image src={SearchIcon} width={24} height={24} alt={"Search"} />
        </SearchIconView>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={search}
          autoComplete="on"
          onChange={(e) => {
            setSearch(e.target.value);
            setTerm(e.target.value);
          }}
          onKeyDown={handleKeyDownOnInput}
        />
        {search && search.length > 0 ? (
          <Button>
            <Tooltip
              arrow
              title="Clear"
              placement="top"
              onClick={() => resetSearchPage()}
            >
              <Image
                src={CloseCircleIcon}
                width={24}
                height={24}
                alt={"Close"}
              />
            </Tooltip>
          </Button>
        ) : (
          <></>
        )}

        <DropdownStyle isVisible={open} ref={ref}>
          {cifList.length > 0 ? (
            cifList.map((value, index) => (
              <div key={index}>
                <DropdownItem
                  onClick={() => {
                    handleOnCIFSelected(value);
                  }}
                  active={index === selectedPosition}
                  key={index}
                >
                  {value.value}
                </DropdownItem>
              </div>
            ))
          ) : (
            <div>
              <DropdownItemNoHover>CIF not found.</DropdownItemNoHover>
            </div>
          )}
        </DropdownStyle>
      </SearchWrapper>
      <WantToExitModal
        open={modal}
        onClose={() => setModal(false)}
        onNavigate={() => onModalNavigate()}
      />
    </>
  );
};

export default SearchAutocomplete;
