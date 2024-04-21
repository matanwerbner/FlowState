import '@testing-library/jest-dom';
import 'whatwg-fetch';

global.structuredClone = (v) => JSON.parse(JSON.stringify(v));
