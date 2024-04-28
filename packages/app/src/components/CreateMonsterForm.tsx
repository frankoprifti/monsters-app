import { Alert, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { createMonster, createMonsterBulk } from "../api/monster";
import { IMonster } from "../entities/IMonster";
import { generateRandomMonster } from "../helpers/generateRandomMonster";

const CreateMonsterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [monster, setMonster] = useState<IMonster>({
    name: "",
    level: 0,
    species: "",
    subSpecies: "",
  });
  const [randomNo, setRandomNo] = useState<number>(0);

  const clearForm = () => {
    setMonster({ name: "", level: 0, species: "", subSpecies: "" });
  };
  const validateFields = (): boolean => {
    if (
      !monster.name ||
      monster.level <= 0 ||
      !monster.species ||
      !monster.subSpecies
    ) {
      return false;
    }
    return true;
  };
  const create = async () => {
    setErrorMessage(null);
    if (!validateFields()) {
      setErrorMessage("All fields must be filled in with valid values.");
      return;
    }
    const response = await createMonster(monster);
    if ("success" in response) {
      clearForm();
      setSuccessMessage("Monster created successfully");
    } else {
      setErrorMessage("Error creating monster");
    }
  };

  const generateAndCreateRandomMonsters = async (count: number) => {
    const randomMonsters = Array.from({ length: count }, () =>
      generateRandomMonster()
    );
    const response = await createMonsterBulk(randomMonsters);
    if ("success" in response) {
      setRandomNo(0);
      setSuccessMessage("Monsters generated successfully");
    } else {
      setErrorMessage("Error generating monsters");
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    }
  }, [successMessage]);

  return (
    <Grid container spacing={2} data-testid="create-monster-form">
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Monster Name"
          value={monster.name}
          onChange={(e) => setMonster({ ...monster, name: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Level"
          type="number"
          value={monster.level || ""}
          onChange={(e) =>
            setMonster({ ...monster, level: Number(e.target.value) })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Species"
          value={monster.species}
          onChange={(e) => setMonster({ ...monster, species: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Sub-Species"
          value={monster.subSpecies}
          onChange={(e) =>
            setMonster({ ...monster, subSpecies: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={12}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Button
          variant="contained"
          color="primary"
          data-testid="create"
          onClick={create}
          fullWidth
        >
          Create Monster
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Enter a number to generate random monsters"
          value={randomNo || ""}
          onChange={(e) => setRandomNo(Number(e.target.value))}
        />
      </Grid>
      {randomNo ? (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            data-testid="randombutton"
            onClick={() => generateAndCreateRandomMonsters(randomNo)}
            fullWidth
          >
            Generate {randomNo} Random Monsters
          </Button>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        {successMessage && (
          <Alert data-testid="success-alert" severity="success">
            {successMessage}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default CreateMonsterForm;
