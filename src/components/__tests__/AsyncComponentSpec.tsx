import * as React from 'react';

import { shallow } from 'enzyme';

import asyncComponent from '../AsyncComponent';

interface DummyProps {
    foo: string;
}
const Dummy = (props: DummyProps) => (<span>I am a dummy component</span>);

describe('asyncComponent()', () => {
  it('should return a component', () => {
    // Arrange
    const promise = Promise.resolve({ default: Dummy });
    const AsyncDummy = asyncComponent(() => promise);

    // Act
    shallow(<AsyncDummy />);

    // Arrange: if we get here, React was able to render the returned component
  });

  it('should display nothing as long as the import is not resolved', () => {
    // Arrange
    const promise = new Promise((resolve, reject) => {
      // Intentionally do nothing. This import is still waiting...
    });
    const AsyncDummy = asyncComponent(() => promise);

    // Act
    const result = shallow(<AsyncDummy />);

    // Assert
    expect(result.children().length).toBe(0);
  });

  it('should display the loaded component', (done) => {
    // Arrange
    const promise = Promise.resolve({ default: Dummy });
    const AsyncDummy = asyncComponent(() => promise);

    // Act
    const result = shallow(<AsyncDummy />);

    // Assert
    setTimeout(() => {
      result.update();
      expect(result.find(Dummy).length).toBe(1);
      done();
    }, 50);
  });

  it('should pass props to the displayed component', (done) => {
    // Arrange
    const promise = Promise.resolve({ default: Dummy });
    const AsyncDummy: React.ComponentType<DummyProps> = asyncComponent(() => promise);

    // Act
    const result = shallow(<AsyncDummy foo='bar' />);

    // Assert
    setTimeout(() => {
      result.update();
      const children = result.find(Dummy);
      expect(children.get(0).props.foo).toBe('bar');
      done();
    }, 50);
  });
});
