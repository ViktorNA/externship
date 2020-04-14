import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import hero from '../../assets/images/hero-a.svg';
import styles from './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>
          Trello-clone lets you work more collaboratively and get more done.
        </h1>
        <p className={styles.text}>
          Trello-clone’s boards, lists, and cards enable you to organize and
          prioritize your projects in a fun, flexible, and rewarding way.
        </p>
        <Link to={'/signup'}>
          <Button size={'massive'} color={'green'}>
            Sign Up - it's free!
          </Button>
        </Link>
      </div>
      <div className={styles.box}>
        <Image src={hero} />
      </div>
    </div>
  );
};

export default Home;
