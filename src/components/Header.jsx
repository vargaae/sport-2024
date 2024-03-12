import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import { ReactComponent, default as Logo } from "../assets/logo.svg";

function Header() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
          <img src={Logo} height={40} width={40} alt="Logo" />
          <Link to="/">
              <Typography
                variant="h6"
                className="title"
                style={{
                  display: "flex",
                  padding: 5,
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                  color: "gold",
                }}
              >
                SportDATA App
              </Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
