const KEY = "7946e9c6215f0e58c31e66436eb5f84e";
let pagina = 1;
let llista = "";
let ultimaPeli;

let observador = new IntersectionObserver(
  (entrades, observador) => {
    console.log(entrades);
    entrades.forEach((entrada) => {
      if (entrada.isIntersecting) {
        pagina++;
        carregarPelis(KEY, pagina);
      }
    });
  },
  {
    rootMargin: "0px 0px 200px 0px",
    threshold: 1,
  }
);

const carregarPelis = async (KEY, pagina) => {
  try {
    await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&page=${pagina}`
    )
      .then((response) => response.json())
      .then((response) => {
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

        if (pagina < 1000) {
          if (ultimaPeli) observador.unobserve(ultimaPeli);
          ultimaPeli = document.querySelectorAll(".contenidor .pelicula")[
            document.querySelectorAll(".contenidor .pelicula").length - 1];
          console.log(ultimaPeli);
          observador.observe(ultimaPeli);
        }
      });
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log("Promesa acabada");
  }
};
carregarPelis(KEY, pagina);

/* 
const btnAnterior = document.getElementById("anterior");
const btnSeguent = document.getElementById("seguent");

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) pagina--;
  carregarPelis(KEY, pagina);
  console.log(pagina);
  document.getElementById("numero").innerHTML = pagina;
});

btnSeguent.addEventListener("click", () => {
  if (pagina < 1000) pagina++;
  carregarPelis(KEY, pagina);
  console.log(pagina);
  document.getElementById("numero").innerHTML = pagina;
});
 */
