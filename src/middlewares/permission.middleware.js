const userService = require("../services/user.service");

const adminMdw = async (req, res, next) => {
  try {
    const user = await verifyUserExistence(req.user.id);
    if (user.role !== "admin") {
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
    const user = await verifyUserExistence(req.user.id);

    if (user.role !== "organisateur") {
      return res.status(403).json({
        message: "Accès réservé aux organisateurs",
      });
    }

    next();
  } catch (error) {
    console.error(`Erreur sur organizerMdw ${req.user.id}\n`, error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const athletesMdw = async (req, res, next) => {
  try {
    const user = await verifyUserExistence(req.user.id);
    if (user.role !== "sportif")
      return res.status(401).json({
        message:
          "Vous avez besoin d'un compte sportif pour l'accès à cette partie",
      });
    next();
  } catch (error) {
    console.error(`Erreur sur athletesMdw ${user._id}`);
    res.status(500).json({ message: "Accès réservé au sportifs" });
  }
};

const verifyUserExistence = async (id) => {
  const user = await userService.getUserById(id);
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }
  return user;
};

module.exports = {
  adminMdw,
  organizerMdw,
  athletesMdw,
};
