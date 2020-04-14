import React from 'react';
import classNames from 'classnames';
import styles from './About.scss';

const About = () => {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.darkBox, styles.box)}>
        <h1 className={styles.title}>What is trello-clone?</h1>
        <p className={classNames(styles.text, styles.centredText)}>
          Trello-clone is the easy, free, flexible, and visual way to manage
          your projects and organize anything, trusted by millions of people
          from all over the world.
        </p>
      </div>
      <div className={styles.box}>
        <h1 className={styles.title}>Contact information:</h1>
        <p className={styles.text}>Telegram: @ViktorNA</p>
        <p className={styles.text}>Email: viktorna27@gmail.com</p>
        <p className={styles.text}>
          Github repo: https://github.com/ViktorNA/externship
        </p>
      </div>
    </div>
  );
};

export default About;
