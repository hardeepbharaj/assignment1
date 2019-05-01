import ReactGA from 'react-ga';
import { currentEnvironmentConfig } from '../../../config/environmentConfig';

export const initializeReactGA = () => {
  const trackId = currentEnvironmentConfig.gaTrackingId;

  ReactGA.initialize(trackId, {
    siteSpeedSampleRate: 100,
  });
};

export const logEvent = (event) => {
  if (typeof window === 'object') {
    ReactGA.event(event);
  	}
};
