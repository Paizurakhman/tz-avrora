<template>
  <div>
    <div class="container">
      <OrganizationStructure @add="GET_MODAL_ADD"/>
      <div class="node-wrapper">
        <div class="node node__header">
          <div></div>
          <div>Общее количество</div>
          <div>Фактическое количество</div>
          <div>Действия</div>
        </div>
        <transition-group tag="ul" name="list" appear>
          <li class="empty" v-if="!nodes.cities.length" key="-1">
            Нет данных!
          </li>
          <TreeEmployer
            v-for="city in nodes.cities"
            :key="city.name"
            :node="city"
            @edit="editData"
            @delete="deleteData"
          />
        </transition-group>
      </div>
    </div>
    <Modal :modal-active="editModal" @toggle="GET_MODAL_EDIT">
      <template #title>Редактировать данные</template>
      <template #body>
        <EditData v-model="editOrg"/>
      </template>
      <template #action>
        <div class="modal-action">
          <button class="btn btn-agree" @click="editOrganization">Редактировать</button>
          <button class="btn btn-cancel" @click="GET_MODAL_EDIT">Отмена</button>
        </div>
      </template>
    </Modal>

    <Modal :modal-active="addModal" @toggle="GET_MODAL_ADD">
      <template #title>Добавить организация</template>
      <template #body>
        <add-data v-model="addOrg"/>
      </template>
      <template #action>
        <div class="modal-action">
          <button class="btn btn-agree" @click="addOrganization">Добавить</button>
          <button class="btn btn-cancel" @click="GET_MODAL_ADD">Отмена</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "~/components/Modal";
import {mapActions, mapGetters} from 'vuex'
import EditData from "~/components/Modal/EditData";
import AddData from "~/components/Modal/AddData";

export default {
  components: {AddData, EditData, Modal},
  data() {
    return {
      addOrg: {
        nameOrganization: null,
        fact_count: null
      },
      editOrg: {
        nameOrganization: null,
        fact_count: null,
        sectionNameOrganization: null,
        sectionFact_count: null
      },
    }
  },
  methods: {
    ...mapActions([
      'GET_MODAL_ADD',
      'GET_MODAL_EDIT',
      'DELETE_NODE',
      'SELECTED_NODE',
      'EDIT_NODE',
      'ADD_NODE'
    ]),
    editData(node) {
      this.editOrg.nameOrganization = node.name
      this.editOrg.fact_count = node.fact_count
      this.SELECTED_NODE({...node})
      this.GET_MODAL_EDIT()
    },
    deleteData(node) {
      if (confirm('Are you sure?')) {
        this.DELETE_NODE({ ...node })
      }
    },
    addOrganization() {
      let organization = {
        id: this.nodes.cities.length + 1,
        name: this.addOrg.nameOrganization,
        fact_count: this.addOrg.fact_count,
        background: "#fff",
        children: []
      }
      if (this.addOrg.nameOrganization) {
        this.ADD_NODE({...organization})
        this.GET_MODAL_ADD()
      }
    },
    editOrganization() {
      // this.edit(this.cities, this.editNode)
      let organization = {
        name: this.editOrg.nameOrganization,
        fact_count: this.editOrg.fact_count,
        section_name: this.editOrg.sectionNameOrganization,
        section_fact_count: this.editOrg.sectionFact_count,
      }
      this.EDIT_NODE({ ...organization })
      this.GET_MODAL_EDIT()
    }
  },
  computed: {
    ...mapGetters([
      'MODAL_ADD',
      'MODAL_EDIT',
      'NODES'
    ]),
    editModal() {
      return this.MODAL_EDIT
    },
    addModal() {
      return this.MODAL_ADD
    },
    nodes() {
      return this.NODES
    }
  },
}
</script>

<style lang="scss">
@import "assets/style/variables";

.container {
  max-width: 1140px;
  margin: 30px auto;

  .node-wrapper {
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);

    .empty {
      text-align: center;
      font-weight: 500;
      font-size: 18px;
      padding: 10px;
    }

    ul {
      position: relative;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .node {
      display: grid;
      grid-template-columns: 3fr 1.5fr 1.5fr 1fr;
      cursor: pointer;

      & > div {
        padding: 10px;
      }

      &__header {
        background: $base-color;
        color: #FFF;
        cursor: default;
        border: 0;

        & > div:not(:first-child) {
          border-left: 1px solid #FFFFFF;
        }
      }

      i {
        transition: 0.3s ease-in-out;
        color: $base-color;

        &.fa-chevron-right {
          font-weight: 400;
          font-size: 12px;
          margin-right: 10px;
        }
      }

      .arrow_active {
        transform: rotate(90deg);
      }
    }
  }
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.list-enter-active {
  transition: 0.4s ease;
}

.list-leave-active {
  transition: 0.4s ease;
  position: absolute;
}

.list-move {
  transition: all 0.4s ease;
}
</style>
