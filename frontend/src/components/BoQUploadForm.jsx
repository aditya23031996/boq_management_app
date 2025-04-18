import { Button, Box } from "@mui/material";

export default function BoQUploadForm() {
  return (
    <Box className="p-4">
      <input type="file" accept=".csv, .xlsx" className="mb-4" />
      <Button variant="contained" color="primary">Upload BoQ</Button>
    </Box>
  );
}