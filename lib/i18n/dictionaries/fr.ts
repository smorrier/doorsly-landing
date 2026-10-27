import type { Dictionary } from "@/lib/i18n/types";

/** Québec French, vouvoiement. Colons take a non-breaking space; ? and ! do not (Québec usage). */
export const fr: Dictionary = {
  meta: {
    title: "Doorsly | Gestion immobilière pour propriétaires de 5 à 50 logements",
    description:
      "Baux, loyers, entretien et messages de vos locataires au même endroit. Envoyez un texto à Dora, l’assistante IA, et obtenez un compte de démonstration en 60 secondes. Aucune inscription ni carte de crédit.",
    ogLocale: "fr_CA",
    ogImageAlt:
      "Doorsly : essayez la démo de gestion immobilière en 60 secondes par texto",
  },
  og: {
    headline: "Essayez Doorsly en 60 secondes. Envoyez un texto.",
    subline: "Gestion immobilière pour propriétaires de 5 à 50 logements",
  },
  header: { cta: "Accès anticipé", homeAria: "Accueil Doorsly" },
  language: { switchTo: "English", switchAria: "View this site in English" },
  sms: {
    body: "Bonjour Dora",
    linkAria: "Envoyer un texto au {phone} pour essayer la démo de Doorsly",
  },
  hero: {
    badge: "Maintenant en aperçu préliminaire",
    titleLead: "Essayez Doorsly en 60 secondes.",
    titleAccent: "Envoyez un texto.",
    subtitle:
      "Un logiciel de gestion immobilière conçu pour les petits et moyens propriétaires de 5 à 50 logements.",
    demoEyebrow: "Compte de démonstration instantané",
    demoPrompt: "Dites bonjour à Dora au",
    noSignup: "Aucune inscription ni carte de crédit requise.",
  },
  how: {
    title: "Que se passe-t-il quand vous envoyez un texto?",
    subtitle: "Essayez la plateforme tout de suite, sans formalités.",
    features: [
      {
        title: "Compte instantané",
        description:
          "Nous créons automatiquement un environnement de démonstration sécurisé associé à votre numéro de téléphone. Aucune friction.",
      },
      {
        title: "Parc immobilier d’exemple",
        description:
          "Connectez-vous et trouvez des immeubles, des locataires et des demandes d’entretien déjà remplis.",
      },
      {
        title: "Faites la connaissance de Dora",
        description:
          "Écrivez par texto à Dora, l’assistante IA intégrée à Doorsly, et voyez comment elle traite vos demandes.",
      },
    ],
  },
  about: {
    title: "Ce qu’est Doorsly",
    paragraphs: [
      "Doorsly est un vrai logiciel de gestion immobilière. Il centralise tout votre parc au même endroit : baux, entretien, communications et finances.",
      "Dora est l’accélérateur. C’est l’interface qui rend l’accès à vos données aussi simple que d’envoyer un texto, entre la puissance d’un logiciel et la commodité du quotidien.",
    ],
    whyTitle: "Pourquoi Doorsly existe",
    whyItems: [
      "Fini les demandes d’entretien perdues dans les fils de textos.",
      "Remplacez les chiffriers éparpillés et le suivi manuel des loyers et des virements Interac par un seul système.",
      "Gardez vos échanges avec vos locataires professionnels et consignés.",
      "Passez moins de temps à l’administration et plus à faire croître votre parc.",
    ],
  },
  fit: {
    title: "À qui s’adresse Doorsly?",
    subtitle: "Nous bâtissons Doorsly pour un type précis de propriétaire.",
    goodTitle: "Un bon choix si…",
    goodItems: [
      "Vous gérez de 5 à 50 logements.",
      "Vous utilisez actuellement des chiffriers, des courriels et vos textos personnels.",
      "Vous voulez une interface moderne et simple, sans la lourdeur d’un logiciel d’entreprise.",
    ],
    badTitle: "Pas encore pour vous si…",
    badItems: [
      "Vous gérez plus de 500 unités commerciales.",
      "Vous avez besoin d’un logiciel de comptabilité complexe à plusieurs niveaux.",
      "Vous avez une grande équipe avec des besoins de permissions complexes.",
    ],
  },
  waitlist: {
    title: "Ceci est un aperçu préliminaire",
    body: "Doorsly est en plein développement. Si vous ne souhaitez pas essayer la démo aujourd’hui, mais voulez savoir quand nous lancerons officiellement, inscrivez-vous à la liste d’attente.",
    emailPlaceholder: "Votre adresse courriel",
    emailLabel: "Adresse courriel",
    doorsLabel: "Combien de logements gérez-vous? (facultatif)",
    doorsPlaceholder: "Combien de logements gérez-vous? (facultatif)",
    doorsOptions: {
      "1-4": "1 à 4 logements",
      "5-20": "5 à 20 logements",
      "21-50": "21 à 50 logements",
      "50+": "Plus de 50 logements",
    },
    submit: "Rejoindre la liste",
    privacyNote:
      "Nous utilisons votre courriel seulement pour vous annoncer le lancement de Doorsly.",
    privacyLinkLabel: "Politique de confidentialité",
    errorInvalidEmail: "Veuillez entrer une adresse courriel valide.",
    errorGeneric:
      "Désolé, nous n’avons pas pu vous inscrire pour le moment. Veuillez réessayer.",
    errorRateLimited:
      "Trop de tentatives. Veuillez réessayer dans quelques minutes.",
    successTitle: "Vous êtes sur la liste",
    successBody: "Nous vous écrirons dès que nous serons prêts à vous accueillir.",
  },
  mockup: {
    userMessage: "Bonjour Dora",
    doraMessage:
      "Bonjour, je suis Dora, votre assistante IA en gestion immobilière. Je peux vous aider à suivre vos immeubles, logements, locataires, baux, loyers et soldes de compte, bons de travail, dépenses, fournisseurs, annonces et tâches du jour, le tout dans une seule conversation.",
    inputPlaceholder: "Texto",
  },
  footer: {
    readyLabel: "Prêt à essayer maintenant?",
    textPrompt: "Envoyez n’importe quel texto (essayez « Bonjour Dora ») au",
    rights: "Tous droits réservés.",
    legalNavAria: "Mentions légales",
    privacyLabel: "Politique de confidentialité",
  },
};
