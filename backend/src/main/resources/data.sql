-- Catégories
INSERT INTO categories (name, description) VALUES ('Général', 'Questions générales sur l''entreprise');
INSERT INTO categories (name, description) VALUES ('Technique', 'Questions techniques et IT');
INSERT INTO categories (name, description) VALUES ('RH', 'Ressources humaines et vie au travail');

-- Questions - Général
INSERT INTO questions (question, answer, category_id) VALUES ('Quels sont les horaires d''ouverture ?', 'Les bureaux sont ouverts de 9h à 18h, du lundi au vendredi.', 1);
INSERT INTO questions (question, answer, category_id) VALUES ('Comment accéder au parking ?', 'Le parking est accessible avec votre badge employé au niveau -1.', 1);
INSERT INTO questions (question, answer, category_id) VALUES ('Où se trouve la cafétéria ?', 'La cafétéria est située au 2ème étage, ouverte de 11h30 à 14h.', 1);

-- Questions - Technique
INSERT INTO questions (question, answer, category_id) VALUES ('Comment me connecter au VPN ?', 'Téléchargez le client VPN depuis l''intranet et utilisez vos identifiants Active Directory.', 2);
INSERT INTO questions (question, answer, category_id) VALUES ('Qui contacter en cas de panne informatique ?', 'Envoyez un mail à support@entreprise.com ou appelez le poste 1234.', 2);
INSERT INTO questions (question, answer, category_id) VALUES ('Comment demander un nouvel équipement ?', 'Faites une demande sur le portail IT en précisant vos besoins et la validation de votre manager.', 2);
INSERT INTO questions (question, answer, category_id) VALUES ('Comment accéder au GitLab interne ?', 'Rendez-vous sur gitlab.entreprise.com et connectez-vous avec votre SSO.', 2);

-- Questions - RH
INSERT INTO questions (question, answer, category_id) VALUES ('Comment poser des congés ?', 'Utilisez l''application RH en ligne. Les demandes doivent être soumises 2 semaines à l''avance.', 3);
INSERT INTO questions (question, answer, category_id) VALUES ('Quelle est la politique de télétravail ?', 'Jusqu''à 3 jours par semaine en télétravail, à valider avec votre manager.', 3);
INSERT INTO questions (question, answer, category_id) VALUES ('Comment fonctionne la mutuelle ?', 'La mutuelle entreprise couvre 80% des frais. Les détails sont sur l''intranet RH.', 3);
