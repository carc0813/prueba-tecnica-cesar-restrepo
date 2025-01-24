
import React from "react";
import { AppBar, Toolbar, Typography} from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Chatbot App
        </Typography>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
