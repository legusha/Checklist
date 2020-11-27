export const inc = () => ({ type: 'INC' });

export const dec = () => ({ type: 'DEC' });

export const rnd = (payload) => ({ type: 'RND', payload });

const actionsMap = {
  inc: () => ({ type: 'INC' }),
  dec: () => ({ type: 'DEC' }),
  rnd: (payload) => ({ type: 'RND', payload })
}

class ActionsWrap {
  constructor(actions) {
    // One instance for all
    if (typeof ActionsWrap.instance === 'object') {
      return ActionsWrap.instance
    }
    console.log(actions)

    ActionsWrap.instance = this
    return this
  }

}

export default new ActionsWrap(actionsMap);
