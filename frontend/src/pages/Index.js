import CompletedCard from '../components/cards/CompletedCard'


export default function Index() {
  // TODO: get most viewed essays and add to CompletedCard

  // render
  return (
    <div className="container">

      {/* main essays of the day */}
      <div className="row">
        <div className="col-12 mb-3">
          <CompletedCard author="essayB" category="U.S" title="BitCoin and Elon Musk" url="/essay/bitcoin-and-elon-musk" />
        </div>
        <div className="col-12 col-md-6 mb-3 d-none d-md-block">
          <CompletedCard author="essayB" category="U.S" title="BitCoin and Elon Musk" url="/essay/bitcoin-and-elon-musk" />
        </div>
        <div className="col-12 col-md-6 mb-3 d-none d-md-block">
          <CompletedCard author="essayB" category="U.S" title="BitCoin and Elon Musk" url="/essay/bitcoin-and-elon-musk" />
        </div>

        {/* last essays */}
        <div className="col-12 col-md-8">
          <h1 className="pt-5 mb-4 fst-italic border-bottom">Last essays</h1>
        </div>

      </div>
    </div>
  )
}
