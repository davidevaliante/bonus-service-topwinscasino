import React from "react";
import styled from "styled-components";
import LazyImage from "../Lazy/LazyImage";
import { FunctionComponent } from "react";

interface Props {
  countryCode: string;
}

const palette = {
  darkBg: "#2e2e2e",
  extraDarkBg: "#1c1c1c",
  red: "#f95565",
};

const translations = {
  it: "Questo sito confronta [in tempo reale] i bonus offerti dai Bookmakers da noi selezionati, in possesso di regolare concessione ad operare in Italia rilasciata dall’Agenzia delle Dogane e dei Monopoli. Il servizio, come indicato dall’Autorità per le garanzie nelle comunicazioni al punto 5.6 delle proprie Linee Guida (allegate alla delibera 132/19/CONS), è effettuato nel rispetto del principio di continenza, non ingannevolezza e trasparenza e non costituisce pertanto una forma di pubblicità",
  row: "This website compares in real time the bonuses from Bookmakers we selected with a regular license. This website should not be used below the age of 18. Gambling is addictive, just play for fun and don't chase your losses",
  de: "Diese Site fördert oder unterstützt keine Form von Wetten oder Glücksspielen für Benutzer unter 18 Jahren. Glücksspiel macht süchtig und ist keine Form des Einkommens. Tun Sie es nur zum Spaß und jagen Sie niemals einem Verlust nach.",
  es: "Este sitio no promueve ni respalda ninguna forma de apuestas o juegos de azar para usuarios menores de 18 años. El juego es adictivo y no es una forma de ingresos, simplemente hágalo por diversión y no busque ninguna pérdida.",
  fi: "Tällä verkkosivustolla ei mainosta eikä tue minkäänlaista vedonlyöntiä tai uhkapelejä alle 18-vuotiaille käyttäjille. Uhkapelit ovat riippuvuutta aiheuttavia eivätkä ne ole tulonmuotoja, tee vain hauskanpitoa äläkä koskaan jahtaa tappioita.",
  no: "Dette nettstedet fremmer ikke eller støtter noen form for omsetning eller pengespill til brukere under 18 år. Gambling er vanedannende, og det er ikke en form for inntekt, bare gjør det for moro skyld og ikke noen gang jage noe tap.",
  se: "Denna webbplats kanalen marknadsför eller stöder inte någon form av satsning eller spel till användare under 18 år. Spel är beroendeframkallande och det är ingen form av inkomst, gör det bara för skojs skull och jagar aldrig någon förlust.",
  pt: "Esse site não promove ou endossa qualquer forma de aposta ou jogo para usuários menores de 18 anos. O jogo é viciante e não é uma forma de renda, apenas faça isso para se divertir e nunca perseguir qualquer perda.",
};

const VideoDiscalimer: FunctionComponent<Props> = ({ countryCode }) => {
  const translate = () =>
    translations[countryCode] ? translations[countryCode] : translations["row"];

  return (
    <Container>
      {translate()}

      {countryCode === "it" && (
        <div>
          <p style={{ margin: "1rem 0rem" }}>
            Il gioco è vietato ai minori e può causare dipendenza patologica.
            Gioca responsabilmente.
          </p>
          <div
            style={{
              display: "flex",
              background: "white",
              padding: "1rem",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <LazyImage
              width={90}
              height={60}
              alt="alert icon"
              src="/images/adm.png"
            />

            <LazyImage
              width={70}
              height={70}
              alt="alert icon"
              src="/images/18.svg"
            />
          </div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  color: black;
  background: white;
  padding: 1rem 2rem;
  position: relative;
  max-width: 400px;
  border-radius: 8px;
  margin: 3rem auto;
  border: 3px solid ${palette.darkBg};
  font-family: "Roboto", sans-serif;
  box-shadow: 3px 3px 5px 0px rgba(50, 50, 50, 0.75);
  .alert-container {
    position: absolute;
    top: -30px;
    left: -20px;
  }
`;

export default VideoDiscalimer;
