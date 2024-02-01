let token = localStorage.getItem('token');
const log = (document.querySelector(".logged-only"));
const unlog = (document.querySelector(".unauth"));
const filterButton = (document.querySelector(".filters"));
const editBanner = (document.querySelector(".bannerEdit"));
const modifButton = (document.querySelector(".editM"));

if (localStorage.getItem('token')) {

    unlog.style.display = "none";    
    log.style.display = "block";
    filterButton.style.display = "none";
    editBanner.style.display = "block";
    modifButton.style.display = "flex";
    
}