import { round } from '../format.js';

// Advisory text shown when a district's predicted yield is compared with its
// baseline (last-3-year average or present yield).

const DETAILED = {
  high: (
    <>
      <h3>Higher yield prediction</h3>
      <p><b>Expected conditions:</b> Our model indicates a higher-than-average yield for your crops this
        season. This could be due to favorable weather conditions, improved farming practices, or better seed quality.</p>
      <p><b>Advisory:</b></p>
      <ul>
        <li><b>Plan for storage:</b> With higher yields, it&apos;s essential to plan for adequate storage to prevent
          post-harvest losses. Ensure your storage facilities are clean, dry, and pest-free.</li>
        <li><b>Market strategy:</b> Consider the possibility of price fluctuations due to increased supply.</li>
        <li><b>Value addition:</b> Explore opportunities for value addition, such as processing or packaging, to
          increase your returns from the higher yield.</li>
      </ul>
    </>
  ),
  low: (
    <>
      <h3>Lower yield prediction</h3>
      <p><b>Expected conditions:</b> Our model has predicted a lower-than-average yield this season, possibly
        due to adverse weather conditions, pest infestations, or other factors.</p>
      <p><b>Advisory:</b></p>
      <ul>
        <li><b>Cost management:</b> Review and manage your input costs carefully. Prioritize essential
          expenditures and avoid unnecessary costs.</li>
        <li><b>Crop insurance:</b> Ensure your crops are insured against potential risks. If you haven&apos;t
          already, consider enrolling in the government&apos;s crop insurance schemes to protect your investment.</li>
        <li><b>Efficient use of resources:</b> Focus on optimizing the use of water, fertilizers, and pesticides
          to reduce waste and improve efficiency.</li>
      </ul>
    </>
  ),
};

const SHORT = {
  high: (
    <>
      <h3>Exciting news: high yield predicted!</h3>
      <p>Our model is forecasting a bumper harvest this season! We recommend ramping up preparations—ensure
        your fields are well-managed, optimize water and fertilizer use, and think ahead about storage solutions and
        market strategies. This season could be one for the record books, so gear up, stay informed, and make the
        most of this promising outlook!</p>
    </>
  ),
  low: (
    <>
      <h3>Urgent advisory: anticipated low yield this season</h3>
      <p>Unfortunately, our model forecasts a lower-than-average yield for the upcoming season. To prepare for
        this challenging period, we strongly advise farmers to consider diversifying crops, carefully managing
        resources, and optimizing expenses. While this season may be difficult, proactive planning and smart
        decisions can help mitigate the impact and ensure your farm&apos;s resilience.</p>
    </>
  ),
};

export default function Advisory({ style, level, district, predicted, baseline }) {
  const text = (style === 'short' ? SHORT : DETAILED)[level];
  return (
    <div className={`advisory card-box advisory-${level}`}>
      <h2>Advisory — {district}</h2>
      <p className="advisory-numbers">
        Predicted: <b>{predicted}</b> · Baseline: <b>{round(baseline)}</b> (Bu/ac)
      </p>
      {text}
    </div>
  );
}
