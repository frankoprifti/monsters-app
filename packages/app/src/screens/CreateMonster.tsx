import { Box, Card, CardContent, Typography } from "@mui/material";
import CreateMonsterForm from "../components/CreateMonsterForm";

const CreateMonster = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card style={{ maxWidth: "600px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Create a Monster
          </Typography>
          <CreateMonsterForm />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateMonster;
