import cities from '@/assets/data/db.json'
let uid = require('uuid-random');

export const state = () => ({
  ...cities,
  nodes: cities,
  modalAdd: false,
  modalEdit: false,
  node: null,
  open: false
})

export const actions = {
  DELETE_NODE({commit}, node) {
    commit('SET_DELETED_NODES', node)
  },
  ADD_NODE({commit}, node) {
    commit('SET_ADD_NODE', node)
  },
  EDIT_NODE({commit}, data) {
    commit('SET_EDIT_NODES', data)
  },
  SELECTED_NODE({commit}, node) {
    commit('SET_SELECTED_NODE', node)
  },
  GET_MODAL_ADD({commit}) {
    commit('SET_MODAL_ADD')
  },
  GET_MODAL_EDIT({commit}) {
    commit('SET_MODAL_EDIT')
  },
  GET_OPEN({commit}) {
    commit('SET_OPEN')
  }
}

export const mutations = {
  SET_DELETED_NODES(state, node) {
    remove(state.nodes.cities, node)
    function remove(child, node) {
      const index = child.findIndex((element) => {
        return element.id === node.id;
      });
      if (index > -1) {
        return child.splice(index, 1)[0]
      }
      for (const catg of child) {
        if (catg.children) {
          remove(catg.children, node);
        }
      }
    }
  },
  SET_SELECTED_NODE(state, node) {
    state.node = node
  },
  SET_EDIT_NODES(state, data) {
    edit(state.nodes.cities, state.node)
    function edit(child, node) {
      const editItem = child.find((element) => {
        return element.id === node.id;
      });
      if (editItem) {
        editItem.name = data.name
        editItem.fact_count = +data.fact_count
        if (data.section_name) {
          if (editItem.children) {
            editItem.children.push({
              name: data.section_name,
              fact_count: +data.section_fact_count,
              id: uid(),
              children: [],
              background: data.background
            })
          }
        }
      }
      for (const catg of child) {
        if (catg.children) {
          edit(catg.children, node);
        }
      }
    }
  },
  SET_OPEN(state) {
    state.open = !state.open
  },
  SET_ADD_NODE(state, node) {
    state.nodes.cities.push(node)
  },
  SET_MODAL_ADD(state) {
    state.modalAdd = !state.modalAdd
  },
  SET_MODAL_EDIT(state) {
    state.modalEdit = !state.modalEdit
  }
}

export const getters = {
  NODES(state) {
    return state.nodes
  },
  MODAL_ADD(state) {
    return state.modalAdd
  },
  MODAL_EDIT(state) {
    return state.modalEdit
  },
  OPEN(state) {
    return state.open
  }
}
