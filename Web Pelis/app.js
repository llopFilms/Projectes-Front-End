const KEY = "7946e9c6215f0e58c31e66436eb5f84e";
let pagina = 1;
const btnAnterior = document.getElementById("anterior");
const btnSeguent = document.getElementById("seguent");

const carregarPelis = async (KEY, pagina) => {
  try {
    await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&page=${pagina}`
    )
      .then((response) => response.json())
      .then((response) => {
        let llista = "";
        const pelis = response.results;
        console.log(pelis);
        pelis.forEach(
          (peli) =>
            (llista += `
              <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${peli.poster_path}"/>
                <p class="titol">${peli.title}</p>
              </div>`)
        );
        document.getElementById("contenidor").innerHTML = llista;
      });
  } catch (err) {
    console.log(err.message);
  }
};
carregarPelis(KEY, pagina);

btnAnterior.addEventListener("click", () => {
  pagina == 1 ? (pagina = 1) : pagina--;
  carregarPelis(KEY, pagina);
  console.log(pagina);
  document.getElementById("numero").innerHTML = pagina;
});

btnSeguent.addEventListener("click", () => {
  pagina++;
  carregarPelis(KEY, pagina);
  console.log(pagina);
  document.getElementById("numero").innerHTML = pagina;
});
