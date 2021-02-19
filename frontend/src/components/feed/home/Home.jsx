import MainCard from '../maincard/MainCard'


export default function Home() {
  // TODO: get most viewed essays and add to MainCard

  // render
  return (
    <div className="container">
      <h1 className="pb-2 mb-4 fst-italic border-bottom">Most viewed today</h1>
      <div className="row">
        <div className="col-12 mb-3">
          <MainCard category="U.S" title="BitCoin and Elon Musk" backgroundImage="/static/default-maincard-background.jpeg" url="/essay/bitcoin-and-elon-musk" />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <MainCard category="U.S" title="BitCoin and Elon Musk" backgroundImage="/static/default-maincard-background.jpeg" url="/essay/bitcoin-and-elon-musk" />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <MainCard category="U.S" title="BitCoin and Elon Musk" backgroundImage="/static/default-maincard-background.jpeg" url="/essay/bitcoin-and-elon-musk" />
        </div>
      </div>
    </div>
  )

}
