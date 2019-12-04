import ContactCard from '@/components/contact/Card.vue';
import ContactList from '@/components/contact/List.vue';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vuetify, { Vuetify as VuetifyInterface } from 'vuetify'
import './../jest-setup';

const localVue = createLocalVue();

describe('contact/', () => {
  let vuetify: VuetifyInterface;
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  describe('Card.vue', () => {
    it('renders card with passed props', () => {
      const title = 'Contact Name';
      const phone = '+79998887766';
      const email = 'inbox@example.org';
      const descr = 'My contact';
      const wrapper = mount(ContactCard, {
        localVue,
        vuetify,
        propsData: { title, phone, email },
        slots:     { 'default': descr },
      });

      const cardTitle = wrapper.find('.v-card__title');
      expect(cardTitle.find('.card-title').text()).toBe(title);
      expect(cardTitle.find('.btn-phone .caption').text()).toBe('+7 (999) 888-77-66');
      expect(cardTitle.find('.btn-email .caption').text()).toBe(email);
      expect(cardTitle.find('.btn-phone').attributes('href')).toBe(`tel:${phone}`);
      expect(cardTitle.find('.btn-email').attributes('href')).toBe(`mailto:${email}`);
      expect(wrapper.find('.v-card__text').text()).toBe(descr);

      expect(wrapper.html()).toMatchSnapshot();

      // test remove button click
      const event = jest.fn();
      const rmBtn = wrapper.find('.btn-remove');
      wrapper.vm.$on('remove-btn:clicked', event);
      expect(event).toHaveBeenCalledTimes(0);
      rmBtn.trigger('click');
      expect(event).toHaveBeenCalledTimes(1);
    });
  });
  describe('List.vue', () => {
    it('renders empty list', () => {
      const wrapper = mount(ContactList, {
        localVue,
        vuetify,
        propsData: {
          cards: [],
        },
      });
      expect(wrapper.find('[role=list]').element.innerHTML.trim()).toStrictEqual('');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe('List.vue', () => {
    let wrapper: Wrapper<ContactList>;
    beforeEach(() => {
      wrapper = mount(ContactList, {
        localVue,
        vuetify,
        propsData: {
          cards: [
            { title: 'Contact 1', phone: '+79998887766', email: 'one@example.org', description: 'Contact 1' },
            { title: 'Contact 2', phone: '+79996667788', email: 'two@example.org', description: 'Contact 2' },
          ],
        },
      });
    });
    it('renders two cards', () => {
      expect(wrapper.findAll('[role=listitem]').length).toBe(2);
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('removes a card when cardRemove called and confirmed', () => {
      window.confirm = jest.fn().mockImplementation(() => true);
      // @ts-ignore
      wrapper.vm.cardRemove(0);
      wrapper.vm.$forceUpdate();
      expect(wrapper.props().cards.length).toBe(1);
      expect(wrapper.findAll('[role=listitem]').length).toBe(1);
    });
    it('leaves a card when cardRemove called and not confirmed', () => {
      window.confirm = jest.fn().mockImplementation(() => false);
      // @ts-ignore
      wrapper.vm.cardRemove(0);
      wrapper.vm.$forceUpdate();
      expect(wrapper.props().cards.length).toBe(2);
      expect(wrapper.findAll('[role=listitem]').length).toBe(2);
    });
    it('handles Card.remove-btn:clicked event (mock)', () => {
      // @ts-ignore
      wrapper.vm.cardRemove = jest.fn();
      const card = wrapper.find('.v-card');
      card.vm.$emit('remove-btn:clicked');
      // @ts-ignore
      expect(wrapper.vm.cardRemove).toBeCalledWith(0);
    });
    it('handles Card.remove-btn:clicked event (real)', () => {
      window.confirm = jest.fn().mockImplementation(() => true);
      const card = wrapper.find('.v-card');
      card.vm.$emit('remove-btn:clicked');
      wrapper.vm.$forceUpdate();
      expect(wrapper.props().cards.length).toBe(1);
    });
  });
});
