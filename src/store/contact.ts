export const M_CONTACT_LOAD = 'm_contact_load';
export const M_CONTACT_ADD  = 'm_contact_add';
export const M_CONTACT_DEL  = 'm_contact_del';

export interface CardInfo {
  title: string;
  phone?: string;
  email?: string;
  description?: string;
}

export interface ContactState {
  list: CardInfo[];
}

export interface ContactStore {
  namespaced?: boolean;
  state: ContactState;
  mutations: {
    [M_CONTACT_LOAD]: (state: ContactState, payload: { cards: CardInfo[] }) => void,
    [M_CONTACT_ADD]: (state: ContactState, payload: { card: CardInfo }) => void,
    [M_CONTACT_DEL]: (state: ContactState, payload: { card: CardInfo }) => void,
  },
  actions: {},
}

export const Store: ContactStore = {
  namespaced: true,

  state: {list: []},

  mutations: {
    [M_CONTACT_LOAD]: (state: ContactState, {cards}) => {
      state.list = [...cards.map(card => ({...card}))];
    },
    [M_CONTACT_ADD]:  (state: ContactState, {card}: { card: CardInfo }) => {
      state.list = [...state.list, {...card}];
    },
    [M_CONTACT_DEL]:  (state: ContactState, {card}: { card: CardInfo }) => {
      state.list = state.list.filter(c => c !== card);
    },
  },

  actions: {},
};

export default Store;
