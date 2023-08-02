import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const authorWebsiteURL = "https://dylancarver9706.github.io/Dylan-Carver-Personal-Website/";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar disableGutters style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="/database-icon.png"
              alt="Logo"
              style={{ height: "50px", marginRight: "-20px" }}
            />
          </Link>
          &nbsp;
          <Container
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/wireframe-maker"
              sx={{
                my: 2,
                color: "black",
                backgroundColor: "transparent",
                display: "block",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "none",
                },
              }}
            >
              Wireframe Maker
            </Button>

            <Button
              component={Link}
              to="/how-to-use"
              sx={{
                my: 2,
                color: "black",
                backgroundColor: "transparent",
                display: "block",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "none",
                },
              }}
            >
              How To Use
            </Button>

            <Button
              component="a" // Use anchor tag for external link
              href={authorWebsiteURL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                my: 2,
                color: "black",
                backgroundColor: "transparent",
                display: "block",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "none",
                },
              }}
            >
              About the Author
            </Button>
          </Container>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
