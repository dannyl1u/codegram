import React, { useRef, useState } from "react";
import styles from "./OnBoardingPage.module.css";
import { IconLeetCodeLogo } from "../icons/icon-leetcode-logo";
import { IconVJudgeLogo } from "../icons/icon-vjudge-logo";
import { IconAddPhoto } from "../icons/import-photo-icon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OnBoardingPage = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [leetCodeUsername, setLeetCodeUsername] = useState("");
  const [vJudgeUsername, setVJudgeUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    if (fileUploaded) {
      console.log(fileUploaded);
      setImageUrl(URL.createObjectURL(fileUploaded));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (leetCodeUsername === "" && vJudgeUsername === "") {
      setErrorMsg("Please ensure at least one of the usernames is provided");
      return;
    }

    const payload = {
      leetCodeUsername,
      vJudgeUsername,
      imageUrl,
    }

    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", payload);

      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        setErrorMsg("Something went wrong, please try again.");
      }
    } catch (error) {
      setErrorMsg("Failed to submit. Please try again.");
    }
  };

  return (
    <main className={styles.OnBoardingPage}>
      <header className={styles.header}>
        <h1>
          <span>One</span> Last Step...
        </h1>
      </header>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.UploadPhoto} onClick={handleClick}>
            {!imageUrl && <IconAddPhoto />}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Selected"
                className={styles.profileImg}
              />
            )}
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
          <p>
            Please Select a<span> Profile Picture </span>, and Fill in At Least
            One of the Two
            <span> Usernames</span>
          </p>
          <div className={styles.miniCardHolder}>
            <div className={styles.miniCard}>
              <IconLeetCodeLogo />
              <input
                type="text"
                placeholder="LeetCode Username"
                className={styles.inputText}
                value={leetCodeUsername} 
                onChange={(e) => setLeetCodeUsername(e.target.value)} 
              />
            </div>
            <div className={styles.miniCard}>
              <IconVJudgeLogo />
              <input
                type="text"
                placeholder="VJudge Username"
                className={styles.inputText}
                value={vJudgeUsername} 
                onChange={(e) => setVJudgeUsername(e.target.value)} 
              />
            </div>
          </div>
          <button type="submit" className={styles.btn}>
            Continue
          </button>
          {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
        </form>
      </div>
    </main>
  );
};

export default OnBoardingPage;
