import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItems, deleteItem } from "../api/itemapi";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { Snackbar, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

function Shoppinglist() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const { mutate } = useMutation(deleteItem, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "product", headerName: "Product", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditItem itemdata={params.row} />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        // 함수의 이름만 전달하기 위해 argument가 없는 화살표함수를 씀.
        <Tooltip title="Delete Item">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              if (
                window.confirm(
                  `(${params.row.product}: ${params.row.amount}) 리스트를 삭제하시겠습니까?`
                )
              ) {
                mutate(params.row._links.self.href);
              }
            }}
          >
            <DeleteForeverRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  if (!isSuccess) {
    return <span>Loading... ⏳</span>;
  }

  if (error) {
    return <span>🚫 리스들을 불러오는 데 실패했습니다. 🚫</span>;
  } else {
    return (
      <>
        <AddItem />
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="선택한 리스트 정보가 삭제되었습니다."
        />
      </>
    );
  }
}

export default Shoppinglist;
