import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import '../index.css'

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <MenuItem
        active={selected === title}
        style={{
          color: "black",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const MenuSidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const token = Cookies.get('token')
  const decoded = jwtDecode(token)
  const email = decoded['email']
  const firstName = decoded['firstName']
  const role = decoded['role']

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('session')
    window.location.href='/'
  };

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const hiddenPaths = ["/signup", "/", "/forgot_password", "/reset_password/:token", "/verify2FA"];
  const isHidden = hiddenPaths.includes(location.pathname);

  if (isHidden) {
    return null;
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `white !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        marginTop: "60px",
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "black",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="subtitle3" color="black">
                  PixEra
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="subtitle1"
                  color="black"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {firstName}
                </Typography>
                <Typography variant="subtitle2" color="black">
                  {email}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {role === 'Photographer' && (
              <Item
                title="Upload Photo"
                to={`/upload_photo`}
                icon={<UploadFileIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {/* Logout Button */}
          <Link to="/" style={{ textDecoration: "none", bottom: -100 }}>
            <MenuItem
              style={{
                color: "black",
                left: isCollapsed ? "10px" : "unset",
              }}
              onClick={handleLogout}
              icon={<ExitToAppOutlinedIcon />}
            >
              <Typography>Logout</Typography>
            </MenuItem>
          </Link>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MenuSidebar;
