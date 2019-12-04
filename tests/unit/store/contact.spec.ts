import { A_CONTACT_DELINDEX, ContactState, M_CONTACT_ADD, M_CONTACT_DEL, M_CONTACT_LOAD, Store } from '@/store/contact';

describe('contact/Store', () => {
  let state: ContactState;
  beforeEach(() => {
    state = {list: []};
  });
  describe('mutations', () => {
    it('Load', () => {
      const card1 = {title: 'Card 1'};
      const card2 = {title: 'Card 2'};

      Store.mutations[M_CONTACT_LOAD](state, {cards: [card1, card2]});

      expect(state.list.length).toBe(2);
      expect(state.list[0]).toEqual(card1);
      expect(state.list[0]).not.toBe(card1);
    });
    it('Add', () => {
      const card = {title: 'Card 1'};
      Store.mutations[M_CONTACT_ADD](state, {card});
      expect(state.list.length).toBe(1);
      expect(state.list[0]).toEqual(card);
      expect(state.list[0]).not.toBe(card);
      card.title += '!';
      Store.mutations[M_CONTACT_ADD](state, {card});
      expect(state.list.length).toBe(2);
      expect(state.list[0].title).toEqual('Card 1');
      expect(state.list[1].title).toEqual('Card 1!');
    });
    it('Del', () => {
      const cards = [1, 2, 3].map(i => ({title: `Card ${i}`}));

      Store.mutations[M_CONTACT_LOAD](state, {cards});
      Store.mutations[M_CONTACT_DEL](state, {card: state.list[1]});

      expect(state.list.length).toBe(2);
      expect(state.list).toEqual([cards[0], cards[2]]);
    });
  });
  describe('actions', () => {
    it('Del by index', () => {
      const cards  = [1, 2, 3].map(i => ({title: `Card ${i}`}));
      const commit = jest.fn();

      Store.mutations[M_CONTACT_LOAD](state, {cards});
      Store.actions[A_CONTACT_DELINDEX]({commit, state}, {index: 1});

      expect(commit).toBeCalledWith(M_CONTACT_DEL, {card: cards[1]});
    });
  });
});
