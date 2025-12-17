"use client"

import { useEffect, useState } from "react";
import styles from "../../../page.module.css";
import apiConfig from "@/services/api";
import { Card, Table,Modal } from "antd";
import {
    DeleteOutlined
} from "@ant-design/icons";
const{success,error}=Modal;


const HomeComponent = () => {

    const [getTableData, setTableData] = useState([])
    useEffect(() => {
        fetchTableData()
    }, [])

    const fetchTableData = async () => {
        const response = await apiConfig.get("/auth/getUserDetaisl");
        if (response.data && Array.isArray(response.data)) {
            setTableData(response.data)
        }
        else {
            setTableData(response.data)
        }
    }

    const columns = [

        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'First Name',
            dataIndex: 'userFirstName',
            key: 'userFirstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'userLastName',
            key: 'userLastName',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'User EmailId',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: 'Role',
            dataIndex: 'userRole',
            key: 'userRole',
        },
        {
            title: 'Phone Number',
            dataIndex: 'userPhone',
            key: 'userPhone',
        },
        {
            title: 'State',
            dataIndex: 'userState',
            key: 'userState',
        },
        {
            title: 'Gender',
            dataIndex: 'userGender',
            key: 'userGender',
        },
        {
            title: 'Delete',
            dataIndex: 'userUno',
            key: 'userUno',
            render: ((text, row) => {
                return (
                    <div>
                        <DeleteOutlined onClick={() => { handleDeleteClick(text, row) }} />
                    </div>
                )
            })
        },
    ]

    const handleDeleteClick = async (text, row) => {
        const response = await apiConfig.post("/auth/deleteUserData", {
            id: row.userUno
        })
        if (response.data?.intResult > 0) {
            success({
                title: 'Success',
                content: response.data?.stringResult,
                onOk: () => {
                    fetchTableData()
                },
            })
        }
        else {
            error({
                title: 'Error Occured',
                content: 'Operation UnSuccessful!',
                onOk: () => {
                    fetchTableData()
                },
            })
        }
    }

    return (
        <div className={`${styles.page} proj-backgroundColor`}>
            <Card title="User Details"   >
                <Table
                    dataSource={getTableData}
                    columns={columns}
                    rowKey="userId"
                />
            </Card>
        </div>
    )
}

export default HomeComponent;