import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import Iuser from "../Model/IUser";
import {
  GetUsers,
  CreateUsers,
  UpdateUsers,
  DeleteUsers,
} from "../Api/Actions";
import { ChangeEvent, useEffect, useState } from "react";
import { useConfirm } from "material-ui-confirm";

export default function DataGridDemo() {
  const [userData, setUserData] = useState<Iuser[]>([]);
  const [openDialog, setopenDialog] = useState(false);
  const [openSnackbar, setopenSnackbar] = useState(false);
  const [editrow, seteditrow] = useState(false);
  const [formData, setFormData] = useState<Iuser>({
    id: 0,
    firstName: "",
    lastName: "",
    age: 0,
  });

  const confirm = useConfirm();

  const FetchData = async () => {
    var userList = await GetUsers();
    setUserData(userList);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handleAdd = () => {
    setFormData({ id: 0, firstName: "", lastName: "", age: 0 });
    setopenDialog(true);
    seteditrow(false);
  };

  const handleDialogClose = () => {
    setopenDialog(false);
  };

  const handleSave = async () => {
    console.log(formData);
    if (editrow) {
      var id = formData?.id ? formData.id : 0;
      await UpdateUsers(formData, id);
    } else {
      await CreateUsers(formData);
    }
    setopenDialog(false);
    FetchData();
    setopenSnackbar(true);
  };

  const handleEdit = (row: Iuser) => {
    setopenDialog(true);
    setFormData(row);
    seteditrow(true);
  };
  const handleDelete = async (id: number) => {
    confirm({
      title: "",
      description: "Are you sure you wish to delete this item?",
    })
      .then(async () => {
        await DeleteUsers(id);
        setopenSnackbar(true);
        FetchData();
      })
      .catch(() => {
        /* ... */
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prestate) => ({
      ...prestate,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setopenSnackbar(false);
  };

  return (
    <Box sx={{ height: 400, width: "60%" }}>
      <Stack spacing={2} margin={2} direction="row">
        <Button variant="contained" onClick={handleAdd}>
          Add User
        </Button>
      </Stack>
      <DataGrid
        rows={userData}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          {
            field: "firstName",
            headerName: "First name",
            width: 150,
          },
          {
            field: "lastName",
            headerName: "Last name",
            width: 150,
          },
          {
            field: "age",
            headerName: "Age",
            type: "number",
            width: 150,
          },
          {
            field: "Action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => (
              <strong>
                <Button onClick={() => handleEdit(params.row)}> Edit</Button>
                <Button onClick={() => handleDelete(params.row.id)}>
                  {" "}
                  Delete
                </Button>
              </strong>
            ),
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle> {formData ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            name="firstName"
            label="first name"
            type="text"
            fullWidth
            variant="standard"
            value={formData?.firstName}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData?.lastName}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="age"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            value={formData?.age ? formData?.age : ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
          <Button onClick={handleDialogClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </Box>
  );
}
