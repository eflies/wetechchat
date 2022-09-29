import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export function clearHistoryState() {
  // clear history state before app load to avoid suppress any effects
  history.replace({
    ...history.location,
    state: undefined,
  });
}