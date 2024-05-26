document.addEventListener('DOMContentLoaded', function () {
  const calendar = document.getElementById('calendar');
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  function renderCalendar(month, year) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // Start the week with Sunday

    calendar.innerHTML = '';

    const monthElement = document.createElement('div');
    monthElement.classList.add('month');
    monthElement.textContent = `${monthNames[month]} ${year}`;
    calendar.appendChild(monthElement);

    const weekdaysElement = document.createElement('div');
    weekdaysElement.classList.add('weekdays');
    calendar.appendChild(weekdaysElement);

    const daysElement = document.createElement('div');
    daysElement.classList.add('days');
    calendar.appendChild(daysElement);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // Start the week with Sunday
    weekdays.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      weekdaysElement.appendChild(dayElement);
    });

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDayElement = document.createElement('div');
      emptyDayElement.classList.add('empty-day');
      daysElement.appendChild(emptyDayElement);
    }

    // Populate days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      daysElement.appendChild(dayElement);

      // Highlight today's date
      if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
        dayElement.classList.add('today');
      }

      // Add click event listener
      dayElement.addEventListener('click', function () {
        alert(`You clicked on ${monthNames[month]} ${day}, ${year}`);
      });
    }
  }

  renderCalendar(currentMonth, currentYear);

  // Event listeners for navigating to previous and next months
  document.querySelector('.prev').addEventListener('click', function () {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    renderCalendar(currentMonth, currentYear);
  });

  document.querySelector('.next').addEventListener('click', function () {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    renderCalendar(currentMonth, currentYear);
  });
});
