const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const tokenMdw = require("../middlewares/token.middleware");
const { adminMdw } = require("../middlewares/permission.middleware");

router.post("/", userController.createUser);
router.use(tokenMdw);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.get("/:id/registrations", userController.getUserRegistrations);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Terme de recherche dans les noms ou emails
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page à récupérer (pagination)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'utilisateurs par page
 *     responses:
 *       200:
 *         description: Liste paginée des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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
 * /users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur inexistant
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /users/{id}/registrations:
 *   get:
 *     summary: Récupère les inscriptions d'un utilisateur
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
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
 *         description: Liste paginée des inscriptions de l'utilisateur
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
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur inexistant
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Utilisateurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/inputUser'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Données invalides ou email déjà utilisé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur existant
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Données invalides ou ID invalide
 *       404:
 *         description: Utilisateur inexistant
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
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
 *         description: Utilisateur inexistant
 *       500:
 *         description: Erreur serveur
 */
