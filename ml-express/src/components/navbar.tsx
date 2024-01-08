import React from 'react';
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AssistWalker from "@mui/icons-material/AssistWalker";
import Info from "@mui/icons-material/Info";
import Cottage from "@mui/icons-material/Cottage";
import PlayCircle from "@mui/icons-material/PlayCircle";
import ModelTraining from "@mui/icons-material/ModelTraining";
import Preview from "@mui/icons-material/Preview";
import UploadFile from "@mui/icons-material/UploadFile";
import AutoFixHigh from "@mui/icons-material/AutoFixHigh";

const Navbar: React.FC = () => {
    const { collapseSidebar } = useProSidebar();

    return (
        <div className="min-h-screen flex">
            <Sidebar className="">
                <Menu>
                    <MenuItem
                        className="menu1"
                        icon={
                            <MenuRoundedIcon
                                onClick={() => {
                                    collapseSidebar();
                                }}
                            />
                        }
                    >
                        <h2><strong>MLEXPRESS</strong></h2>
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/" />}
                        icon={<Cottage />}
                    >
                        Home
                    </MenuItem>
                    <MenuItem icon={<AssistWalker />}> Tutorial </MenuItem>
                    <SubMenu label="Create Model" icon={<ModelTraining />}>
                        <SubMenu label="Upload Dataset" icon={<UploadFile />}>
                            <MenuItem
                                component={<Link to="/create-model/upload-dataset/import-file" />}
                            >
                                Import File
                            </MenuItem>
                            <MenuItem
                                component={<Link to="/create-model/upload-dataset/preprocessing" />}
                            >
                                View Full Dataset
                            </MenuItem>
                        </SubMenu>
                        <SubMenu label="Data Exploration" icon={<AutoFixHigh />}>
                            <MenuItem
                                component={<Link to="/create-model/data-exploration/handle-duplicates" />}
                            >
                                Handle Duplicates
                            </MenuItem>
                            <MenuItem
                                component={<Link to="/" />}
                            >
                                Handle Outliers
                            </MenuItem>
                            <MenuItem
                                component={<Link to="/" />}
                            >
                                Handle Qualitive Data
                            </MenuItem>
                            <MenuItem
                                component={<Link to="/" />}
                            >
                                Transform Features
                            </MenuItem>
                            <MenuItem
                                component={<Link to="/create-model/data-exploration/explore-relationships" />}
                            >
                                Explore Relationships
                            </MenuItem>
                        </SubMenu>
                        <SubMenu label="Train Model" icon={<PlayCircle />}>
                            <MenuItem> Select Features </MenuItem>
                            <MenuItem> Feature Engineering </MenuItem>
                            <MenuItem> Choose Model </MenuItem>
                            <MenuItem> Train </MenuItem>
                        </SubMenu>
                        <SubMenu label="View Results" icon={<Preview />}>
                            <MenuItem> View </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <MenuItem icon={<Info />}> About Us </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
};

export default Navbar;