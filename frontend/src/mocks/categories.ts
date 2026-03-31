import type { Category } from "../types/category";

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Général",
    description: "Questions générales sur l'entreprise",
    questions: [
      {
        id: 1,
        question: "Quels sont les horaires d'ouverture ?",
        answer: "Les bureaux sont ouverts de 9h à 18h, du lundi au vendredi.",
      },
      {
        id: 2,
        question: "Comment accéder au parking ?",
        answer: "Le parking est accessible avec votre badge employé au niveau -1.",
      },
      {
        id: 3,
        question: "Où se trouve la cafétéria ?",
        answer: "La cafétéria est située au 2ème étage, ouverte de 11h30 à 14h.",
      },
    ],
  },
  {
    id: 2,
    name: "Technique",
    description: "Questions techniques et IT",
    questions: [
      {
        id: 4,
        question: "Comment me connecter au VPN ?",
        answer:
          "Téléchargez le client VPN depuis l'intranet et utilisez vos identifiants Active Directory.",
      },
      {
        id: 5,
        question: "Qui contacter en cas de panne informatique ?",
        answer: "Envoyez un mail à support@entreprise.com ou appelez le poste 1234.",
      },
      {
        id: 6,
        question: "Comment demander un nouvel équipement ?",
        answer:
          "Faites une demande sur le portail IT en précisant vos besoins et la validation de votre manager.",
      },
      {
        id: 7,
        question: "Comment accéder au GitLab interne ?",
        answer: "Rendez-vous sur gitlab.entreprise.com et connectez-vous avec votre SSO.",
      },
    ],
  },
  {
    id: 3,
    name: "RH",
    description: "Ressources humaines et vie au travail",
    questions: [
      {
        id: 8,
        question: "Comment poser des congés ?",
        answer:
          "Utilisez l'application RH en ligne. Les demandes doivent être soumises 2 semaines à l'avance.",
      },
      {
        id: 9,
        question: "Quelle est la politique de télétravail ?",
        answer: "Jusqu'à 3 jours par semaine en télétravail, à valider avec votre manager.",
      },
      {
        id: 10,
        question: "Comment fonctionne la mutuelle ?",
        answer: "La mutuelle entreprise couvre 80% des frais. Les détails sont sur l'intranet RH.",
      },
    ],
  },
];
