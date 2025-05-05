const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const tokenMdw = require("../middlewares/token.middleware");
const { organizerMdw } = require("../middlewares/permission.middleware");

router.use(tokenMdw);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
router.use(organizerMdw);
router.get("/:id/registrations", eventController.getRegistrationByEvent);
router.post("/", eventController.create);
router.put("/:id", eventController.update);
router.delete("/:id", eventController.delete);

module.exports = router;

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Récupère tous les événements
 *     tags:
 *       - Événements
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Terme de recherche dans les titres
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page à récupérer (pagination)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'événements par page
 *     responses:
 *       200:
 *         description: Liste paginée des événements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
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
 * /events:
 *   post:
 *     summary: Crée un nouvel événement
 *     tags:
 *       - Événements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Récupère un événement par son ID
 *     tags:
 *       - Événements
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Détails de l'événement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Événement inexistant
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Met à jour un événement existant
 *     tags:
 *       - Événements
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'événement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Événement mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Données invalides ou ID invalide
 *       404:
 *         description: Événement inexistant
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Supprime un événement
 *     tags:
 *       - Événements
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement supprimé avec succès
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
 *         description: Événement inexistant
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /events/{id}/registrations:
 *   get:
 *     summary: Récupère les inscriptions pour un événement
 *     tags:
 *       - Événements
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'événement
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
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Événement inexistant
 *       500:
 *         description: Erreur serveur
 */
