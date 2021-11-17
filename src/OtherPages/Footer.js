import Box from "@material-ui/core/Box";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Box
        // class="credits"
        style={{ fontStyle: "italic" }}
        sx={{
          height: "5vh",
          backgroundColor: "#11184c",
          color: "white",
          display: "flex",
          alignItems: "center",
          paddingLeft: "43vw",
        }}
      >
        All Rights Reserved
      </Box>
    </footer>
  );
};

export default Footer;
