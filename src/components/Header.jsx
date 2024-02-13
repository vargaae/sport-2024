import { redirect } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

function Header() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  function handleClick() {
    redirect("/");
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => redirect(`/`)}
              variant="h6"
              className="title"
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
                color: "gold",
              }}
            >
              Football App
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
