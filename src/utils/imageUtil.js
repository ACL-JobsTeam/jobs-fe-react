import Stripe from '../assets/stripe.png';
import Airbnb from '../assets/airbnb.jpeg';
import Coinbase from '../assets/coinbase.png';
import Discord from '../assets/discord.png';
import Doordash from '../assets/doordash.png';
import Github from '../assets/github.jpeg';
import Glassdoor from '../assets/glassdoor.png';
import Lyft from '../assets/lyft.jpeg';
import Netlify from '../assets/netlify.jpeg';
import Reddit from '../assets/reddit.png';
import Robinhood from '../assets/robinhood.png';
import Strava from '../assets/strava.png';
import Twitch from '../assets/twitch.png';

export const imageFinder = (company) => {
  if (company === 'stripe') {
    return Stripe;
  } else if (company === 'airbnb') {
    return Airbnb;
  } else if (company === 'coinbase') {
    return Coinbase;
  } else if (company === 'discord') {
    return Discord;
  } else if (company === 'doordash') {
    return Doordash;
  } else if (company === 'github') {
    return Github;
  } else if (company === 'glassdoor') {
    return Glassdoor;
  } else if (company === 'lyft') {
    return Lyft;
  } else if (company === 'netlify') {
    return Netlify;
  } else if (company === 'reddit') {
    return Reddit;
  } else if (company === 'robinhood') {
    return Robinhood;
  } else if (company === 'strava') {
    return Strava;
  } else {
    return Twitch;
  }
};
