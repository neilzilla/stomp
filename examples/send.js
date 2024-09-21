/**
EXAMPLE: Send each train to a URL
please change the URL below
By default, sends a POST request for each non-empty headcode, formatted as JSON like
  {
    "signal": "77",
    "headcode": "X782"
  }
effectively running
  $ curl --request POST "https://<your-url-here>" -d '{"signal":"77","headcode":"X782"}'
...for EACH signal block with a train inside
can be used with CGI...
*/
function send(data) {
  if (!data) data = {};

  // console.log("data", data)
  const trains = Object.fromEntries(
    Object.entries(data).filter(([signal, headcode]) => {
    return headcode;
  }));
  // console.log("data", trains)

  Object.entries(trains).forEach(([signal, headcode]) => {
    const url = "https://<your-url-here>";
    fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({signal, headcode}),
      }
    )
    .then(response => {
      console.log(response.status);
      return response.text();
    })
    .then(text => {
      console.log(text)
    })
    .catch((err) => {console.log(err)})
  });
}

module.exports = function (signal_blocks) {
    send(signal_blocks);
};

// for testing
if (typeof require !== 'undefined' && require.main === module) {
    send(
      {
	"76":"X762",
	"77": "KKo2",
	"78": "",
      }
    );
}
