import * as Enzyme from 'enzyme';
import { PreactAdapter } from 'enzyme-adapter-preact-pure';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';

Enzyme.configure({
  adapter: new PreactAdapter(),
});

chai.use(sinonChai);
