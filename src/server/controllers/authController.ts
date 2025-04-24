import bcrypt from "bcrypt";

import type { RouteHandler } from "../types/routeHandler";
import { db } from "../config/sequelizeClient";

export const registerUser: RouteHandler = async (req, res) => {
  try {
    const { email, password, full_name: fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "Email, nombre completo y contraseña son obligatorios" });
    }

    const existing = await db.User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Usuario ya registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await db.User.create({ email, password: hashed, fullName });

    return res.status(201).json({ id: user.fullName, email: user.email });
  } catch (error) {
    console.error("Error en registerUser:", error);
    return res.status(500).json({ error: "Error interno al registrar usuario" });
  }
};

export const loginUser: RouteHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    
    return res.json({ 
      user: {
        fullName: user.fullName,
        email: user.email
      }
     })
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).json({ error: "Error interno al iniciar sesión" });
  }
};

export const logoutUser: RouteHandler = async (req, res) => {
  try {
    res.clearCookie("auth-token", { path: "/" });
    return res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error en logoutUser:", error);
    return res.status(500).json({ error: "Error interno al cerrar sesión" });
  }
};
