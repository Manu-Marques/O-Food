import './styles.scss';

export default function Faq() {
  return (
    <main className="faq">
      <div className="faq__holder">
        <h1 className="faq__heading">FAQ</h1>

        <details className="faq__detail">
          <summary className="faq__summary"><span className="faq__question">Qu'est ce que O'food ?</span></summary>
          <p className="faq__text">O’food est une application dont le but est de suggérer des menus rééquilibrants après renseignement d’ informations basiques de la part de l’utilisateur.</p>
        </details>

        <details className="faq__detail">
          <summary className="faq__summary"><span className="faq__question">Est-ce que O'Food est payant ?</span></summary>
          <p className="faq__text">Non ! O'Food est entiérement gratuit !</p>
        </details>

        <details className="faq__detail">
          <summary className="faq__summary"><span className="faq__question">Comment nous contacter  ?</span></summary>
          <p className="faq__text">Vous pouvez nous contacter soit via le lien <a href="#">contact</a> soit nos reseaux sociaux !</p>
          <p className="faq__text">Le tout se trouve tout en bas de la page.</p>
        </details>

        <details className="faq__detail">
          <summary className="faq__summary"><span className="faq__question">Je n'aime pas les recettes proposées et je souhaite les changer.</span></summary>
          <p className="faq__text">Pas d'inquiétude ! O'Food a pensé à tout ! </p>
          <p className="faq__text">Une fois votre profil complété, le bouton devient vert et vous aurez juste a appuyer pour avoir des nouvelles recettes !</p>
        </details>

        <details className="faq__detail">
          <summary className="faq__summary"><span className="faq__question">Est-ce que je peux ajouter une recette ?</span></summary>
          <p className="faq__text">Cette fonction n'existe pas pour le moment, mais peut etre à l'avenir !</p>
        </details>

      </div>
    </main>

  );
}
