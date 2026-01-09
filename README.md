# Sinclair
Rest API de manipulación de imágenes (Image Manipulation as a Service) con autenticación de usuarios a través de JWTs.  
Esta API es para el proyecto final de la materia de Tópicos Especiales de Programación.

## Requerimientos
* Bun: [Guía de instalación](https://bun.com/docs/installation)

## Setup
1. Clona el repositorio
```bash
git clone https://github.com/ClaraUCAB/Sinclair
cd Sinclair
```
2. Instala las dependencias
```bash
bun install
```

## Ejecución
Para ejecutar la API con normalidad, corre:
```bash
 bun run start
 ```
<details>
 <summary>Para development</summary>

 Al ejecutar el script de development, la API se reiniciará automáticamente cuando algún archivo cambie para poder probar los cambios inmediatamente en tiempo real.
 ```bash
bun run dev
```
</details>

 ## Uso
| Método | URL                | Description                                     |
| ------ | ------------------ | ----------------------------------------------- |
| `POST` | `/images/rotate`   | Rota la imagen.                                 |
| `POST` | `/images/resize`   | Redimensiona la imagen.                         |
| `POST` | `/images/crop  `   | Recorta la imagen.                              |
| `POST` | `/images/filter`   | Aplica un filtro a la imagen.                   |
| `POST` | `/images/format`   | Cambia el formato de la imagen.                 |
| `POST` | `/images/pipeline` | Encadena múltiples operaciones simultáneamente. |
  
## Ejemplos
### Rotar
```bash
curl -X POST http://localhost:3000/images/rotate \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/home/victor/Descargas/Gagamaru_U20_Uniform_1.webp" \
  -F "angle=111"\
  --output rotated.webp
```

###  Redimensionar  
```bash
 curl -X POST http://localhost:3000/images/resize \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/home/victor/Descargas/Gagamaru_U20_Uniform_1.webp"\
  -F "width=30" \
  -F "height=20" \
  --output resized.png
```

### Recortar 
```bash
curl -X POST http://localhost:3000/images/crop \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/home/victor/Descargas/Gagamaru_U20_Uniform_1.webp" \
  -F "left=10" -F "top=10" -F "width=50" -F "height=50" \
  --output cropped_final.png
```

### Aplicar filtro 
```bash
curl -X POST http://localhost:3000/images/filter \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/home/victor/Descargas/Gagamaru_U20_Uniform_1.webp" \
  -F "filter=grayscale" \
  --output filtered.png
```

### Convertir formato 
```bash
curl -X POST http://localhost:3000/images/format \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/home/victor/Descargas/Gagamaru_U20_Uniform_1.webp" \
  -F "format=jpeg" \
  --output converted.jpeg
```

 ### Pipeline 
```bash
curl -X POST http://localhost:3000/images/pipeline \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/home/victor/Descargas/Gagamaru_U20_Uniform_1.webp" \
  -F 'operations=[{"type":"resize","params":{"width":800}},{"type":"format","params":{"format":"webp"}}]' \
  --output pipeline_test.webp
```
