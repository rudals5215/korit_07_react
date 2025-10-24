import { DialogContent, Stack, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { Item } from "../types";

type DialogFromProps = {
  item : Item;
  handleChange : (event: ChangeEvent<HTMLInputElement>) => void;
}

function ItemDialogContent({item, handleChange} : DialogFromProps) {
  return (
    <DialogContent>
      <Stack spacing={2} mt={1}>
        <TextField label="Product" name="product" value={item.product} onChange={handleChange} />
        <TextField label="Amount" name="amount" value={item.amount} onChange={handleChange} />
      </Stack>
    </DialogContent>
  );
}

export default ItemDialogContent