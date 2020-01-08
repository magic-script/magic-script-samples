// This is the value being passed as the parameter to the 'paramed' path
// Simply change this value to see the value displayed on that route change

// Route params are useful for things like a product detail page where you use
// the same component to render different products. You could place that container
// in a route like '/product-details/:id'. Then in componentDidMount, you could
// pull the ID out of the route and make a fetch request for that product ID's details

const param = 5

export default param
