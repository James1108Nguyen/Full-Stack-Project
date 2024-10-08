// File: script.js

// Blur Header
window.addEventListener("scroll", function () {
  const header = document.getElementsByClassName("header");

  // Kiểm tra vị trí cuộn của trang
  if (window.scrollY > 50) {
    // Khi cuộn xuống hơn 50px
    header[0].classList.add("blur"); // Thêm class blur
  } else {
    header[0].classList.remove("blur"); // Bỏ class blur khi quay lại đầu trang
  }
});

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

// =====================================================================
// Slider
// =====================================================================
let currentSlideIndex = 0;
let autoSlideInterval;

// Hàm hiển thị slide
function showSlides(sliderId, index) {
  const slider = document.getElementById(sliderId);
  const slides = slider.getElementsByClassName("slide");
  const dots = slider.getElementsByClassName("dot");

  if (index >= slides.length) {
    slider.currentSlideIndex = 0;
  } else if (index < 0) {
    slider.currentSlideIndex = slides.length - 1;
  } else {
    slider.currentSlideIndex = index;
  }

  // Ẩn tất cả các slide
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  // Bỏ active class của tất cả các dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  // Hiển thị slide hiện tại và thêm active class vào dot tương ứng
  slides[slider.currentSlideIndex].classList.add("active");

  dots[slider.currentSlideIndex].classList.add("active");
}

// Tự động chuyển slide
function autoSlide(sliderId) {
  const slider = document.getElementById(sliderId);
  slider.currentSlideIndex = 0;

  // Tự động chuyển slide mỗi 3 giây
  slider.autoSlideInterval = setInterval(function () {
    showSlides(sliderId, slider.currentSlideIndex + 1);
  }, 3000);
}

// Hiển thị slide hiện tại và dừng tự động chuyển khi người dùng tương tác
function currentSlide(sliderId, n) {
  clearInterval(document.getElementById(sliderId).autoSlideInterval); // Dừng tự động chuyển khi người dùng thao tác
  showSlides(sliderId, n - 1);
  autoSlide(sliderId); // Tiếp tục tự động chuyển sau khi người dùng tương tác
}

// Khởi tạo slider cho các project khác nhau
autoSlide("slider-project-1");
