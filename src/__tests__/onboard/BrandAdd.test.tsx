import { mount, shallow } from 'enzyme';
import * as React from 'react';

import { IButtonMutateProps } from '../../modules/common/types';
import BrandAdd from '../../modules/onboard/components/BrandAdd';

describe('BrandAdd component', () => {
  const defaultProps = {
    brandsTotalCount: 0,
    changeStep: () => null,
    renderButton: (props: IButtonMutateProps) => <div />
  };

  test('renders BrandAdd successfully', () => {
    shallow(<BrandAdd {...defaultProps} />);
  });

  test('renders successfully with default value', () => {
    const wrapper = mount(<BrandAdd {...defaultProps} />);
    const props = wrapper.props();

    expect(props).toMatchObject(defaultProps);
  });
});
