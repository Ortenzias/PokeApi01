import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./types.css";
import axios from "axios";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";

function PokeApi() {
    const [pokemon, setPokemon] = useState([]);
  
    const loadData = () => {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((resp) => {
          const pokemonData = resp.data.results.map((result) => {
            return axios.get(result.url).then((pokeData) => pokeData.data);
          });
  
          Promise.all(pokemonData).then((data) => setPokemon(data));
        });
    };
  
    useEffect(loadData, []);
  
    useEffect(() => console.log(), []);
  
    return (
      <Grid container spacing={1}>
        {pokemon.map((poke, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <CardMedia
                  style={{
                    maxWidth: 350,
                    height: 250,
                    margin: "auto",
                  }}
                  image={poke.sprites.front_default}
                />
                <h1 style={{ textAlign: "center" }}>{poke.name}</h1>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <PokeApi />
    </React.StrictMode>
  );