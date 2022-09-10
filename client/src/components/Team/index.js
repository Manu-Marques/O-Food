import './styles.scss';

export default function Team() {
  return (
    <main className="team">
      <div className="team__container">
        <h1 className="team__heading">L'équipe O'food</h1>

    <div className="first_line">

        <a className="link__git" href="https://github.com/GuirecTalmo" target="_blank">
          <div className="card_team">
            <div className="img__container"><img className="img__avatar" src="https://i89.servimg.com/u/f89/09/02/66/41/avmys10.jpg" alt="Photo Guirec" /></div>
            <div className="desc__container">
              <p className="name__team">Guirec Talmo</p>
              <p className="role__team">Product Owner</p>
            </div>
          </div>
        </a>

          <a className="link__git" href="https://github.com/KhadimRenahyMar" target="_blank">
          <div className="card_team">
            <div className="img__container"><img className="img__avatar" src="https://ca.slack-edge.com/T02MBC4J9K5-U02N47TDG5B-740305c5d53f-512" alt="Photo Khadim Renahy-Mar" /></div>
            <div className="desc__container">
              <p className="name__team">Khadim Renahy-Mar</p>
              <p className="role__team">Project Manager</p>
            </div>
          </div>
          </a>

          <a className="link__git" href="https://github.com/Manu-Marques" target="_blank">
          <div className="card_team">
            <div className="img__container"><img className="img__avatar" src="https://i89.servimg.com/u/f89/09/02/66/41/manuma12.jpg" alt="Photo Emanuel Marques" /></div>
            <div className="desc__container">
              <p className="name__team">Emanuel Marques</p>
              <p className="role__team">Lead Dev Front</p>
            </div>
          </div>
          </a>

    </div>
      
    <div className="second_line">

      <a className="link__git img__1" href="https://github.com/nicolas-rouille" target="_blank">
        <div className="card_team">
          <div className="img__container"><img className="img__avatar" src="https://ca.slack-edge.com/T02MBC4J9K5-U02MZ8TRZJA-f647aa4e9676-512" alt="Photo Nicolas Rouille" /></div>
          <div className="desc__container">
            <p className="name__team">Nicolas Rouille</p>
            <p className="role__team">Lead Dev Back</p>
          </div>
        </div>
      </a>

      <a className="link__git img__2" href="https://github.com/dassepascal" target="_blank">
        <div className="card_team">
          <div className="img__container"><img className="img__avatar" src="https://ca.slack-edge.com/T02MBC4J9K5-U036X5QJCEB-508dd38ed31a-512" alt="Photo Pascal dasse" /></div>
          <div className="desc__container">
            <p className="name__team">Pascal dasse</p>
            <p className="role__team">Git master</p>
          </div>
        </div>
      </a>

    </div>

      </div>
    </main>

  );
}
