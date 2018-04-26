module.exports = function(viewName) {
  return (req, res) => res.render(viewName, res.tpl);
};
