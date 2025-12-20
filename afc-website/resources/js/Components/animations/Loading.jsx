// Animations.jsx
import React from "react";
import Lottie from "lottie-react";
import loadingAnimationData from "./Loading.json";
import approvalAnimationData from "./animation11.json";
import transferFromAnimationData from "./animation10.json";
import allowanceAnimationData from "./animation8.json";
import pauseAnimationData from "./animation5.json";
import loginAnimationData from "./animation3.json";
import logoutAnimationData from "./animation6.json";
import deleteAnimationData from "./deleteAnimation.json";
import mintAnimationData from "./mintAnimation.json";
import waitAnimationData from "./clock.json";
import transferAnimationData from "./animation7.json";
import freezeData from "./freeze.json";
import transferData from "./transfer.json";
import olympicData from "./olympic.json";
import snowData from "./snow.json";
import "./loading.css";

// Named export for the general loading animation
export const LoadingAnimation = () => {
  return (
    <>
      <div className="loading-backdrop"></div>
      <div className="loading-overlay">
        <Lottie animationData={loadingAnimationData} loop={true} />
      </div>
    </>
  );
};

export const ApprovalAnimation = () => {
  return (
    <>
        <Lottie animationData={approvalAnimationData} loop={true} />
    </>
  );
};

export const FreezeAnimation = () => {
  return (
    <>
        <Lottie animationData={freezeData} loop={true} />
    </>
  );
};

export const TransferAnimation = () => {
  return (
    <>
        <Lottie animationData={transferData} loop={true} className="bg-gray-100"/>
    </>
  );
};
export const OlympicAnimation = () => {
  return (
    <>
        <Lottie animationData={olympicData} loop={true} />
    </>
  );
};
export const SnowAnimation = () => {
  return (
    <>
        <Lottie animationData={snowData} loop={true} className="bg-gray-100"/>
    </>
  );
};

export const TransferFromAnimation = () => {
  return (
    <>
        <Lottie animationData={transferFromAnimationData} loop={true} />
    </>
  );
};

export const AllowanceAnimation = () => {
  return (
    <>
        <Lottie animationData={allowanceAnimationData} loop={true} />
    </>
  );
};

export const PauseAnimation = () => {
  return (
    <>
        <Lottie animationData={pauseAnimationData} loop={true} />
    </>
  );
};

// Named export for the login animation
export const LoginAnimation = () => {
  return (
    <>
      <div className="loading-backdrop"></div>
      <div className="loading-overlay">
        <Lottie animationData={loginAnimationData} loop={true} />
      </div>
    </>
  );
};

export const LogoutAnimation = () => {
  return (
    <>
      <div className="loading-backdrop"></div>
      <div className="loading-overlay">
        <Lottie animationData={logoutAnimationData} loop={true} />
      </div>
    </>
  );
};

export const DeleteAnimation = () => {
  return (
    <>
      <div className="loading-backdrop"></div>
      <div className="loading-overlay">
        <Lottie animationData={deleteAnimationData} loop={true} />
      </div>
    </>
  );
};

export const MintAnimation = () => {
  return (
    <>
        <Lottie animationData={mintAnimationData} loop={true} />
    </>
  );
};

export const WaitAnimation = () => {
  return (
    <>
      <Lottie
        animationData={waitAnimationData}
        loop={true}
        className="w-28 h-28 filter invert brightness-100" // White color effect
      />
    </>
  );
};




export const TransfertAnimation = () => {
  return (
    <>
      <div className="loading-backdrop-wait-1"></div>
      <div className="loading-overlay-wait-1">
        <Lottie animationData={transferAnimationData} loop={true} />
      </div>
    </>
  );
};
