import React from "react";
import styles from "./DisplayCard.module.css";
import calIcon from "./Icons/event.svg";
import navigateToIcon from "./Icons/navigate.svg";
import recurrentIcon from "./Icons/repeat.svg";
function DisplayCard({
  url,
  eventDate,
  isRecurrent,
  recurrentFrequency,
  startTime,
  endTime,
  eventName,
}) {
  const urlRef = React.createRef();
  const onUrlClick = (e) => {
    e.preventDefault();
    urlRef.current.click();
  };
  const recurrentColor = "#0288D1";
  return (
    <div className={styles.DisplayCard}>
      <div>
        <div
          className={styles.EventDateSection}
          style={isRecurrent ? { backgroundColor: recurrentColor } : {}}
        >
          <p>{eventDate || "Missing Event Date"}</p>
        </div>
      </div>
      <div className={styles.MidSection}>
        <div className={styles.EventName}>
          <p>{eventName || "Missing Event Name"}</p>
        </div>
        <div className={styles.TimeSection}>
          <img src={calIcon}></img>
          <p>
            {startTime}
            <br /> {endTime}
          </p>
        </div>
        {isRecurrent ? (
          <div className={styles.recurrentSection}>
            <img src={recurrentIcon}></img>
            <p>{recurrentFrequency || " Missing Recurrent Frequency"}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.BottomCard}>
        <div
          className={styles.NavButton}
          style={isRecurrent ? { backgroundColor: recurrentColor } : {}}
        >
          <img src={navigateToIcon} onClick={onUrlClick}></img>
          <a href={url} hidden={true} target="_blank" ref={urlRef}></a>
        </div>
      </div>
    </div>
  );
}
export default DisplayCard;
