import React, { useState } from "react";
import styles from "./PrimaryTitleBar.module.css";
import menuIcon from "./Icons/menuicon.svg";
function PrimaryTitleBar({
  showSignIn,
  onSignIn,
  aboutUsUrl,
  contactUsUrl,
  onSignOut,
}) {
  const [menuDisplayed, updatemenuDisplayed] = useState("none");
  const onMenuClick = (e) => {
    e.preventDefault();
    console.log("In ffunc");
    if (menuDisplayed.localeCompare("none") === 0) {
      updatemenuDisplayed("block");
    } else {
      updatemenuDisplayed("none");
    }
  };

  return (
    <div>
      <div className={styles.PrimaryTitleBar}>
        <div className={styles.Left}>
          <div>
            <img
              src={menuIcon}
              className={styles.menuIcon}
              onClick={onMenuClick}
            ></img>
          </div>
        </div>
        <div className={styles.Right}>
          <button
            className={styles.SignIn}
            style={
              !showSignIn === true
                ? {
                    display: "block",
                    backgroundColor: "var(--primaryRed)",
                  }
                : { display: "none" }
            }
            onClick={onSignOut}
          >
            Sign out
          </button>
          <button
            className={styles.SignIn}
            style={
              showSignIn === true ? { display: "block" } : { display: "none" }
            }
            onClick={onSignIn}
          >
            Sign In
          </button>
          <a href={contactUsUrl || "#"} className={styles.menuitem}>
            Contact
          </a>
          <a href={aboutUsUrl || "#"} className={styles.menuitem}>
            About Us
          </a>
        </div>
      </div>
      <div className={styles.slideMenuBar} style={{ display: menuDisplayed }}>
        <div className={styles.slideMenuItem}>
          {" "}
          <a href={contactUsUrl || "#"} className={styles.menuitem}>
            Contact
          </a>
        </div>
        <div className={styles.slideMenuItem}>
          <a href={aboutUsUrl || "#"} className={styles.menuitem}>
            About Us
          </a>
        </div>
      </div>
    </div>
  );
}
export default PrimaryTitleBar;
