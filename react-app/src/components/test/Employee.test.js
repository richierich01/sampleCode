import React from 'react';
import { shallow } from 'enzyme';
import Employee from '../Employee';

describe("Employee", () => {
  it("should render employee component", () => {
    const wrapper = shallow(<Employee />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});