/*
function a(){
  console.log('A');
}
*/

// 1. a라는 변수에 func의 시작 메모리 주소가 들어가있다고 생각하면 될 것 같다.(개인적 생각)
var a = function(){ 
    console.log('A');
  }
   
   // 3. a에 있는 fun시작 메모리 주소가 callback에 전달되었다. (개인적 생각)
  function slowfunc(callback){ 
    callback(); // 4. 따라서 callback 변수는 함수가 된다.
  }
   
  slowfunc(a); // 2. slowfunc 실행