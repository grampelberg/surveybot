import controller from './components/controller';
import events from './components/events';
import server from './components/server';
import keepalive from './components/plugin_glitch';
import registration from './components/user_registration';

import registerHandlers from './handlers/register';
import nag from './handlers/nag';


controller.startTicking();

const webserver = server(controller);

webserver.get('/', (req, res) => res.render('index', {
  domain: req.get('host'),
  protocol: req.protocol,
  glitch_domain:  process.env.PROJECT_DOMAIN,
  layout: 'layouts/default'
}));

webserver.get('/callback/:id', (req, res) => {
  events.emit(`callback:${req.params.id}`);
  res.redirect(req.query.url);
});

keepalive();
registration();
registerHandlers();
nag();
