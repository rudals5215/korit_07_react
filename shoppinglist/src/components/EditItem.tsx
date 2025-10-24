import { Dialog, DialogActions, DialogTitle, Button, IconButton, Tooltip} from "@mui/material";
import { Item, ItemResponse, ItemEntity } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { updateItem } from "../api/itemapi";
import ItemDialogContent from "./ItemDialogContent";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

type FormProps = {
  itemdata: ItemResponse;
};

function EditItem({itemdata} : FormProps) {
  const queryClient = useQueryClient();
  const [ open, setOpen ] = useState(false);
  const [ item, setItem ] = useState<Item> ({
    product : '',
    amount : '',
  });

  const { mutate } = useMutation(updateItem, {
    onSuccess : () => {
      queryClient.invalidateQueries(["items"]);
    },
    onError : err => {console.log(err);}
  });

  const handleOpen = () => {
    setItem ({
      product : itemdata.product,
      amount : itemdata.amount,
    });
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    const url = itemdata._links.self.href;
    const itemEntity : ItemEntity = {item, url}
    mutate(itemEntity);
    setItem({
      product: "",
      amount: "",
    });
    setOpen(false);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Tooltip title="Edit Item">
        <IconButton onClick={handleOpen} aria-label="edit" size="small">
          <EditRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <DialogTitle>Edit Item</DialogTitle>
          <ItemDialogContent item={item} handleChange={handleChange} />
          <DialogActions>
            <Button onClick={handleClose}>Cancel | 취소</Button>
            <Button type="submit" >save | 저장</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default EditItem;
