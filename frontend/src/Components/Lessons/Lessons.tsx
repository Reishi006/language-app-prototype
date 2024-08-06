import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Container } from "@mui/material";

import Navbar from "../Reusables/Navbar/Navbar";
import Lesson from "./Lesson";
import Footer from "../Reusables/Footer/Footer";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";

import { useMessage } from "../..";

import "./Lessons.scss";
import PageTitle from "../Reusables/PageTitle/PageTitle";

interface LessonData {
  number: number;
  title: string;
  description: string;
  new_words: string[];
}

function Lessons() {
  const [lessons, setLessons] = useState<LessonData[]>([]);

  const [linkArray, setLinkArray] = useState<string[]>([
    "/about",
    "/profile",
    "/logout",
  ]);
  const optionsArray: string[] = ["O aplikacji", "Profil", "Wyloguj"];

  const footerLinkArray: string[] = ["/about", "/login", "/register"];
  const footerOptionsArray: string[] = [
    "O aplikacji",
    "Logowanie",
    "Rejestracja",
  ];

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const { message, setMessage } = useMessage();

  const navigate = useNavigate();

  const handleAuth = async () => {
    await axios
      .get("http://localhost:8000/lessons", { withCredentials: true })
      .then((res) => {
        //console.log(res.data);
        setLessons(res.data.result);
        setLinkArray(["/about", `/profile/${res.data.login}`, "/logout"]);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Sesja wygasła. Proszę zalogować się ponownie");
        navigate("/");
      });
  };

  useEffect(() => {
    handleAuth();
    if (message) setShowSnackbar(true);
  }, []);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setShowSnackbar(false);
  };

  const lessonStyle = {
    animation: `0.6s comeUpLeft ease-out 1`,
    animationDelay: "",
  }; //Adjust/Remove

  //TODO: Fix AlertSnackbar (not showing up)

  return (
    <>
      <Container component="div" className="wrapper">
        <Navbar link={linkArray} options={optionsArray}></Navbar>
        <Box className="lessons-wrapper">
          <PageTitle title="Wszystkie lekcje:"></PageTitle>
          {lessons.map((value: LessonData, index: number) => {
            return <Lesson key={index} lessonData={value}></Lesson>;
          })}
        </Box>
        <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
      </Container>
      <AlertSnackbar
        severity="info"
        variant="standard"
        title="Informacja"
        content={message}
        showSnackbar={showSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      ></AlertSnackbar>
    </>
  );
}
export default Lessons;
