const requests = [
  ["GET", "/vendas", "200", "38 ms"],
  ["POST", "/anuncios", "201", "61 ms"],
  ["GET", "/lucro?mes=11", "200", "44 ms"],
  ["PUT", "/precos/812", "200", "52 ms"],
  ["GET", "/estoque", "200", "29 ms"],
];

/** Fatias empilhadas atrás da face: dão espessura de placa à camada. */
function Edges() {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => (
        <span key={i} className="edge" style={{ "--i": i + 1 } as React.CSSProperties} />
      ))}
    </>
  );
}

/** A pilha em perspectiva. É ilustração: todo o conteúdo real está em SceneCopy. */
export function LayerStack() {
  return (
    <div className="stack" aria-hidden="true">
      <div className="iso">
        <div className="floor" />

        <div className="layer l-infra">
          <Edges />
          <div className="plane">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="pod" />
            ))}
          </div>
        </div>

        <div className="layer l-api">
          <Edges />
          <div className="plane">
            {requests.map(([method, path, status, time]) => (
              <div key={path} className="req">
                <b>{method}</b>
                {path}
                <span>{status}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>

        <span className="pkt" style={{ left: "28%", top: "36%" }} />
        <span className="pkt" style={{ left: "62%", top: "58%" }} />
        <span className="pkt" style={{ left: "80%", top: "24%" }} />

        <div className="layer l-ui">
          <Edges />
          <div className="plane">
            <div className="side">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="main">
              <div className="stats">
                <div>
                  <small>Faturamento</small>
                  <strong id="fat">R$ 48.210</strong>
                </div>
                <div>
                  <small>Lucro</small>
                  <strong>R$ 11,9 mil</strong>
                </div>
                <div>
                  <small>Margem</small>
                  <strong>24,7%</strong>
                </div>
              </div>
              <div className="chart">
                <svg viewBox="0 0 300 90" preserveAspectRatio="none">
                  <path className="ar" d="M0 70 C40 60 60 30 100 40 S160 70 200 35 S270 10 300 18 V90 H0Z" />
                  <path className="ln" d="M0 70 C40 60 60 30 100 40 S160 70 200 35 S270 10 300 18" />
                </svg>
              </div>
            </div>
            <div className="toast">Nova venda: R$ 189,90</div>
          </div>
        </div>
      </div>
    </div>
  );
}
