import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

configure({ adapter: new Adapter() })

// Avoid the following warning
// Warning: useLayoutEffect does nothing on the server,...
React.useLayoutEffect = React.useEffect
