const attachArgsToMethods = (mapFunc) => {
  return {
    mapFunc,
    attach(instance) {
      const map = mapFunc
      for (const nameFn in map) {
        // const prop = Object.prototype.isPrototypeOf.call(map, nameFn);
        if (map[nameFn]) {
          const nameEndPoint = map[nameFn]
          instance[nameFn] = instance[nameFn].bind(instance, nameEndPoint)
        }
      }
    },
  }
}

const params = {
  searchParams(paramsType = '') {
    return this.params.find((p) => p.type === paramsType)
  },

  mappingParams(params) {
    let result = ``
    for (const paramsType in params) {
      const paramsValue = params[paramsType]
      const paramOption = this.searchParams(paramsType)

      const paramsValueIsArray = Array.isArray(paramsValue)

      if (paramOption && paramsValueIsArray) {
        const { query } = paramOption
        const paramsValueNew = this.joinParamsArray(paramsValue, query)
        result = this.joinParamsWithoutQuery(result, paramsValueNew)
        continue
      }

      if (paramOption) {
        const { query } = paramOption
        result = this.joinParams(result, query, paramsValue)
      }
    }
    return result
  },

  joinParams(result = '', query, value) {
    result += result
      ? `&${query}=${encodeURIComponent(value)}`
      : `${query}=${encodeURIComponent(value)}`
    return result
  },
  joinParamsArray(paramsValue = [], query) {
    return paramsValue
      .map((item) => {
        return this.joinParams('', query, encodeURIComponent(item))
      })
      .join('&')
  },
  joinParamsWithoutQuery(result = '', value) {
    result += result ? `&${value}` : `${value}`
    return result
  },
}

export {
  attachArgsToMethods,
  params,
}
