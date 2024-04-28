import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteMonster, getMonsters } from "../api/monster";
import { IMonster } from "../entities/IMonster";

const pageSize = 10;

const Monsters = () => {
  const [monsters, setMonsters] = useState<IMonster[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMonsters = async () => {
      const response = await getMonsters(page, pageSize);
      if ("success" in response) {
        setTotalPages(response.success.totalPages);
        setMonsters(response.success.data);
      }
    };

    fetchMonsters();
  }, [page]);

  const deleteById = async (id: number) => {
    await deleteMonster(id);
    setMonsters(monsters.filter((m: any) => m.id !== id));
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box flexGrow={1} overflow="auto" padding={2}>
        <Grid container spacing={2}>
          {monsters.map((monster: any) => (
            <Grid item xs={12} sm={6} key={monster.id}>
              <Card style={{ marginBottom: "10px" }}>
                <CardContent>
                  <Typography variant="h6">{monster.name}</Typography>
                  <Typography>Level: {monster.level}</Typography>
                  <Typography>
                    Species: {monster.species} - {monster.subSpecies}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteById(monster.id)}
                  >
                    Delete Monster
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box textAlign="center" padding={2} boxShadow={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Monsters;
