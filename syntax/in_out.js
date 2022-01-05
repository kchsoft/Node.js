var args = process.argv; // 입력 변수 생성
console.log(args); 
console.log('A');
console.log('B');
if(args[2] === '1'){
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');

// node in_out.js Sentence wow
// 와 같이 콘솔에 입력시 'Sentence'와 'wow'가 입력됨.