const { join } = require('path')

/**
 * For every route specified under a registered directory, changes
 * route path to comply with the content's permalink configuration.
 *
 * @note We make the original route path an alias to comply
 *
 */
export default function interceptRoutes (routes, options) {
  // get route and permalink pair for every registered directory
  const contentRoutePaths =  {}
  options.dirs.forEach(registeredType => { // get [route, permalink] pair
    const dirOpts = registeredType[1] || {}
    const routeName = dirOpts.routeName || options.routeName
    if (!routeName) return
    const path = join('/' + dirOpts.permalink || options.permalink)
    contentRoutePaths[routeName] = path
  })

  routes.forEach(route => {
    if (contentRoutePaths[route.name]) { // TODO
      console.log(contentRoutePaths[route.name])
      // const staticPath = route.path
      route.path = contentRoutePaths[route.name]
      // route.alias = staticPath
    }
  })
}