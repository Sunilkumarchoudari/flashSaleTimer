// src/components/FlashSaleTimer.js

import React, { Component } from 'react';
import './FlashSaleTimer.css';  

class FlashSaleTimer extends Component {
  constructor(props) {
    super(props);

    // Set the desired end time (in this example, 1 hour from the current time)
    // const flashSaleEndTime = new Date();
    // flashSaleEndTime.setHours(flashSaleEndTime.getHours() + 1);

    const flashSaleEndTime = new Date('2023-12-31T23:59:59');

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      flashSaleEndTime, // Set the desired end time here
      countdownInterval: null,
    };
  }

  componentDidMount() {
    this.startCountdown();
  }

  componentWillUnmount() {
    this.clearCountdown();
  }

  startCountdown() {
    const calculateTimeDifference = () => {
      const now = new Date();
      return this.state.flashSaleEndTime - now;
    };

    const timeDifference = calculateTimeDifference();

    if (timeDifference <= 0) {
      this.clearCountdown();
      return;
    }

    const countdownInterval = setInterval(() => {
      const timeDifference = calculateTimeDifference();

      if (timeDifference <= 0) {
        this.clearCountdown();
        return;
      }

      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      this.setState({
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    this.setState({ countdownInterval });
  }

  clearCountdown() {
    if (this.state.countdownInterval) {
      clearInterval(this.state.countdownInterval);
      this.setState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        flashSaleEndTime: null,
        countdownInterval: null,
      });
    }
  }

  render() {
    return (
      <div className="flash-sale-timer">
        <div className="timer-box">
          <span>{this.state.hours < 10 ? `0${this.state.hours}` : this.state.hours}</span>:
          <span>{this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes}</span>:
          <span>{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</span>
        </div>
      </div>
    );
  }
}

export default FlashSaleTimer;