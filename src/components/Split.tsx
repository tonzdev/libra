import { useState } from 'react'
import useMediaQuery from "../hooks/useMediaQuery";
import { Box, Button, Paper, Stack, Typography, TextField, InputAdornment } from '@mui/material';
import Payee from './Payee';
import { Scale, UserPlus, UserMinus, CircleDollarSign } from 'lucide-react';
import names from "../data/names.json";

function Split(props: any) {
  const isDesktop = useMediaQuery('(min-aspect-ratio: 2/3)');
  const [equality, setEquality] = useState(true); // Equality mode
  const [amount, setAmount] = useState(10000); // Amount to split in cents
  const [payees, setPayees] = useState([
    { key: 0, name: names[Math.floor(Math.random() * names.length)], gender: "f", amount: 0 },
    { key: 1, name: names[Math.floor(Math.random() * names.length)], gender: "m", amount: 0 }
  ]) // Randomly guessing gender is fairer than assuming?

  const splitAmounts = (amount: number, equality: boolean) => {
    const femalePayees = payees.filter((payee) => payee.gender == "f");
    const malePayees = payees.filter((payee) => payee.gender == "m");

    // Calculate quota based on the current paygap statistics
    const paygap = equality ? props.rate : 0;
    const quota = malePayees.length + (1 - paygap) * femalePayees.length;

    // Divide whole cents fairly
    const femaleAmount = Math.floor((1 - paygap) * Number(amount) / quota);
    let maleAmount = Math.floor(Number(amount) / quota);

    // Allocate
    malePayees.forEach((payee) => payee.amount = maleAmount)
    femalePayees.forEach((payee) => payee.amount = femaleAmount)

    // Distribute the extra cents in order 
    let remainderCents = amount - malePayees.length * maleAmount - femalePayees.length * femaleAmount;
    while (remainderCents > 0) {
      payees.forEach((payee) => {
        if (remainderCents > 0) {
          payee.amount++;
          remainderCents--;
        }
      })
    }
  };
  splitAmounts(amount, equality)

  const styles = {
    box: {
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "column",
      paddingTop: "24px",
    },
    prompt: {
      textAlign: "center",
      lineHeight: "66px",
    },
    entry: {
      fontSize: "50px",
      width: "260px",
      backgroundColor: "#fdfdfd",
      input: {
        textAlign: "right",
      },
    },
    payeeBox: (isDesktop: boolean) => ({
      maxHeight: isDesktop? "325px": "100%",
      overflowY: "scroll",
    }),
    buttons: {
      marginBottom: "24px",
      height: "48px",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
    },
    personButton: {
      width: "44px",
      minWidth: "44px",
      height: "44px",
      minHeight: "44px",
      padding: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1,
    },
    splitButton: {
      width: "116px",
      minWidth: "116px",
      height: "44px",
      padding: "0 12px",
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
    equalityButton: {
      width: "116px",
      minWidth: "116px",
      height: "44px",
      padding: "0 12px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      lineHeight: 1,
      "& .MuiButton-startIcon": {
        display: "inline-flex",
        alignItems: "center",
        margin: 0,
      },
    }
  }

  return (
    <Box sx={styles.box}>
      <Box>
        <Box>
          <Typography variant="h4" sx={styles.prompt}>
            let's split
          </Typography>
          <TextField
            value={`${String(amount).slice(0, -2) || "0"}.${String(amount).slice(-2, -1) || "0"}${String(amount).slice(-1) || "0"}`}
            InputProps={{
              inputMode: 'numeric',
              startAdornment: <InputAdornment position="start">AUD</InputAdornment>,
              sx: styles.entry,
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const amountRegex = new RegExp("^[0-9]{0,6}$")
              const amountCents = event.target.value.replace(".", "");
              if (amountCents.match(amountRegex)) {
                setAmount(Number(amountCents));
                splitAmounts(Number(amountCents), equality);
              } else {
                setAmount(amount);
              }
            }}></TextField>
          <Typography variant="h4" sx={styles.prompt}>between {payees.length}</Typography>
        </Box>
        <Stack direction="column" spacing={1}>
          <Stack className='hiddenscroll' direction="column" spacing={1} sx={styles.payeeBox(isDesktop)}>
            {payees.map((payee) => {
              return <Payee key={payee.key} index={payee.key} payees={payees} setPayees={setPayees} amount={amount} splitAmounts={splitAmounts} equality={equality} />
            })}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              aria-label="Add payee"
              color="primary"
              sx={styles.personButton}
              onClick={() => {
                payees.push({ key: payees.length, name: names[Math.floor(Math.random() * names.length)], gender: (Math.random() > 0.5) ? "f" : "m", amount: 0 })
                splitAmounts(amount, equality)
                setPayees([...payees]);
              }}
            ><UserPlus size={24} /></Button>
            <Button
              aria-label="Remove payee"
              color="error"
              sx={styles.personButton}
              onClick={() => {
                if(payees.length > 1) {
                  payees.pop()
                  splitAmounts(amount, equality)
                  setPayees([...payees]);
                }
              }}
            ><UserMinus size={24} /></Button>
          </Stack>
        </Stack>
      </Box>
      <Box sx={styles.buttons}>
        <Button
          sx={styles.equalityButton}
          startIcon={<Scale size={24} />}
          variant={equality ? "contained" : "outlined"}
          color="primary"
          onClick={() => {
            splitAmounts(amount, !equality);
            setEquality(!equality);
            setPayees([...payees]);
          }}>
          <Typography fontSize={16} fontWeight="bold">{(100 * props.rate).toFixed(1)}%</Typography>
        </Button>
        <Button
          sx={styles.splitButton}
          variant="contained"
          color="primary"
          endIcon={<CircleDollarSign size={24} />}
          onClick={() => {
            props.setScreen(1);
          }}>
          <Typography fontSize={16} fontWeight="bold">SPLIT</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default Split
