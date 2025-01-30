import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../../component/Header";
import AdminAbout from "./AdminAbout";
import AdminContact from "./AdminContact";
import AdminCourse from "./AdminCourse";
import AdminEperience from "./AdminEperience";
import AdminIntro from "./AdminIntro";
import AdminProject from "./AdminProject";

const { TabPane } = Tabs;

function Admin() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind (640px)
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!localStorage.getItem("token")) {
    window.location.href = "/admin-login";
  }

  const tabItems = [
    { key: "1", label: "Intro", component: <AdminIntro /> },
    { key: "2", label: "About", component: <AdminAbout /> },
    { key: "3", label: "Experience", component: <AdminEperience /> },
    { key: "4", label: "Project", component: <AdminProject /> },
    { key: "5", label: "Course", component: <AdminCourse /> },
    { key: "6", label: "Contact", component: <AdminContact /> },
  ];

  const menu = (
    <Menu
      onClick={({ key }) => setActiveTab(key)}
      items={tabItems.map(({ key, label }) => ({ key, label }))}
    />
  );

  return (
    <div>
      <Header />
      <div className="flex justify-between items-center p-2">
        <h1 className="text-center text-4xl font-bold mt-5">Admin Panel</h1>

        {/* Attractive Logout Button */}
        <Button
          type="primary"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin-login";
          }}
        >
          <LogoutOutlined />
          Logout
        </Button>
      </div>

      <div className="p-5">
        {isMobile ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<MenuOutlined />}>Menu</Button>
          </Dropdown>
        ) : (
          <Tabs
            defaultActiveKey="1"
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
          >
            {tabItems.map(({ key, label, component }) => (
              <TabPane tab={label} key={key}>
                {component}
              </TabPane>
            ))}
          </Tabs>
        )}

        {/* Render the active tab component separately for mobile */}
        {isMobile &&
          tabItems.find((tab) => tab.key === activeTab)?.component}
      </div>
    </div>
  );
}

export default Admin;
