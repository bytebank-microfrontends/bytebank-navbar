export default function Root(props) {
  function onClick() {
    const event = new CustomEvent("onNavClick");
    document.dispatchEvent(event);
  }
  return (
    <section>
      {props.name} is mounted!
      <button onClick={onClick}>Broadcast do evento do navbar</button>
    </section>
  );
}
