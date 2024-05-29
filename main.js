var SiteName=document.getElementById('SiteName')
var SiteURL=document.getElementById('SiteURL')
var SubmitBtn=document.getElementById('SubmitBtn')
var tableBody=document.getElementById('tableBody')
var layout=document.getElementById('layout')
var message=document.getElementById('message')
var close=document.getElementById('close')

var tableItems
if(localStorage.getItem('list')!=null){
    tableItems = JSON.parse(localStorage.getItem('list'))
    display()
}
else
    tableItems = [];

    SubmitBtn.onclick = function() {
    addItem();
    display();
    clearForm()
}

function addItem(){
    if(validInputName() && isValidUrl()){
        var tableObject = {
            sName : SiteName.value,
            sURL : SiteURL.value,
        }
        tableItems.push(tableObject)
        localStorage.setItem('list',JSON.stringify(tableItems))
    }
    else{
        message.classList.replace('d-none','d-block');
        layout.classList.replace('d-none','d-block')
    }
}
close.onclick = function() {
    message.classList.replace('d-block','d-none');
    layout.classList.replace('d-block','d-none')
}

function clearForm()
{
    SiteName.value=null;
    SiteURL.value=null;
}

function display() {
    var box =''; 
    for(var i=0;i<tableItems.length;i++){
        box+=`<tr>
        <th scope="row">${i+1}</th>
        <td>${tableItems[i].sName}</td>
        <td>
            <a class="btn" href="#${tableItems[i].sURL}" role="button" onclick="visit(${i})">
                <i class="fa-solid fa-eye"></i>
                Visit
            </a>
        </td>
        <td>
            <button type="button" class="btn btn-danger" onclick="deleteFunc(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete</button>
        </td>
    </tr>`
    }
tableBody.innerHTML=box;
}

function deleteFunc(index){
    tableItems.splice(index,1);
    localStorage.setItem('list',JSON.stringify(tableItems))
    display();
}
function visit(siteIndex) {
    open(`https://${tableItems[siteIndex].sURL}`);
}


function validInputName(){
    var reg = /^[\w]{3,}$/;
    if(reg.test(SiteName.value)){
        SiteName.classList.remove('is-invalid')
        SiteName.classList.add('is-valid')
        return true;
    }
    else{
        SiteName.classList.add('is-invalid')
        SiteName.classList.remove('is-valid')
        return false
    }
}


function isValidUrl() {
    var regurl = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
if(regurl.test(SiteURL.value)){
    SiteURL.classList.remove('is-invalid')
    SiteURL.classList.add('is-valid')
    return true;
}
else{
    SiteURL.classList.add('is-invalid')
    SiteURL.classList.remove('is-valid')
    return false
}
}