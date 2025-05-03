const userService = require("../services/user.service");

const adminMdw = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(401).json({
        message: "Votre identifiant utilisateur dans le token est incorrect",
      });
    }

    if (role !== user.role || role !== "admin") {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à effectuer cette action",
      });
    }

    next();
  } catch (error) {
    console.error("Erreur sur adminMdw :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const organizerMdw = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(401).json({
        message: "Votre identifiant utilisateur dans le token est incorrect",
      });
    }

    if (role !== user.role || role === "sportif") {
      return res.status(403).json({
        message: "Accès réservé aux organisateurs",
      });
    }

    next();
  } catch (error) {
    console.error("Erreur sur organizerMdw :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  adminMdw,
  organizerMdw,
};
