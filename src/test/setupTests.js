import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from "jest-fetch-mock"



fetchMock.enableMocks()
global.React = React;
global.render = render;
global.userEvent = userEvent;
