// React depends on requestAnimationFrame.
// Make sure to load a polyfill. http://fb.me/react-polyfills
// tslint:disable-next-line:no-var-requires
require('raf/polyfill');

// Setup enzyme's React 16 adapter
import * as Enzyme from 'enzyme';
import * as React16Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new React16Adapter() });
