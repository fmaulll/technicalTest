import React, { FC } from "react";
import {
  InputBase,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactComponent as SearchIcon } from "../../assets/SearchIcon.svg";

const styles = {
  input: {
    marginLeft: "10px",
    flex: 1,
    color: "#2B2F3C",
    fontSize: 13,
    "& ::placeholder": {
      color: "#BCC8E7",
      opacity: 1,
    },
  },
  iconButton: {
    // padding: 5,
    color: "#BCC8E7",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  icon: {
    fill: "#a3a3a3",
  },
};

interface Props {
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const SearchInput: FC<Props> = ({ value, placeholder, onChange }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Paper
      component="form"
      sx={{
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: matches ? "150px" : "300px",
        borderRadius: "10px 10px 10px 10px",
        border: "1px solid #A8B6DB",
        backgroundColor: "#FFFFFF",
        height: 40,
      }}
    >
      <InputBase
        sx={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        type="submit"
        onClick={(event) => {
          event.preventDefault();
        }}
        sx={styles.iconButton}
        aria-label="search"
      >
        <SearchIcon style={styles.icon} />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
