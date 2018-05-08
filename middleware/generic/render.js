/**
 * Using the template engine render the values into the template
 */
module.exports = (objectrepository, viewName) => {
  return (req, res) => {
    console.log('renderMW');
    res.render(viewName, res.tpl);
  };
};
