import config from 'ember-get-config';
const { metis } = config;

export function genClassRoute(basePath, self) {
  return function (name, options) {
    let route;
    if (basePath) {
      route = basePath + '.' + name;
    } else {
      route = name;
    }

    const resourceClass = options.class;
    metis.routes[resourceClass] = route;

    return this.route(name, options);
  }.bind(self);
}

export default function classRoute(route, name, options) {
  // Calculate target route
  let routeString;
  if (route.parent !== 'application') {
    routeString = `${route.parent}.${name}`;
  } else {
    routeString = name;
  }

  // Register class route combination
  // The register is used to redirect to custom pages based on
  // the subject's rdf:Class
  const resourceClass = options.class;
  if (!metis.routes || typeof metis.routes != 'object') metis.routes = {};
  metis.routes[resourceClass] = routeString;

  // Create new route
  return route.route(name, options);
}
