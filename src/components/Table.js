import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    editable: false,
  },
  {
    field: "name",
    headerName: "Candidate Name",
    width: 150,
    editable: false,
  },
  {
    field: "voteCount",
    headerName: "No. of Votes",
    type: "number",
    width: 110,
    editable: false,
  },
];

const Table = ({ Candidates, showChkbox }) => {
  //  console.log(Candidates);
  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <div style={{ height: 400, width: "50%" }}>
      <DataGrid
        rows={Candidates}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={showChkbox}
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
};

export default Table;
