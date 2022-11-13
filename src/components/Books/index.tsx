import React, { FC } from "react";
import { Grid, Box, IconButton, Typography } from "@mui/material";
import { ReactComponent as StarIcon } from "../../assets/StarIcon.svg";

const styles = {
  bookTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "18px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "15px",
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
    category_id: number;
    title: string;
    cover_url: string;
    description: string;
  };
  onClick: (categoryId: number, id: number) => void;
}

const Books: FC<Props> = ({ data, handleAddBookmark, onClick }) => {
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
          style={{
            width: "200px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          src={data.cover_url}
        />
        <Typography
          sx={styles.bookTitle}
          onClick={() => onClick(data.category_id, data.id)}
        >
          {data.title}
        </Typography>
        <Typography sx={styles.bookDesc}>
          {data.description.slice(0, 20) + "..."}
        </Typography>
      </Box>
    </Grid>
  );
};

export default Books;
