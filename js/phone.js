const loadPhone = async (searchText = "13", isShow) => {
  try {
    const api = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(api);
    const data = await res.json();
    const phonesData = data.data;
    displayPhones(phonesData, isShow);
  } catch (error) {
    console.log(error);
  }
};
loadPhone();
// displaying phnones when searching
const displayPhones = (phones, isShow) => {
  const phoneContainer = document.getElementById("phone-container");
  const showMoreBtn = document.getElementById("show-all-content");
  phoneContainer.innerHTML = "";
  if (phones.length > 0) {
    //   display show all butoon if there are more phone
    if (phones.length > 12 && !isShow) {
      showMoreBtn.classList.remove("hidden");
    } else {
      showMoreBtn.classList.add("hidden");
    }
    // display only  12 phones if not show all
    if (!isShow) {
      phones = phones.slice(0, 12);
    }
    phones.forEach((phone) => {
      // console.log(phone.slug );
      const phoneCard = document.createElement("div");
      phoneCard.classList = `card w-[320px] h-[500px] bg-base-100 shadow-xl p-4`;
      phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body capitalize">
                  <h2 class="text-xl font-bold text-center ">${phone.phone_name}</h2>
                  <p class="text-center text-sm text-gray-400">There are many variations of passages of available, but the majority have suffered</p>
                  <p class="text-lg font-bold text-center">$999</p>
                  <button onclick='phoneDetails("${phone.slug}")' class="btn bg-color1 text-white capitalize">show details</button>
                </div>
        `;
      phoneContainer.appendChild(phoneCard);
    });
    loadingToggle(false);
  } else {
    showMoreBtn.classList.add("hidden");
    loadingToggle(false);
    const searchValue = document.getElementById('phone-name').value = '';
    my_modal_2.showModal();
  }
};
// search haldelar
const searchHaldeler = (isShow) => {
  loadingToggle(true);
  const searchValue = document.getElementById("phone-name");
  const searchName = searchValue.value;
  // console.log(searchValue);
  loadPhone(searchName, isShow);
  searchValue.value = '';
};
// loading showing
const loadingToggle = (isLoading) => {
  const loading = document.getElementById("loader");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};
// hadell show all
const handleShowAll = () => {
  searchHaldeler(true);
};
// phones details data receved
const phoneDetails = async (name) => {
  try {
    const api2 = `https://openapi.programming-hero.com/api/phone/${name}`;
    const res = await fetch(api2);
    const details = await res.json();
    const detailPhone = details.data;
    // details card showing container
    phoneDetailsDisplay(detailPhone);
  } catch (error) {
    console.log(error);
  }
};
// showing mobile details using modal
const phoneDetailsDisplay = (detailPhone) => {
  console.log(detailPhone);
  my_modal_1.showModal();
  const dialog = document.getElementById("my_modal_1");
  dialog.innerHTML = `
    <div id="details-card" class="card md:flex-row w-[400px] md:w-[830px] h-[830px] md:h-[600px] bg-base-100 shadow-xl p-8 mb-20 visible text-sm">
    <figure class="flex-1">
      <img
        src="${detailPhone.image}"
        alt="Shoes"
      />
    </figure>
    <div class="card-body flex-1">
      <h2 class="card-title font-bold">${detailPhone.name}</h2>
      <p class="text-sm font-medium text-gray-400">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
      <p class="font-bold">Storage  <span class="font-normal text-gray-400">: ${
        detailPhone.mainFeatures.storage
      }</span></p>
      <p class="font-bold">Display Size  <span class="font-normal text-gray-400">: ${
        detailPhone.mainFeatures.displaySize
      }</span></p>
      <p class="font-bold">Chipset  <span class="font-normal text-gray-400">: ${
        detailPhone.mainFeatures.chipSet
      }</span></p>
      <p class="font-bold">Memory  <span class="font-normal text-gray-400">: ${
        detailPhone.mainFeatures.memory
      }</span></p>
      <p class="font-bold">Slug  <span class="font-normal text-gray-400">: ${
        detailPhone.slug
      }</span></p>
      <p class="font-bold">Release Data  <span class="font-normal text-gray-400">: ${
        detailPhone.releaseDate
      }</span></p>
      <p class="font-bold">Brand  <span class="font-normal text-gray-400">: ${
        detailPhone.brand
      }</span></p>
      <p class="font-bold">GPS <span class="font-normal text-gray-400">: ${
        detailPhone?.others?.GPS || "No Data Found!"
      }</span></p>
      <form method="dialog" class="card-actions justify-end mt-4">
      <button class="btn btn-error text-white px-8">Close</button>
      </form>
    </div>
  </div>
 `;
};
