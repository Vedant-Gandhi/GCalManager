import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./TokenStorage.module.css";
import processingImage from "./Icons/processing.svg";
import { getTokenfromNetwork } from "../Network/Network";
function TokenStorage() {
  const history = useHistory();
  const code = new URLSearchParams(useLocation().search).get("code");
  useEffect(() => {
    getTokenfromNetwork(
      code,
      () => {
        history.replace("/calendarScreen");
      },
      (err) => {
        console.error(err);
        //history.replace("/");
      }
    );
  }, []);
  return (
    <div className={styles.TokenStorage}>
      <div className={styles.ContentArea}>
        <img src={processingImage} alt={"Processing Image"}></img>
        <p>Please wait while we are verifying your identity</p>
      </div>
    </div>
  );
}
export default TokenStorage;
