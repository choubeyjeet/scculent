import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Pagination,
  InputGroup,
  Table,
  Input,
  Loader,
} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import VisibleIcon from "@rsuite/icons/Visible";
import { UserInfoModel } from "./UserInfoModal";
import { axiosInstance } from "../../../config/axiosInstance";

export const AllUserList = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [userID, setUserId] = React.useState(null);
  const [userListData, setUserListData] = React.useState([]);
  const [loading, setLoading] = useState(true);

  const { Column, HeaderCell, Cell } = Table;

  const data = userListData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const userInfo = (id) => {
    setOpen(!open);
    setUserId(id);
  };

  useEffect(() => {
    async function getUserDataList() {
      const response = await axiosInstance.get("/api/v1/fetchAllUser");
      setUserListData(response.data.users);
      console.log(response.data.users);
    }
    getUserDataList();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader center size="lg" content="" />
      ) : (
        <Container>
          <Row className="marginTop">
            <Col md={24}>
              <Row style={{ marginBottom: 15 }}>
                <Col md={14}></Col>
                <Col md={10}>
                  <InputGroup>
                    <Input placeholder="Search Users" />
                    <InputGroup.Button style={{ width: 70 }}>
                      <SearchIcon />
                    </InputGroup.Button>
                  </InputGroup>
                </Col>
              </Row>

              <Table autoHeight bordered cellBordered data={data}>
                <Column width={50} align="center" fixed>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column width={100}>
                  <HeaderCell>First Name</HeaderCell>
                  <Cell dataKey="firstname" />
                </Column>

                <Column width={100}>
                  <HeaderCell>Last Name</HeaderCell>
                  <Cell dataKey="lastname" />
                </Column>

                <Column width={200}>
                  <HeaderCell>City</HeaderCell>
                  <Cell dataKey="city" />
                </Column>
                <Column width={200}>
                  <HeaderCell>Email</HeaderCell>
                  <Cell dataKey="email" />
                </Column>

                <Column width={100} fixed="right">
                  <HeaderCell>...</HeaderCell>
                  <Cell>
                    {(data) => (
                      <>
                        <span
                          onClick={() => {
                            userInfo(data.id);
                          }}
                          className="addPointer"
                        >
                          View <VisibleIcon />
                        </span>
                      </>
                    )}
                  </Cell>
                </Column>
              </Table>
              <div style={{ padding: 20 }}>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="xs"
                  layout={["total", "-", "limit", "|", "pager", "skip"]}
                  total={userListData.length}
                  limitOptions={[10, 30, 50]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                  className="tableProductPagination"
                />
              </div>
            </Col>
          </Row>
          {open && (
            <UserInfoModel open={open} setOpen={setOpen} userID={userID} />
          )}
        </Container>
      )}
    </>
  );
};
