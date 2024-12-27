const theme = document.querySelector(".theme-changer");
const nativename = document.querySelector(".Native_name");
const population = document.querySelector(".Population");
const Region = document.querySelector(".Region");
const Capital = document.querySelector(".Capital");
const flag = document.querySelector(".flags");
const commonname = document.querySelector(".common_name");
const Subregion = document.querySelector(".Sub-Region");
const tpd = document.querySelector(".Top_Level_Domain");
const currency = document.querySelector(".Currencies");
const Languages = document.querySelector(".Languages");
const borders = document.querySelector(".border_countries");
const countryname = new URLSearchParams(location.search).get("name");
const getrror = document.querySelector(".err");
theme.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("isdark", "dark_mode");
    theme.src = `./images/sun.svg`;
  } else {
    theme.src = `./images/moon.svg`;
    localStorage.setItem("isdark", "light_mode");
  }
});
const thememode = localStorage.getItem("isdark");
if (thememode == "dark_mode") {
  document.documentElement.classList.add("dark");
  theme.src = `./images/sun.svg`;
} else {
  document.documentElement.classList.remove("dark");
  theme.src = `./images/moon.svg`;
}
fetch(`https://restcountries.com/v3.1/name/${countryname}`)
  .then((res) => res.json())
  .then((data) => {
    render(data);
    console.log(data);
    document.getElementById("shimmer").classList.add("hidden");
    document.getElementById("actual").classList.remove("hidden");
  })
  .catch((err) => {
    getrror.classList.remove("hidden");
    getrror.innerText = `${err}`;
    document.getElementById("shimmer").classList.add("hidden");
  });

function render(data) {
  let country = data[0];
  flag.src = `${country.flags.svg}`;
  commonname.innerText = `${country.name.common}`;
  population.innerText = `${country.population.toLocaleString("en-In")}`;
  Region.innerText = `${country.region}`;
  tpd.innerText = `${country.tld.join(",")}`;
  Capital.innerText = country.capital?.[0];
  Subregion.innerText = country?.subregion;
  if (country.name.nativeName) {
    nativename.innerText = Object.values(country.name.nativeName)[0].common;
  } else {
    nativename.innerText = country.name.common;
  }
  if (country.currencies) {
    const currencies = Object.values(country.currencies);
    currency.innerText = currencies
      .map((cur) => `${cur.symbol} ${cur.name}`)
      .join(", ");
  }
  if (country.languages) {
    Languages.innerText = Object.values(country.languages).join(",");
  }
  if (country.borders) {
    country.borders.forEach((border) => {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then((data) => renderborder(data[0]));
      document.getElementById("shimmer").classList.add("hidden");
      document.getElementById("actual").classList.remove("hidden");
    }).catch((err)=>{
      getrror.classList.remove("hidden");
      getrror.innerText = `${err}`;
      document.getElementById("shimmer").classList.add("hidden");
    })
    function renderborder(data) {
      const anchor = document.createElement("a");
      anchor.innerText = data.name.common;
      anchor.href = `/Countries.html?name=${data.name.common}`;
      anchor.classList.add(
        "hover:bg-blue-100",
        "border-2",
        "rounded-lg",
        "self-center",
        "dark:text-white"
      );
      borders.appendChild(anchor);
    }
  }
}
