import React, { FC, useEffect, useState } from "react";
import Axios from "axios";
import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchInput from "../../components/SearchInput";
import { ReactComponent as BookmarkIcon } from "../../assets/BookmarkIcon.svg";
import Bookmark from "../../components/Bookmark";
import Books from "../../components/Books";
import BottomComponent from "../../components/BottomComponent";

const styles = {
  root: {
    padding: "0 30px",
  },
  title: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "36px",
    fontWeight: 600,
  },
  button: {
    marginTop: "10px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "transparent",
    textTransform: "none",
    color: "#606060",
    marginRight: "20px",
  },
  topComponent: {
    marginTop: "30px",
    height: "100px",
    backgroundColor: "#1b3286",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 30px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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

type resultData = {
  id: number;
  name: string;
};

type bookmarkData = {
  id: number;
  category_id: number;
  title: string;
  cover_url: string;
};

const Booku: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataBooku, setDataBooku] = useState<resultDataBooku[]>([]);
  const [dataAllBooku, setDataAllBooku] = useState<resultDataBooku[]>([]);
  const [dataCategory, setDataCategory] = useState<resultData[] | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [dataBookmark, setDataBookmark] = useState<bookmarkData[]>([]);
  const [disablePrev, setDisablePrev] = useState<boolean>(false);
  const [disableNext, setDisableNext] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const getCategory = async () => {
    setIsLoading(true);
    try {
      const result = await Axios({
        url: "/fee-assessment-categories",
        method: "GET",
      });
      const { data, status } = result;
      if (status === 200) {
        setDataCategory(data);
        setIsLoading(false);
      } else {
        alert("Cannot get category!");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error Occurred!", error);
    }
  };

  const getBooku = async (id: number | null) => {
    setIsLoading(true);
    if (id !== selectedId) {
      setPage(0);
    }
    try {
      const result = await Axios({
        url: `/fee-assessment-books?categoryId=${id}&page=${page}&size=10`,
        method: "GET",
      });
      const { data, status } = result;
      if (status === 200) {
        setIsLoading(false);
        setDataBooku(data);
        if (data.length < 10) {
          setDisableNext(true);
        } else {
          setDisableNext(false);
        }
      } else {
        setIsLoading(false);
        alert("Cannot get category!");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error Occurred!", error);
    }
  };

  const getAllBooku = async (id: number) => {
    setIsLoading(true);
    try {
      const result = await Axios({
        url: `/fee-assessment-books?categoryId=${id}`,
        method: "GET",
      });
      const { data, status } = result;
      if (status === 200) {
        setIsLoading(false);
        setDataAllBooku(data);
      } else {
        setIsLoading(false);
        alert("Cannot get category!");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error Occurred!", error);
    }
  };

  const handleNext = () => {
    if (dataBooku.length < 10) {
      setDisableNext(true);
    } else {
      setPage((prev) => prev + 1);
      setDisableNext(false);
    }
  };
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const handleClick = (id: number, name: string) => {
    setSelectedId(id);
    getBooku(id);
    getAllBooku(id);
    setCategory(name);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOpenBookmark = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseBookmark = () => {
    setAnchorEl(null);
  };

  const handleClickBookmark = (categoryId: number, title: string) => {};

  const handleAddBookmark = (id: number, title: string) => {
    const arr = JSON.parse(String(Array(localStorage.getItem("booku"))));
    const data = dataAllBooku.find((item) => item.id === id);
    const bookmarkExist = arr.find((item: any) => item.title === title);
    if (!bookmarkExist) {
      arr.push(data);
      localStorage.setItem("booku", JSON.stringify(arr));
      setDataBookmark(arr);
      alert("Added to bookmark!");
    } else {
      alert("Book already in bookmark!");
    }
  };

  const handleDeleteBookmark = (id: number) => {
    let arr: bookmarkData[] = JSON.parse(
      String(Array(localStorage.getItem("booku")))
    );
    const index = arr.findIndex((item) => item.id === id);

    arr.splice(index, index + 1);
    // console.log(arr.slice(index, index + 1))
    console.log(index);
    console.log(arr);
    localStorage.setItem("booku", JSON.stringify(arr));
    setDataBookmark(arr);
  };

  const handleReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const data: bookmarkData[] = JSON.parse(
      String(Array(localStorage.getItem("booku")))
    );
    if (!data) {
      localStorage.setItem("booku", JSON.stringify([]));
    } else {
      const arr: bookmarkData[] = [];
      data.map((item) => {
        arr.push({
          title: item.title,
          id: item.id,
          category_id: item.category_id,
          cover_url: item.cover_url,
        });
      });
      setDataBookmark(arr);
    }
    if (dataCategory === null) {
      getCategory();
    }
  }, [dataCategory]);

  useEffect(() => {
    if (selectedId !== null) {
      getBooku(selectedId);
    }
    if (page === 0) {
      setDisablePrev(true);
    } else {
      setDisablePrev(false);
    }
  }, [page, selectedId]);

  return (
    <div style={styles.root}>
      <Box sx={styles.topComponent}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <SearchInput
              value={search}
              placeholder="Search..."
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={handleOpenBookmark}>
              <BookmarkIcon style={{ fill: "#FFFFFF" }} />
            </IconButton>
            <Bookmark
              anchorEl={anchorEl}
              books={dataBookmark}
              onClick={handleClickBookmark}
              onClose={handleCloseBookmark}
              handleDelete={handleDeleteBookmark}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container direction="column" sx={{ marginTop: "30px" }}>
        <Grid item>
          <Typography sx={styles.title}>Explore Categories</Typography>
        </Grid>
        <Grid item sx={{ marginTop: "30px" }}>
          {dataCategory?.map((data) => (
            <Button
              sx={styles.button}
              key={data.id}
              onClick={() => handleClick(data.id, data.name)}
            >
              {data.name}
            </Button>
          ))}
        </Grid>
      </Grid>
      {selectedId === null ? (
        <Grid container justifyContent="center" sx={{ marginTop: "30px" }}>
          <Grid item>
            <Typography>Please select the category first</Typography>
          </Grid>
        </Grid>
      ) : null}
      {isLoading ? (
        <Grid container justifyContent="center" sx={{ marginTop: "30px" }}>
          <Grid item>
            <Typography>Loading...</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column">
          <Grid sx={{ marginTop: "60px" }}>
            <Typography
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: matches ? "24px" : "36px",
                fontWeight: 600,
              }}
            >
              {category}
            </Typography>
          </Grid>
          <Grid item sx={{ marginTop: "30px   " }}>
            {search === "" ? (
              <Grid container justifyContent="center" spacing={8}>
                {dataBooku?.map((data) => (
                  <Books handleAddBookmark={handleAddBookmark} data={data} />
                ))}
              </Grid>
            ) : (
              <Grid container spacing={8}>
                {dataAllBooku
                  ?.filter((data) => data.title.toLowerCase().includes(search))
                  .map((data) => (
                    <Books handleAddBookmark={handleAddBookmark} data={data} />
                  ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
      <BottomComponent
        disableNext={disableNext}
        disablePrev={disablePrev}
        handleNext={handleNext}
        handlePrev={handlePrev}
        page={page}
      />
    </div>
  );
};

export default Booku;
