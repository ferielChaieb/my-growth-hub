const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Utilisateur créé",
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Erreur serveur register" });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN BODY:", req.body); // debug

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  try {
    const user = await User.findOne({ email });

    console.log("USER FOUND:", user); // debug

    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "Password manquant en base" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // ACCESS TOKEN
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // REFRESH TOKEN
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // cookie refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR FULL:", error);
    return res.status(500).json({ message: "Erreur serveur login" });
  }
};

// REFRESH
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Refresh invalide" });

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  });
};

// LOGOUT
const logout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Déconnecté" });
};

// GET ME
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);

  } catch (error) {
    console.error("GETME ERROR:", error);
    res.status(500).json({ message: "Erreur serveur getMe" });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  getMe,
};