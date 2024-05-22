import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";
import {
  Box,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  Grid,
} from "@mui/material";

const Form = () => {
  const [step, setStep] = useState(0);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [patName, setpatName] = useState("");
  const [docName, setdocName] = useState("");
  const [Age, setAge] = useState("");
  const [Weight, setWeight] = useState("");
  const [Height, setHeight] = useState("");
  const [Bp, setBp] = useState("");
  const [Temp, setTemp] = useState("");
  const [spo2, setspo2] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicine, setMedicine] = useState("");
  const [schedule, setSchedule] = useState("");
  const [total, setTotal] = useState("");
  const [tests, setTests] = useState("");
  const [otherInstructions, setOtherInstructions] = useState("");

  const startInteraction = () => {
    SpeechRecognition.startListening({ continuous: true });
    setpatName("");
    setdocName("");
    setAge("");
    setWeight("");
    setHeight("");
    setBp("");
    setTemp("");
    setspo2("");
    setSymptoms("");
    setMedicine("");
    setSchedule("");
    setTotal("");
    setTests("");
    setOtherInstructions("");
    resetTranscript();
    setStep(0);
  };

  const steps = [
    "Please Enter Patient's Name",
    "Please Doctor Name",
    "Enter Age of the patient",
    "enter patient Weight",
    "enter patient Height",
    "enter patient's Blood Pressure",
    "enter patient's Temperature",
    "Enter patient's SPO2 level?",
    "Enter the patient Symptoms",
    "Enter medicine Name",
    "Kindly provide the Schedule",
    "Total number of medicines",
    "is there any test available?",
    "Provide any other suggestions",
    "Ok, I Got it, Thanks",
  ];

  useEffect(() => {
    if (step < steps.length) {
      speak(steps[step]);
      startListening();
    }
  }, [step]);

  useEffect(() => {
    if (transcript && step < steps.length) {
      const timeout = setTimeout(() => {
        saveResponse();
      }, 1000); // 4 seconds of inactivity triggers saveResponse

      return () => clearTimeout(timeout); // Clear timeout on new input
    }
  }, [transcript]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const saveResponse = () => {
    if (step === 0) setpatName(transcript);
    if (step === 1) setdocName(transcript);
    if (step === 2) setAge(transcript);
    if (step === 3) setWeight(transcript);
    if (step === 4) setHeight(transcript);
    if (step === 5) setBp(transcript);
    if (step === 6) setTemp(transcript);
    if (step === 7) setspo2(transcript);
    if (step === 8) setSymptoms(transcript);
    if (step === 9) setMedicine(transcript);
    if (step === 10) setSchedule(transcript);
    if (step === 11) setTotal(transcript);
    if (step === 12) setTests(transcript);
    if (step === 13) setOtherInstructions(transcript);

    resetTranscript();
    SpeechRecognition.stopListening();
    setStep(step + 1);
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <button onClick={startInteraction}>Start Interaction</button>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box
            backgroundColor="#FEFFFF"
            sx={{
              margin: 3,
              padding: 3,
              height: "fit-content",
              minHeight: "115vh",
              paddingBottom: "4vh",
              paddingTop: "4vh",
              maxWidth: "140vh",
              border: 2,
              borderColor: "grey.500",
              borderRadius: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#f5f5f5" : "#0f0f0f",
            }}>
            <Box display="flex" sx={{ flexWrap: "wrap", width: "68vw" }}>
              <Box
                display="flex"
                alignItems="center"
                sx={{ flexFlow: "column" }}>
                <Box sx={{ alignSelf: "flex-start", marginLeft: "2vw" }}>
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    Patient Name:
                  </Typography>
                  <TextField
                    id="patient-name"
                    value={patName}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  marginLeft: "2vw",
                  marginBottom: "2vh",
                }}>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  Doctor Name:
                </Typography>
                <TextField
                  id="doctor-name"
                  value={docName}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  marginLeft: "2vw",
                  marginBottom: "2vh",
                }}>
                <Typography sx={{ fontSize: "0.8rem" }}>Age:</Typography>
                <TextField
                  id="age"
                  value={Age}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  marginLeft: "2vw",
                  marginBottom: "2vh",
                }}>
                <Typography sx={{ fontSize: "0.8rem" }}>Weight:</Typography>
                <TextField
                  id="weight"
                  value={Weight}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  marginLeft: "2vw",
                  marginBottom: "2vh",
                }}>
                <Typography sx={{ fontSize: "0.8rem" }}>Height:</Typography>
                <TextField
                  id="height"
                  value={Height}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  marginLeft: "2vw",
                  marginBottom: "2vh",
                }}>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  Systolic Blood Pressure:
                </Typography>
                <TextField
                  id="sbp"
                  value={Bp}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  marginLeft: "2vw",
                  marginBottom: "2vh",
                }}>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  Temperature:
                </Typography>
                <TextField
                  id="temperature"
                  value={Temp}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  marginLeft: "2vw",
                  marginBottom: "2vh",
                }}>
                <Typography sx={{ fontSize: "0.8rem" }}>SPO2:</Typography>
                <TextField id="spo2" value={spo2} fullWidth size="small" />
              </Box>
            </Box>
            <Box
              sx={{
                alignSelf: "flex-start",
                marginLeft: "2vw",
                marginBottom: "2vh",
              }}>
              <Typography sx={{ fontSize: "0.8rem" }}>
                Symptoms Summary:
              </Typography>
              <TextareaAutosize
                minRows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                style={{
                  width: "61vw",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid rgb(170, 170, 170)",
                }}
              />
            </Box>
            <Box sx={{ marginTop: "5vh", marginLeft: "2vw" }}>
              <Box style={{ width: "100%" }}>
                <Box
                  sx={{
                    paddingTop: "1vh",
                    width: "59vw",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "3vh",
                    border: "1px solid rgb(170, 170, 170)",
                  }}>
                  <Box
                    display="flex"
                    style={{
                      width: "100%",
                      marginBottom: "2vh",
                      justifyContent: "space-between",
                    }}>
                    <TextField
                      type="text"
                      onChange={(e) => setMedicine(e.target.value)}
                      value={medicine}
                      placeholder="Medicine Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                  <Box
                    display="flex"
                    style={{ width: "100%", justifyContent: "space-between" }}>
                    <TextareaAutosize
                      placeholder="Schedule for Medicine"
                      minRows={2}
                      style={{
                        borderRadius: "5px",
                        border: "1px solid rgb(170, 170, 170)",
                        padding: "8px",
                        width: "45%",
                      }}
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                    />

                    <TextField
                      type="text"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      placeholder="Total Number of Medicine"
                      variant="outlined"
                      size="small"
                      style={{
                        width: "45%",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                alignSelf: "flex-start",
                marginLeft: "2vw",
                marginBottom: "2vh",
              }}>
              <Typography sx={{ fontSize: "0.8rem" }}>Tests:</Typography>
              <TextareaAutosize
                minRows={3}
                value={tests}
                onChange={(e) => setTests(e.target.value)}
                placeholder="Tests"
                style={{
                  width: "61vw",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid rgb(170, 170, 170)",
                }}
              />
            </Box>
            <Box
              sx={{
                alignSelf: "flex-start",
                marginLeft: "2vw",
                marginBottom: "2vh",
              }}>
              <Typography sx={{ fontSize: "0.8rem" }}>
                Any Other Instructions:
              </Typography>
              <TextareaAutosize
                minRows={3}
                value={otherInstructions}
                onChange={(e) => setOtherInstructions(e.target.value)}
                placeholder="Any other instructions"
                style={{
                  width: "61vw",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid rgb(170, 170, 170)",
                }}
              />
            </Box>
            <Box display="flex" justifyContent="center" marginTop="2vh">
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box
            backgroundColor="#FEFFFF"
            sx={{
              height: "fit-content",
              minHeight: "115vh",
              paddingBottom: "4vh",
              paddingTop: "4vh",
              marginTop: 3,
              border: 2,
              borderColor: "grey.500",
              borderRadius: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#f5f5f5" : "#0f0f0f",
            }}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                alignItems: "center",
                justifyContent: "center",
              }}>
              Live Transcription:
            </Typography>
            <TextareaAutosize
              name="Live transcription"
              style={{
                margin: "2vw",
                minHeight: "3vw",
                borderRadius: "5px",
                border: "1px solid rgb(170, 170, 170)",
              }}>
              {transcript}
            </TextareaAutosize>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
