document.addEventListener('DOMContentLoaded',function(){
const searchbtn = document.getElementById('search-btn');
const userIdinput = document.getElementById('user-input-field');
const statscontainer = document.querySelector('.stats-container');
const Easycircle = document.querySelector('.Easy-progress');
const Mediumcircle = document.querySelector('.Medium-progress');
const Hardcircle = document.querySelector('.Hard-progress');
const easylabel = document.getElementById('easy-label');
const mediumlabel = document.getElementById('medium-label');
const hardlabel = document.getElementById('hard-label');
const cardStats = document.querySelector('.card-stats');

function updateprogress(solved,total,label,circle){
 const progressdegree = (solved/total)*100;
 console.log(progressdegree);
 circle.style.setProperty("--progress-degree",`${progressdegree}%`);
 label.textContent = `${solved}/${total}`;
}
function displaydata(data){
   const easysolve = data.easySolved;
   const mediumsolve = data.mediumSolved;
   const hardsolve = data.hardSolved;
   const easyques = data.totalEasy;
   const mediumques = data.totalMedium;
   const hardques = data.totalHard;
   const totalsolved = data.totalSolved;
   const totalques = data.totalQuestion;
    updateprogress(easysolve,easyques,easylabel,Easycircle);
    updateprogress(mediumsolve,mediumques,mediumlabel,Mediumcircle);
    updateprogress(hardsolve,hardques,hardlabel,Hardcircle);
}
async function fetchuserdetails(username){
   const url= `https://leetcode-stats-api.herokuapp.com/${username}`;
   try {
      searchbtn.textContent = 'searching....';
      searchbtn.disabled = true;
      const response = await fetch(url);
      if(!response.ok){
         throw new Error('unable to found stats about this username')
      }
      const data = await response.json();
      console.log(data);
   displaydata(data);
   } catch (error) {
      statscontainer.innerHTML='<p>No data found</p>';
      console.log('error',error);
   }
   finally{
        searchbtn.textContent='Search';
        searchbtn.disabled=false;
   }
}
 function validate(username){
 if(username.trim() == ''){
   alert('userId should not be empty');
   return false;
 }
 const regex = /^[a-zA-Z0-9_-]{1,15}$/;
 const Matching = regex.test(username);
 if(!Matching){
   alert('invalid username');
 }
 return Matching;

}
searchbtn.addEventListener("click",function(){
   const username = userIdinput.value;
   console.log(username);
  if(validate(username)){
   fetchuserdetails(username);
  }
 
});
});
