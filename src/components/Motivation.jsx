export default function Motivation(setShowMotivation, randomQuote) {
    return (
        <>
                  <div
                    className="overlay"
                    onClick={() => setShowMotivation(false)}
                  ></div>
                  <div className="motivationPopup">
                    <h3 className="motivationTitle">🎉 Fantastic!</h3>
                    <p className="motivationText">{randomQuote}</p>
                    <button
                      onClick={() => setShowMotivation(false)}
                      className="motivationButton"
                    >
                      Keep Going!
                    </button>
                  </div>
                </>
    )
}