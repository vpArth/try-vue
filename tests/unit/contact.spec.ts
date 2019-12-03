import ContactCard from '@/components/contact/Card.vue';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify, { Vuetify as VuetifyInterface } from 'vuetify'
import '@/plugins/vuetify';

const localVue = createLocalVue();

describe('Contact.vue', () => {
  let vuetify: VuetifyInterface;
  beforeEach(() => {
    vuetify = new Vuetify({
      components: [],
    });
  });

  it('renders props when passed', () => {
    const title = 'Contact Name';
    const phone = '+79998887766';
    const email = 'inbox@example.org';
    const descr = 'My contact';
    const wrapper = mount(ContactCard, {
      localVue,
      vuetify,
      propsData: { title, phone, email },
      slots: {'default': descr},
    });

    const cardTitle = wrapper.find('.v-card__title');
    expect(cardTitle.find('.card-title').text()).toEqual(title);
    expect(cardTitle.find('.btn-phone .caption').text()).toEqual(phone);
    expect(cardTitle.find('.btn-email .caption').text()).toEqual(email);
    expect(cardTitle.find('.btn-phone').attributes('href')).toEqual(`tel:${phone}`);
    expect(cardTitle.find('.btn-email').attributes('href')).toEqual(`mailto:${email}`);
    expect(wrapper.find('.v-card__text').text()).toEqual(descr);

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
