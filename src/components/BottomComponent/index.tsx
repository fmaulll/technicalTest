import React, { FC } from "react";
import { Grid, Button, Typography } from "@mui/material";

interface Props {
  disablePrev: boolean;
  disableNext: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  page: number;
}

const BottomComponent: FC<Props> = ({
  disableNext,
  disablePrev,
  handleNext,
  handlePrev,
  page,
}) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ margin: "30px 0" }}
    >
      <Grid item>
        <Button disabled={disablePrev} onClick={handlePrev}>
          Prev
        </Button>
      </Grid>
      <Grid item>
        <Typography>{page}</Typography>
      </Grid>
      <Grid item>
        <Button disabled={disableNext} onClick={handleNext}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default BottomComponent;
