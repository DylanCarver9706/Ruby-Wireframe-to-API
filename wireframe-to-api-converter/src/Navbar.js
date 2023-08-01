import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const pages = ["Wireframe Maker", "How To Use", "Buy Me a Coffee"];

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
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.replace(/\s+/g, "-").toLowerCase()}`}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Container>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
