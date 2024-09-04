// File: script.js

function updateTime() {
  const options = {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const timeFormat = new Intl.DateTimeFormat([], options);
  const currentTime = timeFormat.format(new Date());

  const timeElement = document.getElementById("time");
  timeElement.textContent = currentTime;
}

// Gọi hàm updateTime mỗi giây để cập nhật thời gian
setInterval(updateTime, 1000);

// Hàm để cập nhật thời tiết từ Weatherbit
function updateWeather() {
  const apiKey = "8835170ea31a43c3be19900b1d5ed54c"; // Thay YOUR_API_KEY bằng API key của bạn từ Weatherbit
  const lat = "10.762622"; // Vĩ độ của Hồ Chí Minh City
  const lon = "106.660172"; // Kinh độ của Hồ Chí Minh City
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
  console.log(url);
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const temperature = data.data[0].temp; // Lấy nhiệt độ từ phản hồi
  //     const weatherElement = document.getElementById("weather");
  //     weatherElement.textContent = `Nhiệt độ hiện tại: ${temperature}°C`;
  //   })
  //   .catch((error) => {
  //     console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
  //   });

  const data = [
    {
      app_temp: 35.3,
      aqi: 80,
      city_name: "Quận Mười",
      clouds: 0,
      country_code: "VN",
      datetime: "2024-08-30:01",
      dewpt: 24.9,
      dhi: 96,
      dni: 785,
      elev_angle: 32.42,
      ghi: 510,
      gust: 2.6,
      h_angle: -45,
      lat: 10.7626,
      lon: 106.6602,
      ob_time: "2024-08-30 01:36",
      pod: "d",
      precip: 0,
      pres: 1010,
      rh: 77,
      slp: 1011,
      snow: 0,
      solar_rad: 510,
      sources: ["analysis", "G4668", "radar", "satellite"],
      state_code: "20",
      station: "G4668",
      sunrise: "22:43",
      sunset: "11:04",
      temp: 29.4,
      timezone: "Asia/Ho_Chi_Minh",
      ts: 1724981810,
      uv: 4,
      vis: 16,
      weather: {
        description: "Clear sky",
        code: 800,
        icon: "c01d",
      },
      wind_cdir: "WSW",
      wind_cdir_full: "west-southwest",
      wind_dir: 246,
      wind_spd: 2.6,
    },
  ];
  const temperature = data[0].temp; // Lấy nhiệt độ từ phản hồi
  console.log(temperature);
  const weatherElement = document.getElementById("weather");
  weatherElement.textContent = `${temperature}°C`;
  weatherElement.style.color = "#333";
}

// Gọi hàm updateWeather khi trang được tải
window.onload = function () {
  updateWeather();
};

// Gọi hàm updateWeather mỗi 10 phút (600000 ms) để cập nhật nhiệt độ
setInterval(updateWeather, 6000000);

// Process funcition (section2-skills)
function initProgressCircle(skill, progressPercent) {
  // Lấy phần tử SVG circle và số phần trăm từ DOM
  let circle = document.querySelector(`#${skill}-process circle`);
  let number = document.querySelector(
    `#${skill}-process .inner-content__number`
  );

  // Hàm tính toán chu vi và cập nhật các giá trị stroke
  function updateCircleDimensions() {
    // Lấy giá trị kích thước và độ dày viền từ CSS
    let size = getComputedStyle(document.documentElement)
      .getPropertyValue("--process-circle-size")
      .trim()
      .replace("px", ""); // Loại bỏ đơn vị 'px' để tính toán

    let strokeWidth = getComputedStyle(document.documentElement)
      .getPropertyValue("--progress-circle-thickness")
      .trim()
      .replace("px", ""); // Loại bỏ đơn vị 'px' để tính toán

    let radius = size / 2 - strokeWidth / 2; // Tính bán kính dựa trên độ dày viền
    let circumference = 2 * Math.PI * radius; // Chu vi của vòng tròn

    // Thiết lập các giá trị stroke cho vòng tròn
    circle.setAttribute("r", radius); // Cập nhật bán kính
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    // Tính toán offset dựa trên giá trị phần trăm hiện tại
    let offset = circumference - (counter / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  // Đặt giá trị ban đầu cho biến điều khiển tiến trình
  let counter = 0;

  function updateProgress() {
    // Điều chỉnh tốc độ thay đổi dựa trên vị trí hiện tại
    let speedFactor = (progressPercent - counter) / 10;
    speedFactor = Math.max(speedFactor, 0.5); // Đảm bảo tốc độ không quá nhỏ

    // Cập nhật counter dựa trên hướng tăng
    counter += speedFactor;

    // Hiển thị phần trăm tiến trình
    number.innerHTML = `${Math.round(counter)}%`;

    // Tính toán và thiết lập offset dựa trên counter hiện tại
    let size = getComputedStyle(document.documentElement)
      .getPropertyValue("--process-circle-size")
      .trim()
      .replace("px", "");
    let strokeWidth = getComputedStyle(document.documentElement)
      .getPropertyValue("--progress-circle-thickness")
      .trim()
      .replace("px", "");
    let radius = size / 2 - strokeWidth / 2;
    let circumference = 2 * Math.PI * radius;
    let offset = circumference - (counter / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    // Kiểm tra điều kiện để dừng khi đạt đến phần trăm mục tiêu
    if (counter >= progressPercent) {
      return; // Dừng khi đã đạt đến giá trị mục tiêu
    }

    // Gọi lại hàm để tạo loop
    requestAnimationFrame(updateProgress);
  }

  // Bắt đầu quá trình cập nhật tiến trình
  updateProgress();

  // Lắng nghe sự kiện resize để cập nhật kích thước vòng tròn mà không khởi động lại từ đầu
  window.addEventListener("resize", updateCircleDimensions);
}

// // Khởi tạo tiến trình cho các kỹ năng
// initProgressCircle("html-css", 68);
// initProgressCircle("js", 80);
// initProgressCircle("nodejs", 68);
// initProgressCircle("react-native", 68);

// Ví dụ sử dụng Intersection Observer API
const section = document.querySelector(".section-2");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Section đã lướt tới!");
        initProgressCircle("html-css", 68);
        initProgressCircle("js", 80);
        initProgressCircle("nodejs", 68);
        initProgressCircle("react-native", 68);
      }
    });
  },
  { threshold: 0.5 }
); // Tỉ lệ phần tử xuất hiện (50%)

observer.observe(section);
