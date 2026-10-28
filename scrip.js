/* ==========================================================================
   CONFIGURACIÓN DE ENLACES OFICIALES
   ========================================================================== */
const CONFIG_NEGOCIO = {
  urlWhatsAppGrupo: "https://chat.whatsapp.com/C3R0oRiKQ5h2iZfOmIoskV?s=cl&p=i&mlu=4&ilr=4&iam=2",
  urlInstagram: "https://www.instagram.com/zona.crujiente?utm_source=qr&rpxt=NmN2bHNhM2M5YmRx"
};

/* ==========================================================================
   FUNCIONALIDADES Y LÓGICA DE INTERACCIÓN
   ========================================================================== */

let pedidoActual = [];

document.addEventListener("DOMContentLoaded", () => {
  inicializarMenuMovil();
  inicializarFiltros();
});

// Menú desplegable para móviles
function inicializarMenuMovil() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
}

// Filtros de categorías sin recargar la página
function inicializarFiltros() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      productCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "todos" || cardCategory === filterValue) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Gestión del Pedido en Carrito
function agregarAlPedido(nombreProducto) {
  pedidoActual.push(nombreProducto);
  renderizarPedido();
}

function eliminarDelPedido(index) {
  pedidoActual.splice(index, 1);
  renderizarPedido();
}

function renderizarPedido() {
  const lista = document.getElementById("listaPedido");
  if (!lista) return;

  lista.innerHTML = "";

  if (pedidoActual.length === 0) {
    lista.innerHTML = '<li class="empty-msg">Tu lista de pedido está vacía. Haz clic en "Agregar" en el menú.</li>';
    return;
  }

  pedidoActual.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "order-item";
    li.innerHTML = `
      <span>• ${item}</span>
      <button onclick="eliminarDelPedido(${index})" style="background:none; border:none; color:var(--rojo-chile); cursor:pointer; font-weight:bold; font-size: 1rem;">✕</button>
    `;
    lista.appendChild(li);
  });
}

// Envío del pedido por enlace directo al grupo/chat de WhatsApp proporcionado
function enviarPedidoWhatsApp() {
  if (pedidoActual.length === 0) {
    alert("Por favor, agrega al menos un producto a tu pedido antes de enviar.");
    return;
  }

  const mensaje = `Hola *Zona Crujiente*, me gustaría realizar el siguiente pedido:\n\n` +
    pedidoActual.map((p) => `- ${p}`).join("\n") +
    `\n\n¿Me podrían confirmar la disponibilidad? ¡Gracias!`;

  // Redirige directamente al enlace de WhatsApp que solicitaste con el texto del pedido preparado
  const urlFinal = `${CONFIG_NEGOCIO.urlWhatsAppGrupo}&text=${encodeURIComponent(mensaje)}`;
  window.open(urlFinal, "_blank");
}