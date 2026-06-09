# Lic. Camilo — Web profesional

Landing estática (HTML + CSS + JavaScript puro). **Sin build, sin npm, sin frameworks.**
Lista para subir tal cual a GitHub, Hostinger, Netlify o cualquier hosting estático.

---

## Estructura

```
Camilo web/
├── index.html          ← la página
├── styles.css          ← estilos
├── main.js             ← animaciones e interacciones
├── .htaccess           ← caché correcta en Hostinger (no borrar)
├── favicon.svg         ← icono de la pestaña
├── README.md           ← este archivo
└── assets/
    └── img/
        └── portrait.svg ← imagen del hero (reemplázala por una foto real)
```

Total: muy por debajo del límite de 100 archivos por carpeta de GitHub.

---

## Cómo cambiar lo importante

### 1. El número de WhatsApp
El número actual es **+591 60311691**. Aparece en 4 enlaces dentro de `index.html`
(botón del menú, botón del hero, botón final y botón flotante) y en la sección de contacto.

Para cambiarlo, busca y reemplaza en `index.html`:
- `59160311691` → tu número nuevo (con código de país, **sin** `+` ni espacios).
- `+591 60311691` → cómo quieres que se muestre en pantalla.

> El enlace ya incluye un mensaje automático: *"Hola, Lic. Camilo. Vi su página web y me gustaría agendar una primera sesión."*
> Puedes editar ese texto (va después de `?text=` en cada enlace).

### 2. La foto del hero
Ahora hay un panel ilustrado (`assets/img/portrait.svg`). Para poner una foto real de Camilo:
1. Guarda la foto en `assets/img/` (por ejemplo `camilo.jpg`). Ideal vertical, ~520×640 px.
2. En `index.html`, busca `assets/img/portrait.svg` (dentro del hero) y cámbialo por `assets/img/camilo.jpg`.

### 3. Textos
Todo el contenido está escrito directamente en `index.html`. Puedes editarlo sin tocar nada más.

---

## Verlo en tu computadora

Haz doble clic en `index.html`. Funciona sin servidor.
(Las fuentes Playfair Display e Inter se cargan desde Google Fonts, así que necesitas internet
la primera vez para verlas con su tipografía exacta.)

---

## Subir a Hostinger / GitHub

- **Hostinger:** entra al Administrador de archivos → carpeta `public_html` → sube todo el contenido
  de esta carpeta (incluido `.htaccess`).
- **GitHub:** sube la carpeta completa. El `.htaccess` y el `.svg` cuentan como archivos normales.

> Cada vez que cambies `styles.css` o `main.js`, sube los archivos y cambia el número de versión
> `?v=20260609` (en `index.html`) por la fecha del día. Así el navegador carga la versión nueva
> y no una guardada en caché.

---

Hecho con cuidado. La conversión principal de toda la web es iniciar una conversación por WhatsApp.
