import { Stack, Button, Link, Typography } from '@mui/material';
import { RotateCcw } from 'lucide-react';

function Submit(props: any) {
  const styles = {
    box: {
      height: "100%",
      width: "90%",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingTop: "24px",
    },
    returnButton: {
      height: "44px",
      minHeight: "44px",
      padding: "0 16px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      lineHeight: 1,
      "& .MuiButton-endIcon": {
        display: "inline-flex",
        alignItems: "center",
        margin: 0,
      },
    },
  }

  return (
    <Stack className="centered" sx={styles.box} spacing={2}>
      <Typography variant="h4">you've split it!</Typography>
      <Typography variant="body1">(well not yet, this is just a mockup)</Typography>
      <Typography variant="body1">the gender pay gap in Australia is currently <Link target="_blank" href="https://www.abs.gov.au/statistics/people/people-and-communities/gender-indicators" rel="noopener" fontWeight={"bold"}><b>{(100 * props.rate).toFixed(1)}%</b></Link></Typography>
      <Typography variant="body1">gone are the days where men always pay; but women needn't pay an equal share on an unequal wage</Typography>
      <Typography variant="body1">sustainable social change takes a long time. technology can help by making the responsible decisions easy</Typography>
      <Typography variant="body1"><i>@big-fin-tech</i>, if you're reading this please consider adopting this idea</Typography>
      <Typography variant="body1">together we can close the gap to zero</Typography>
      <Typography variant="body1">
        <Link href="https://github.com/tonzdev/libra" target="_blank" rel="noopener" fontWeight={"bold"}>GitHub</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="https://tonz.io/blog/3.html" target="_blank" rel="noopener" fontWeight={"bold"}>Dev Blog</Link>
      </Typography>
      <Button
        sx={styles.returnButton}
        endIcon={<RotateCcw size={24} />}
        variant="contained"
        onClick={() => {
          props.setScreen(0);
        }}>
        <Typography fontWeight="bold">Return</Typography>
      </Button>

    </Stack>
  )
}

export default Submit
