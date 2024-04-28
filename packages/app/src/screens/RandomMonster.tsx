import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteMonster, randomMonster } from "../api/monster";
import { IMonster } from "../entities/IMonster";

const limit: number = 10;

const RandomMonster = () => {
  const [monster, setMonster] = useState<IMonster>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [counter, setCounter] = useState<{ [key: number]: number }>({});

  const fetchRandomMonster = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const response = await randomMonster();
    if ("success" in response) {
      setMonster(response.success);
    } else {
      setErrorMessage("An error occurred while fetching a random monster.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRandomMonster();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (monster?.id) {
      const currentCount = counter[monster.id] || 0;
      const newCount = currentCount + 1;
      const limitReached = newCount === limit;

      if (limitReached) {
        deleteMonster(monster.id);
      } else {
        setCounter((prev) => ({
          ...prev,
          [monster.id!]: newCount,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monster]);

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
            Random Monster
          </Typography>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : monster ? (
            <Box>
              <Typography>
                Name: {monster.name} count:{counter[monster.id!]}
              </Typography>
              <Typography>Level: {monster.level}</Typography>
              <Typography>
                Species: {monster.species} - {monster.subSpecies}
              </Typography>
            </Box>
          ) : (
            <Typography>No monster to display</Typography>
          )}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}{" "}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RandomMonster;
