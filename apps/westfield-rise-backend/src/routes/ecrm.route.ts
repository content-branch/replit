
import express from 'express';
import * as ecrmController from '../controllers/ecrm.controller';

const router = express.Router();

/**
 * @swagger
 *  /api/create-contact:
 *    post:
 *      summary: 'Creates a Contact in Brevo'
 *      description: 'Endpoint to create a contact in Brevo with email, brevo mail list IDs, and redirect URL.'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              properties:
 *                emailAddress:
 *                  type: 'string'
 *                  description: 'Email address of the user.'
 *                  example: 'string10@mailinator.com'
 *                brevoMailListId:
 *                  type: 'array'
 *                  items:
 *                    type: 'integer'
 *                  description: 'List of Brevo mail list IDs.'
 *                  example: [2]
 *      responses:
 *        '201':
 *          description: 'Successfully created'
 *          content:
 *            application/json:
 *              schema:
 *                type: 'object'
 *                properties:
 *                  result:
 *                    type: 'string'
 *                    description: 'Result of the operation.'
 *        '409':
 *          description: 'Conflict - resource already exists.'
 *          content:
 *            application/json:
 *              schema:
 *                type: 'object'
 *                properties:
 *                  error:
 *                    type: 'string'
 *                    description: 'Error message.'
 *        '500':
 *          description: 'Internal server error.'
 *          content:
 *            application/json:
 *              schema:
 *                type: 'object'
 *                properties:
 *                  error:
 *                    type: 'string'
 *                    description: 'Error message.'
 */
router.post('/create-contact', ecrmController.createContact);

/**
 * @swagger
  * /api/create-double-opt-in-contact:
 *   post:
 *     summary: 'Create Contact via DOI (Double-Opt-In) Flow'
 *     description: 'Endpoint to create a contact in Brevo with email, brevo mail list IDs, and redirect URL. This endpoint will send a DOI email to the user.'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             properties:
 *               emailAddress:
 *                 type: 'string'
 *                 description: 'Email address of the user.'
 *                 example: 'string10@mailinator.com'
 *               brevoMailListId:
 *                 type: 'array'
 *                 items:
 *                   type: 'integer'
 *                 description: 'List of Brevo mail list IDs.'
 *                 example: [2]
 *               redirectUrl:
 *                 type: 'string'
 *                 description: 'Redirection URL.'
 *                 example: 'https://westfieldrise.com'
 *     responses:
 *       '201':
 *         description: 'Successfully created'
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 result:
 *                   type: 'string'
 *                   description: 'Result of the operation.'
 *       '409':
 *         description: 'Conflict - resource already exists.'
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 error:
 *                   type: 'string'
 *                   description: 'Error message.'
 *       '500':
 *         description: 'Internal server error.'
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 error:
 *                   type: 'string'
 *                   description: 'Error message.'  
 */
router.post('/create-double-opt-in-contact', ecrmController.createDubleOptInContact);

export default router;