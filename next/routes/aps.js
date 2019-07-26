module.exports = (aps, server, app) => {
  // route /rack/m/:id
  server.get(`${aps}/rack/m/:id`, function (req, res) {
    const actualPage = `${aps}/plc/et200m`
    const queryParam = { rackNumber: (req.params.id - 1) }
    app.render(req, res, actualPage, queryParam)
  })
  // route /rack/s/:id
  server.get(`${aps}/rack/s/:id`, function (req, res) {
    const actualPage = `${aps}/plc/et200s`
    const queryParam = { rackNumber: (req.params.id - 1) }
    app.render(req, res, actualPage, queryParam)
  })
}
