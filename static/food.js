function openNav() {
  const sideMenu_Btn =  document.getElementById('sideMenu');
  const sideMenu_detail = document.getElementById('detailMenu');
  if (sideMenu_detail.style.width == '180px'){
    sideMenu_detail.style.width = '0';
    sideMenu_Btn.innerHTML ='&times';
    sideMenu_Btn.innerHTML ='&#9776;';
  }else{
    sideMenu_detail.style.width = '180px';
    sideMenu_Btn.innerHTML ='&times';
  }
}