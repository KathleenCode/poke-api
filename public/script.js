async function fetchPokemon() {
    const name = document.getElementById("pokemonName").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";
  
    try {
      const res = await fetch(`/api/pokemon/${name}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
  
      resultDiv.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}" />
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(", ")}</p>
        <p><strong>Moves:</strong> ${data.moves.slice(0, 5).map(m => m.move.name).join(", ")}...</p>
      `;
    } catch (err) {
      resultDiv.innerHTML = `<p style="color:red;">Pokémon not found!</p>`;
    }
  }
  