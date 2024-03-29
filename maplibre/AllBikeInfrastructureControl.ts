export default class AllBikeInfrastructureControl {
  _btn: HTMLButtonElement;
  _container: HTMLDivElement;
  _onClick: Function;

  constructor({ onClick }: { onClick: Function }) {
    this._onClick = onClick;
  }

  onAdd() {
    this._btn = document.createElement('button');
    this._btn.className = 'maplibregl-bike maplibregl-ctrl-icon';
    this._btn.type = 'button';
    this._btn.title = "Voir le reste de l'infrastructure vélo";
    this._btn.onclick = () => this._onClick();

    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl-group maplibregl-ctrl';
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
  }
}
