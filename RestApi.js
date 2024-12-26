const search_filter = document.querySelector(".searcher");
const filterbycontinent = document.querySelector("#sel");
const theme = document.querySelector(".theme-changer");
const CountriesMain = document.querySelector(".main_container");
let allCountries;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    render(data);
    console.log(data);
    allCountries=data;
    document.getElementById("shimmer").classList.add("hidden");  // Hide shimmer
    document.getElementById("actual").classList.remove("hidden");
  })
  .catch((err) => console.log(err));
filterbycontinent.addEventListener("change", () => {
  fetch(`https://restcountries.com/v3.1/region/${filterbycontinent.value}`)
    .then((res) => res.json())
    .then((data) => render(data))
    .catch((err) => console.log(err));
});
function render(data) {
  CountriesMain.innerHTML = "";
  data.forEach((country) => {
    const countrycard = document.createElement("a");
    countrycard.classList.add(
        "countries_container",
        "border-red-50",
        "h-66",
        "bg-red-200",
        "dark:bg-neutral-800",
        "dark:text-white",
        "w-64",
        "flex",
        "ml-2",
        "flex-col",
        "items-center",
        "justify-center",
        "p-4",
        "transition-transform",
        "duration-300",
        "ease-in-out",
        "transform",
        "group",
        "hover:scale-105",
        "hover:shadow-lg"
      );
      
      
    countrycard.href = `/Countries.html?name=${country.name.common}`;
    let img = document.createElement("img");
    img.src = `${country.flags.svg}`;
    img.alt = `country-images`;
    img.classList.add("h-32", "w-56", "mt-4");
    let card_text = document.createElement("div");

    let header = document.createElement("h3");
    header.innerText = `${country.name.common}`;
    header.classList.add("text-center", "text-xl");
    let para1 = document.createElement("p");
    let b1 = document.createElement("b");
    b1.innerHTML = `Population:`;
    let sp1 = document.createElement("span");
    sp1.innerHTML = `${country.population.toLocaleString("en-IN")}`;
    para1.appendChild(b1);
    para1.appendChild(sp1);
    let para2 = document.createElement("p");
    let b2 = document.createElement("b");
    let sp2 = document.createElement("span");
    b2.innerHTML = `Region:`;
    sp2.innerHTML = `${country.region}`;
    para2.appendChild(b2);
    para2.appendChild(sp2);
    let para3 = document.createElement("p");
    let b3 = document.createElement("b");
    let sp3 = document.createElement("span");
    b3.innerHTML = `Capital:`;
    sp3.innerHTML = `${country.capital?.[0]}`;
    para3.appendChild(b3);
    para3.appendChild(sp3);
    card_text.appendChild(header);
    card_text.appendChild(para1);
    card_text.appendChild(para2);
    card_text.appendChild(para3);
    countrycard.appendChild(img);
    countrycard.appendChild(card_text);

    CountriesMain.appendChild(countrycard);
  });
}
search_filter.addEventListener('input',(e)=>{
    const filtered=allCountries.filter((countries)=>countries.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    render(filtered);
})
theme.addEventListener('click',()=>{
    document.documentElement.classList.toggle('dark');
    console.log("done");
    if(document.documentElement.classList.contains('dark'))
    {
        theme.src=`./images/sun.svg`
    }
    else{
        theme.src=`./images/moon.svg`
    }
})