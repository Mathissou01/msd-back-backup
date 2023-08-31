import "./barometer-legend.scss";

const texts = {
  low: "Faible",
  medium: "Moyen",
  high: "Élevé",
  veryHigh: "Trés élevé",
};

export default function BarometerLegend() {
  return (
    <div className="c-BarometerLegend">
      <p>
        <span className="c-BarometerLegend__Low"></span> {texts.low}
      </p>
      <p>
        <span className="c-BarometerLegend__Medium"></span>
        {texts.medium}
      </p>
      <p>
        <span className="c-BarometerLegend__High"></span> {texts.high}
      </p>
      <p>
        <span className="c-BarometerLegend__VeryHigh"></span>
        {texts.veryHigh}
      </p>
    </div>
  );
}
