import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
    console.log(selectedDates[0]);
  },
};

flatpickr(datetimeInput, options);

startBtn.addEventListener('click', onStartBtnClick);

let timerId = null;

function onStartBtnClick() {
  timerId = setInterval(() => {
    const newData = new Date();
    const finalData = new Date(datetimeInput.value);
    const result = convertMs(finalData - newData);

    if (result <= 0) {
      clearInterval(timerId);
    }

    document.querySelector('[data-days]').textContent = addLeadingZero(
      result.days
    );
    document.querySelector('[data-hours]').textContent = addLeadingZero(
      result.hours
    );
    document.querySelector('[data-minutes]').textContent = addLeadingZero(
      result.minutes
    );
    document.querySelector('[data-seconds]').textContent = addLeadingZero(
      result.seconds
    );
  }, 1000);

  datetimeInput.disabled = true;
  startBtn.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
