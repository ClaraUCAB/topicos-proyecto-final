import express from "express";
import imageRoutes from "./routes/image.routes";
import authRoutes from "./routes/auth.routes";


const app = express();
app.use(express.json());


app.use("/images", imageRoutes);
app.use("/auth", authRoutes);

// TODO: Hacer el puerto una variable de entorno

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

