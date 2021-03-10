import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import getCalendarEvents from "../Network/CalendarNetwork";
import PrimaryTitleBar from "../PrimaryTitleBar/PrimaryTitleBar";
import { checkToken, deleteToken } from "../Security/Security";
import DisplayCard from "./DisplayCard/DisplayCard";
import styles from "./LoggedIn.module.css";
function LoggedIn() {
  const [data, updateData] = useState([]);
  const history = useHistory();
  const signOut = () => {
    history.replace("/");
  };
  useEffect(() => {
    console.log("Check TO ken= " + checkToken());
    if (!checkToken()) {
      console.log("Check TO ken= " + checkToken());
      history.replace("/");
    }
  }, []);
  useEffect(() => {
    getCalendarEvents(
      (result) => {
        updateData(result);
      },
      (err) => {
        console.error(err);
      }
    );
    return () => {
      deleteToken();
    };
  }, []);
  const getDatefromString = (stringDate) => {
    return new Date(stringDate).toLocaleDateString();
  };
  const getTimefromString = (stringDate) => {
    return new Date(stringDate).toLocaleTimeString();
  };
  const getRecurrentFrequency = (stringFrequency) => {
    if (stringFrequency) {
      return stringFrequency.split("=")[1].split(";")[0];
    } else {
      return "";
    }
  };
  return (
    <div className={styles.LoggedIn}>
      <PrimaryTitleBar showSignIn={false} onSignOut={signOut}></PrimaryTitleBar>
      <div className={styles.MainScreen}>
        {data.map((value) => (
          <DisplayCard
            url={value.url}
            key={value.id}
            isRecurrent={value.isRecurrent.value}
            endTime={getTimefromString(value.end.dateTime)}
            startTime={getTimefromString(value.start.dateTime)}
            eventDate={getDatefromString(value.start.dateTime)}
            eventName={value.name}
            recurrentFrequency={getRecurrentFrequency(
              value.isRecurrent.frequency
            )}
          ></DisplayCard>
        ))}
      </div>
    </div>
  );
}
export default LoggedIn;
