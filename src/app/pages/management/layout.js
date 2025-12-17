"use client";

import React, { useState } from "react";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/navigation";
// import styles from "../../page.module.css";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const items = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Billing", "2", <DesktopOutlined />),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //     getItem("Team 1", "6"),
    //     getItem("Team 2", "8"),
    // ]),
    getItem("Details", "9", <FileOutlined />),
    getItem("Logout", "10", <UserOutlined />),
];

export default function MainLayout({ children }) {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(true);

    const handleMenuClick = ({ key }) => {
        switch (key) {
            case "dashboard":
                router.push("/dashboard");
                break;

            case "billing":
                router.push("/billing");
                break;

            case "details":
                router.push("/details");
                break;

            case "10":
                router.push("/pages/auth/login");
                break;

            default:
                break;
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <Menu theme="dark" mode="inline" items={items} onClick={handleMenuClick} />
            </Sider>

            <Layout>
                <div>
                    {children}
                </div>

                {/* <Footer style={{ textAlign: "center", padding: '10px' }}>
                    TWMH ©{new Date().getFullYear()} Created by Tech Wid Mohan
                </Footer> */}
            </Layout>
        </Layout>
    );
}
