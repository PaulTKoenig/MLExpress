import React from 'react';
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const Navbar: React.FC = () => {
    const { collapseSidebar } = useProSidebar();

    return (
        <div className='h-screen'>
            <Sidebar className="app">
                <Menu>
                    <MenuItem
                        component={<Link to="/" className="home" />}
                        className="menu1"
                        icon={
                            <MenuRoundedIcon
                                onClick={() => {
                                    collapseSidebar();
                                }}
                            />
                        }
                    >
                        <h2>MLEXPRESS</h2>
                    </MenuItem>
                    <MenuItem icon={<GridViewRoundedIcon />}> Home </MenuItem>
                    <MenuItem icon={<ReceiptRoundedIcon />}> Tutorial </MenuItem>
                    <SubMenu label="Create Model" icon={<BarChartRoundedIcon />}>
                        <SubMenu label="Upload Dataset" icon={<BarChartRoundedIcon />}>
                            <MenuItem icon={<TimelineRoundedIcon />}> Timeline Chart </MenuItem>
                            <MenuItem icon={<BubbleChartRoundedIcon />}>Bubble Chart</MenuItem>
                        </SubMenu>
                        <SubMenu label="Preprocessing" icon={<BarChartRoundedIcon />}>
                            <MenuItem icon={<TimelineRoundedIcon />}> Timeline Chart </MenuItem>
                            <MenuItem icon={<BubbleChartRoundedIcon />}>Bubble Chart</MenuItem>
                        </SubMenu>
                        <SubMenu label="Train Model" icon={<BarChartRoundedIcon />}>
                            <MenuItem icon={<TimelineRoundedIcon />}> Timeline Chart </MenuItem>
                            <MenuItem icon={<BubbleChartRoundedIcon />}>Bubble Chart</MenuItem>
                        </SubMenu>
                        <SubMenu label="View Results" icon={<BarChartRoundedIcon />}>
                            <MenuItem icon={<TimelineRoundedIcon />}> Timeline Chart </MenuItem>
                            <MenuItem icon={<BubbleChartRoundedIcon />}>Bubble Chart</MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <MenuItem icon={<LogoutRoundedIcon />}> About Us </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
};

export default Navbar;