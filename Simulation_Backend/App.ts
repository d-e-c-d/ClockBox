// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 5000;
//
// // Middleware pour activer CORS
// app.use(cors());
//
// // Middleware pour traiter les données JSON
// app.use(bodyParser.json());
//
// const filePath = path.join(__dirname, 'Simulation_Backend', 'identifiants.json');
//
// app.post('/register', (req, res) => { // Modifier l'URL de la route selon vos besoins
//     const newUser = req.body;
//
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).send('Erreur lors de la lecture du fichier');
//         }
//
//         let users = [];
//         if (data) {
//             users = JSON.parse(data);
//         }
//
//         users.push(newUser);
//
//         fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
//             if (err) {
//                 return res.status(500).send('Erreur lors de l\'écriture dans le fichier');
//             }
//             res.status(200).send('Données ajoutées avec succès');
//         });
//     });
// });
//
// app.listen(port, () => {
//     console.log(`Serveur en cours d'exécution sur le port ${port}`);
// });
