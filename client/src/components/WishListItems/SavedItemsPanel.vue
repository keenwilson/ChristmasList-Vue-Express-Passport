<template>
  <panel title="Saved Items in Your List">
    <section class="saveditemslist">
  <header class="header">
    <h1>todos</h1>
    <input class="new-gift"
      autofocus autocomplete="off"
      placeholder="Any other gift ideas?"
      v-model="newGift"
      @keyup.enter="addGift">
  </header>
  <section class="main" v-show="savedItems.length" v-cloak>
    <input class="toggle-all" type="checkbox" v-model="allDone">
    <ul class="todo-list">
      <li v-for="savedItem in filteredSavedItems"
        class="savedItem"
        :key="savedItem.id"
        :class="{ reserved: savedItem.reserved, editing: savedItem == editedSavedItem }">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="savedItem.reserved">
          <label @dblclick="editedSavedItem(savedItem)">{{ savedItem.itemName }}</label>
          <button class="destroy" @click="removeSavedItem(savedItem)"></button>
        </div>
        <input class="edit" type="text"
          v-model="savedItem.itemName"
          v-saved-item-focus="savedItem == editedSavedItem"
          @blur="doneEdit(savedItem)"
          @keyup.enter="doneEdit(savedItem)"
          @keyup.esc="cancelEdit(savedItem)">
      </li>
    </ul>
  </section>
  <footer class="footer" v-show="savedItems.length" v-cloak>
    <span class="savedItem-count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
    </span>
    <ul class="filters">
      <li><a href="#/all" :class="{ selected: visibility == 'all' }">All</a></li>
      <li><a href="#/active" :class="{ selected: visibility == 'active' }">Active</a></li>
      <li><a href="#/reserved" :class="{ selected: visibility == 'completed' }">Reserved</a></li>
    </ul>
    <button class="clear-reserved" @click="removeCompleted" v-show="savedItems.length > remaining">
      Clear reserved
    </button>
  </footer>
</section>
  </panel>
</template>

<script>
import Vue from 'vue'

// localStorage persistence
var STORAGE_KEY = 'saved-items-vuejs-2.0'
var savedItemStorage = {
  fetch: function () {
    var savedItems = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    savedItems.forEach(function (savedItem, index) {
      savedItem.id = index
    })
    savedItemStorage.uid = savedItems.length
    return savedItems
  },
  save: function (savedItems) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems))
  }
}

// visibility filters
var filters = {
  all: function (savedItems) {
    return savedItems
  },
  active: function (savedItems) {
    return savedItems.filter(function (savedItem) {
      return !savedItem.reserved
    })
  },
  reserved: function (savedItem) {
    return savedItems.filter(function (savedItem) {
      return savedItem.reserved
    })
  }
}

// app Vue instance
var app = new Vue({
  // app initial state
  data: {
    savedItems: savedItemStorage.fetch(),
    newGift: '',
    editedSavedItem: null,
    visibility: 'all'
  },

  // watch todos change for localStorage persistence
  watch: {
    savedItems: {
      handler: function (savedItems) {
        savedItemStorage.save(savedItems)
      },
      deep: true
    }
  },

  // computed properties
  computed: {
    filteredSavedItemss: function () {
      return filters[this.visibility](this.savedItems)
    },
    remaining: function () {
      return filters.active(this.savedItems).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.savedItems.forEach(function (savedItem) {
          savedItem.reserved = value
        })
      }
    }
  },

  filters: {
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addGift: function () {
      var value = this.newGift && this.newGift.trim()
      if (!value) {
        return
      }
      this.savedItems.push({
        id: savedItemStorage.uid++,
        title: value,
        completed: false
      })
      this.newGift = ''
    },

    removeSavedItem: function (savedItem) {
      this.savedItems.splice(this.savedItems.indexOf(savedItem), 1)
    },

    editTodo: function (todo) {
      this.beforeEditCache = savedItem.itemName
      this.editedSavedItem = savedItem
    },

    doneEdit: function (savedItem) {
      if (!this.editedSavedItem) {
        return
      }
      this.editedSavedItem = null
      savedItem.title = savedItem.title.trim()
      if (!savedItem.title) {
        this.removeSavedItem(savedItem)
      }
    },

    cancelEdit: function (savedItem) {
      this.editedSavedItem = null
      savedItem.title = this.beforeEditCache
    },

    removeReserved: function () {
      this.savedItems = filters.active(this.savedItems)
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'saved-item-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})

// handle routing
function onHashChange () {
  var visibility = window.location.hash.replace(/#\/?/, '')
  if (filters[visibility]) {
    app.visibility = visibility
  } else {
    window.location.hash = ''
    app.visibility = 'all'
  }
}

window.addEventListener('hashchange', onHashChange)
onHashChange()

// mount
app.$mount('.todoapp')

</script>

<style>
[v-cloak] { display: none; }
</style>
