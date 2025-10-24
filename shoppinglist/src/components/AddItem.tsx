import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { Item } from "../types";
import ItemDialogContent from "../components/ItemDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItems } from "../api/itemapi";

function AddItem() {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({
    product: "",
    amount: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addItems, {
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const addItem = () => {
    mutate(item);
    setItem({ product: "", amount: "" });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Add Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addItem();
          }}
        >
          <DialogTitle>New Item</DialogTitle>
          <ItemDialogContent item={item} handleChange={handleChange} />
          <DialogActions>
            <Button onClick={handleClose}>Cancel / 취소</Button>
            <Button type="submit" onClick={addItem} >Add / 저장</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddItem;
