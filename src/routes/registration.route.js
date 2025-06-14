const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration.controller");
const tokenMdw = require("../middlewares/token.middleware");
const {
  athletesMdw,
  adminMdw,
} = require("../middlewares/permission.middleware");

router.use(tokenMdw);
router.get("/", adminMdw, registrationController.getRegistrations);
router.use(athletesMdw);
router.post("/findOne", registrationController.findRegistration);
router.get("/:id", registrationController.getRegistration);
router.post("/", registrationController.create);
router.put("/:id", registrationController.update);
router.delete("/:id", registrationController.delete);

module.exports = router;

/**
 * @swagger
 * /registrations:
 *   get:
 *     summary: Récupère toutes les inscriptions
 *     tags:
 *       - Inscriptions
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Terme de recherche dans les inscriptions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page à récupérer (pagination)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'inscriptions par page
 *     responses:
 *       200:
 *         description: Liste paginée des inscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Registration'
 *                 page:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /registrations/{id}:
 *   get:
 *     summary: Récupère une inscription par son ID
 *     tags:
 *       - Inscriptions
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'inscription
 *     responses:
 *       200:
 *         description: Détails de l'inscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Inscription inexistante
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Crée une nouvelle inscription
 *     tags:
 *       - Inscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       201:
 *         description: Inscription créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /registrations/{id}:
 *   put:
 *     summary: Met à jour une inscription existante
 *     tags:
 *       - Inscriptions
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'inscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       200:
 *         description: Inscription mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Données invalides ou ID invalide
 *       404:
 *         description: Inscription inexistante
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /registrations/{id}:
 *   delete:
 *     summary: Supprime une inscription
 *     tags:
 *       - Inscriptions
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'inscription
 *     responses:
 *       200:
 *         description: Inscription supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Inscription inexistante
 *       500:
 *         description: Erreur serveur
 */
