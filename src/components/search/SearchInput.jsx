import React from 'react';
import './list.css';

const SearchInput = () => {
  const companies = [
    {
      name: 'Lyft',
      color: '#F91E81',
      image: '../../assets/lyft.jpeg',
    },
    {
      name: 'Airbnb',
      color: '#F91E81',
      image: '../../assets/airbnb.jpeg',
    },
    {
      name: 'Stripe',
      color: '#F91E81',
      image: '../../assets/stripe.png',
    },
    {
      name: 'Twitch',
      color: '#F91E81',
      image: '../../assets/twitch.png',
    },
    {
      name: 'Coinbase',
      color: '#F91E81',
      image: '../../assets/coinbase.png',
    },
    {
      name: 'Discord',
      color: '#F91E81',
      image: '../../assets/discord.png',
    },
    {
      name: 'Github',
      color: '#F91E81',
      image: '../../assets/github.jpeg',
    },
    {
      name: 'Reddit',
      color: '#F91E81',
      image: '../../assets/reddit.png',
    },
    {
      name: 'Strava',
      color: '#F91E81',
      image: '../../assets/strava.png',
    },
    {
      name: 'Glassdoor',
      color: '#F91E81',
      image: '../../assets/glassdoor.png',
    },
    {
      name: 'Netlify',
      color: '#F91E81',
      image: '../../assets/netlify.png',
    },
    {
      name: 'Robinhood',
      color: '#F91E81',
      image: '../../assets/robinhood.png',
    },
    {
      name: 'Doordash',
      color: '#F91E81',
      image: '../../assets/doordash.png',
    },
  ];
  return (
    <div className="search-header">
      <section className="company-section">
        {companies.map((company) => (
          <label key={company.name} className={company.name}>
            {company.name}
            <input type="checkbox" value={company.name} />
          </label>
        ))}
      </section>
      <section className="input-section">
        <input type="text" />
      </section>
    </div>
  );
};

export default SearchInput;
