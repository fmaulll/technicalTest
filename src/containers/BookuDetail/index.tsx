import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/BackIcon.svg";
import { ReactComponent as PaperIcon } from "../../assets/PaperIcon.svg";
import { ReactComponent as ClockIcon } from "../../assets/ClockIcon.svg";

const styles = {
  bookInfo: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "18px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  },
};

type resultDataBooku = {
  id: number;
  title: string;
  category_id: number;
  authors: [string];
  cover_url: string;
  description: string;
  audio_length: number;
  sections: {
    title: string;
    content: string;
  }[];
};

const BookuDetail = () => {
  const { categoryId, id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [dataBooku, setDataBooku] = useState<
    resultDataBooku | null | undefined
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBooku = async () => {
    setIsLoading(true);
    try {
      const result = await Axios({
        url: `/fee-assessment-books?categoryId=${categoryId}&page=0&size=10`,
        method: "GET",
      });
      const data: resultDataBooku[] = result.data;
      if (result.status === 200) {
        const obj: resultDataBooku | undefined = data?.find(
          (item: any) => String(item.id) === id
        );
        setIsLoading(false);
        setDataBooku(obj);
      } else {
        setIsLoading(false);
        alert("Cannot get detail!");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error Occurred!", error);
    }
  };

  useEffect(() => {
    getBooku();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      {isLoading ? (
        <Grid container justifyContent="center">
          <Grid item>
            <Typography>Loading...</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column">
          <Grid item>
            <Button
              onClick={() => navigate("/")}
              sx={{ fontSize: "18px", color: "black", textTransform: "none" }}
            >
              <BackIcon
                style={{ width: "30px", marginRight: "8px", fill: "#1b3286" }}
              />
              Back
            </Button>
          </Grid>
          <Grid item container spacing={matches ? 0 : 8} sx={{ marginTop: "15px" }}>
            <Grid item xs={!matches ? 4 : 12}>
              <img
                src={dataBooku?.cover_url}
                alt={dataBooku?.title}
                style={{
                  borderRadius: "16px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  width: !matches ? "100%" : "200px",
                }}
              />
            </Grid>
            <Grid item direction="column" container xs={!matches ? 8 : 12} sx={{ marginTop: !matches ? "0px" : "15px" }}>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "24px",
                    fontWeight: 600,
                  }}
                >
                  {dataBooku?.title}
                </Typography>
              </Grid>
              <Grid item>
                {dataBooku?.authors.map((item) => (
                  <Typography
                    sx={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#3a3a3a",
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Grid>
              <Grid item container sx={{ marginTop: "15px" }}>
                <Grid item>
                  <Typography sx={styles.bookInfo}>
                    <PaperIcon style={{ marginRight: "5px" }} />{" "}
                    {dataBooku?.sections.length} Chapters
                  </Typography>
                </Grid>
                <Grid item sx={{ marginLeft: "20px" }}>
                  <Typography sx={styles.bookInfo}>
                    <ClockIcon style={{ marginRight: "5px" }} />{" "}
                    {Math.floor(
                      dataBooku?.audio_length ? dataBooku?.audio_length / 60 : 0
                    )}{" "}
                    Min
                  </Typography>
                </Grid>
              </Grid>
              <Grid item sx={{ marginTop: "15px" }}>
                <Typography
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "24px",
                    fontWeight: 600,
                  }}
                >
                  What's it about?
                </Typography>
              </Grid>
              <Grid item>
                <Typography>{dataBooku?.description}</Typography>
              </Grid>
              <Grid item sx={{ marginTop: "15px" }}>
                <Typography
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "24px",
                    fontWeight: 600,
                  }}
                >
                  What's inside?
                </Typography>
              </Grid>
              <Grid item>
                {dataBooku?.sections.map((item, idx) => (
                  <Grid container direction="column">
                    <Grid item>
                      <Typography
                        sx={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#1b3286",
                        }}
                      >
                        {idx + 1} {item.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{item.content}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default BookuDetail;
