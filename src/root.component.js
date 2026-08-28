export default function Root(props) {
  const isProduction =
    window.location.hostname === "bytebank-microfrontends.github.io";

  const basePath = isProduction ? "/bytebank-orchestrator" : "";

  function onClick() {
    const event = new CustomEvent("onNavClick");
    document.dispatchEvent(event);
  }

  return (
    <section>
      <nav>
        <a href={`${basePath}/`}>Início</a>{" "}
        <a href={`${basePath}/account`}>Conta</a>{" "}
        <a href={`${basePath}/transaction`}>Transações</a>{" "}
        <a href={`${basePath}/cards`}>Cartões</a>
      </nav>

      <div>
        {props.name} is mounted!
        <button onClick={onClick}>Broadcast do evento do navbar</button>
      </div>
    </section>
  );
}
