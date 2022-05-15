import inbox from './inbox';
import activities from './activities';

const eventHandlers = (data, dispatchEvent, store) => {
  const HANDLERS = {
    [inbox.topic]: inbox.handler,
    [activities.topic]: activities.handler,
  };

  if (data.topic && HANDLERS[data.topic]) {
    const handler = HANDLERS[data.topic];
    handler(data, dispatchEvent, store);
  }
};
export default eventHandlers
