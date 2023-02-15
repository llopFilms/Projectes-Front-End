import axios from 'axios';

const URL = "https://api.themoviedb.org/3/movie/popular";
const KEY = "7946e9c6215f0e58c31e66436eb5f84e";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTQ2ZTljNjIxNWYwZTU4YzMxZTY2NDM2ZWI1Zjg0ZSIsInN1YiI6IjYzYWM1N2IyN2VmMzgxMWY2YzE0ZjNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TyNc6HQfh7XHecJjxObeXDF0LeGXBATIGqDZvkGonx4";
let pagina = 1;
let llista = "";
let ultimaPeli;

const carregarPelis = async (URL, TOKEN, pagina) => {
  try {
    await axios({
      method: "get",
      url: URL,
      params: { page: pagina },
      headers: {
        Authorization: TOKEN,
      },
    })
    /* axios({
        method: "get",
        url: URL,
        params: { api_key: KEY, page: pagina }
      }) */
    /* axios.get(`${URL}?api_key=${KEY}&page=${pagina}`); */
    /* axios.get("https://api.themoviedb.org/3/movie/popular?api_key=7946e9c6215f0e58c31e66436eb5f84e&page=3") */

      /*await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&page=${pagina}`
      )
      .then((response) => response.json()) */
      .then((response) => {
        //const pelis = response.results;
        const pelis = response.data.results;
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
            document.querySelectorAll(".contenidor .pelicula").length - 1
          ];
          console.log(ultimaPeli.innerText);
          observador.observe(ultimaPeli);
        }
      });
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log("Promesa acabada");
  }
};
carregarPelis(URL, TOKEN, pagina);

const canviPagina = (entrades, observador) => {
  console.log(entrades);
  entrades.forEach((entrada) => {
    if (entrada.isIntersecting) {
      pagina++;
      carregarPelis(URL, TOKEN, pagina);
    }
  });
};

const observador = new IntersectionObserver(canviPagina, {
  rootMargin: "0px 0px 200px 0px",
  threshold: 1,
});

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
