import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect, useReducer, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbar/alertSnackbar";

import { Container, Box, TextField, Button } from "@mui/material";

import { useMessage } from "../../";

import PasswordInput from "../Reusables/PasswordInput/PasswordInput";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import PageTitle from "../Reusables/PageTitle/PageTitle";

import {
  RegisterState,
  RegisterActions,
  ActionType,
} from "../Register/registerTypes";

const registerReducer = (state: RegisterState, action: RegisterActions) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.Email:
      return {
        ...state,
        email: payload || "",
      };
    case ActionType.Login:
      return {
        ...state,
        login: payload || "",
      };
    case ActionType.Password:
      return {
        ...state,
        password: payload || "",
      };
    case ActionType.PasswordAgain:
      return {
        ...state,
        passwordAgain: payload || "",
      };
    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

function MainRegister() {
  const [registerData, registerDispatch] = useReducer(registerReducer, {
    email: "",
    login: "",
    password: "",
    passwordAgain: "",
  });

  const [error, setError] = useState<string | null>(); // later to be removed

  const navigate = useNavigate();

  const { message, setMessage } = useMessage(); // later to be removed

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  useEffect(() => {
    setMessage(undefined);
  }, [message, setMessage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/register", registerData)
      .then(() => {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "info",
            variant: "standard",
            title: "Informacja",
            content: "Rejestracja przebiegła pomyślnie",
          })
        );
        //console.log(message);
        navigate("/", { state: "Rejestracja przebiegła pomyślnie" });
      })
      .catch((error) => {
        //setError(error.response.data);
        alertSnackbarDataDispatch(
          setAlert({
            severity: "error",
            variant: "filled",
            title: "Błąd",
            content: error.response.data,
          })
        );
        console.log(error);
      });
  };

  const inputLength: number = 30;

  //(Probably) TODO: Add tooltips for information about input (how long what symbols are valid)

  return (
    <Container component="div">
      <Box component="main" className="main-register">
        <PageTitle title="Rejestracja"></PageTitle>
        <Box
          component="form"
          className="register-form"
          method="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            label="Adres Email"
            type="email"
            name="email"
            variant="standard"
            autoFocus={true}
            onChange={(e) =>
              registerDispatch({
                type: ActionType.Email,
                payload: e.target.value,
              })
            }
            autoComplete="email"
            inputProps={{
              maxLength: inputLength,
            }}
          ></TextField>
          <TextField
            label="Nazwa użytkownika"
            type="login"
            name="login"
            variant="standard"
            onChange={(e) =>
              registerDispatch({
                type: ActionType.Login,
                payload: e.target.value,
              })
            }
            autoComplete="username"
            inputProps={{
              maxLength: inputLength,
            }}
          ></TextField>
          <PasswordInput
            label="Hasło"
            name="password"
            inputLength={inputLength}
            autoComplete="new-password"
            inputDispatch={(e) =>
              registerDispatch({
                type: ActionType.Password,
                payload: e.target.value,
              })
            }
          ></PasswordInput>
          <PasswordInput
            label="Hasło ponownie"
            name="password-again"
            inputLength={inputLength}
            autoComplete="new-password"
            inputDispatch={(e) =>
              registerDispatch({
                type: ActionType.PasswordAgain,
                payload: e.target.value,
              })
            }
          ></PasswordInput>
          <Button
            type="submit"
            variant="contained"
            name="submit"
            value="Zaloguj"
            sx={{ margin: "1.5em .5em" }}
          >
            Zarejestruj
          </Button>
          <AlertSnackbar
            severity={alertSnackbarData.severity}
            variant={alertSnackbarData.variant}
            title={alertSnackbarData.title}
            content={alertSnackbarData.content}
          ></AlertSnackbar>
        </Box>
      </Box>
    </Container>
  );
}

export default MainRegister;
