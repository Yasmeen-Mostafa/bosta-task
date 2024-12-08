import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export interface TableColumn {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
}

interface TableProps {
  columns: TableColumn[];
  data: Array<{ [key: string]: string | number }>;
}

const ShipmentDetailsTable = ({ columns, data }: TableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 0,
        border: "1px solid rgba(224, 224, 224, 1)",
        borderBottom: 0,
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="custom table">
        <TableHead sx={{ bgcolor: "#f5f5f996" }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align || "left"}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || "left"}>
                  {row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentDetailsTable;
