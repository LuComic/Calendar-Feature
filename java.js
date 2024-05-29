const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
const month_names = [
  'Jaanuar',
  'Veebruar',
  'Märts',
  'Aprill',
  'Mai',
  'Juuni',
  'Juuli',
  'August',
  'September',
  'Oktoober',
  'November',
  'Detseber',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

month_picker.onclick = () => {
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currentDate = new Date();

  month_picker.innerHTML = month_names[month];

  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month).getDay(); // Get the day index (0-6) of the first day of the month

  // Calculate the offset for the first day of the month in the calendar grid
  let offset = first_day === 0 ? 6 : first_day - 1;

  // Create placeholders for days before the 1st day of the month
  for (let i = 0; i < offset; i++) {
    let placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');
    calendar_days.appendChild(placeholder);
  }

  for (let i = 1; i <= days_of_month[month]; i++) {
    let day = document.createElement('div');
    day.innerHTML = i;

    if (i === currentDate.getDate() &&
      year === currentDate.getFullYear() &&
      month === currentDate.getMonth()
    ) {
      day.classList.add('current-date');
    }

    // Add classes to identify weekends (Saturday and Sunday).
    let currentDay = (offset + i - 1) % 7;
    if (currentDay === 5 || currentDay === 6) {
      day.classList.add('weekend');
    }

    calendar_days.appendChild(day);
  }
};


let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hideTime');
    dateFormate.classList.add('showtime');
  };
});

(function () {
  month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

// Add functions for the toggle button.
document.querySelector(".side-panel-toggle").addEventListener("click", () => {
  const sidePanel = document.querySelector(".side-panel");
  const iconOpen = document.querySelector(".sp-icon-open");
  const iconClose = document.querySelector(".sp-icon-close");

  // This toggles the class and returns the new state of 'isOpen'
  const isOpen = sidePanel.classList.toggle("side-panel-expanded");

  // Adjusting styles based on the panel state
  if (isOpen) {
    sidePanel.style.width = "45%";
    iconOpen.style.opacity = 0;
    iconClose.style.opacity = 1;
    iconOpen.style.display = 'none';
    iconClose.style.display = 'block';
    document.querySelector('.opiq-container').classList.add('showtime');
  } else {
    sidePanel.style.width = "350px";
    iconOpen.style.opacity = 1;
    iconClose.style.opacity = 0;
    iconOpen.style.display = 'block';
    iconClose.style.display = 'none';
    setTimeout(() => {
      document.querySelector('.opiq-container').classList.remove('showtime');
    }, 500);
  }
});


// Select all elements with the class "description"
const descriptions = document.querySelectorAll('.description');

// Define the maximum number of characters to display
const maxCharacters = 100; // Change this value to your desired limit

// Loop through each description element
descriptions.forEach(description => {
  // Get the text content of the description
  const text = description.textContent.trim();
  
  // Check if the text length exceeds the maximum characters
  if (text.length > maxCharacters) {
    // Trim the text to the maximum characters and add "..."
    const trimmedText = text.substring(0, maxCharacters) + '...';
    // Update the description text content
    description.textContent = trimmedText;
  }
});
