import type { PrivacyDoc } from "@/lib/i18n/types";

/** Québec French, vouvoiement. Non-breaking space before colons and inside guillemets. */
export const privacyFr: PrivacyDoc = {
  metaTitle: "Politique de confidentialité | Doorsly",
  metaDescription:
    "Les renseignements personnels que le site de Doorsly recueille, pourquoi, les témoins utilisés, la durée de conservation et la façon d’exercer vos droits.",
  title: "Politique de confidentialité",
  updatedLabel: "Dernière mise à jour",
  updated: "26 octobre 2026",
  backLabel: "Retour à Doorsly",
  sections: [
    {
      id: "about",
      title: "Qui nous sommes",
      blocks: [
        "Doorsly est un logiciel de gestion immobilière pour les propriétaires de 5 à 50 logements. Ce site, getdoorsly.com, présente Doorsly et permet de s’inscrire à la liste d’attente.",
        "La personne responsable de la protection des renseignements personnels est {officerName}, joignable à {officerEmail}.",
        "La présente politique respecte la Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25) et la LPRPDE fédérale. Elle ne vise que ce site. Quand vous envoyez un texto à Dora, votre message passe par l’application de messagerie de votre téléphone et votre fournisseur de services, puis arrive au service de démonstration de Doorsly, qui est distinct de ce site. La présente politique ne décrit pas ce service.",
      ],
    },
    {
      id: "collect",
      title: "Ce que nous recueillons",
      blocks: [
        "Nous recueillons seulement ce qui est indiqué ici.",
        [
          "Quand vous vous inscrivez à la liste d’attente : votre adresse courriel et, si vous le souhaitez, le nombre de logements que vous gérez (1 à 4, 5 à 20, 21 à 50 ou plus de 50).",
          "Transmis avec le formulaire : la langue de la page et, si vous venez d’une publicité, les paramètres de l’adresse de la page (utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid et gclid). Ils nous indiquent quelle campagne vous a amené.",
          "Les détails techniques de votre requête, comme votre adresse IP et votre navigateur. Nous utilisons brièvement l’adresse IP pour limiter les envois répétés; nous ne la conservons pas avec votre inscription.",
          "Si vous acceptez les témoins : les identifiants et les événements décrits dans la section « Témoins et traceurs », par exemple que vous avez consulté la page, rejoint la liste d’attente ou touché le lien du texto.",
        ],
        "Nous ne demandons ni votre nom, ni des renseignements de paiement, ni quoi que ce soit d’autre sur ce site. Nous ne vendons pas de renseignements personnels.",
      ],
    },
    {
      id: "purposes",
      title: "Pourquoi nous les utilisons",
      blocks: [
        [
          "Renseignements de la liste d’attente : vous écrire au lancement de Doorsly et comprendre quels types de propriétaires et quelles campagnes suscitent de l’intérêt.",
          "Mesure d’audience (seulement avec votre consentement) : savoir combien de personnes consultent la page, rejoignent la liste d’attente ou touchent le lien du texto.",
          "Publicité (seulement avec votre consentement) : mesurer et améliorer nos publicités sur Meta (Facebook et Instagram) et Google, notamment relier une inscription à la publicité qui l’a suscitée.",
          "Détails techniques : protéger le formulaire contre les abus.",
        ],
      ],
    },
    {
      id: "consent",
      title: "Votre consentement et vos choix",
      blocks: [
        "Les témoins de mesure d’audience et de publicité sont désactivés tant que vous n’avez pas choisi. La bannière offre deux choix distincts, Mesure d’audience et Publicité, et Tout refuser est aussi simple que Tout accepter. Tant que vous n’avez pas accepté, rien n’est chargé depuis Google ou Meta et rien ne leur est envoyé.",
        "Vous pouvez modifier votre choix en tout temps avec le lien « Préférences des témoins » au bas de chaque page : {cookiePrefs}. Retirer votre consentement arrête les traceurs et supprime leurs témoins sur ce site.",
        "En envoyant le formulaire de la liste d’attente, vous acceptez que nous vous écrivions au sujet du lancement de Doorsly. Chaque courriel comprendra un moyen de vous désabonner, et vous pouvez aussi nous écrire à {officerEmail}.",
      ],
    },
    {
      id: "cookies",
      title: "Témoins et traceurs",
      blocks: [
        "Nous utilisons un témoin (cookie) qui nous appartient et qui est toujours actif, ainsi que des témoins de Google et de Meta seulement si vous les acceptez.",
        "Google Analytics, Google Ads et Meta peuvent aussi recevoir votre adresse IP et des détails sur votre navigateur au moment où ils se chargent, ce qui n’arrive qu’après votre acceptation. Nos balises Google fonctionnent en mode de consentement (Consent Mode), tout stockage étant refusé tant que vous n’avez pas accepté.",
      ],
      table: {
        head: ["Nom", "Fournisseur", "Catégorie", "Raison d’être", "Durée"],
        rows: [
          ["dl_consent", "Doorsly", "Nécessaire", "Mémorise vos choix sur les témoins", "13 mois"],
          ["_ga, _ga_*", "Google Analytics", "Mesure d’audience", "Mesure d’audience", "2 ans"],
          ["_gcl_au, _gcl_aw", "Google Ads", "Publicité", "Mesure des conversions publicitaires", "90 jours"],
          ["_fbp", "Meta", "Publicité", "Identifie votre navigateur pour mesurer les publicités", "90 jours"],
          ["_fbc", "Meta", "Publicité", "Conserve l’identifiant de clic publicitaire (fbclid)", "90 jours"],
        ],
      },
    },
    {
      id: "sharing",
      title: "Qui reçoit vos renseignements",
      blocks: [
        [
          "Slack : chaque inscription (courriel, tranche de logements, langue et paramètres de campagne) est publiée dans le canal privé de notre équipe.",
          "Loops : notre fournisseur de service courriel conserve votre contact de la liste d’attente et envoie nos courriels de lancement.",
          "Meta (Facebook et Instagram), seulement si vous avez accepté la Publicité : le pixel Meta dans votre navigateur et notre serveur envoient des événements comme la consultation de la page, l’inscription à la liste d’attente et le toucher du lien du texto. Pour une inscription, notre serveur envoie aussi une adresse courriel hachée (chiffrée de façon irréversible), votre adresse IP, votre navigateur et des identifiants publicitaires, afin que Meta compte l’inscription une seule fois et l’associe à la publicité.",
          "Google, seulement si vous avez accepté la Mesure d’audience ou la Publicité : Google Analytics et la balise Google Ads reçoivent les consultations de page et les événements generate_lead et demo_sms_click.",
          "Notre hébergeur traite pour nous les requêtes adressées au site.",
        ],
        "Ces fournisseurs peuvent traiter des données à l’extérieur du Québec et du Canada, notamment aux États-Unis, où les lois sur la vie privée peuvent différer. Nous leur transmettons seulement ce qui est décrit ici, et nous ne vendons pas de renseignements personnels.",
      ],
    },
    {
      id: "retention",
      title: "Combien de temps nous les conservons",
      blocks: [
        [
          "Contact de la liste d’attente (Loops) et notification Slack : jusqu’à ce que vous vous désabonniez ou demandiez leur suppression, et au plus 24 mois après votre inscription, sauf si vous commencez à utiliser Doorsly.",
          "Témoins : pendant les durées indiquées dans le tableau ci-dessus. Votre choix est conservé 13 mois, puis nous vous le redemandons.",
          "Données de Google Analytics : 14 mois.",
          "Les données conservées par Meta et Google suivent leurs propres politiques de conservation.",
          "Votre adresse IP, pour limiter les envois du formulaire : quelques minutes, dans la mémoire du serveur seulement.",
        ],
      ],
    },
    {
      id: "rights",
      title: "Vos droits",
      blocks: [
        "Vous pouvez en tout temps :",
        [
          "accéder aux renseignements personnels que nous détenons à votre sujet",
          "les faire corriger",
          "retirer votre consentement (témoins, courriels)",
          "demander leur suppression ou la cessation de leur utilisation",
          "en obtenir une copie dans un format structuré et couramment utilisé (portabilité)",
          "savoir comment ils ont été utilisés. Aucune décision à votre sujet n’est prise uniquement par traitement automatisé.",
        ],
        "Écrivez à {officerName} à {officerEmail}. Nous répondons dans un délai de 30 jours. Nous pouvons vous demander de confirmer votre identité, par exemple en écrivant depuis l’adresse utilisée pour l’inscription.",
        "Si notre réponse ne vous satisfait pas, vous pouvez déposer une plainte auprès de la Commission d’accès à l’information du Québec (cai.gouv.qc.ca) ou du Commissariat à la protection de la vie privée du Canada (priv.gc.ca).",
      ],
    },
    {
      id: "security",
      title: "Sécurité",
      blocks: [
        "Les pages sont servies en HTTPS, l’accès aux renseignements de la liste d’attente est limité aux personnes qui en ont besoin, et les adresses courriel sont hachées avant d’être envoyées à Meta. En cas d’incident de confidentialité présentant un risque de préjudice sérieux, nous vous aviserons, ainsi que la Commission d’accès à l’information, comme la loi l’exige.",
      ],
    },
    {
      id: "changes",
      title: "Modifications de cette politique",
      blocks: [
        "Nous pouvons modifier cette politique. La date en haut indique la dernière version. Si un changement touche vos choix de témoins, nous vous demanderons de nouveau votre consentement.",
      ],
    },
  ],
};
