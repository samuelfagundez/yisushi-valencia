(function () {
  "use strict";

  /* ---------- Barra: fondo al hacer scroll ---------- */
  var barra = document.getElementById("barra");
  function alScrollear() {
    if (window.scrollY > 40) {
      barra.classList.add("al-hacer-scroll");
    } else {
      barra.classList.remove("al-hacer-scroll");
    }
  }
  window.addEventListener("scroll", alScrollear, { passive: true });
  alScrollear();

  /* ---------- Menú móvil ---------- */
  var botonMovil = document.getElementById("boton-movil");
  var navEnlaces = document.getElementById("nav-enlaces");
  if (botonMovil && navEnlaces) {
    botonMovil.addEventListener("click", function () {
      navEnlaces.classList.toggle("abierto");
    });
    navEnlaces.querySelectorAll("a").forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        navEnlaces.classList.remove("abierto");
      });
    });
  }

  /* ---------- Carrusel de fondo del hero ---------- */
  var imagenesHero = document.querySelectorAll("#hero-fondo img");
  if (imagenesHero.length > 1) {
    var indiceActual = 0;
    setInterval(function () {
      imagenesHero[indiceActual].classList.remove("activa");
      indiceActual = (indiceActual + 1) % imagenesHero.length;
      imagenesHero[indiceActual].classList.add("activa");
    }, 5500);
  }

  /* ---------- Animación de aparición al hacer scroll ---------- */
  var elementosRevelados = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elementosRevelados.forEach(function (el) {
      observador.observe(el);
    });
  } else {
    elementosRevelados.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Galería / lightbox ---------- */
  var botonesGaleria = document.querySelectorAll("#galeria-fotos button");
  var lightbox = document.getElementById("lightbox");
  var lightboxImagen = document.getElementById("lightbox-imagen");
  var lightboxLeyenda = document.getElementById("lightbox-leyenda");
  var lightboxCerrar = document.getElementById("lightbox-cerrar");

  function abrirLightbox(boton) {
    var img = boton.querySelector("img");
    lightboxImagen.src = img.src;
    lightboxImagen.alt = img.alt;
    lightboxLeyenda.textContent = boton.getAttribute("data-autor") || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function cerrarLightbox() {
    lightbox.hidden = true;
    lightboxImagen.src = "";
    document.body.style.overflow = "";
  }

  botonesGaleria.forEach(function (boton) {
    boton.addEventListener("click", function () {
      abrirLightbox(boton);
    });
  });

  if (lightboxCerrar) {
    lightboxCerrar.addEventListener("click", cerrarLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (evento) {
      if (evento.target === lightbox) {
        cerrarLightbox();
      }
    });
  }
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && lightbox && !lightbox.hidden) {
      cerrarLightbox();
    }
  });

  /* ---------- Horario de hoy ---------- */
  var horarios = {
    0: "13:00–16:00, 20:00–23:00", // domingo
    2: "13:00–16:00, 20:00–23:00", // martes
    3: "13:00–16:00, 20:00–23:00", // miércoles
    4: "13:00–16:00, 20:00–23:00", // jueves
    5: "13:00–16:00, 20:00–23:30", // viernes
    6: "13:00–16:00, 20:00–23:30" // sábado
  };
  var nombresDia = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var horarioHoy = document.getElementById("horario-hoy");
  if (horarioHoy) {
    var diaSemana = new Date().getDay(); // 0 = domingo ... 6 = sábado
    var nombre = nombresDia[diaSemana].charAt(0).toUpperCase() + nombresDia[diaSemana].slice(1);
    if (diaSemana === 1) {
      horarioHoy.textContent = "Hoy (" + nombre + ") cerrado";
    } else {
      var texto = horarios[diaSemana] || "Consulta el horario completo arriba";
      horarioHoy.textContent = "Hoy (" + nombre + "): " + texto;
    }
  }

  /* ---------- Año en el footer ---------- */
  var anio = document.getElementById("anio");
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }
})();
