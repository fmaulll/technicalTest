import React, { FC } from "react";
import { Grid, Box, IconButton, Typography } from "@mui/material";
import { ReactComponent as StarIcon } from "../../assets/StarIcon.svg";

const styles = {
  bookTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "18px",
    fontWeight: 600,
  },
  bookDesc: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    color: "#868686",
  },
};

interface Props {
  handleAddBookmark: (id: number, title: string) => void;
  data: {
    id: number;
    title: string;
    cover_url: string;
    description: string;
  };
}

const Books: FC<Props> = ({ data, handleAddBookmark }) => {
  return (
    <Grid item>
      <Box sx={{ width: "200px", position: "relative" }}>
        <IconButton
          onClick={() => handleAddBookmark(data.id, data.title)}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <StarIcon style={{ fill: "#FFFFFF" }} />
        </IconButton>
        <img
          style={{ width: "200px", borderRadius: "10px" }}
          src={data.cover_url}
        />
        <Typography sx={styles.bookTitle}>{data.title}</Typography>
        <Typography sx={styles.bookDesc}>
          {data.description.slice(0, 20) + "..."}
        </Typography>
      </Box>
    </Grid>
  );
};

export default Books;
