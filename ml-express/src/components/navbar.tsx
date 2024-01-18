import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
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
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";

const Navbar: React.FC = () => {
    const { collapseSidebar } = useProSidebar();
    const location = useLocation();

    const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], data: [], predictedFeature: "", columnsToPredict: [] });

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

	useEffect(() => {
		setUploadedData(selectedUploadedDatas);
	}, [selectedUploadedDatas]);

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
                        style={{ backgroundColor: location.pathname === "/" ? '#D3ECF3' : '' }}
                        icon={<Cottage />}
                    >
                        Home
                    </MenuItem>
                    <MenuItem icon={<AssistWalker />}> Tutorial </MenuItem>
                    <SubMenu label="Create Model" icon={<ModelTraining />}>
                        <MenuItem
                            component={<Link to="/create-model/upload-dataset" />}
                            style={{ backgroundColor: location.pathname === "/create-model/upload-dataset" ? '#D3ECF3' : '' }}
                            icon={<UploadFile />}
                        >
                            Upload Dataset
                        </MenuItem>
                        <MenuItem
                            component={<Link to="/create-model/data-exploration" />}
                            style={{ backgroundColor: location.pathname === "/create-model/data-exploration" ? '#D3ECF3' : '' }}
                            icon={<AutoFixHigh />}
                            disabled={uploadedData.data.length === 0}
                        >
                            Data Exploration
                        </MenuItem>
                        <MenuItem
                            component={<Link to="/create-model/train-model" />}
                            style={{ backgroundColor: location.pathname === "/create-model/train-model" ? '#D3ECF3' : '' }}
                            icon={<PlayCircle />}
                            disabled={uploadedData.data.length === 0}
                        >
                            Train Model
                        </MenuItem>
                        <MenuItem
                            component={<Link to="" />}
                            style={{ backgroundColor: location.pathname === "" ? '#D3ECF3' : '' }}
                            icon={<Preview />}
                        >
                            View Results
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<Info />}> About Us </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
};

export default Navbar;