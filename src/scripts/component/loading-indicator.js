export default class LoadingIndicator extends HTMLElement {
  constructor() {
    super();

    this._style = document.createElement('style');
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
        .loading-indicator {
            display: flex;
            width: 100%;
            height: 100vh;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background-color: transparent;
            z-index: 9999;
            gap: 10px;
        }

        .spinner {
            display: inline-block;
            width: 80px;
            height: 80px;
        }
        .spinner:after {
            content: " ";
            display: block;
            width: 64px;
            height: 64px;
            margin: 8px;
            border-radius: 50%;
            border: 6px solid #ccc;
            border-color: #ccc transparent #ccc transparent;
            animation: spinner 1.2s linear infinite;
        }

        @keyframes spinner {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        .loading-text {
            color: #555;
            font-style: italic;
            font-weight: 500;
            letter-spacing: 0.1rem;
            font-size: 1.2rem;
            animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
            100% {
                opacity: 1;
            }
        }
    `;
  }

  render() {
    this._updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
        <div class='loading-indicator'>
            <div class='spinner'></div>
            <div class='loading-text'>Please Wait...</div>
        </div>
      `;
  }
}
