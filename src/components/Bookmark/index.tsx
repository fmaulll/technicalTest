import React, { FC } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  IconButton,
} from "@mui/material";
import { ReactComponent as TrashIcon } from "../../assets/TrashIcon.svg";

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

interface Props {
  anchorEl: null | HTMLElement;
  books: {
    id: number;
    category_id: number;
    title: string;
    cover_url: string;
  }[];
  onClick: (categoryId: number, title: string) => void;
  onClose: () => void;
  handleDelete: (id: number) => void;
}

const Bookmark: FC<Props> = ({
  anchorEl,
  books,
  onClick,
  onClose,
  handleDelete,
}) => {
  const open = Boolean(anchorEl);
  return (
    <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
      {books.length > 0 ? (
        <>
          {books.map((book) => (
            <MenuItem sx={styles.item} key={book.id}>
              <ListItemIcon
                sx={{ marginRight: "10px" }}
                onClick={() => onClick(book.category_id, book.title)}
              >
                <img
                  style={{ width: "50px" }}
                  src={book.cover_url}
                  alt={book.title}
                />
              </ListItemIcon>
              <Typography variant="inherit" sx={{ marginRight: "10px" }}>
                {book.title}
              </Typography>
              <ListItemIcon sx={{ zIndex: 10 }}>
                <IconButton onClick={() => handleDelete(book.id)}>
                  <TrashIcon />
                </IconButton>
              </ListItemIcon>
            </MenuItem>
          ))}
        </>
      ) : (
        <Typography sx={{ padding: "10px" }}>No List</Typography>
      )}
    </Menu>
  );
};

export default Bookmark;
