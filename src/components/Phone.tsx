import { useState } from 'react'
import useMediaQuery from "../hooks/useMediaQuery";
import Split from "./Split"
import Submit from "./Submit"
import { Box } from '@mui/material';

function Phone() {
  const [screen, setScreen] = useState(0);
  const [rate, setRate] = useState(0.113); // ABS mean weekly ordinary-time earnings, May 2026
  const isDesktop = useMediaQuery('(min-aspect-ratio: 2/3)');

  const fetchRate = () => {
    // TODO: Fetch the latest rate from the ABS Gender Indicators source.
    // const currentRate = ...;
    // setRate(currentRate);
  }

  const styles = {
    casing: (isDesktop: boolean) => ({
      width: isDesktop ? "350px" : "100%",
      height: isDesktop ? "min(723px, max(520px, calc(100dvh - 160px)))" : "100%",
      borderRadius: isDesktop ? "50px" : "0",
      marginBottom: isDesktop ? "1em" : "0",
      backgroundColor: isDesktop ? "black" : "none",
      display: "flex",
      justifyContent: "center"
    }),
    screen: (isDesktop: boolean, hidden: boolean) => ({
      display: hidden ? "none" : "flex",
      width: isDesktop ? "320px" : "100%",
      height: isDesktop ? "calc(100% - 30px)" : "100%",
      boxSizing: "border-box",
      paddingBottom: isDesktop ? "0" : "1em",
      borderRadius: isDesktop ? "38px" : "0",
      backgroundColor: "antiquewhite",
      color: "black"
    })
  }

  return (
    <Box className="casing centered" sx={styles.casing(isDesktop)}>
      <Box className="screen centered" sx={styles.screen(isDesktop, screen != 0)}>
        <Split rate={rate} setScreen={setScreen}></Split>
      </Box>
      <Box className="screen centered" sx={styles.screen(isDesktop, screen != 1)}>
        <Submit rate={rate} setScreen={setScreen}></Submit>
      </Box>
    </Box>
  )
}

export default Phone
