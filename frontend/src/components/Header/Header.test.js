import React from 'react';
import Header from '../Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

test('renders without crashing', () => {
    shallow(<Header />);
});

test('renders a StyledHeader component', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('StyledHeader').length).toBe(1);
});

test('renders a Link component with the correct props', () => {
    const wrapper = shallow(<Header />);
    const link = wrapper.find('Link');
    expect(link.length).toBe(1);
    expect(link.props().to).toBe('/');
    expect(link.props().id).toBe('logo-container');
});

test('renders a h1 element with the correct props', () => {
    const wrapper = shallow(<Header />);
    const h1 = wrapper.find('h1');
    expect(h1.length).toBe(1);
    expect(h1.props().id).toBe('logo');
    expect(h1.text()).toBe('Twitch');
});

