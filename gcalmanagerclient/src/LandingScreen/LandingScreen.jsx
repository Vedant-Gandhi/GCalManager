import React, { useRef } from "react";
import PrimaryTitleBar from "../PrimaryTitleBar/PrimaryTitleBar";
import styles from "./LandingScreen.module.css";
import timeGirlIcon from "./Images/timemanagment.svg";
import timeschedulingIcon from "./Images/handdrawntime.svg";
import syncimage from "./Images/real_time_sync.svg";
import watchtimeimage from "./Images/time_watch.svg";
import organizeimage from "./Images/organize.svg";
import waveimage from "./Images/mainpagewave.svg";
import { AUTH_URL } from "../Config";

function LandingScreen() {
  const authRef = React.createRef();
  const onSignIn = () => {
    authRef.current.click();
  };
  return (
    <div className={styles.LandingScreen}>
      <PrimaryTitleBar showSignIn={true} onSignIn={onSignIn}></PrimaryTitleBar>
      <div className={styles.MainArea}>
        <div className={styles.descriptionContainer}>
          <div className={styles.description + " " + styles.hide}>
            <p>Anytime,Anywhere</p>
            <p>
              With our application manage your Google Calendar on the go without
              frequently scanning through everything
            </p>
          </div>
          <div className={styles.imageHolder}>
            <img src={timeGirlIcon}></img>
          </div>
          <div className={styles.description + " " + styles.show}>
            <p>Anytime,Anywhere</p>
            <p>
              With our application manage your Google Calendar on the go without
              frequently scanning through everything
            </p>
          </div>

          <div className={styles.breaker}></div>
          <div className={styles.breaker}></div>

          <div className={styles.imageHolder}>
            <img src={timeschedulingIcon}></img>
          </div>
          <div className={styles.description}>
            <p>We keep everything organized</p>
            <p>
              Get your G Calendar event pre organized in a great manner with
              reports of the frequency of recurring events
            </p>
          </div>
        </div>

        <div className={styles.breaker}></div>
        <div className={styles.breaker}></div>

        <div className={styles.featuresContainer}>
          <p className={styles.featuresTitle}>Product Features</p>
          <div className={styles.actualFeatures}>
            <div className={styles.Feature}>
              <img src={syncimage} alt={"Real Time Sync"}></img>
              <p>Quick sync across devices</p>
            </div>
            <div className={styles.Feature}>
              <img src={watchtimeimage} alt={"Get upcoming events"}></img>
              <p>Stay ahead of time</p>
            </div>
            <div className={styles.Feature}>
              <img src={organizeimage} alt={"Get organized events"}></img>
              <p>See what you want in organized way</p>
            </div>
          </div>
        </div>
        <div className={styles.breaker}></div>
        <div className={styles.breaker}></div>
        <img src={waveimage}></img>
      </div>
      <a href={AUTH_URL} alt="Hidden Secret" hidden={true} ref={authRef}></a>
    </div>
  );
}
export default LandingScreen;
