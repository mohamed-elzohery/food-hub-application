import React from "react";
import classes from "../styles/UserProfile.module.css";
import ProfileForm from "./ProfileForm";
function Profile() {
  return (
    <>
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm />
      </section>
    </>
  );
}

export default Profile;
